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

const ARRAY_FIELDS = ['mood', 'occasion', 'tone', 'layouts'];
const ENUMS = {
  formality: ['low', 'medium-low', 'medium', 'medium-high', 'high'],
  density: ['low', 'medium-low', 'medium', 'medium-high', 'high'],
  scheme: ['light', 'dark', 'mixed']
};
const BOOLEAN_FEATURES = [
  'navigation',
  'keyboard_navigation',
  'touch_navigation',
  'progress_bar',
  'slide_counter'
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

function isObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function normalizeCss(source) {
  return source.toLowerCase().replace(/\s+/g, '');
}

function parseHexColor(value) {
  const match = value.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (!match) return null;

  const hex = match[1].length === 3
    ? match[1].split('').map((char) => char + char).join('')
    : match[1];

  return {
    r: Number.parseInt(hex.slice(0, 2), 16),
    g: Number.parseInt(hex.slice(2, 4), 16),
    b: Number.parseInt(hex.slice(4, 6), 16)
  };
}

function cssContainsColor(html, color) {
  const normalizedHtml = normalizeCss(html);
  const normalizedColor = normalizeCss(color);

  if (normalizedHtml.includes(normalizedColor)) {
    return true;
  }

  const rgb = parseHexColor(color);
  if (!rgb) {
    return false;
  }

  return normalizedHtml.includes(`rgb(${rgb.r},${rgb.g},${rgb.b}`) ||
    normalizedHtml.includes(`rgba(${rgb.r},${rgb.g},${rgb.b},`);
}

function isCssColorValue(value) {
  return /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value) || /^rgba?\(/i.test(value);
}

function htmlContainsTextToken(html, token) {
  const lowerHtml = html.toLowerCase();
  const lowerToken = token.toLowerCase();
  const urlToken = lowerToken.replace(/\s+/g, '+');
  const percentToken = lowerToken.replace(/\s+/g, '%20');

  return lowerHtml.includes(lowerToken) || lowerHtml.includes(urlToken) || lowerHtml.includes(percentToken);
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

  for (const field of ARRAY_FIELDS) {
    if (field in metadata && !Array.isArray(metadata[field])) {
      errors.push(`${slug}: "${field}" must be an array`);
      continue;
    }

    if (Array.isArray(metadata[field])) {
      if (metadata[field].length === 0) {
        errors.push(`${slug}: "${field}" must contain at least one item`);
      }

      for (const [index, value] of metadata[field].entries()) {
        if (typeof value !== 'string' || value.trim() === '') {
          errors.push(`${slug}: "${field}" item ${index + 1} must be a non-empty string`);
        }
      }
    }
  }

  for (const [field, allowedValues] of Object.entries(ENUMS)) {
    if (field in metadata && !allowedValues.includes(metadata[field])) {
      errors.push(`${slug}: "${field}" must be one of ${allowedValues.join(', ')}`);
    }
  }

  if ('slide_count' in metadata && (!Number.isInteger(metadata.slide_count) || metadata.slide_count < 1)) {
    errors.push(`${slug}: "slide_count" must be a positive integer`);
  }
}

function validatePalette(slug, metadata, html, errors) {
  if (!('palette' in metadata)) return;

  if (!isObject(metadata.palette)) {
    errors.push(`${slug}: "palette" must be an object`);
    return;
  }

  if (typeof metadata.palette.description !== 'string' || metadata.palette.description.trim() === '') {
    errors.push(`${slug}: "palette.description" must be a non-empty string`);
  }

  for (const [key, value] of Object.entries(metadata.palette)) {
    if (typeof value !== 'string' || value.trim() === '') {
      errors.push(`${slug}: "palette.${key}" must be a non-empty string`);
      continue;
    }

    if (key === 'description') {
      continue;
    }

    if (!isCssColorValue(value)) {
      errors.push(`${slug}: "palette.${key}" value ${value} must be a CSS color`);
      continue;
    }

    if (!cssContainsColor(html, value)) {
      errors.push(`${slug}: "palette.${key}" value ${value} is not found in template.html`);
    }
  }
}

function validateTypography(slug, metadata, html, errors) {
  if (!('typography' in metadata)) return;

  if (!isObject(metadata.typography)) {
    errors.push(`${slug}: "typography" must be an object`);
    return;
  }

  for (const field of ['display', 'body', 'style']) {
    if (typeof metadata.typography[field] !== 'string' || metadata.typography[field].trim() === '') {
      errors.push(`${slug}: "typography.${field}" must be a non-empty string`);
    }
  }

  for (const field of ['display', 'body']) {
    const font = metadata.typography[field];
    if (typeof font === 'string' && font.trim() !== '' && !htmlContainsTextToken(html, font)) {
      errors.push(`${slug}: "typography.${field}" font "${font}" is not found in template.html`);
    }
  }
}

function validateFeatures(slug, metadata, errors) {
  if (!('features' in metadata)) return;

  if (!isObject(metadata.features)) {
    errors.push(`${slug}: "features" must be an object`);
    return;
  }

  if (metadata.features.format !== 'single-file-html') {
    errors.push(`${slug}: "features.format" must be "single-file-html"`);
  }

  for (const field of BOOLEAN_FEATURES) {
    if (field in metadata.features && typeof metadata.features[field] !== 'boolean') {
      errors.push(`${slug}: "features.${field}" must be a boolean`);
    }
  }
}

function validateSourceInspiration(slug, metadata, errors) {
  if (!('source_inspiration' in metadata)) return;

  if (!isObject(metadata.source_inspiration)) {
    errors.push(`${slug}: "source_inspiration" must be an object`);
    return;
  }

  for (const field of ['name', 'url', 'notes']) {
    if (typeof metadata.source_inspiration[field] !== 'string' || metadata.source_inspiration[field].trim() === '') {
      errors.push(`${slug}: "source_inspiration.${field}" must be a non-empty string`);
    }
  }

  if (typeof metadata.source_inspiration.url === 'string' && !/^https?:\/\//.test(metadata.source_inspiration.url)) {
    errors.push(`${slug}: "source_inspiration.url" must be an http(s) URL`);
  }
}

function validateLayoutSlots(slug, metadata, errors) {
  if (!('layout_slots' in metadata)) return;

  if (!isObject(metadata.layout_slots)) {
    errors.push(`${slug}: "layout_slots" must be an object mapping layout names to slot lists`);
    return;
  }

  const layouts = Array.isArray(metadata.layouts)
    ? metadata.layouts.filter((layout) => typeof layout === 'string' && layout.trim() !== '')
    : [];
  const declaredLayouts = new Set(layouts);
  const missingLayouts = layouts.filter((layout) => !Object.prototype.hasOwnProperty.call(metadata.layout_slots, layout));

  if (missingLayouts.length > 0) {
    errors.push(`${slug}: "layout_slots" must describe every declared layout (missing: ${missingLayouts.join(', ')})`);
  }

  const allowedSlotFields = new Set(['name', 'type', 'required', 'repeatable', 'description']);

  for (const [layout, slots] of Object.entries(metadata.layout_slots)) {
    if (!declaredLayouts.has(layout)) {
      errors.push(`${slug}: "layout_slots.${layout}" does not match a declared layout`);
    }

    if (!Array.isArray(slots) || slots.length === 0) {
      errors.push(`${slug}: "layout_slots.${layout}" must be a non-empty array`);
      continue;
    }

    for (const [index, slot] of slots.entries()) {
      const slotNumber = index + 1;

      if (typeof slot === 'string') {
        if (slot.trim() === '') {
          errors.push(`${slug}: "layout_slots.${layout}" item ${slotNumber} must be a non-empty string or slot object`);
        }
        continue;
      }

      if (!isObject(slot)) {
        errors.push(`${slug}: "layout_slots.${layout}" item ${slotNumber} must be a non-empty string or slot object`);
        continue;
      }

      if (typeof slot.name !== 'string' || slot.name.trim() === '') {
        errors.push(`${slug}: "layout_slots.${layout}" item ${slotNumber} name must be a non-empty string`);
      }

      for (const key of Object.keys(slot)) {
        if (!allowedSlotFields.has(key)) {
          errors.push(`${slug}: "layout_slots.${layout}" item ${slotNumber} has unsupported property "${key}"`);
        }
      }

      for (const field of ['type', 'description']) {
        if (field in slot && (typeof slot[field] !== 'string' || slot[field].trim() === '')) {
          errors.push(`${slug}: "layout_slots.${layout}" item ${slotNumber} ${field} must be a non-empty string`);
        }
      }

      for (const field of ['required', 'repeatable']) {
        if (field in slot && typeof slot[field] !== 'boolean') {
          errors.push(`${slug}: "layout_slots.${layout}" item ${slotNumber} ${field} must be a boolean`);
        }
      }
    }
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

    validatePalette(slug, metadata, html, errors);
    validateTypography(slug, metadata, html, errors);
    validateFeatures(slug, metadata, errors);
    validateSourceInspiration(slug, metadata, errors);
    validateLayoutSlots(slug, metadata, errors);

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
