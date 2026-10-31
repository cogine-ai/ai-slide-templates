import { createHash } from 'node:crypto';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const hash = (bytes) => createHash('sha256').update(bytes).digest('hex');
const nonempty = (value) => typeof value === 'string' && value.trim().length > 0;
const httpsUrl = (value) => {
  try { return new URL(value).protocol === 'https:'; } catch { return false; }
};

function decodeImage(uri) {
  const match = uri.match(/^data:(image\/[a-z0-9.+-]+)((?:;[^,]*)?),(.*)$/is);
  if (!match) throw new Error('Image must use an embedded image data URI.');
  return {
    mime: match[1].toLowerCase(),
    bytes: /;base64(?:;|$)/i.test(match[2])
      ? Buffer.from(match[3], 'base64')
      : Buffer.from(decodeURIComponent(match[3]), 'utf8')
  };
}

// Inspect actual renderable image references, including images nested in SVGs.
// This is provenance-record coverage, not a legal opinion about a licence grant.
export function embeddedImages(html) {
  const assets = new Map();
  const errors = [];
  const visitedSvg = new Set();
  function visit(markup) {
    const references = [];
    for (const tag of markup.matchAll(/<(?:img|image)\b[^>]*>/gi)) {
      const attribute = tag[0].match(/\s(?:src|(?:xlink:)?href)\s*=\s*(["'])(.*?)\1/is);
      if (attribute) references.push(attribute[2]);
      else errors.push('Image element has no embedded source.');
    }
    // Responsive candidates need their own payload mapping; do not silently skip them.
    if (/<(?:img|source)\b[^>]*\ssrcset\s*=/i.test(markup)) {
      errors.push('Responsive srcset images are not supported by this register; use individually recorded src images.');
    }
    let handledUrls = 0;
    for (const match of markup.matchAll(/url\(\s*(["']?)([^\s)"']+)\1\s*\)/gi)) {
      handledUrls += 1;
      const uri = match[2];
      if (uri.startsWith('#') || /^data:(?:font\/|application\/(?:font-|x-font-|vnd\.ms-fontobject))/i.test(uri)) continue;
      if (/^data:image\//i.test(uri)) references.push(uri);
      else if (!/^data:/i.test(uri)) errors.push('CSS URL has a non-embedded dependency.');
    }
    if ((markup.match(/\burl\(/gi) || []).length > handledUrls) {
      errors.push('CSS url() has an unparseable form; encode the value or use a recorded src image.');
    }
    for (const uri of references) {
      if (uri.startsWith('#')) continue;
      try {
        const image = decodeImage(uri);
        const sha256 = hash(image.bytes);
        const entry = assets.get(sha256) || { sha256, mime: image.mime, uses: 0 };
        entry.uses += 1;
        assets.set(sha256, entry);
        if (image.mime === 'image/svg+xml' && !visitedSvg.has(sha256)) {
          visitedSvg.add(sha256);
          visit(image.bytes.toString('utf8'));
        }
      } catch (error) {
        errors.push(error.message);
      }
    }
  }
  visit(html);
  return { assets: [...assets.values()], errors };
}

export function validateAssetManifest({ slug, html, manifest }) {
  const errors = [];
  const media = embeddedImages(html);
  errors.push(...media.errors);
  if (manifest?.schemaVersion !== 1) errors.push('Asset manifest schemaVersion must be 1.');
  if (manifest?.template !== slug) errors.push('Asset manifest template must match its folder.');
  const design = manifest?.design;
  if (design?.status !== 'cleared') errors.push('Design provenance must have status cleared.');
  if (!nonempty(design?.creator)) errors.push('Design provenance needs a creator.');
  if (!nonempty(design?.statement)) errors.push('Design provenance needs an authorship/adaptation statement.');
  if (!['MIT', 'CC-BY-4.0'].includes(design?.licenseId)) errors.push('Design provenance needs a supported licence.');
  if (!httpsUrl(design?.licenseUrl)) errors.push('Design provenance needs an HTTPS licence URL.');
  if (design?.licenseId === 'CC-BY-4.0' && (!httpsUrl(design.sourceUrl) || !nonempty(design.attribution))) {
    errors.push('CC BY design adaptations need a source URL and attribution.');
  }
  const entries = Array.isArray(manifest?.assets) ? manifest.assets : [];
  if (!Array.isArray(manifest?.assets)) errors.push('Asset manifest assets must be an array.');
  const byHash = new Map();
  for (const entry of entries) {
    const label = entry.id || entry.sha256 || 'unnamed asset';
    if (!/^[a-f0-9]{64}$/.test(entry.sha256 || '')) errors.push(`${label}: invalid SHA-256.`);
    if (byHash.has(entry.sha256)) errors.push(`${label}: duplicate asset hash.`);
    byHash.set(entry.sha256, entry);
    if (entry.status !== 'cleared') errors.push(`${label}: asset provenance must have status cleared.`);
    if (!nonempty(entry.creator)) errors.push(`${label}: creator is required.`);
    if (!['MIT', 'CC-BY-4.0', 'CC0-1.0', 'LicenseRef-Pexels'].includes(entry.licenseId)) {
      errors.push(`${label}: unsupported or missing licence.`);
    }
    if (!httpsUrl(entry.licenseUrl)) errors.push(`${label}: an HTTPS licence URL is required.`);
    if (entry.licenseId === 'MIT' && !nonempty(entry.authorship)) errors.push(`${label}: original assets need an authorship statement.`);
    if (entry.licenseId !== 'MIT' && (!httpsUrl(entry.sourceUrl) || !nonempty(entry.reviewedAt))) {
      errors.push(`${label}: third-party assets need a source URL and review date.`);
    }
    if (entry.licenseId === 'CC-BY-4.0' && !nonempty(entry.attribution)) errors.push(`${label}: CC BY attribution is required.`);
    if (entry.licenseId === 'LicenseRef-Pexels') {
      const photo = (entry.sourceUrl || '').match(/^https:\/\/www\.pexels\.com\/photo\/(?:[^/]+-)?(\d+)\/?$/);
      if (!photo) {
        errors.push(`${label}: Pexels source must identify an individual photo page.`);
      }
      if (entry.licenseUrl !== 'https://www.pexels.com/license/') errors.push(`${label}: incorrect Pexels licence URL.`);
      if (!nonempty(entry.downloadUrl) || !nonempty(entry.modifications)) errors.push(`${label}: download URL and modifications are required.`);
      if (photo && !entry.downloadUrl?.startsWith(`https://images.pexels.com/photos/${photo[1]}/`)) {
        errors.push(`${label}: download and source photo IDs must agree.`);
      }
    }
  }
  for (const asset of media.assets) {
    if (!byHash.has(asset.sha256)) errors.push(`Embedded ${asset.mime} ${asset.sha256} has no provenance record.`);
  }
  return { slug, ok: errors.length === 0, images: media.assets.length, imageUses: media.assets.reduce((sum, x) => sum + x.uses, 0), errors };
}

export async function validateAssets({ rootDir = process.cwd(), templates = [] } = {}) {
  const root = path.join(rootDir, 'templates');
  const selected = new Set(templates);
  const folders = (await readdir(root, { withFileTypes: true })).filter((x) => x.isDirectory()).map((x) => x.name).sort();
  const results = [];
  const unassessed = [];
  for (const slug of folders) {
    if (selected.size && !selected.has(slug)) continue;
    const folder = path.join(root, slug);
    const metadata = JSON.parse(await readFile(path.join(folder, 'template.json'), 'utf8'));
    let manifest;
    try {
      manifest = JSON.parse(await readFile(path.join(folder, 'ASSET-LICENSES/manifest.json'), 'utf8'));
    } catch (error) {
      if (error.code !== 'ENOENT') {
        results.push({ slug, ok: false, errors: [`Invalid asset manifest: ${error.message}`] });
      } else if (selected.size || metadata.features?.asset_license_manifest) {
        results.push({ slug, ok: false, errors: ['Required asset manifest is missing.'] });
      } else unassessed.push(slug);
      continue;
    }
    results.push(validateAssetManifest({ slug, manifest, html: await readFile(path.join(folder, 'template.html'), 'utf8') }));
  }
  for (const slug of selected) if (!folders.includes(slug)) results.push({ slug, ok: false, errors: ['Unknown template.'] });
  return { ok: results.every((x) => x.ok), results, unassessed };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const templates = [];
    for (let i = 2; i < process.argv.length; i += 1) {
      if (process.argv[i] !== '--template' || !process.argv[i + 1]) throw new Error('Usage: node scripts/validate-assets.mjs [--template slug ...]');
      templates.push(process.argv[++i]);
    }
    const report = await validateAssets({ templates });
    for (const result of report.results) {
      console.log(`${result.ok ? 'PASS' : 'FAIL'} ${result.slug}: ${result.images ?? 0} unique embedded images`);
      for (const error of result.errors) console.error(`  ${error}`);
    }
    console.log(`Assessed ${report.results.length} manifest(s); ${report.unassessed.length} legacy template(s) without manifests were not assessed.`);
    if (!report.ok) process.exitCode = 1;
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
