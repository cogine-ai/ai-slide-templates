import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REQUIRED_FIELDS = [
  'slug',
  'name',
  'tagline',
  'mood',
  'occasion',
  'tone',
  'formality',
  'density',
  'scheme',
  'palette',
  'typography',
  'best_for',
  'avoid_for',
  'slide_count',
  'features',
  'layouts'
];

function countSlides(html) {
  return [...html.matchAll(/<([a-z][a-z0-9-]*)\b[^>]*class=["']([^"']+)["'][^>]*>/gi)]
    .filter((match) => match[2].split(/\s+/).includes('slide'))
    .length;
}

function hasClass(html, className) {
  return [...html.matchAll(/<([a-z][a-z0-9-]*)\b[^>]*class=["']([^"']+)["'][^>]*>/gi)]
    .some((match) => match[2].split(/\s+/).includes(className));
}

async function exists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

async function readJson(filePath) {
  const source = await readFile(filePath, 'utf8');
  return JSON.parse(source);
}

function validateRequiredFields(slug, metadata, errors) {
  for (const field of REQUIRED_FIELDS) {
    if (!(field in metadata)) {
      errors.push(`${slug}: missing required field "${field}"`);
    }
  }

  for (const field of ['mood', 'occasion', 'tone', 'layouts']) {
    if (field in metadata && !Array.isArray(metadata[field])) {
      errors.push(`${slug}: "${field}" must be an array`);
    }
  }

  if ('slide_count' in metadata && (!Number.isInteger(metadata.slide_count) || metadata.slide_count < 1)) {
    errors.push(`${slug}: "slide_count" must be a positive integer`);
  }
}

export async function validateLibrary(rootDir = process.cwd()) {
  const templatesDir = path.join(rootDir, 'templates');
  const errors = [];
  const templates = [];

  if (!(await exists(templatesDir))) {
    return {
      ok: false,
      errors: [`missing templates directory: ${templatesDir}`],
      templates
    };
  }

  const entries = await readdir(templatesDir, { withFileTypes: true });
  const dirs = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();

  if (dirs.length === 0) {
    errors.push('templates directory must contain at least one template folder');
  }

  for (const dirName of dirs) {
    const templateDir = path.join(templatesDir, dirName);
    const jsonPath = path.join(templateDir, 'template.json');
    const htmlPath = path.join(templateDir, 'template.html');

    if (!(await exists(jsonPath))) {
      errors.push(`${dirName}: missing template.json`);
      continue;
    }

    if (!(await exists(htmlPath))) {
      errors.push(`${dirName}: missing template.html`);
      continue;
    }

    let metadata;
    try {
      metadata = await readJson(jsonPath);
    } catch (error) {
      errors.push(`${dirName}: template.json is not valid JSON (${error.message})`);
      continue;
    }

    const slug = metadata.slug || dirName;
    validateRequiredFields(slug, metadata, errors);

    if (metadata.slug !== dirName) {
      errors.push(`${dirName}: folder name must match template.json slug "${metadata.slug}"`);
    }

    const html = await readFile(htmlPath, 'utf8');
    const slideCount = countSlides(html);

    if (!hasClass(html, 'deck')) {
      errors.push(`${dirName}: template.html must include a .deck container`);
    }

    if (metadata.slide_count !== slideCount) {
      errors.push(`${dirName}: slide_count is ${metadata.slide_count} but HTML contains ${slideCount} slides`);
    }

    templates.push({
      slug: metadata.slug,
      name: metadata.name,
      slideCount
    });
  }

  return {
    ok: errors.length === 0,
    errors,
    templates
  };
}

async function main() {
  const rootDir = process.argv[2] ? path.resolve(process.argv[2]) : process.cwd();
  const result = await validateLibrary(rootDir);

  if (result.ok) {
    console.log(`Validated ${result.templates.length} template(s).`);
    for (const template of result.templates) {
      console.log(`- ${template.slug}: ${template.slideCount} slide(s)`);
    }
    return;
  }

  console.error(`Validation failed with ${result.errors.length} error(s):`);
  for (const error of result.errors) {
    console.error(`- ${error}`);
  }
  process.exitCode = 1;
}

const isCli = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isCli) {
  await main();
}
