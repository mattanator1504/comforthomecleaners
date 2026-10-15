#!/usr/bin/env node
/**
 * verify.mjs — checks the built static site in /out against seo/on-page-seo.md:
 * titles, metas, headings, schema, images, plus dead links, orphans, placeholders, sitemap,
 * robots, llms.txt and the doorway similarity check.
 *
 * Usage:
 *   npm run build && npm run verify
 *   node scripts/verify.mjs --page /services/example       (one page, plus site-wide checks)
 *   node scripts/verify.mjs --strict                        (warnings fail too)
 *
 * Zero dependencies. Exit code 1 when any error is found.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const OUT = path.join(ROOT, 'out');
const args = process.argv.slice(2);
const STRICT = args.includes('--strict');
const ONLY = args.includes('--page') ? normalise(args[args.indexOf('--page') + 1] || '/') : null;

// Pages that are allowed (expected) to be noindex and outside the sitemap.
const NOINDEX_OK = ['/thank-you', '/coming-soon', '/privacy', '/privacy-policy', '/terms', '/book', '/404', '/accessibility'];
// Pages exempt from the orphan rule (reached by a form, or by error).
const ORPHAN_OK = ['/', '/thank-you', '/404'];
// Placeholder patterns that must never reach a built page.
const PLACEHOLDERS = [/\[FILL/i, /coming soon/i, /\bdemo\b/i, /\bsample (text|copy|content)\b/i, /\bTODO\b/, /lorem ipsum/i, /\bPLACEHOLDER\b/, /\{\{[^}]*\}\}/, /Your Business Name/i, /\bXXX\b/, /\[INSERT/i];
const VAGUE_ANCHORS = ['click here', 'read more', 'learn more', 'here', 'more', 'this link', 'link', 'this page', 'find out more'];
const AI_CRAWLERS = ['GPTBot', 'OAI-SearchBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended'];

// ---------------------------------------------------------------- helpers
function normalise(p) {
  if (!p) return '/';
  p = p.split('#')[0].split('?')[0];
  if (!p.startsWith('/')) p = '/' + p;
  p = p.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
  if (p.length > 1) p = p.replace(/\/+$/, '');
  return p || '/';
}
function walk(dir, files = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, files);
    else files.push(full);
  }
  return files;
}
function attr(tag, name) {
  const m = tag.match(new RegExp(`\\s${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i'));
  return m ? (m[2] ?? m[3] ?? m[4] ?? '') : null;
}
function hasAttr(tag, name) {
  return new RegExp(`\\s${name}(\\s*=|[\\s>/])`, 'i').test(tag);
}
function decode(s) {
  return s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;|&apos;/g, "'").replace(/&nbsp;/g, ' ').replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n));
}
function stripTags(html) {
  return decode(html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
}
function meta(html, key) {
  const tags = html.match(/<meta\b[^>]*>/gi) || [];
  for (const t of tags) {
    if ((attr(t, 'name') || '').toLowerCase() === key || (attr(t, 'property') || '').toLowerCase() === key) return attr(t, 'content');
  }
  return null;
}
function readSiteUrl() {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/+$/, '');
  try {
    const c = fs.readFileSync(path.join(ROOT, 'CLAUDE.md'), 'utf8');
    const m = c.match(/^SITE_URL:\s*(https?:\/\/\S+)/m);
    if (m) return m[1].replace(/\/+$/, '');
  } catch {}
  return null;
}
function shingles(text, n = 5) {
  const words = text.toLowerCase().replace(/[^a-z0-9\s'-]/g, ' ').split(/\s+/).filter(Boolean);
  const set = new Set();
  for (let i = 0; i + n <= words.length; i++) set.add(words.slice(i, i + n).join(' '));
  return set;
}

// ---------------------------------------------------------------- load
if (!fs.existsSync(OUT)) {
  console.error('✗ No /out folder. Run `npm run build` first (the site must use output: "export").');
  process.exit(1);
}
const SITE_URL = readSiteUrl();
const files = walk(OUT);
const htmlFiles = files.filter(f => f.endsWith('.html'));
const assetSet = new Set(files.map(f => '/' + path.relative(OUT, f).split(path.sep).join('/')));

let redirects = new Map();
try {
  const v = JSON.parse(fs.readFileSync(path.join(ROOT, 'vercel.json'), 'utf8'));
  for (const r of v.redirects || []) redirects.set(normalise(r.source), r.destination);
} catch {}

const pages = new Map(); // route -> { file, html, ... }
for (const f of htmlFiles) {
  const rel = '/' + path.relative(OUT, f).split(path.sep).join('/');
  let route = normalise(rel);
  if (rel === '/404.html') route = '/404';
  if (rel.startsWith('/_next/')) continue;
  pages.set(route, { file: f, html: fs.readFileSync(f, 'utf8'), route });
}
const routeExists = r => pages.has(r);

const report = new Map(); // route -> { errors:[], warnings:[] }
const site = { errors: [], warnings: [] };
function err(route, msg) { (report.get(route) || report.set(route, { errors: [], warnings: [] }).get(route)).errors.push(msg); }
function warn(route, msg) { (report.get(route) || report.set(route, { errors: [], warnings: [] }).get(route)).warnings.push(msg); }

// ---------------------------------------------------------------- per page
const inbound = new Map([...pages.keys()].map(r => [r, 0]));
const titles = new Map(), descriptions = new Map();
const indexable = new Set();

for (const [route, p] of pages) {
  const html = p.html;
  const robots = (meta(html, 'robots') || '').toLowerCase();
  p.noindex = robots.includes('noindex');
  const isNoindex = p.noindex || route === '/404';
  if (!isNoindex && route !== '/404') indexable.add(route);

  // Links (collected for every page, so orphan + inbound counts work even with --page)
  const anchors = html.match(/<a\b[^>]*>[\s\S]*?<\/a>/gi) || [];
  p.links = [];
  for (const a of anchors) {
    const open = a.match(/<a\b[^>]*>/i)[0];
    const href = attr(open, 'href');
    if (href === null) continue;
    p.links.push({ open, href, text: stripTags(a), aria: attr(open, 'aria-label') });
    if (href.startsWith('/') && !href.startsWith('//')) {
      const target = normalise(href);
      if (target !== route && inbound.has(target)) inbound.set(target, inbound.get(target) + 1);
    }
  }

  if (ONLY && route !== ONLY) continue;
  const isHome = route === '/';
  const isPost = route.startsWith('/blog/');
  const isCase = route.startsWith('/case-studies/');
  const isMoney = /^\/(services|industries)\//.test(route);

  // Placeholders (visible text and attributes, not scripts)
  const visible = html.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '');
  for (const re of PLACEHOLDERS) {
    const m = visible.match(re);
    if (m) err(route, `placeholder text found: "${m[0]}"`);
  }

  // Title + description
  const t = decode((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || '').trim();
  if (!t) err(route, 'missing <title>');
  else if (!isNoindex) {
    if (t.length < 30 || t.length > 65) err(route, `title is ${t.length} characters (target 50-60): "${t}"`);
    else if (t.length < 50 || t.length > 60) warn(route, `title is ${t.length} characters (target 50-60)`);
    titles.set(t, [...(titles.get(t) || []), route]);
  }
  const d = meta(html, 'description');
  if (!d) err(route, 'missing meta description');
  else if (!isNoindex) {
    const dl = decode(d).length;
    if (dl < 70 || dl > 170) err(route, `meta description is ${dl} characters (target 140-160)`);
    else if (dl < 140 || dl > 160) warn(route, `meta description is ${dl} characters (target 140-160)`);
    descriptions.set(d, [...(descriptions.get(d) || []), route]);
  }

  // Head
  const htmlTag = (html.match(/<html\b[^>]*>/i) || [''])[0];
  if (!attr(htmlTag, 'lang')) err(route, '<html> has no lang attribute');
  if (!/<meta[^>]+charset/i.test(html)) err(route, 'missing charset meta');
  if (!meta(html, 'viewport')) err(route, 'missing viewport meta');
  if (!isNoindex && route !== '/404') {
    const canon = ((html.match(/<link\b[^>]*rel=["']canonical["'][^>]*>/i) || [''])[0]);
    const href = canon ? attr(canon, 'href') : null;
    if (!href) err(route, 'missing canonical');
    else {
      if (!/^https?:\/\//.test(href)) err(route, `canonical is not absolute: ${href}`);
      const cpath = href.replace(/^https?:\/\/[^/]+/, '');
      if (cpath.length > 1 && cpath.endsWith('/')) err(route, `canonical has a trailing slash: ${href}`);
      if (SITE_URL) {
        const expected = SITE_URL + (route === '/' ? '' : route);
        if (href.replace(/\/$/, '') !== expected.replace(/\/$/, '')) err(route, `canonical ${href} should be ${expected}`);
      }
    }
    for (const k of ['og:title', 'og:description', 'og:image', 'og:url', 'og:type']) if (!meta(html, k)) err(route, `missing ${k}`);
    if ((meta(html, 'twitter:card') || '') !== 'summary_large_image') err(route, 'twitter:card should be summary_large_image');
    if ((isPost || isCase) && meta(html, 'og:type') !== 'article') warn(route, 'og:type should be "article" on posts and case studies');
  }

  // URL format
  if (route !== route.toLowerCase()) err(route, 'URL has uppercase letters');
  if (/_/.test(route)) err(route, 'URL uses underscores (use hyphens)');

  // Headings
  const headings = [...html.matchAll(/<h([1-6])\b([^>]*)>([\s\S]*?)<\/h\1>/gi)].map(m => ({ level: +m[1], attrs: m[2], text: stripTags(m[3]) }));
  const h1s = headings.filter(h => h.level === 1);
  if (h1s.length !== 1) err(route, `${h1s.length} H1 elements (exactly 1 required)`);
  let prev = 0;
  for (const h of headings) {
    if (prev && h.level > prev + 1) { err(route, `heading level skipped: H${prev} → H${h.level} ("${h.text.slice(0, 50)}")`); }
    prev = h.level;
    if (h.level === 2 && !/\sid\s*=/.test(' ' + h.attrs)) err(route, `H2 without an id: "${h.text.slice(0, 60)}"`);
  }

  // Images
  for (const img of html.match(/<img\b[^>]*>/gi) || []) {
    const src = attr(img, 'src') || '';
    if (attr(img, 'alt') === null) err(route, `image without alt: ${src}`);
    else if ((attr(img, 'alt') || '').length > 125) warn(route, `alt text over 125 characters: ${src}`);
    if (!attr(img, 'width') || !attr(img, 'height')) err(route, `image without width/height: ${src}`);
    if (src.startsWith('/') && !assetSet.has(src.split('?')[0])) err(route, `image file not found: ${src}`);
    if (/^http:\/\//.test(src)) err(route, `insecure (http) image: ${src}`);
    if (src.startsWith('/') && !/\.(webp|avif|svg)$/i.test(src.split('?')[0])) warn(route, `image is not WebP/AVIF/SVG: ${src}`);
  }

  // Links
  for (const l of p.links) {
    const text = (l.text || l.aria || '').trim().toLowerCase();
    if (!text) err(route, `link with no text or aria-label: ${l.href}`);
    else if (VAGUE_ANCHORS.includes(text)) err(route, `vague link text "${l.text}" → ${l.href}`);
    if ((attr(l.open, 'target') || '') === '_blank' && !/noopener/.test(attr(l.open, 'rel') || '')) err(route, `target="_blank" without rel="noopener": ${l.href}`);
    if (/^javascript:/i.test(l.href)) err(route, `javascript: link: ${l.href}`);
    if (l.href.startsWith('/') && !l.href.startsWith('//')) {
      const raw = l.href.split('#')[0].split('?')[0];
      if (raw.length > 1 && raw.endsWith('/')) warn(route, `internal link has a trailing slash: ${l.href}`);
      const target = normalise(l.href);
      if (assetSet.has(raw)) continue;
      if (routeExists(target)) continue;
      if (redirects.has(target)) warn(route, `link goes through a redirect: ${l.href} → ${redirects.get(target)} (link to the final URL)`);
      else err(route, `dead internal link: ${l.href}`);
    }
    if (SITE_URL && l.href.startsWith(SITE_URL)) warn(route, `absolute link to own site (use a relative path): ${l.href}`);
  }

  // Landmarks + skip link
  for (const tag of ['header', 'nav', 'main', 'footer']) if (!new RegExp(`<${tag}\\b`, 'i').test(html)) err(route, `missing <${tag}> landmark`);
  const firstLink = p.links[0];
  if (!firstLink || !firstLink.href.startsWith('#')) err(route, 'first link is not a skip-to-content link');
  if ((isPost || isCase) && !/<article\b/i.test(html)) err(route, 'posts and case studies need an <article> element');
  if ((isPost || isCase) && !/<time\b/i.test(html)) warn(route, 'no <time> element: show published / updated dates');

  // JSON-LD
  const blocks = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map(m => m[1]);
  const types = new Set();
  const collect = o => { if (!o || typeof o !== 'object') return; if (Array.isArray(o)) return o.forEach(collect); const ty = o['@type']; (Array.isArray(ty) ? ty : [ty]).forEach(x => x && types.add(x)); if (o['@graph']) collect(o['@graph']); };
  const parsed = [];
  for (const b of blocks) {
    try { const j = JSON.parse(b); parsed.push(j); collect(j); } catch (e) { err(route, `JSON-LD does not parse: ${e.message}`); }
  }
  if (!isHome && !isNoindex && route !== '/404' && !types.has('BreadcrumbList')) err(route, 'no BreadcrumbList schema (breadcrumbs required on every page except home)');
  if (isPost && !types.has('BlogPosting') && !types.has('Article')) err(route, 'blog post without BlogPosting schema');
  if (isCase && !types.has('Article')) err(route, 'case study without Article schema');
  if (isMoney && !types.has('Service')) warn(route, 'money page without Service schema');
  if (types.has('Review') || types.has('AggregateRating')) warn(route, 'Review/AggregateRating schema found: never mark up your own services with self-serving reviews');
  if (types.has('FAQPage')) {
    const text = stripTags(html).toLowerCase();
    const qs = [];
    const findQ = o => { if (!o || typeof o !== 'object') return; if (Array.isArray(o)) return o.forEach(findQ); if (o['@type'] === 'Question' && o.name) qs.push(o.name); Object.values(o).forEach(findQ); };
    parsed.forEach(findQ);
    for (const q of qs) if (!text.includes(decode(q).toLowerCase().replace(/\s+/g, ' ').trim())) err(route, `FAQ schema question not visible on the page: "${q}"`);
  }

  // Conversion
  if ((isHome || isMoney || isCase) && !p.links.some(l => /^(\/book|\/quote|\/contact|tel:)/.test(l.href))) warn(route, 'no link to the primary CTA (/book, /quote, /contact or tel:)');

  // Long-form: table of contents
  const words = stripTags((html.match(/<main\b[\s\S]*?<\/main>/i) || [''])[0]).split(' ').length;
  if (isPost && words > 1700 && !p.links.some(l => l.href.startsWith('#') && l !== firstLink)) warn(route, `~${words} words with no table of contents`);
}

// ---------------------------------------------------------------- site-wide
for (const [t, rs] of titles) if (rs.length > 1) site.errors.push(`duplicate title on ${rs.join(', ')}: "${t}"`);
for (const [d, rs] of descriptions) if (rs.length > 1) site.errors.push(`duplicate meta description on ${rs.join(', ')}`);

for (const r of indexable) {
  if (ORPHAN_OK.includes(r) || NOINDEX_OK.includes(r)) continue;
  if ((inbound.get(r) || 0) === 0) site.errors.push(`orphan page (no internal links point to it): ${r}`);
}

// Pages that should be noindex
for (const r of ['/thank-you']) if (pages.has(r) && !pages.get(r).noindex) site.errors.push(`${r} must be noindex`);

// Sitemap
const smFile = path.join(OUT, 'sitemap.xml');
if (!fs.existsSync(smFile)) site.errors.push('sitemap.xml missing');
else {
  const sm = fs.readFileSync(smFile, 'utf8');
  const locs = [...sm.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map(m => m[1]);
  const smRoutes = new Set(locs.map(u => normalise(u.replace(/^https?:\/\/[^/]+/, ''))));
  for (const u of locs) {
    if (SITE_URL && !u.startsWith(SITE_URL)) site.errors.push(`sitemap URL not on ${SITE_URL}: ${u}`);
    if (/vercel\.app/.test(u)) site.errors.push(`sitemap contains a vercel.app URL: ${u}`);
  }
  for (const r of smRoutes) {
    if (!pages.has(r)) site.errors.push(`sitemap lists a page that wasn't built: ${r}`);
    else if (pages.get(r).noindex) site.errors.push(`sitemap lists a noindex page: ${r}`);
  }
  for (const r of indexable) if (!smRoutes.has(r) && !NOINDEX_OK.includes(r)) site.errors.push(`indexable page missing from sitemap: ${r}`);
}

// robots.txt
const rbFile = path.join(OUT, 'robots.txt');
if (!fs.existsSync(rbFile)) site.errors.push('robots.txt missing');
else {
  const rb = fs.readFileSync(rbFile, 'utf8');
  if (!/sitemap:/i.test(rb)) site.errors.push('robots.txt does not reference the sitemap');
  const groups = rb.split(/\n(?=user-agent:)/i);
  for (const g of groups) {
    const agents = [...g.matchAll(/user-agent:\s*(\S+)/gi)].map(m => m[1].toLowerCase());
    if (/disallow:\s*\/\s*$/im.test(g)) {
      if (agents.includes('*')) site.errors.push('robots.txt blocks every crawler (Disallow: / for *)');
      for (const bot of AI_CRAWLERS) if (agents.includes(bot.toLowerCase())) site.errors.push(`robots.txt blocks ${bot}`);
    }
  }
  const missing = AI_CRAWLERS.filter(b => !new RegExp(`user-agent:\\s*${b}`, 'i').test(rb));
  if (missing.length) site.warnings.push(`robots.txt doesn't name these AI crawlers explicitly: ${missing.join(', ')}`);
}

if (!fs.existsSync(path.join(OUT, 'llms.txt'))) site.warnings.push('llms.txt missing');
if (!pages.has('/404')) site.errors.push('404.html missing');
if (!SITE_URL) site.warnings.push('SITE_URL not found in CLAUDE.md (or env): canonical domain checks skipped');

// ---------------------------------------------------------------- doorway similarity
{
  const mainText = r => stripTags((pages.get(r).html.match(/<main\b[\s\S]*?<\/main>/i) || [pages.get(r).html])[0]);
  const all = [...indexable];
  const sh = new Map(all.map(r => [r, shingles(mainText(r))]));
  // Boilerplate = shingles on more than 30% of indexable pages that ALSO appear outside the sibling group.
  // (Shared template text is boilerplate; text shared only between siblings is exactly what we're looking for.)
  const df = new Map();
  for (const s of sh.values()) for (const x of s) df.set(x, (df.get(x) || 0) + 1);
  const limit = Math.max(2, Math.ceil(all.length * 0.3));
  // Sibling groups: /services/<service>/<city> share a parent; /industries/* is one group
  const groups = new Map();
  for (const r of all) {
    let key = null;
    const m = r.match(/^\/services\/([^/]+)\/[^/]+$/);
    if (m) key = `/services/${m[1]}/*`;
    else if (/^\/industries\/[^/]+$/.test(r)) key = '/industries/*';
    if (key) groups.set(key, [...(groups.get(key) || []), r]);
  }
  for (const [key, rs] of groups) {
    if (rs.length < 2) continue;
    const inGroup = new Set(rs);
    const outside = new Set();
    for (const [r, s] of sh) if (!inGroup.has(r)) for (const x of s) outside.add(x);
    const clean = new Map(rs.map(r => [r, new Set([...sh.get(r)].filter(x => !(df.get(x) >= limit && outside.has(x))))]));
    for (const a of rs) {
      if (ONLY && a !== ONLY) continue;
      const A = clean.get(a);
      let unique = new Set(A);
      for (const b of rs) {
        if (a === b) continue;
        const B = clean.get(b);
        let inter = 0;
        for (const x of A) if (B.has(x)) { inter++; unique.delete(x); }
        const union = A.size + B.size - inter;
        const jac = union ? inter / union : 0;
        const con = A.size ? inter / A.size : 0;
        if (jac >= 0.5) err(a, `too similar to ${b}: overlap ${(jac * 100).toFixed(0)}% (fails at 50%) (see seo/on-page-seo.md, city pages)`);
        else if (con >= 0.8) err(a, `contained in ${b}: ${(con * 100).toFixed(0)}% of its phrases also appear there (fails at 80%)`);
      }
      const u = unique.size;
      if (u < 60) warn(a, `owns only ${u} unique 5-word phrases versus its siblings in ${key}`);
    }
  }
}

// ---------------------------------------------------------------- output
let errors = site.errors.length, warnings = site.warnings.length;
const routes = [...report.keys()].sort();
for (const r of routes) {
  const { errors: e, warnings: w } = report.get(r);
  if (!e.length && !w.length) continue;
  console.log(`\n${r}`);
  for (const m of e) console.log(`  ✗ ${m}`);
  for (const m of w) console.log(`  ! ${m}`);
  errors += e.length; warnings += w.length;
}
if (site.errors.length || site.warnings.length) {
  console.log('\nSite-wide');
  for (const m of site.errors) console.log(`  ✗ ${m}`);
  for (const m of site.warnings) console.log(`  ! ${m}`);
}
const checked = ONLY ? 1 : pages.size;
console.log(`\n${checked} page(s) checked · ${errors} error(s) · ${warnings} warning(s)`);
if (errors || (STRICT && warnings)) { console.log('✗ verify FAILED'); process.exit(1); }
console.log('✓ verify passed');
