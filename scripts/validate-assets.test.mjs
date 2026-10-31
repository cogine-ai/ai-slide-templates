import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { embeddedImages, validateAssetManifest, validateAssets } from './validate-assets.mjs';

const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+a3xkAAAAASUVORK5CYII=', 'base64');
const uri = `data:image/png;base64,${png.toString('base64')}`;
const digest = (x) => createHash('sha256').update(x).digest('hex');
const design = { status: 'cleared', creator: 'Project author', licenseId: 'MIT', licenseUrl: 'https://opensource.org/license/mit', statement: 'Original project design.' };
const photo = { id: 'photo', sha256: digest(png), status: 'cleared', creator: 'Photo author', licenseId: 'LicenseRef-Pexels', licenseUrl: 'https://www.pexels.com/license/', sourceUrl: 'https://www.pexels.com/photo/a-photo-123/', downloadUrl: 'https://images.pexels.com/photos/123/example.jpg', reviewedAt: '2026-11-01', modifications: 'CSS crop in a combined creative template.' };
const manifest = () => ({ schemaVersion: 1, template: 'demo', design: { ...design }, assets: [{ ...photo }] });
const check = (m = manifest(), html = `<img src="${uri}">`) => validateAssetManifest({ slug: 'demo', html, manifest: m });

test('asset provenance covers actual image payloads and repeated uses', () => {
  const result = check(manifest(), `<img src="${uri}"><img src='${uri}'>`);
  assert.equal(result.ok, true);
  assert.equal(result.images, 1);
  assert.equal(result.imageUses, 2);
});
test('unmapped changed image bytes are rejected', () => {
  assert.equal(check(manifest(), `<img src="data:image/png;base64,${Buffer.from('different').toString('base64')}">`).ok, false);
});
test('pending design or asset provenance cannot pass', () => {
  const m = manifest(); m.assets[0].status = 'pending';
  assert.equal(check(m).ok, false);
  m.assets[0].status = 'cleared'; m.design.status = 'pending';
  assert.equal(check(m).ok, false);
});
test('third-party records require individual sources, authors and licence information', () => {
  for (const field of ['sourceUrl', 'creator', 'licenseUrl', 'reviewedAt', 'downloadUrl', 'modifications']) {
    const m = manifest(); delete m.assets[0][field]; assert.equal(check(m).ok, false, field);
  }
});
test('CC BY adaptations require source attribution', () => {
  const m = manifest(); m.design.licenseId = 'CC-BY-4.0';
  assert.equal(check(m).ok, false);
  m.design.sourceUrl = 'https://example.com/source'; m.design.attribution = 'Source by its author; adapted with changes.';
  m.design.licenseUrl = 'https://creativecommons.org/licenses/by/4.0/';
  assert.equal(check(m).ok, true);
  m.design.sourceUrl = 'not-a-url'; assert.equal(check(m).ok, false);
});
test('wrapping an unrecorded raster in an original SVG does not hide it', () => {
  const svg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg"><image href="${uri}"/></svg>`);
  const m = manifest(); m.assets = [{ id: 'svg', sha256: digest(svg), status: 'cleared', creator: 'Project author', licenseId: 'MIT', licenseUrl: 'https://opensource.org/license/mit', authorship: 'Project vector.' }];
  const html = `<img src="data:image/svg+xml;base64,${svg.toString('base64')}">`;
  assert.equal(check(m, html).ok, false);
  m.assets.push({ ...photo }); assert.equal(check(m, html).ok, true);
});
test('CSS background and percent-encoded SVG assets are covered', () => {
  const svg = '<svg xmlns="http://www.w3.org/2000/svg"><circle r="1"/></svg>';
  const result = embeddedImages(`<style>.x{background:url("${uri}")}</style><img src="data:image/svg+xml,${encodeURIComponent(svg)}">`);
  assert.equal(result.errors.length, 0); assert.equal(result.assets.length, 2);
});
test('remote image dependencies are rejected', () => {
  assert.equal(check(manifest(), '<img src="https://example.com/photo.jpg">').ok, false);
  assert.equal(check(manifest(), '<img data-slot="empty-photo">').ok, false);
});
test('CSS dependencies cannot bypass the image register', () => {
  for (const source of ['https://example.com/photo.jpg', '../uncredited.jpg']) {
    const m = manifest(); m.assets = [];
    assert.equal(check(m, `<div style="background-image:url('${source}')"></div>`).ok, false);
  }
  assert.deepEqual(embeddedImages('<style>@font-face{src:url(data:font/woff2;base64,AA==)}.x{clip-path:url(#clip)}</style>').errors, []);
});
test('unparseable quoted CSS URLs fail closed', () => {
  const m = manifest(); m.assets = [];
  for (const css of [
    `background:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><circle r="1"/></svg>')`,
    'background:url("https://example.com/a b.jpg")'
  ]) {
    const result = check(m, `<style>.x{${css}}</style>`);
    assert.equal(result.ok, false);
    assert.ok(result.errors.some(x => x.includes('unparseable')));
  }
});
test('responsive image candidates cannot silently skip provenance checks', () => {
  for (const html of [`<img src="${uri}" srcset="https://example.com/large.jpg 2x">`, '<picture><source srcset="https://example.com/photo.jpg"></picture>']) {
    assert.equal(check(manifest(), html).ok, false);
  }
});
test('photo download IDs and safe licence URLs must match their records', () => {
  const m = manifest(); m.assets[0].downloadUrl = 'https://images.pexels.com/photos/999/example.jpg';
  assert.equal(check(m).ok, false);
  m.assets[0] = { ...photo, licenseUrl: 'javascript:alert(1)' };
  assert.equal(check(m).ok, false);
  m.assets[0] = { ...photo, licenseId: 'CC-BY-4.0', sourceUrl: 'not-a-url', attribution: 'Source author.' };
  assert.equal(check(m).ok, false);
});
test('a declared or explicitly selected manifest cannot silently disappear', async () => {
  const rootDir = await mkdtemp(path.join(os.tmpdir(), 'asset-manifest-'));
  try {
    const folder = path.join(rootDir, 'templates/demo'); await mkdir(folder, { recursive: true });
    await writeFile(path.join(folder, 'template.json'), JSON.stringify({ features: { asset_license_manifest: true } }));
    await writeFile(path.join(folder, 'template.html'), `<img src="${uri}">`);
    assert.equal((await validateAssets({ rootDir })).ok, false);
    await writeFile(path.join(folder, 'template.json'), JSON.stringify({ features: {} }));
    const legacy = await validateAssets({ rootDir }); assert.equal(legacy.results.length, 0); assert.deepEqual(legacy.unassessed, ['demo']);
    assert.equal((await validateAssets({ rootDir, templates: ['demo'] })).ok, false);
  } finally { await rm(rootDir, { recursive: true, force: true }); }
});
