import assert from 'node:assert/strict';
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';

import { parseScreenshotArgs, resolveScreenshotTarget } from './screenshot.mjs';

test('resolves a template slug to its HTML file and default screenshot output', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'slide-screenshot-slug-'));
  try {
    await mkdir(path.join(root, 'templates', 'airy-modern'), { recursive: true });
    await writeFile(path.join(root, 'templates', 'airy-modern', 'template.html'), '<html></html>');

    const target = await resolveScreenshotTarget({
      rootDir: root,
      input: 'airy-modern'
    });

    assert.equal(target.label, 'airy-modern');
    assert.equal(target.inputPath, path.join(root, 'templates', 'airy-modern', 'template.html'));
    assert.equal(target.outputPath, path.join(root, 'previews', 'screenshots', 'airy-modern.png'));
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test('resolves a preview HTML path to a matching screenshot filename', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'slide-screenshot-preview-'));
  try {
    const previewPath = path.join(root, 'previews', 'airy-modern-preview.html');
    await mkdir(path.dirname(previewPath), { recursive: true });
    await writeFile(previewPath, '<html></html>');

    const target = await resolveScreenshotTarget({
      rootDir: root,
      input: previewPath
    });

    assert.equal(target.label, 'airy-modern-preview');
    assert.equal(target.inputPath, previewPath);
    assert.equal(target.outputPath, path.join(root, 'previews', 'screenshots', 'airy-modern-preview.png'));
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test('parses screenshot input, dimensions, and explicit output path', () => {
  const parsed = parseScreenshotArgs([
    '--width',
    '1440',
    '--height',
    '900',
    '--out',
    'tmp/shot.png',
    'previews/airy-modern-preview.html'
  ]);

  assert.equal(parsed.width, 1440);
  assert.equal(parsed.height, 900);
  assert.equal(parsed.out, 'tmp/shot.png');
  assert.equal(parsed.input, 'previews/airy-modern-preview.html');
});
