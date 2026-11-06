import assert from 'node:assert/strict';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';

import { createPreviewHtml, findSlideRanges, generatePreviews, parsePreviewArgs } from './preview.mjs';

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

test('explicit preview targets preserve unrelated cover text and order composed titles', () => {
  const html = `<section class="slide active">
    <h1>Unrelated heading</h1><p>Presented by</p>
    <p data-preview-title="1">Middle</p>
    <p data-preview-title="0">Top</p>
    <p data-preview-title="2">Bottom</p>
    <span data-preview-subtitle>Old description</span>
    <span data-preview-kicker>Old label</span>
    <p data-preview-title-extra>Leave this alone</p>
  </section><section class="slide">Second slide</section>`;
  const preview = createPreviewHtml(html, {
    title: 'Actual Launch Plan', subtitle: 'A < B & "$&"', kicker: 'Preview $1'
  });
  assert.match(preview, /<h1>Unrelated heading<\/h1><p>Presented by<\/p>/);
  assert.match(preview, /data-preview-title="0">Actual<\/p>/);
  assert.match(preview, /data-preview-title="1">Launch<\/p>/);
  assert.match(preview, /data-preview-title="2">Plan<\/p>/);
  assert.match(preview, /data-preview-subtitle>A &lt; B &amp; &quot;\$&amp;&quot;<\/span>/);
  assert.match(preview, /data-preview-kicker>Preview \$1<\/span>/);
  assert.match(preview, /data-preview-title-extra>Leave this alone<\/p>/);
  assert.doesNotMatch(preview, /Second slide/);
});

test('composed preview titles respect explicit line breaks and clear unused lines', () => {
  const html = '<section class="slide"><p data-preview-title="0">One</p><p data-preview-title="1">Two</p><p data-preview-title="2">Three</p></section>';
  const preview = createPreviewHtml(html, { title: 'Product strategy\nNext year' });
  assert.match(preview, /data-preview-title="0">Product strategy<\/p>/);
  assert.match(preview, /data-preview-title="1">Next year<\/p>/);
  assert.match(preview, /data-preview-title="2"><\/p>/);
});

test('legacy preview replacements keep dollar sequences literal and escape HTML', () => {
  const preview = createPreviewHtml('<section class="slide"><h1>Old</h1><p>Old</p><span class="kicker">Old</span></section>', {
    title: '$& <title>', subtitle: '$1 & subtitle', kicker: '$& <label>'
  });
  assert.match(preview, /<h1>\$&amp; &lt;title&gt;<\/h1>/);
  assert.match(preview, /<p>\$1 &amp; subtitle<\/p>/);
  assert.match(preview, /<span class="kicker">\$&amp; &lt;label&gt;<\/span>/);
});

test('explicit covers leave absent optional roles alone, including subtitle-only previews', () => {
  const html = '<section class="slide"><p data-preview-title="0">Original title</p><p>Contact details</p><span class="kicker">Brand label</span></section>';
  for (const options of [
    { title: 'Shared Progress', subtitle: 'Candidate direction', kicker: 'Review 2026' },
    { subtitle: 'Candidate direction', kicker: 'Review 2026' }
  ]) {
    const preview = createPreviewHtml(html, options);
    assert.ok(preview.includes(`data-preview-title="0">${options.title || 'Original title'}<`));
    assert.match(preview, /<p>Contact details<\/p>/);
    assert.match(preview, /class="kicker">Brand label</);
    assert.doesNotMatch(preview, /Candidate direction|Review 2026/);
  }
});

test('chrome trend report supports its two-line title and subtitle without changing artwork for a kicker', async () => {
  const original = await readFile(new URL('../templates/chrome-trend-report/template.html', import.meta.url), 'utf8');
  const preview = createPreviewHtml(original, {
    title: 'Shared Progress', subtitle: 'Candidate direction', kicker: 'Review 2026'
  });
  const ranges = findSlideRanges(preview);
  assert.equal(ranges.length, 1);
  const cover = preview.slice(ranges[0].start, ranges[0].end);
  assert.match(cover, /data-preview-title="0">Shared</);
  assert.match(cover, /data-preview-title="1">Progress</);
  assert.match(cover, /data-preview-subtitle>Candidate direction</);
  assert.match(cover, /data-title="Shared Progress"/);
  assert.doesNotMatch(cover, /Review 2026/);
});

for (const [slug, titleFrames, optionalSlots, retainedLabel] of [
  ['vacanza-postcard', 1, false, 'AIR MAIL'],
  ['ux-strategy-workshop', 1, false, null],
  ['brand-voice-guidelines', 1, true, 'hello@commonground.example'],
  ['software-launch-blue', 1, true, 'Clarity'],
  ['indie-publishing-editorial', 2, true, 'Open Editions'],
  ['sports-partnership-proposal', 2, true, 'pace.example']
]) {
  test(`${slug} previews replace the entire title without overwriting other cover slots`, async () => {
    const original = await readFile(new URL(`../templates/${slug}/template.html`, import.meta.url), 'utf8');
    const preview = createPreviewHtml(original, {
      title: 'Shared Progress', subtitle: 'Candidate direction', kicker: 'Review 2026'
    });
    const ranges = findSlideRanges(preview);
    assert.equal(ranges.length, 1);
    const cover = preview.slice(ranges[0].start, ranges[0].end);
    assert.match(cover, /data-title="Shared Progress"/);
    assert.match(cover, /aria-label="1\. Shared Progress"/);
    const targets = [...cover.matchAll(/data-preview-title="\d+">([^<]*)</g)];
    assert.equal(targets.length, titleFrames);
    assert.equal(targets.map(match => match[1]).join(' '), 'Shared Progress');
    if (optionalSlots) {
      assert.match(cover, /data-preview-subtitle>Candidate direction</);
      assert.match(cover, /data-preview-kicker>Review 2026</);
    } else {
      assert.doesNotMatch(cover, /Candidate direction|Review 2026/);
    }
    if (retainedLabel) assert.ok(cover.includes(retainedLabel));
  });
}

for (const [slug, titleParts] of [
  ['forest-editorial', ['AI Platform Review']],
  ['wide-design-portfolio', ['AI', 'Platform', 'Review']],
  ['sage-creative-agency', ['AI Platform Review']]
]) {
  test(`${slug} exposes working preview targets without replacing other cover labels`, async () => {
    const original = await readFile(new URL(`../templates/${slug}/template.html`, import.meta.url), 'utf8');
    const preview = createPreviewHtml(original, {
      title: 'AI Platform Review', subtitle: 'Candidate direction', kicker: 'Preview'
    });
    const ranges = findSlideRanges(preview);
    assert.equal(ranges.length, 1);
    const cover = preview.slice(ranges[0].start, ranges[0].end);
    for (const [index, text] of titleParts.entries()) {
      assert.match(cover, new RegExp(`data-preview-title="${index}">${text}<`));
    }
    assert.match(cover, /data-preview-subtitle>Candidate direction</);
    assert.match(cover, /data-preview-kicker>Preview</);
    if (slug === 'forest-editorial') assert.match(cover, />Company Name</);
    if (slug === 'sage-creative-agency') assert.match(cover, />November 2024</);
  });
}
