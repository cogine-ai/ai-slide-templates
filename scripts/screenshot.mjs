import { mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';

const DEFAULT_OUT_DIR = path.join('previews', 'screenshots');
const DEFAULT_WIDTH = 1600;
const DEFAULT_HEIGHT = 900;

function usage() {
  return `Render a PNG screenshot for a template or generated preview.

Usage:
  node scripts/screenshot.mjs [options] <template-slug-or-html-path>

Options:
  --out <file>      Screenshot output path. Defaults to previews/screenshots/<name>.png
  --out-dir <dir>   Directory for default screenshot filenames
  --width <px>      Viewport width. Defaults to 1600
  --height <px>     Viewport height. Defaults to 900
  --root <dir>      Repository root. Defaults to current directory
  -h, --help        Show this help text

Examples:
  node scripts/screenshot.mjs airy-modern
  node scripts/screenshot.mjs previews/airy-modern-preview.html
  node scripts/screenshot.mjs --width 1440 --height 900 --out previews/screenshots/airy.png airy-modern

Requires the Playwright package and a Chromium browser:
  npm install
  npx playwright install chromium
`;
}

function takeValue(args, index, optionName) {
  const value = args[index + 1];
  if (!value || value.startsWith('--')) {
    throw new Error(`${optionName} requires a value`);
  }
  return value;
}

function parsePositiveInteger(value, optionName) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isInteger(parsed) || parsed < 1) {
    throw new Error(`${optionName} must be a positive integer`);
  }
  return parsed;
}

export function parseScreenshotArgs(argv = process.argv.slice(2)) {
  const parsed = {
    rootDir: process.cwd(),
    outDir: DEFAULT_OUT_DIR,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT
  };
  const inputs = [];

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === '-h' || arg === '--help') {
      parsed.help = true;
      continue;
    }

    if (arg === '--root') {
      parsed.rootDir = takeValue(argv, index, arg);
      index += 1;
      continue;
    }

    if (arg === '--out') {
      parsed.out = takeValue(argv, index, arg);
      index += 1;
      continue;
    }

    if (arg === '--out-dir') {
      parsed.outDir = takeValue(argv, index, arg);
      index += 1;
      continue;
    }

    if (arg === '--width') {
      parsed.width = parsePositiveInteger(takeValue(argv, index, arg), arg);
      index += 1;
      continue;
    }

    if (arg === '--height') {
      parsed.height = parsePositiveInteger(takeValue(argv, index, arg), arg);
      index += 1;
      continue;
    }

    if (arg.startsWith('--')) {
      throw new Error(`Unknown option: ${arg}`);
    }

    inputs.push(arg);
  }

  if (inputs.length > 1) {
    throw new Error('Screenshot accepts exactly one template slug or HTML path');
  }

  parsed.input = inputs[0];
  return parsed;
}

async function exists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

function resolveAgainstRoot(rootDir, value) {
  return path.isAbsolute(value) ? value : path.join(rootDir, value);
}

function outputPathFor(rootDir, outDir, label, explicitOut) {
  if (explicitOut) {
    return resolveAgainstRoot(rootDir, explicitOut);
  }

  const resolvedOutDir = resolveAgainstRoot(rootDir, outDir || DEFAULT_OUT_DIR);
  return path.join(resolvedOutDir, `${label}.png`);
}

function isUrl(value) {
  return /^https?:\/\//i.test(value) || /^file:\/\//i.test(value);
}

function labelFromUrl(value) {
  const url = new URL(value);
  const pathname = url.pathname || 'screenshot';
  const basename = path.basename(pathname, path.extname(pathname));
  return basename || url.hostname.replace(/[^a-z0-9-]+/gi, '-').toLowerCase();
}

export async function resolveScreenshotTarget(options) {
  const rootDir = path.resolve(options.rootDir || process.cwd());
  const input = options.input;

  if (!input) {
    throw new Error('A template slug or HTML path is required');
  }

  if (isUrl(input)) {
    const label = labelFromUrl(input);
    return {
      label,
      inputUrl: input,
      outputPath: outputPathFor(rootDir, options.outDir, label, options.out)
    };
  }

  const fileCandidate = resolveAgainstRoot(rootDir, input);
  if (await exists(fileCandidate)) {
    const label = path.basename(fileCandidate, path.extname(fileCandidate));
    return {
      label,
      inputPath: fileCandidate,
      outputPath: outputPathFor(rootDir, options.outDir, label, options.out)
    };
  }

  if (path.extname(input).toLowerCase() === '.html') {
    throw new Error(`HTML input not found: ${fileCandidate}`);
  }

  const templatePath = path.join(rootDir, 'templates', input, 'template.html');
  if (!(await exists(templatePath))) {
    throw new Error(`Unknown template slug or HTML input "${input}"`);
  }

  return {
    label: input,
    inputPath: templatePath,
    outputPath: outputPathFor(rootDir, options.outDir, input, options.out)
  };
}

async function loadPlaywright() {
  try {
    return await import('playwright');
  } catch (error) {
    if (error.code === 'ERR_MODULE_NOT_FOUND') {
      throw new Error('Playwright is required for screenshots. Run `npm install` and `npx playwright install chromium` first.');
    }
    throw error;
  }
}

async function waitForFonts(page) {
  await page.evaluate(() => {
    if (!document.fonts || !document.fonts.ready) return Promise.resolve();
    return Promise.race([
      document.fonts.ready,
      new Promise((resolve) => setTimeout(resolve, 3000))
    ]);
  }).catch(() => {});
}

export async function renderScreenshot(options) {
  const target = await resolveScreenshotTarget(options);
  const { chromium } = await loadPlaywright();
  await mkdir(path.dirname(target.outputPath), { recursive: true });

  let browser;
  try {
    browser = await chromium.launch({ headless: true });
  } catch (error) {
    if (String(error.message).includes('Executable doesn\'t exist')) {
      throw new Error('Playwright Chromium is not installed. Run `npx playwright install chromium` first.');
    }
    throw error;
  }

  try {
    const page = await browser.newPage({
      viewport: {
        width: options.width || DEFAULT_WIDTH,
        height: options.height || DEFAULT_HEIGHT
      },
      deviceScaleFactor: 1
    });
    const url = target.inputUrl || pathToFileURL(target.inputPath).href;
    await page.goto(url, { waitUntil: 'load' });
    await waitForFonts(page);
    await page.screenshot({ path: target.outputPath, fullPage: false });
  } finally {
    if (browser) {
      await browser.close();
    }
  }

  return target;
}

async function main() {
  let args;
  try {
    args = parseScreenshotArgs();
  } catch (error) {
    console.error(error.message);
    console.error('');
    console.error(usage());
    process.exitCode = 1;
    return;
  }

  if (args.help) {
    console.log(usage());
    return;
  }

  try {
    const target = await renderScreenshot(args);
    console.log(`${target.label}: ${target.outputPath}`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

const isCli = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isCli) {
  await main();
}
