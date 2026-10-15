# Start-up

New companies with a product (software, an app, a physical product, a new kind of service). Buyers need to understand what it is in seconds, see that it works, and try it or talk to someone.

**Research:** search the product category ("[category] software", "[problem] tool", "best [category] for [audience]") and the direct alternatives. Study the top 5: how they explain the product above the fold, how they show it (screenshots, product shots, short video), how they price, and which use-case or comparison pages rank.

**Main action:** whatever fits the product: "Start free", "Get started", "Join the waitlist", "Book a call". One primary action everywhere.

**Schema:** `Organization`, `SoftwareApplication` or `Product` (no fake ratings), `WebSite`.

## Full site

```
/                                  home                         page-guides/home.md
/product or /features              what it does, shown          page-guides/service-page.md
/pricing                           only if pricing is known
/use-cases/[use-case]              SEO pages: one per audience or problem with search demand   page-guides/seo-page.md
/compare/[competitor]              "[product] vs [competitor]" / alternatives, only with honest, real differences
/customers  /customers/[slug]      when there are real customers                              page-guides/case-study.md
/about  /contact
/blog  /blog/[slug]                                             page-guides/blog-post.md
/thank-you  /privacy  /terms  404
```

**Nav:** Product · Use cases · Pricing · Customers · Blog · [primary action] button.

## Quick build

```
/  /product  /about  /contact  /thank-you  /privacy  404
```
Add `/pricing` to the quick build if prices are known.
