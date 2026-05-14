import assert from 'node:assert/strict';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';

import { generatePreviews, parsePreviewArgs } from './preview.mjs';

async function makeTemplate(root, slug) {
  const templateDir = path.join(root, 'templates', slug);
  await mkdir(templateDir, { recursive: true });
  await writeFile(
    path.join(templateDir, 'template.json'),
    JSON.stringify({ slug, name: slug }, null, 2)
  );
  await writeFile(
    path.join(templateDir, 'template.html'),
    `<!DOCTYPE html>
<html>
<head>
  <title>${slug}</title>
  <style>
    html,body{width:100%;height:100%;overflow:hidden}
    .deck{width:100vw;height:100vh}
    .slide{position:absolute;inset:0;opacity:0}
    .slide.active{opacity:1}
  </style>
</head>
<body>
  <main class="deck">
    <section class="slide active"><span class="kicker">Old kicker</span><h1>Old title</h1><p>Old subtitle</p></section>
    <section class="slide"><h1>Second slide</h1><p>Should not appear.</p></section>
  </main>
  <div class="slide-counter"><span id="current">1</span> / <span id="total">2</span></div>
</body>
</html>`
  );
}

test('generates first-slide previews for multiple template slugs', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'slide-preview-multiple-'));
  try {
    await makeTemplate(root, 'alpha');
    await makeTemplate(root, 'beta');

    const result = await generatePreviews({
      rootDir: root,
      slugs: ['alpha', 'beta'],
      outDir: path.join(root, 'previews'),
      title: 'Actual Launch Plan',
      subtitle: 'Candidate visual direction for the real deck.',
      kicker: 'Preview / 2026'
    });

    assert.equal(result.length, 2);
    assert.deepEqual(result.map((preview) => preview.slug), ['alpha', 'beta']);

    const alphaPreview = await readFile(result[0].outputPath, 'utf8');
    assert.match(alphaPreview, /Actual Launch Plan/);
    assert.match(alphaPreview, /Candidate visual direction/);
    assert.match(alphaPreview, /Preview \/ 2026/);
    assert.doesNotMatch(alphaPreview, /Second slide/);
    assert.match(alphaPreview, /<span id="total">1<\/span>/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test('reports an unknown template slug before writing previews', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'slide-preview-missing-'));
  try {
    await assert.rejects(
      generatePreviews({
        rootDir: root,
        slugs: ['missing-template'],
        outDir: path.join(root, 'previews')
      }),
      /Unknown template slug "missing-template"/
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test('parses comma-separated and positional preview slugs', () => {
  const parsed = parsePreviewArgs([
    '--out-dir',
    'tmp/previews',
    '--title',
    'Quarterly Review',
    '--subtitle',
    'Candidate covers',
    'airy-modern,b2b-sales-pitch',
    'midnight-executive'
  ]);

  assert.equal(parsed.outDir, 'tmp/previews');
  assert.equal(parsed.title, 'Quarterly Review');
  assert.equal(parsed.subtitle, 'Candidate covers');
  assert.deepEqual(parsed.slugs, ['airy-modern', 'b2b-sales-pitch', 'midnight-executive']);
});
