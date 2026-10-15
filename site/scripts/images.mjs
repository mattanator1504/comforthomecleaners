#!/usr/bin/env node
/**
 * images.mjs — converts every image in public/images/src/ to WebP in public/images/,
 * sized and compressed to the budgets in references/technical-seo.md.
 *
 *   npm run images                 convert new or changed images
 *   node scripts/images.mjs --all  reconvert everything
 *
 * Budgets:  filenames containing "hero" → max 1920 px wide, ≤ 200 KB
 *           everything else             → max 1600 px wide, ≤ 150 KB
 *           "-WIDTH" in the name (e.g. "team-800.jpg") caps the width at WIDTH px
 *
 * Output names are cleaned to lowercase-hyphenated: "My Photo_01.JPG" → "my-photo-01.webp".
 * Needs sharp:  npm i -D sharp
 */
import fs from 'node:fs';
import path from 'node:path';

let sharp;
try { sharp = (await import('sharp')).default; }
catch { console.error('✗ sharp is not installed. Run: npm i -D sharp'); process.exit(1); }

const SRC = path.join(process.cwd(), 'public/images/src');
const OUT = path.join(process.cwd(), 'public/images');
const ALL = process.argv.includes('--all');
const EXT = /\.(jpe?g|png|webp|avif|tiff?|gif|heic)$/i;

if (!fs.existsSync(SRC)) {
  fs.mkdirSync(SRC, { recursive: true });
  console.log(`Created ${path.relative(process.cwd(), SRC)}/ — drop original images there and run again.`);
  process.exit(0);
}

const walk = (d, acc = []) => {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const f = path.join(d, e.name);
    if (e.isDirectory()) walk(f, acc); else if (EXT.test(e.name)) acc.push(f);
  }
  return acc;
};
const clean = s => s.toLowerCase().replace(/\.[^.]+$/, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const rows = [];
let failed = 0;
for (const file of walk(SRC)) {
  const relDir = path.relative(SRC, path.dirname(file)).split(path.sep).map(clean).filter(Boolean).join('/');
  const name = clean(path.basename(file));
  const outFile = path.join(OUT, relDir, `${name}.webp`);
  if (!ALL && fs.existsSync(outFile) && fs.statSync(outFile).mtimeMs >= fs.statSync(file).mtimeMs) continue;

  const isHero = /hero/.test(name);
  const budget = (isHero ? 200 : 150) * 1024;
  const widthHint = name.match(/-(\d{3,4})$/);
  let maxW = widthHint ? +widthHint[1] : isHero ? 1920 : 1600;

  try {
    const meta = await sharp(file).metadata();
    let width = Math.min(meta.width || maxW, maxW);
    let quality = 80;
    let buf;
    // Step quality down to 55, then width down by 15% at a time, until under budget.
    for (let i = 0; i < 20; i++) {
      buf = await sharp(file).rotate().resize({ width, withoutEnlargement: true }).webp({ quality, effort: 5 }).toBuffer();
      if (buf.length <= budget) break;
      if (quality > 55) quality = Math.max(55, quality - 7);
      else width = Math.round(width * 0.85);
    }
    fs.mkdirSync(path.dirname(outFile), { recursive: true });
    fs.writeFileSync(outFile, buf);
    const out = await sharp(buf).metadata();
    const kb = Math.round(buf.length / 1024);
    rows.push({ file: path.relative(process.cwd(), outFile), size: `${out.width}×${out.height}`, kb, ok: buf.length <= budget, q: quality });
  } catch (e) {
    failed++;
    console.error(`✗ ${path.relative(process.cwd(), file)}: ${e.message}`);
  }
}

if (!rows.length && !failed) { console.log('✓ Nothing to convert (all images up to date). Use --all to redo everything.'); process.exit(0); }
for (const r of rows) console.log(`${r.ok ? '✓' : '!'} ${r.file}  ${r.size}  ${r.kb} KB  q${r.q}${r.ok ? '' : '  (over budget: crop or use a smaller source)'}`);
console.log(`\n${rows.length} converted${failed ? `, ${failed} failed` : ''}. Use width="…" height="…" from the sizes above on every <img>.`);
process.exit(failed ? 1 : 0);
