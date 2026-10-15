# Rank and rent

A lead-generation site built to rank for one keyword ("[service] [city]") and send the calls and form leads to whoever rents it. There's no real business behind the brand: the brand is built around the service and the city.

**Research:** search the exact keyword. Study the top 5 and the map pack closely: page length, sections, the questions they answer, prices, the suburbs they mention. The landing page has to be the most useful page in that list.

**Main action:** a big clickable phone number (kept in `lib/site.ts` so it can be swapped for a tracking number in one place) and a short form posting to the lead webhook.

**Schema:** `Service` with `areaServed` and `provider` as an `Organization`. Never `LocalBusiness`, never a made-up address, owner, years, licences or reviews.

## Full site

```
/                    the landing page                           page-guides/landing-page.md
/blog/[slug] × 2     two posts answering the top questions buyers search before hiring   page-guides/blog-post.md
/thank-you  /privacy  404
```
City-matched domain covering several services? Add 1-2 service pages (`/[service]`) using `page-guides/seo-page.md`.

**Nav:** minimal: the brand, the phone number, [Get a quote]. Blog posts are linked from the landing page and footer.

## Quick build

```
/  /thank-you  /privacy  404
```
The landing page is the whole site; the two posts come with "build the rest".
