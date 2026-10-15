import Link from "next/link";
import { faq } from "@/content/faq";
import { site } from "@/lib/site";
import QuoteForm from "./QuoteForm";

// Shared blocks used across pages.

export function Faq({ items = faq }: { items?: typeof faq }) {
  return (
    <div data-reveal className="shadow-[0_-1px_0_rgb(0_0_0/0.12)]">
      {items.map((f) => (
        <details key={f.q} className="group shadow-[0_1px_0_rgb(0_0_0/0.12)]">
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
            <h3 className="text-[19px] font-semibold tracking-[-0.015em] sm:text-[21px]">{f.q}</h3>
            <span className="relative h-4 w-4 flex-none text-slate" aria-hidden="true">
              <span className="absolute inset-x-0 top-1/2 h-[1.5px] -translate-y-1/2 rounded bg-current" />
              <span className="absolute inset-y-0 left-1/2 w-[1.5px] -translate-x-1/2 rounded bg-current transition-transform duration-300 group-open:rotate-90" />
            </span>
          </summary>
          <p className="max-w-3xl pb-7 text-[17px] leading-relaxed text-ink/80">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function faqSchema(items = faq) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function QuoteBlock({ id = "quote", heading = "Get a quote for your first visit." }: { id?: string; heading?: string }) {
  return (
    <section aria-labelledby={id} className="bg-frost px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <div data-reveal className="lg:pt-4">
          <h2 id={id} className="t-display text-balance">
            {heading}
          </h2>
          <p className="t-lead mt-5 max-w-md text-slate">
            A good clean turns a home or business into a stress-free zone. Send the basics and we quote your first appointment.
          </p>
          <dl className="mt-10 space-y-6 text-[17px]">
            <div>
              <dt className="font-semibold">Call or text</dt>
              <dd className="mt-1">
                <a href={`tel:${site.phone}`} className="chev text-aqua hover:underline">
                  {site.phoneDisplay}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold">Hours</dt>
              <dd className="mt-1 text-slate">{site.hours}</dd>
            </div>
            <div>
              <dt className="font-semibold">Photos and reviews</dt>
              <dd className="mt-1">
                <a href={site.social.facebookReviews} target="_blank" rel="noopener noreferrer" className="chev text-aqua hover:underline">
                  Comfort Home Cleaners on Facebook
                </a>
              </dd>
            </div>
          </dl>
        </div>
        <div data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties} className="rounded-[28px] bg-white p-6 sm:p-10">
          <QuoteForm />
        </div>
      </div>
    </section>
  );
}

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-[14px] text-slate">
      <ol className="flex flex-wrap items-center justify-center gap-2">
        <li>
          <Link href="/" className="hover:text-ink">
            Home
          </Link>
        </li>
        {items.map((it, i) => (
          <li key={it.path} className="flex items-center gap-2">
            <span aria-hidden="true" className="text-ink/30">
              /
            </span>
            {i === items.length - 1 ? (
              <span aria-current="page" className="text-ink">
                {it.name}
              </span>
            ) : (
              <Link href={it.path}>{it.name}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

type Img = { src: string; w: number; h: number; alt: string };

// Apple inner-page opener: centred title, one line, then the picture at full width.
export function PageHero({ crumbs, title, intro, image }: { crumbs: { name: string; path: string }[]; title: string; intro: string; image?: Img }) {
  return (
    <section className="px-4 pb-16 pt-14 sm:px-6 sm:pt-20">
      <div className="enter mx-auto max-w-4xl text-center">
        <Breadcrumbs items={crumbs} />
        <h1 className="t-hero mt-5 text-balance">{title}</h1>
        <p className="t-lead mx-auto mt-6 max-w-2xl text-slate">{intro}</p>
      </div>
      {image && (
        <div className="hero-frame mx-auto mt-14 max-w-6xl overflow-hidden rounded-[28px] sm:rounded-[36px]">
          <img src={image.src} width={image.w} height={image.h} alt={image.alt} fetchPriority="high" className="aspect-[4/3] w-full object-cover sm:aspect-[21/9]" />
        </div>
      )}
    </section>
  );
}

export function PhotoBand({ heading, id, photos }: { heading: string; id: string; photos: Img[] }) {
  return (
    <section aria-labelledby={id} className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h2 id={id} data-reveal className="t-title max-w-2xl text-balance">
          {heading}
        </h2>
        <div data-stagger className="mt-10 grid gap-5 sm:grid-cols-[1.4fr_1fr_1fr]">
          {photos.map((p, i) => (
            <div key={p.src} className={`overflow-hidden rounded-[24px] ${i === 0 ? "sm:row-span-2" : ""}`}>
              <img src={p.src} width={p.w} height={p.h} alt={p.alt} loading="lazy" className={`parallax-img h-full w-full object-cover ${i === 0 ? "aspect-[4/5]" : "aspect-[4/3]"}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export const photos = {
  kitchen: { src: "/images/kitchen.webp", w: 1600, h: 959, alt: "Bright white kitchen with a marble island" },
  bath: { src: "/images/bath.webp", w: 1400, h: 2114, alt: "All-white bathroom with a clean tub and chrome fixtures" },
  rug: { src: "/images/rug.webp", w: 1600, h: 900, alt: "Living room with a soft area rug and upholstered sofa" },
  living: { src: "/images/living.webp", w: 1600, h: 1067, alt: "Bright living room with two grey sofas and clean floors" },
  room: { src: "/images/room.webp", w: 1360, h: 996, alt: "Living room with a round mirror and tidy furniture" },
  office: { src: "/images/office.webp", w: 1600, h: 1068, alt: "Clean office hallway with glass-panel doors" },
  fridge: { src: "/images/fridge.webp", w: 1600, h: 1063, alt: "Stainless steel refrigerator in a bright kitchen" },
};
