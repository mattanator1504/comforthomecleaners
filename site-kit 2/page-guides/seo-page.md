# SEO page (city pages and other focused pages)

Pages built to rank for a **specific variation** of a main service, sitting **under** the main service page:
- **City pages:** `/services/[service]/[city]` ("[service] [city]")
- **Industry pages:** `/industries/[industry]` ("[service] for [industry]")
- **Use-case pages:** `/use-cases/[use-case]` ("[product] for [audience or problem]")
- **Sub-service pages:** a narrower service with its own search demand ("emergency [service]", "[service] for [specific thing]")

They're money pages too, but their job is to win a narrower search and pass the visitor to a quote or call.

## The rule that decides if one gets built

Pages that only swap a city or industry name don't get indexed and can drag the site down. Build one only if it can carry **real, specific substance** for that variation. At least three of:
- A real job, client or project there (or in that industry)
- Local or industry specifics: named suburbs, local conditions, regulations, buyer habits, jargon
- Prices or timelines specific to it
- A review or quote from a customer there
- An FAQ answer that genuinely differs from the main page

Not enough? Skip it and list what's needed. Localise the problem, not just the name. `npm run verify` fails pages that are too similar to their siblings.

## Layout

The service page layout, made specific:
1. **H1:** "[Service] in [City]" (or for [Industry]). Promise. Main action. A local or industry proof point.
2. **The answer:** 40-60 words, specific to this place or industry.
3. **What's different here:** the local conditions, problems or buyer needs, with real detail.
4. **What's included** (short, can reference the main page).
5. **Proof from here:** the job, review or case study.
6. **Prices or timelines** for this variation, if known.
7. **Areas covered** (city pages: named suburbs) or **who we work with** (industry pages).
8. **FAQ:** 3-5, at least two unique to this page.
9. **Call to action.**

## Linking

- Links **up** to its main service page early in the copy
- Links to 2-3 sibling pages (nearby cities, related industries)
- Linked **from** the main service page's "Areas" or "Industries" section and the hub (`/areas`, `/industries`)
- `Service` schema with `areaServed` (city) or `audience` (industry), `BreadcrumbList`, `FAQPage`
