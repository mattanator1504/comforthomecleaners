# On-page SEO

Every page follows this. `npm run verify` checks the items marked ⚙ automatically. Site-wide setup lives in `technical-seo.md`.

## Research first: copy the winners, then beat them

Before building a page, search what it should rank for (with the city if it's local) and open the **top 5 organic results**. Note:
- What type of page ranks (homepage, service page, list, guide, product page)
- Their H1 and H2s, section order, rough word count
- Trust elements: reviews, prices, photos, guarantees, credentials, FAQs
- How they branch out: their nav and the pages under their homepage

Build the same type of page with the same core sections, then add what they're missing (a clearer answer, a price range, a better FAQ, a real photo). For the homepage, the winners' nav is the starting point for the page plan.

## Title and meta

**Title** ⚙ 50-60 characters, main keyword first, `| Brand` at the end if it fits. Unique on the site.
- Service or offer: `[Service] in [City] | Brand` or `[Service]: [benefit or proof]`
- Blog: `[Question as searched]? [Promise]` or `[Topic]: [specific payoff]`
- Home: `Brand: [what you do] in [City]`

**Meta description** ⚙ 140-160 characters: the answer or outcome, a reason to pick this site, a soft call to action. Unique on the site.

## URL

⚙ Lowercase, hyphens, keyword in it, no trailing slash. Never changed once live without a 301.

## Headings

⚙ Exactly one H1, containing the keyword. ⚙ No skipped levels. ⚙ Every H2 has an `id`. H2s are the questions people actually search.

## Copy

- Keyword in the first 100 words, naturally
- The first 40-60 words answer the search on their own
- Short paragraphs, short sentences, plain words
- Real specifics: prices, places, numbers, named things, from `references/proof.md`
- Secondary keywords each get a section or a natural home; never stuffed

## Images

⚙ Alt text on every image. ⚙ Width and height set. WebP; hero under 200 KB and not lazy; everything else lazy and under 150 KB. Descriptive filenames. No text inside images.

## Links

- ⚙ No dead links. ⚙ No "click here" or "read more" anchors.
- ⚙ Every page linked from at least one other page (no orphans)
- ⚙ Breadcrumbs on every page except home
- New pages get linked from their hub (and the homepage if they matter) the day they're made

## Schema (JSON-LD)

Generated from `lib/site.ts` and frontmatter, never hand-typed.
- Site-wide: `Organization`, or `LocalBusiness` only with a real address; plus `WebSite`
- Service or offer pages: `Service` with `areaServed`. Products: `Product` (no fake ratings).
- Blog: `BlogPosting` with author. Case studies: `Article`.
- ⚙ `BreadcrumbList` everywhere except home. ⚙ `FAQPage` when there's a visible FAQ, matching the text exactly.
- Never `Review` or `AggregateRating` for your own business on your own site.

## Head

⚙ Canonical (absolute, self-referencing). ⚙ Open Graph tags + `summary_large_image` card. ⚙ `lang`, viewport, charset. Favicon.

## Accessibility

⚙ `header`, `nav`, `main`, `footer`. ⚙ Skip link. Labels on every form field, 4.5:1 text contrast, 16 px body text, 48 px tap targets.

## Getting quoted by AI answers

- Answer first in every section. Each section makes sense lifted out on its own: name the subject, don't start with "It" or "This".
- Key facts in real tables (prices, comparisons, specs).
- Real numbers with units and years ("[amount] in 2026").
- Something only this site has: its own prices, jobs, results, photos, opinions.
- Business name, what it does and where, in plain text on the page.
- FAQ answers in full sentences.

## City pages (and any set of pages that only swaps one word)

Pages that are the same apart from the city name don't get indexed and can drag the site down. Only build a city page when it can have **real local substance**: local conditions or problems, named suburbs, local prices, a local job or review, a genuinely different FAQ answer. Localise the problem, not just the name. Keep it to the cities that matter (usually under 15). ⚙ `npm run verify` fails pages that are too similar to their siblings.
