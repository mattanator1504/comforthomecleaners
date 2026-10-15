# Site kit

Builds outstanding, fast, SEO-ready static websites. Pick the site type by the command you type. Add **quick** for a complete small site you can grow later with `/build-rest`.

## Site facts

> Filled in during the first build. Keep the `KEY: value` format (scripts read it).

```
SITE_TYPE: local-service (quick build)
SITE_NAME: Comfort Home Cleaners
SITE_URL: https://thehomecomfortcleaners.com
MAIN_KEYWORD: house cleaning milwaukee
LOCATION: Milwaukee, WI (confirmed on Facebook page)
PHONE: +1 414-275-7608
EMAIL: mircale.booker@gmail.com
LEAD_WEBHOOK:
BOOKING_URL:
LANG: en
```

## Commands

| Type this | To build |
|-----------|----------|
| `/local-service` | A local service business: trades, clinics, cleaners, salons |
| `/company` | An established company: recruiters, consultancies, agencies, firms |
| `/startup` | A start-up with a product |
| `/rank-and-rent` | A landing page for one keyword + two blog posts |
| add `quick` after any of them | The fast, complete small version of that site |
| `/build-rest` | Every page not built yet (from `site-plan.md`) |
| `/page` | One extra page: service, city/SEO page, case study, anything |
| `/blog` | One blog post |
| `/launch` | Deploy, connect the domain, get indexed |
| `/audit` | Optional SEO and speed check |

## Stack: SSG, always

Next.js App Router with `output: 'export'`: every page pre-rendered to static HTML at build time. No server, no API routes, no runtime data. Tailwind. Copy in `/content` (MDX), facts in `lib/site.ts`. Forms post straight to `LEAD_WEBHOOK`, then `/thank-you`. Vercel. Full setup in `seo/technical-seo.md`.

## Files

| Folder / file | What it's for |
|---------------|---------------|
| `site-types/` | One file per site type (what pages it gets, full and quick), plus `how-to-build.md` (the steps every build follows) |
| `page-guides/` | How to build each page: home, main service page, SEO page (city, industry, use case), landing page, blog post, case study, supporting pages |
| `seo/` | `on-page-seo.md` and `technical-seo.md` |
| `references/` | Voice, humour, stories, proof, opinions: filled for each business during the build |
| `design.md` | How to make the site look outstanding, plus the rules any design keeps |
| `keywords.md` | Optional: keywords you want targeted |
| `keywords-used.md` | Created automatically: every page and the keywords it owns |
| `site-plan.md` | Created automatically: what's built and what's still to build |

## Keywords

- Planning keywords in `keywords.md` is optional.
- Whenever a page targets a keyword, log it in `keywords-used.md`. Create the file if it doesn't exist:

  ```
  # Keywords used

  | Page | URL | Primary keyword | Secondary keywords | Date |
  |------|-----|-----------------|--------------------|------|
  ```
- One keyword per page. Check `keywords-used.md` before making a page.

## Rules

1. **Move fast.** Research, decide, build. Only ask when something truly blocks the build.
2. **Never invent proof.** No made-up reviews, numbers, clients, years, awards, addresses or guarantees. Write around gaps and list them at the end.
3. **The site always looks finished.** Links only to pages that exist. No "coming soon", "preview", "sample" or placeholder wording anywhere, and nothing that suggests an unfinished or trial site.
4. **Check once at the end:** `npm run build && npm run verify`. Fix errors and quick warnings. No endless loops.
