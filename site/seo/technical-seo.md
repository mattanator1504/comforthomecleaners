# Technical SEO

Set up once during the first build, checked by `/audit` and `/launch`. Page-level rules live in `on-page-seo.md`.

## SSG: every page is static HTML

Static HTML is what search engines and AI crawlers read fastest and most reliably, so every site is a static export. Non-negotiable.

`next.config.ts`:
```ts
const nextConfig = {
  output: 'export',               // every page pre-rendered to HTML at build time
  trailingSlash: false,           // one URL version: /services/example
  images: { unoptimized: true },  // images are optimised beforehand with `npm run images`
};
export default nextConfig;
```

Rules that keep it static (break one and the export fails):
- Every `[slug]` route has `generateStaticParams`
- No `cookies()`, `headers()` or `searchParams` in server components
- No `cache: 'no-store'`, `dynamic = 'force-dynamic'` or API routes
- All content read at build time from `/content`

`npm run build` must show every route as ○ (Static).

**Forms without a server:** post from a small client component straight to `LEAD_WEBHOOK`, include a hidden honeypot field, send the page path and UTM parameters, then go to `/thank-you`. If the post fails, show the phone number and email.

## Crawling and indexing

- `app/robots.ts` (`force-static`): allow everything, explicitly including `GPTBot`, `OAI-SearchBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`; point to the sitemap
- `app/sitemap.ts` (`force-static`): every indexable page from `/content`, `lastModified` from each page's `updated` date. Never: thank-you, legal, 404, drafts.
- `metadataBase` set in `app/layout.tsx` so every canonical and OG URL is absolute
- `/thank-you`: `noindex`
- `app/not-found.tsx`: a real 404 page
- `public/llms.txt`: a plain summary of the site and its main pages
- One domain version: apex is canonical, `www` redirects (set in Vercel)
- Moved URLs: 301 in `vercel.json`, never a 404

## Speed

Targets: LCP under 2.5 s, CLS under 0.1, Total Blocking Time near 0.

- **No third-party scripts on page load.** Calendars, chat, maps and videos load on click. Analytics with `next/script` `strategy="lazyOnload"`.
- Fonts via `next/font`, 2 families and 4 weights at most
- Server components by default; `'use client'` only where interaction needs it
- Tailwind only; icons as inline SVG; CSS for simple animations
- Images pre-optimised with `npm run images`; `width` and `height` always set; hero `fetchpriority="high"`

## Headers (`vercel.json`)

- `/_next/static/*` and images: `Cache-Control: public, max-age=31536000, immutable`
- Every route: `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: SAMEORIGIN`, `Strict-Transport-Security: max-age=63072000; includeSubDomains`

## Best practices

HTTPS everywhere, no mixed content, zero console errors (a missing favicon counts), no source maps in production.

## Measuring

Lighthouse on the production build only, never `npm run dev` (it scores 20-40 points lower) and never browser DevTools (extensions skew it):

```bash
npm run build
npx serve@latest out -l 4321
npx lighthouse http://localhost:4321/ --quiet --chrome-flags="--headless"                    # mobile
npx lighthouse http://localhost:4321/ --quiet --chrome-flags="--headless" --preset=desktop   # desktop
```

Targets: Accessibility, Best Practices and SEO 100; Performance 95+ on mobile. Name the mode next to any score you report.

## Getting indexed fast (done by `/launch`)

1. Google Search Console: domain property, verified by DNS; submit the sitemap
2. Request indexing for the homepage, then the most important pages
3. Bing Webmaster Tools: import from Search Console
4. IndexNow for Bing and others (Google doesn't use it): key file in `public/`, ping new and updated URLs
5. Outside signals: Google Business Profile (real local businesses), a few directory listings, social profiles linking to the site

New domains often take days to a few weeks to be indexed. That's normal.
