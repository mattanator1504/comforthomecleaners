# Local service business

Trades, clinics, salons, cleaners, landscapers, movers, any business that serves customers in an area. Customers search "[service] [city]" and "[service] near me", compare a few sites, then call or fill in a form.

**Research:** search "[main service] [city]". Study the top 5 and the map pack: how their homepage is laid out, how they split their services, whether they have city pages, what trust they show (reviews, years, licences, photos, prices, guarantees).

**Main action:** quote form + clickable phone number. Calendar (if any) on `/thank-you`.

**Schema:** `LocalBusiness` (most specific subtype) only with a real address; otherwise `Organization` + `areaServed`.

## Full site

```
/                                  home                         page-guides/home.md
/services                          services hub                 page-guides/supporting-pages.md
/services/[service]                one per main service         page-guides/service-page.md
/services/[service]/[city]         city pages for key services  page-guides/seo-page.md
/areas                             areas served hub (if city pages exist)
/about  /reviews (if real reviews)  /contact  /quote
/blog   /blog/[slug]                                            page-guides/blog-post.md
/thank-you  /privacy  /terms  404
```

City pages: the main service × the cities that matter, only where there's real local substance (see `seo/on-page-seo.md`). Start with 3-6, grow from there.

**Nav:** Services (dropdown) · Areas · About · Reviews · Contact · [Get a quote] button · phone on mobile.

## Quick build

```
/  /services  /about  /contact  /thank-you  /privacy  404
```
The services hub carries a proper section per service. The nav shows only these pages and looks complete.
