import Link from "next/link";
import { faq } from "@/content/faq";
import { site } from "@/lib/site";
import { Phone, Facebook } from "./Icons";
import QuoteForm from "./QuoteForm";

// Shared blocks used across pages.

export function Faq({ items = faq }: { items?: typeof faq }) {
  return (
    <div data-reveal className="grid gap-2">
      {items.map((f) => (
        <details key={f.q} className="group rounded-[22px] bg-white px-6 sm:px-8">
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 text-[17px] font-medium text-ink [&::-webkit-details-marker]:hidden">
            <h3 className="text-[17px] font-medium">{f.q}</h3>
            <span className="relative h-4 w-4 flex-none" aria-hidden="true">
              <span className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 rounded bg-aqua" />
              <span className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 rounded bg-aqua transition-transform group-open:rotate-90 group-open:opacity-0" />
            </span>
          </summary>
          <p className="max-w-2xl pb-6 text-[16px] leading-relaxed text-slate">{f.a}</p>
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

export function QuoteBlock({ id = "quote", heading = "Get a quote for your first appointment" }: { id?: string; heading?: string }) {
  return (
    <section aria-labelledby={id} className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28">
      <div className="aurora pointer-events-none absolute inset-0 opacity-80" />
      <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div data-reveal className="lg:pt-6">
          <h2 id={id} className="text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-5xl">
            {heading}
          </h2>
          <p className="mt-5 max-w-md text-[17px] leading-relaxed text-slate">
            A good clean turns a home or business into a stress-free zone. Tell us the basics and we send a quote for your first visit.
          </p>
          <div className="mt-8 space-y-3">
            <a href={`tel:${site.phone}`} className="glass flex min-h-16 items-center gap-4 rounded-2xl px-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-aqua text-white">
                <Phone className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-[13px] text-slate">Call or text, Monday to Friday</span>
                <span className="block text-[17px] font-medium">{site.phoneDisplay}</span>
              </span>
            </a>
            <a href={site.social.facebookReviews} target="_blank" rel="noopener noreferrer" className="glass flex min-h-16 items-center gap-4 rounded-2xl px-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1877f2] text-white">
                <Facebook className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-[13px] text-slate">See photos and client reviews</span>
                <span className="block text-[17px] font-medium">Comfort Home Cleaners on Facebook</span>
              </span>
            </a>
          </div>
        </div>
        <div data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties} className="glass rounded-[32px] p-5 sm:p-8">
          <QuoteForm />
        </div>
      </div>
    </section>
  );
}

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-[14px] font-medium text-slate">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link href="/" className="hover:text-ink">
            Home
          </Link>
        </li>
        {items.map((it, i) => (
          <li key={it.path} className="flex items-center gap-2">
            <span aria-hidden="true">/</span>
            {i === items.length - 1 ? <span aria-current="page" className="text-ink">{it.name}</span> : <Link href={it.path}>{it.name}</Link>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

type Img = { src: string; w: number; h: number; alt: string };

export function PageHero({ crumbs, title, intro, image }: { crumbs: { name: string; path: string }[]; title: string; intro: string; image?: Img }) {
  return (
    <section className="relative overflow-hidden px-4 pb-14 pt-14 sm:px-6 sm:pb-20 sm:pt-16">
      <div className="aurora pointer-events-none absolute inset-0" />
      <div className={`relative mx-auto max-w-6xl ${image ? "grid items-end gap-10 lg:grid-cols-12" : ""}`}>
        <div className={`enter ${image ? "lg:col-span-7" : ""}`}>
          <Breadcrumbs items={crumbs} />
          <h1 className="mt-6 max-w-4xl text-balance text-[44px] font-semibold leading-[0.95] tracking-[-0.045em] sm:text-7xl">{title}</h1>
          <p className="mt-6 max-w-2xl text-[19px] leading-relaxed text-ink sm:text-[20px]">{intro}</p>
        </div>
        {image && (
          <div className="hero-frame overflow-hidden rounded-[32px] lg:col-span-5">
            <img src={image.src} width={image.w} height={image.h} alt={image.alt} fetchPriority="high" className="aspect-[4/3] h-full w-full object-cover lg:aspect-[4/5]" />
          </div>
        )}
      </div>
    </section>
  );
}

export function PhotoBand({ heading, id, photos }: { heading: string; id: string; photos: Img[] }) {
  return (
    <section aria-labelledby={id} className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h2 id={id} data-reveal className="max-w-2xl text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-5xl">
          {heading}
        </h2>
        <div data-stagger className="mt-10 grid gap-4 sm:grid-cols-[1.4fr_1fr_1fr]">
          {photos.map((p, i) => (
            <div key={p.src} className={`overflow-hidden rounded-[28px] ${i === 0 ? "sm:row-span-2" : ""}`}>
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
