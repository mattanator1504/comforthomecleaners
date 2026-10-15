# Landing page (rank and rent)

One page that ranks for one keyword ("[service] [city]") and turns visitors into calls and form leads. It's the whole site, so it has to be the most useful result for that search.

**Before writing:** read the top 5 and the map pack for the exact keyword: length, sections, questions answered, prices, suburbs mentioned. Match their depth (often 800-1,500 words) and add what's missing.

## Layout

1. **Hero:** H1 = the keyword. One-line promise. Big clickable phone number and a short form (name, phone, what they need, suburb) above the fold.
2. **The answer:** 40-60 words answering the search directly.
3. **Services or problems covered:** one section each, using the secondary keywords.
4. **Areas served:** named suburbs and local detail.
5. **Prices:** a table of typical prices or price factors, if the top results show them.
6. **How it works:** 3 steps from call to done.
7. **What to expect:** response time, what happens on the call or visit.
8. **FAQ:** 5-8 questions people actually search, straight answers.
9. **Call to action:** phone and form again. A sticky call button on mobile.

## Rules

- No made-up business details: no address, owner, years, licences, team or reviews. The brand is built around the service and the city.
- Phone number lives in `lib/site.ts` so it can be swapped for a tracking number in one place.
- `Service` schema with `areaServed`; `FAQPage`. Never `LocalBusiness`.
- Humour: light. Never in the prices, FAQ or calls to action.
- Links to the two blog posts once they exist, and the posts link back with the keyword as anchor text.
