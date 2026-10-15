import Link from "next/link";
import { breadcrumbSchema, pageMetadata, site } from "@/lib/site";
import { services, extras } from "@/content/services";
import { reviewFor } from "@/content/reviews";
import JsonLd from "@/components/JsonLd";
import { PageHero, QuoteBlock } from "@/components/Sections";
import { Check } from "@/components/Icons";

export const metadata = pageMetadata({
  title: "Cleaning Services in Milwaukee | Comfort Home Cleaners",
  description:
    "House cleaning, deep cleaning, commercial cleaning, carpet and upholstery, fridge and stove cleaning, plus painting and drywall repair in Milwaukee, WI.",
  path: "/services",
});

export default function ServicesPage() {
  const crumbs = [{ name: "Services", path: "/services" }];
  return (
    <>
      <PageHero
        crumbs={crumbs}
        title="Cleaning services in Milwaukee"
        intro="For homes and businesses. Comfort Home Cleaners is a local, owner-operated business: pick one service or combine a few: every visit uses natural-ingredient products and is covered by our insurance."
      />

      <nav aria-label="Services on this page" className="sticky top-16 z-30 px-4 sm:px-6">
        <ul className="material mx-auto flex max-w-6xl gap-1 overflow-x-auto rounded-full p-1.5 shadow-[0_2px_12px_rgb(0_0_0/0.08)] [scrollbar-width:none]">
          {services.map((s) => (
            <li key={s.id} className="flex-none">
              <a href={`#${s.id}`} className="flex min-h-11 items-center rounded-full px-4 text-[14px] text-ink/75 hover:bg-white hover:text-ink">
                {s.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mx-auto max-w-6xl space-y-6 px-4 py-16 sm:px-6 sm:py-24">
        {services.map((s, i) => (
          <section key={s.id} id={s.id} data-reveal aria-labelledby={`${s.id}-h`} className="scroll-mt-40 overflow-hidden rounded-[32px] bg-frost">
            <div className={`grid lg:grid-cols-2 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <div className="relative min-h-[280px] overflow-hidden">
                <img
                  src={s.image.src}
                  width={s.image.w}
                  height={s.image.h}
                  alt={s.image.alt}
                  loading="lazy"
                  className="parallax-img absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="p-7 sm:p-12">
                <h2 id={`${s.id}-h`} className="text-balance text-3xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-4xl">
                  {s.name}
                </h2>
                {s.body.map((p) => (
                  <p key={p} className="mt-4 text-[17px] leading-relaxed text-slate">
                    {p}
                  </p>
                ))}
                <ul className="mt-7 grid gap-2 sm:grid-cols-2">
                  {s.includes.map((it) => (
                    <li key={it} className="flex items-center gap-2.5 text-[15px] text-ink">
                      <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-aqua text-white">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      {it}
                    </li>
                  ))}
                </ul>
                {reviewFor(s.id) && (
                  <figure className="mt-8 rounded-2xl border-l-2 border-aqua bg-mist/60 px-5 py-4">
                    <blockquote className="text-[15px] leading-relaxed text-ink">&ldquo;{reviewFor(s.id)!.quote}&rdquo;</blockquote>
                    <figcaption className="mt-2 text-[13px] text-slate">
                      {reviewFor(s.id)!.name}, <Link href="/reviews" className="text-aqua underline-offset-2 hover:underline">Facebook review</Link>
                    </figcaption>
                  </figure>
                )}
                <Link href="/contact" className="mt-8 inline-flex min-h-12 items-center rounded-full bg-ink px-6 text-[15px] font-medium text-white hover:bg-aqua-deep">
                  Get a quote for {s.name.toLowerCase()}
                </Link>
              </div>
            </div>
          </section>
        ))}

        <section data-reveal aria-labelledby="also" className="rounded-[36px] bg-night p-7 text-white sm:p-12">
          <h2 id="also" className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
            Also on the list
          </h2>
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-white/70">
            Comfort Home Cleaners also offers {extras.join(" and ").toLowerCase()}. Ask about either when you call{" "}
            <a href={`tel:${site.phone}`} className="text-glow underline-offset-2 hover:underline">
              {site.phoneDisplay}
            </a>
            .
          </p>
        </section>
      </div>

      <QuoteBlock heading="Tell us what needs doing" />
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          ...services.map((s) => ({
            "@context": "https://schema.org",
            "@type": "Service",
            name: s.name,
            description: s.short,
            serviceType: s.name,
            provider: { "@id": `${site.url}/#org` },
            areaServed: { "@type": "City", name: `${site.city}, ${site.region}` },
            url: `${site.url}/services#${s.id}`,
          })),
        ]}
      />
    </>
  );
}
