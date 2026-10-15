# Site kit

Builds outstanding, fast, SEO-ready static websites with Claude Code.

## Start a project

1. Copy everything in this folder into the new project folder, **including the hidden `.claude` folder** (Mac: Cmd + Shift + . in Finder shows it; Windows: View → Show → Hidden items).
2. Open Claude Code in the project folder.
3. Type the command for the kind of site:

```
/local-service [business], [what they do], [city], [phone], [email], [website]
/company [company], [what they do], [location], [phone], [email], [website]
/startup [company], [what the product does], [who it's for], [email], [website]
/rank-and-rent [keyword], [phone], [lead webhook]
```

Put **quick** first for the fast version (home, services or product, about, contact):

```
/local-service quick [business], [what they do], [city], [website]
```

4. Grow it and go live:

```
/build-rest                  build every page not built yet
/page [what the page is]     one extra page (a service, a city page, a case study…)
/blog [topic]                one blog post
/launch                      deploy and get indexed
/audit                       optional SEO and speed check
```

Optional before building: real photos in `public/images/src/`, `PEXELS_API_KEY=…` in `.env.local` for stock photos, keywords you want in `keywords.md`, a design skill if you want a specific look.

## What's in here

```
CLAUDE.md                 site facts, commands, stack (SSG), rules
design.md                 how the site should look + rules every design keeps
site-types/
  local-service.md        pages for local service businesses (full + quick)
  company.md              pages for established companies
  startup.md              pages for start-ups
  rank-and-rent.md        landing page + two blog posts
  how-to-build.md         the steps every build follows, and "build the rest"
page-guides/
  home.md                 home page
  service-page.md         main service / product pages (the money pages)
  seo-page.md             city, industry, use-case and sub-service pages
  landing-page.md         rank-and-rent landing page
  blog-post.md            blog posts
  case-study.md           case studies
  supporting-pages.md     hubs, about, contact, reviews, thank-you, legal, 404
seo/
  on-page-seo.md
  technical-seo.md
references/
  voice.md  humour-profile.md  stories.md  proof.md  opinions.md
keywords.md               optional: keywords you want targeted
.claude/commands/         the commands above
scripts/
  verify.mjs              npm run verify
  images.mjs              npm run images
```

`site-plan.md` and `keywords-used.md` are created in the project as you build.
