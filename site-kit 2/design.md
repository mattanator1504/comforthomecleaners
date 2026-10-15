# Design

Every site should look like a studio designed it for this one business, not like a template with the name swapped. If a design skill has been added to the project, its look wins; the **Rules every design keeps** at the bottom still apply.

## 1. Start from the business, not a template

The distinctive choices come from the business's own world: its industry, materials, customers, place and existing brand.

- **Use what they already have.** Their logo, brand colours and real photos (found during research) are the starting point. A good existing brand gets respected and sharpened, not replaced.
- **Find the characteristic thing.** What does this business's world look like? A builder: timber, concrete, plans, finished homes. A recruiter: people, handshakes, city offices. A landscaper: texture, growth, before-and-after. The hero opens with the most characteristic thing, in the form that suits it best: a strong photo, a bold headline, a before-and-after, a product shot, a striking number only if the number really is the story.
- **Match the customer.** A luxury builder and a budget handyman both build things, but their sites should feel nothing alike.

## 2. Plan it in five lines before writing code

Write this in chat, then check it against the business before building:
- **Colour:** 4-6 named hex values (base, surface, text, accent, one supporting colour)
- **Type:** one or two typefaces chosen for this business, and what each is for
- **Layout:** one sentence on the layout idea, plus alignment
- **The memorable thing:** the one element people will remember (spend the boldness there, keep the rest calm)
- **Photos:** where the real photos go and what they show

Then ask: would I produce this same plan for any other business in this industry? If yes, change the part that's generic.

## 3. Avoid the looks that scream "generated"

These are defaults, not choices. Only use one if it's genuinely right for this business:
- A cream background with a big serif headline and a terracotta accent
- A near-black background with one neon accent
- Everything chopped into identical rounded cards with the same soft shadow
- A small all-caps label above every heading
- One word in the headline in a different colour or italics
- Numbered markers (01, 02, 03) on things that aren't a real sequence
- Every section fading and sliding up as you scroll
- Arrows tacked onto every button

## 4. Typography

- Choose typefaces deliberately for the business (via `next/font`, 2 families and 4 weights at most).
- A clear type scale with real contrast between headline and body sizes.
- Body text 16-18 px, lines under about 75 characters, generous line height.
- Headlines can be the design: size, weight and spacing doing the work.

## 5. Photos and imagery

- Real photos of the business's work and people always win. Show the work, the result and the place.
- Stock only to fill gaps, chosen carefully, never repeated, never a stock person presented as staff.
- Consistent treatment across the site (same crop style, same colour feel).
- No text baked into images.

## 6. Motion

One deliberate moment at most (a hero reveal, a before-and-after slider). Motion that responds to the visitor (opening a FAQ, submitting a form) is welcome. CSS only, and respect reduced-motion settings.

## 7. Check it like a client would

Screenshot the homepage and one inner page at 390 px and 1440 px. Look honestly: does it feel premium and specific to this business? Is anything cramped, misaligned or generic? Then remove one thing that isn't earning its place.

---

## Rules every design keeps

These protect SEO, speed and conversions. Any design skill must respect them.

- **Semantic HTML:** one H1 (from the content), no skipped heading levels, `header`/`nav`/`main`/`footer`, real links and buttons, a skip link.
- **Text stays text:** no headlines, prices or reviews inside images. Collapsible sections use `<details>` with the content in the HTML.
- **Speed:** hero image under 200 KB and not lazy; others lazy and under 150 KB; width and height on every image; no third-party scripts on load; no animation libraries for simple effects; no carousels or videos in the hero unless loaded on click.
- **Accessibility:** 4.5:1 text contrast (check the brand colour on buttons), visible focus states, 48 px tap targets, labelled form fields.
- **Conversion:** the main action in the header and above the fold; phone number tappable on mobile for local businesses; no popups.
- **Content lives in `/content` and `lib/site.ts`,** never hardcoded into components, so pages can be added without touching the design.
