import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';

import { validateLibrary } from './validate.mjs';

function resolveSchemaRef(schema, propertySchema) {
  if (!propertySchema.$ref) return propertySchema;

  const definitionName = propertySchema.$ref.replace('#/$defs/', '');
  return schema.$defs[definitionName];
}

async function makeTemplate(root, slug, metadata = {}, slideCount = 1, options = {}) {
  const templateDir = path.join(root, 'templates', slug);
  await mkdir(templateDir, { recursive: true });
  const json = {
    slug,
    name: 'Example',
    tagline: 'Example tagline',
    mood: ['calm'],
    occasion: ['internal review'],
    tone: ['clean'],
    formality: 'medium',
    density: 'medium',
    scheme: 'light',
    palette: {
      bg: '#ffffff',
      primary: '#0000ff',
      text: '#111111',
      description: 'Minimal palette.'
    },
    typography: {
      display: 'Inter',
      body: 'Inter',
      style: 'Simple sans.'
    },
    best_for: 'Testing.',
    avoid_for: 'Production use.',
    slide_count: slideCount,
    features: {
      format: 'single-file-html',
      navigation: true
    },
    layouts: ['cover'],
    ...metadata
  };
  const slideTag = options.slideTag || 'div';
  const deckTag = options.deckTag || 'div';
  const extraCss = options.extraCss || '';
  const slides = Array.from({ length: slideCount }, (_, index) => {
    const active = index === 0 ? ' active' : '';
    return `<${slideTag} class="slide layout-cover${active}"><div class="slide-header">Header</div><h1>Slide ${index + 1}</h1></${slideTag}>`;
  }).join('\n');
  await writeFile(path.join(templateDir, 'template.json'), JSON.stringify(json, null, 2));
  await writeFile(
    path.join(templateDir, 'template.html'),
    `<style>:root{--bg:#ffffff;--primary:#0000ff;--text:#111111}body{font-family:Inter}.display{font-family:Inter}${extraCss}</style><${deckTag} class="deck">\n${slides}\n</${deckTag}>`
  );
}

test('validates a library with matching template metadata and HTML', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'slide-templates-valid-'));
  try {
    await makeTemplate(root, 'example-template', {}, 2);
    const result = await validateLibrary(root);
    assert.equal(result.ok, true);
    assert.deepEqual(result.errors, []);
    assert.equal(result.templates.length, 1);
    assert.equal(result.templates[0].slug, 'example-template');
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test('reports folder slug and slide count mismatches', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'slide-templates-invalid-'));
  try {
    await makeTemplate(root, 'folder-slug', { slug: 'json-slug', slide_count: 3 }, 2);
    const result = await validateLibrary(root);
    assert.equal(result.ok, false);
    assert.match(result.errors.join('\n'), /folder name must match template.json slug/);
    assert.match(result.errors.join('\n'), /slide_count is 3 but HTML contains 2 slides/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test('accepts semantic main and section tags for deck and slides', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'slide-templates-semantic-'));
  try {
    await makeTemplate(root, 'semantic-template', {}, 3, {
      deckTag: 'main',
      slideTag: 'section'
    });
    const result = await validateLibrary(root);
    assert.equal(result.ok, true);
    assert.equal(result.templates[0].slideCount, 3);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test('reports invalid schema values and HTML metadata drift', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'slide-templates-schema-invalid-'));
  try {
    await makeTemplate(root, 'schema-invalid', {
      formality: 'casual',
      features: ['navigation'],
      palette: {
        bg: '#ffffff',
        primary: '#ff0000',
        accent: 'brandBlue',
        text: '#111111',
        description: 'Mismatched palette.'
      },
      typography: {
        display: 'Missing Display',
        body: 'Inter',
        style: 'Simple sans.'
      },
      source_inspiration: {
        name: 'Invalid source',
        url: 'ftp://example.com/template',
        notes: 'Invalid URL scheme.'
      }
    });
    const result = await validateLibrary(root);
    assert.equal(result.ok, false);
    assert.match(result.errors.join('\n'), /"formality" must be one of/);
    assert.match(result.errors.join('\n'), /"features" must be an object/);
    assert.match(result.errors.join('\n'), /"palette.primary" value #ff0000 is not found/);
    assert.match(result.errors.join('\n'), /"palette.accent" value brandBlue must be a CSS color/);
    assert.match(result.errors.join('\n'), /"typography.display" font "Missing Display" is not found/);
    assert.match(result.errors.join('\n'), /"source_inspiration.url" must be an http\(s\) URL/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test('accepts palette colors represented as rgb or rgba in CSS', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'slide-templates-rgb-palette-'));
  try {
    await makeTemplate(root, 'rgb-template', {
      palette: {
        bg: '#ffffff',
        primary: '#5FE7E7',
        text: '#111111',
        description: 'RGB palette.'
      },
      source_inspiration: {
        name: 'Valid source',
        url: 'https://example.com/template',
        notes: 'Valid URL scheme.'
      }
    }, 1, {
      extraCss: '.accent{background:rgba(95,231,231,.2)}'
    });
    const result = await validateLibrary(root);
    assert.equal(result.ok, true);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test('schema defines optional machine-readable content limits', async () => {
  const schemaPath = path.join(process.cwd(), 'schema', 'template.schema.json');
  const schema = JSON.parse(await readFile(schemaPath, 'utf8'));
  const contentLimits = schema.properties.content_limits;

  assert.ok(contentLimits);
  assert.equal(schema.required.includes('content_limits'), false);
  assert.equal(contentLimits.type, 'object');
  assert.equal(contentLimits.additionalProperties, false);
  assert.equal(contentLimits.minProperties, 1);

  for (const field of [
    'max_title_chars',
    'max_subtitle_chars',
    'max_body_chars_per_slide',
    'recommended_slide_count_min',
    'recommended_slide_count_max'
  ]) {
    const fieldSchema = resolveSchemaRef(schema, contentLimits.properties[field]);
    assert.equal(fieldSchema.type, 'integer');
    assert.equal(fieldSchema.minimum, 1);
  }

  for (const field of ['max_bullets', 'max_cards']) {
    const fieldSchema = resolveSchemaRef(schema, contentLimits.properties[field]);
    assert.equal(fieldSchema.type, 'integer');
    assert.equal(fieldSchema.minimum, 0);
  }
});

test('reports invalid content limit values', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'slide-templates-content-limits-invalid-'));
  try {
    await makeTemplate(root, 'content-limits-invalid', {
      content_limits: {
        max_title_chars: 0,
        max_subtitle_chars: '80',
        max_body_chars_per_slide: 500.5,
        max_bullets: -1,
        max_cards: 'many',
        recommended_slide_count_min: 8,
        recommended_slide_count_max: 4,
        unknown_limit: 3
      }
    });
    const result = await validateLibrary(root);
    assert.equal(result.ok, false);
    assert.match(result.errors.join('\n'), /"content_limits.max_title_chars" must be an integer >= 1/);
    assert.match(result.errors.join('\n'), /"content_limits.max_subtitle_chars" must be an integer >= 1/);
    assert.match(result.errors.join('\n'), /"content_limits.max_body_chars_per_slide" must be an integer >= 1/);
    assert.match(result.errors.join('\n'), /"content_limits.max_bullets" must be an integer >= 0/);
    assert.match(result.errors.join('\n'), /"content_limits.max_cards" must be an integer >= 0/);
    assert.match(result.errors.join('\n'), /"content_limits.unknown_limit" is not allowed/);
    assert.match(result.errors.join('\n'), /"content_limits.recommended_slide_count_max" must be >= "content_limits.recommended_slide_count_min"/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
