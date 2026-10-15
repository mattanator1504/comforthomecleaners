# Company

Established businesses that sell expertise or a service to other businesses or professionals: recruiting firms, consultancies, agencies, accountants, law firms, engineering firms, logistics. Buyers research, compare credibility, then get in touch.

**Research:** search the main service plus location or industry ("[service] [city]", "[service] for [industry]"). Study the top 5: how they present expertise, how they split services, whether they have industry or sector pages, how they show proof (case studies, clients, team, numbers).

**Main action:** "Book a call" or "Talk to us" (calendar link loaded on click) plus a contact form. Recruiting firms and anyone with two audiences get two clear paths (e.g. "Hire talent" and "Find a job").

**Schema:** `Organization` (or `ProfessionalService` with a real address), `Person` for key team members.

## Full site

```
/                                  home                         page-guides/home.md
/services                          services hub                 page-guides/supporting-pages.md
/services/[service]                one per main service         page-guides/service-page.md
/industries/[industry]             or /sectors, /specialisms: SEO pages where they have real experience   page-guides/seo-page.md
/services/[service]/[city]         only if they sell locally and the research shows city searches
/case-studies  /case-studies/[slug]                             page-guides/case-study.md
/about  /team (if relevant)  /contact
/jobs or /candidates               recruiting firms only
/insights or /blog  /blog/[slug]                                page-guides/blog-post.md
/thank-you  /privacy  /terms  404
```

Name sections the way the top results do (services vs solutions, industries vs sectors, insights vs blog).

**Nav:** Services (dropdown) · Industries · Case studies · About · Insights · [Book a call] button.

## Quick build

```
/  /services  /about  /contact  /thank-you  /privacy  404
```
