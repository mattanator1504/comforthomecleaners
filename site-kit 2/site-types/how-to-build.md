# How to build

The steps every site type follows. The type file says what to build; this says how. Work straight through without stopping, unless something truly blocks the build.

## 1. Facts and research on the business (5-10 minutes)

From the message, take whatever's given: name, what they do, location, phone, email, website, keyword.

Then **research the business on the web**: their website (every main page), Google Business Profile, socials, directory listings, reviews, news. Pull:
- Services or products, exactly as they name them; areas served
- Real proof: years, numbers, credentials, real review quotes (with source), clients they name publicly, projects
- How they talk (their own about page and posts)
- Their logo, brand colours and real photos (download what's usable into `public/images/src/`)

Put what you find into `references/`: facts, reviews and prices into `proof.md`, stories into `stories.md`, opinions into `opinions.md`, the audience and tone into the "This site" sections of `voice.md` and `humour-profile.md`. Never invent anything to fill a gap. No information online (a new business)? Build from the message alone and list what's missing at the end.

Write the facts into `CLAUDE.md` → Site facts.

## 2. Research the competition (5-10 minutes)

Do what the type file's **Research** line says. Look at the top 5 results' homepages and 1-2 inner pages of the kind you're building. Note sections, order, length, trust elements, and what they all miss. Keep it to a few lines in chat.

## 3. Plan and record it

Write `site-plan.md` in the project root:
- Site type and the facts in one line
- **Built:** the pages being built now (quick or full set from the type file), each with its primary keyword if it should rank
- **Still to build:** every other page in the full set, with its keyword

Show the plan in chat and keep going. The owner can stop you.

## 4. Scaffold (first build only)

`create-next-app` won't run in a folder that already has files, so scaffold beside it and move it in:

```bash
npx create-next-app@latest .next-tmp --ts --tailwind --eslint --app --no-src-dir --import-alias "@/*" --use-npm --yes
rm -rf .next-tmp/node_modules .next-tmp/.git .next-tmp/README.md
cat .next-tmp/.gitignore >> .gitignore 2>/dev/null; rm -f .next-tmp/.gitignore
cp -Rn .next-tmp/. . && rm -rf .next-tmp
npm install && npm i -D sharp gray-matter
```

Then set up everything in `seo/technical-seo.md` (SSG static export, robots, sitemap, schema helpers, llms.txt, headers, the lead form and `/thank-you`). Add `"verify": "node scripts/verify.mjs"` and `"images": "node scripts/images.mjs"` to `package.json` scripts.

## 5. Design

Follow `design.md`. If a design skill has been added to this project, use it instead for the look, keeping the rules at the bottom of `design.md`.

## 6. Write and build the pages

Each page from its guide in `page-guides/`, following `seo/on-page-seo.md` and the voice and humour in `references/`. Copy in `/content` (MDX), facts in `lib/site.ts`.

- **The site must look finished at every stage.** The nav, footer and every link only point to pages that exist. No "coming soon", "preview", "sample" or placeholder wording anywhere, and nothing that suggests an unfinished or trial site. A quick build is a complete small site, not a teaser.
- Real proof only. Missing a detail? Write around it.
- Log every page that targets a keyword in `keywords-used.md` (format in `CLAUDE.md`).

## 7. Images

The business's real photos first. Then free stock from Pexels if `PEXELS_API_KEY` is in `.env.local` (choose carefully, never repeat one, never a stock person presented as staff). Then `npm run images`.

## 8. Check once

```bash
npm run build && npm run verify
```

Fix errors and quick warnings, run it once more, and look at the homepage and one inner page at phone and desktop width. Then stop.

## 9. Report

- The local URL of each page
- Design direction in two lines
- **Send me these to make it stronger:** real photos, reviews, numbers, the lead webhook, anything missing
- What's left in `site-plan.md` → **Still to build** (type `/build-rest` to build it)

## Build the rest (`/build-rest`)

Read `site-plan.md`. Build every page under **Still to build** (or only the ones named) with steps 6-8, in this order: main pages first, then SEO pages, then blog posts. Add each one to the nav, footer, hubs and homepage as it ships, so the site still looks finished at every point. Move each page to **Built** in `site-plan.md`.
