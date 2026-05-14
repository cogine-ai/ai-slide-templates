import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DEFAULT_OUT_DIR = 'previews';
const TEXT_REPLACEMENT_CLASSES = ['kicker', 'label', 'tag', 'sticker', 'pill', 'chip', 'folio'];

function usage() {
  return `Generate first-slide preview HTML files for template candidates.

Usage:
  node scripts/preview.mjs [options] <slug...>
  node scripts/preview.mjs --title "Deck title" airy-modern,b2b-sales-pitch

Options:
  --out-dir <dir>     Output directory. Defaults to previews/
  --title <text>      Replace the first slide's first h1 text
  --subtitle <text>   Replace the first slide's first p text
  --kicker <text>     Replace the first cover label/kicker text when present
  --root <dir>        Repository root. Defaults to current directory
  -h, --help          Show this help text

Examples:
  node scripts/preview.mjs airy-modern midnight-executive
  node scripts/preview.mjs --title "AI Platform Review" --subtitle "Candidate cover directions" airy-modern,circuit-tech-dark
`;
}

function takeValue(args, index, optionName) {
  const value = args[index + 1];
  if (!value || value.startsWith('--')) {
    throw new Error(`${optionName} requires a value`);
  }
  return value;
}

function normalizeSlugs(values) {
  return values
    .flatMap((value) => value.split(','))
    .map((value) => value.trim())
    .filter(Boolean);
}

export function parsePreviewArgs(argv = process.argv.slice(2)) {
  const parsed = {
    rootDir: process.cwd(),
    outDir: DEFAULT_OUT_DIR,
    slugs: []
  };
  const slugValues = [];

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

    if (arg === '--out-dir') {
      parsed.outDir = takeValue(argv, index, arg);
      index += 1;
      continue;
    }

    if (arg === '--title') {
      parsed.title = takeValue(argv, index, arg);
      index += 1;
      continue;
    }

    if (arg === '--subtitle') {
      parsed.subtitle = takeValue(argv, index, arg);
      index += 1;
      continue;
    }

    if (arg === '--kicker') {
      parsed.kicker = takeValue(argv, index, arg);
      index += 1;
      continue;
    }

    if (arg.startsWith('--')) {
      throw new Error(`Unknown option: ${arg}`);
    }

    slugValues.push(arg);
  }

  parsed.slugs = normalizeSlugs(slugValues);
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

function escapeRegExp(source) {
  return source.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function escapeHtml(source) {
  return String(source)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function hasSlideClass(openingTag) {
  const classMatch = openingTag.match(/\bclass=(["'])(.*?)\1/i);
  if (!classMatch) return false;
  return classMatch[2].split(/\s+/).includes('slide');
}

function findMatchingClose(html, openingMatch) {
  const tagName = openingMatch[1].toLowerCase();
  const tagPattern = new RegExp(`<\\/?${escapeRegExp(tagName)}\\b[^>]*>`, 'gi');
  tagPattern.lastIndex = openingMatch.index + openingMatch[0].length;

  let depth = 1;
  let match;
  while ((match = tagPattern.exec(html))) {
    if (match[0].startsWith('</')) {
      depth -= 1;
      if (depth === 0) {
        return tagPattern.lastIndex;
      }
      continue;
    }

    if (!match[0].endsWith('/>')) {
      depth += 1;
    }
  }

  return -1;
}

export function findSlideRanges(html) {
  const ranges = [];
  const openingTagPattern = /<([a-z][a-z0-9-]*)\b[^>]*>/gi;
  let match;

  while ((match = openingTagPattern.exec(html))) {
    if (!hasSlideClass(match[0])) {
      continue;
    }

    const end = findMatchingClose(html, match);
    if (end === -1) {
      throw new Error('Found a .slide element without a matching closing tag');
    }

    ranges.push({
      start: match.index,
      end,
      openingTag: match[0]
    });
    openingTagPattern.lastIndex = end;
  }

  return ranges;
}

function forceActiveSlide(slideHtml) {
  return slideHtml.replace(/<([a-z][a-z0-9-]*)\b([^>]*\bclass=(["']))([^"']*)(\3[^>]*)>/i, (match, tag, beforeClass, quote, classValue, afterClass) => {
    const classes = classValue
      .split(/\s+/)
      .filter((className) => className && className !== 'prev');

    if (!classes.includes('active')) {
      classes.push('active');
    }

    return `<${tag}${beforeClass}${classes.join(' ')}${afterClass}>`;
  });
}

function replaceFirstElementText(html, tagName, text) {
  if (text === undefined) return html;

  const pattern = new RegExp(`(<${tagName}\\b[^>]*>)([\\s\\S]*?)(</${tagName}>)`, 'i');
  return html.replace(pattern, `$1${escapeHtml(text)}$3`);
}

function replaceFirstClassText(html, classNames, text) {
  if (text === undefined) return html;

  for (const className of classNames) {
    const pattern = new RegExp(`(<([a-z][a-z0-9-]*)\\b[^>]*\\bclass=(["'])[^"']*\\b${escapeRegExp(className)}\\b[^"']*\\3[^>]*>)([\\s\\S]*?)(</\\2>)`, 'i');
    if (pattern.test(html)) {
      return html.replace(pattern, `$1${escapeHtml(text)}$5`);
    }
  }

  return html;
}

function adaptFirstSlide(slideHtml, options) {
  let adapted = forceActiveSlide(slideHtml);
  adapted = replaceFirstElementText(adapted, 'h1', options.title);
  adapted = replaceFirstElementText(adapted, 'p', options.subtitle);
  adapted = replaceFirstClassText(adapted, TEXT_REPLACEMENT_CLASSES, options.kicker);
  return adapted;
}

export function createPreviewHtml(html, options = {}) {
  const ranges = findSlideRanges(html);
  if (ranges.length === 0) {
    throw new Error('template.html does not contain any .slide elements');
  }

  const firstSlide = adaptFirstSlide(html.slice(ranges[0].start, ranges[0].end), options);
  let output = html;

  for (const range of ranges.slice(1).reverse()) {
    output = output.slice(0, range.start) + output.slice(range.end);
  }

  output = output.slice(0, ranges[0].start) + firstSlide + output.slice(ranges[0].end);
  output = output
    .replace(/(<span\s+id=["']current["']\s*>)([\s\S]*?)(<\/span>)/i, (match, open, content, close) => `${open}1${close}`)
    .replace(/(<span\s+id=["']total["']\s*>)([\s\S]*?)(<\/span>)/i, (match, open, content, close) => `${open}1${close}`);

  if (options.slug) {
    const note = `<!-- Generated first-slide preview from templates/${options.slug}/template.html -->`;
    output = output.includes('</body>') ? output.replace('</body>', `  ${note}\n</body>`) : `${output}\n${note}\n`;
  }

  return output;
}

function resolveOutDir(rootDir, outDir) {
  return path.isAbsolute(outDir) ? outDir : path.join(rootDir, outDir);
}

async function resolveTemplate(rootDir, slug) {
  const templateDir = path.join(rootDir, 'templates', slug);
  const htmlPath = path.join(templateDir, 'template.html');

  if (!(await exists(htmlPath))) {
    throw new Error(`Unknown template slug "${slug}"`);
  }

  return { slug, htmlPath };
}

export async function generatePreviews(options) {
  const rootDir = path.resolve(options.rootDir || process.cwd());
  const slugs = normalizeSlugs(options.slugs || []);

  if (slugs.length === 0) {
    throw new Error('At least one template slug is required');
  }

  const templates = [];
  for (const slug of slugs) {
    templates.push(await resolveTemplate(rootDir, slug));
  }

  const outDir = resolveOutDir(rootDir, options.outDir || DEFAULT_OUT_DIR);
  await mkdir(outDir, { recursive: true });

  const previews = [];
  for (const template of templates) {
    const html = await readFile(template.htmlPath, 'utf8');
    const previewHtml = createPreviewHtml(html, {
      slug: template.slug,
      title: options.title,
      subtitle: options.subtitle,
      kicker: options.kicker
    });
    const outputPath = path.join(outDir, `${template.slug}-preview.html`);
    await writeFile(outputPath, previewHtml);
    previews.push({
      slug: template.slug,
      outputPath
    });
  }

  return previews;
}

async function main() {
  let args;
  try {
    args = parsePreviewArgs();
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
    const previews = await generatePreviews(args);
    for (const preview of previews) {
      console.log(`${preview.slug}: ${preview.outputPath}`);
    }
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

const isCli = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isCli) {
  await main();
}
