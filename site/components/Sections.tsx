import Link from "next/link";
import { faq } from "@/content/faq";
import { site } from "@/lib/site";
import { Phone, Facebook } from "./Icons";
import QuoteForm from "./QuoteForm";

// Shared blocks used across pages.

export function Faq({ items = faq }: { items?: typeof faq }) {
  return (
    <div className="divide-y divide-ink/10 overflow-hidden rounded-[28px] border border-ink/10 bg-white/70">
      {items.map((f) => (
        <details key={f.q} className="group px-6 sm:px-8">
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
        <div className="lg:pt-6">
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
        <div className="glass rounded-[32px] p-5 sm:p-8">
          <QuoteForm />
        </div>
      </div>
    </section>
  );
}

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="font-mono text-[12px] uppercase tracking-[0.14em] text-slate">
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

export function PageHero({ crumbs, title, intro }: { crumbs: { name: string; path: string }[]; title: string; intro: string }) {
  return (
    <section className="relative overflow-hidden px-4 pb-14 pt-14 sm:px-6 sm:pb-20 sm:pt-20">
      <div className="aurora pointer-events-none absolute inset-0" />
      <div className="grid-lines pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-6xl">
        <Breadcrumbs items={crumbs} />
        <h1 className="mt-6 max-w-4xl text-balance text-[44px] font-semibold leading-[0.98] tracking-[-0.045em] sm:text-7xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-[18px] leading-relaxed text-slate sm:text-[20px]">{intro}</p>
      </div>
    </section>
  );
}
