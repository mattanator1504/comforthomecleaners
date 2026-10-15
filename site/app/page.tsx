import Link from "next/link";
import { pageMetadata, site } from "@/lib/site";
import { hero, steps } from "@/content/home";
import { services, extras } from "@/content/services";
import CleanSweep from "@/components/CleanSweep";
import RoomScanner from "@/components/RoomScanner";
import JsonLd from "@/components/JsonLd";
import { Faq, faqSchema, QuoteBlock } from "@/components/Sections";
import { Chat, Leaf, Paw, Phone, Shield, Sparkle } from "@/components/Icons";

export const metadata = pageMetadata({
  title: "Comfort Home Cleaners: House Cleaning in Milwaukee, WI",
  description:
    "Owner-operated house, deep and commercial cleaning in Milwaukee. Natural-ingredient products, insured work and updates until the job is done. Get a quote.",
  path: "/",
});

const specs = [
  { k: "Products", v: "Natural ingredients only, so fewer chemicals are left on your surfaces and in your air." },
  { k: "Kids and pets", v: "Eco-friendly products that are safe and effective around both. Tell us how to handle pets and we plan around them." },
  { k: "Insurance", v: "Covers our employees and the work we do in your home." },
  { k: "Guarantee", v: "Customer satisfaction guaranteed. Something missed? Let us know and we put it right." },
  { k: "Communication", v: "Constant updates from first call until the job is done." },
  { k: "Schedule", v: "Monday to Friday. Businesses can book one-time, daily, weekly or monthly." },
];

export default function Home() {
  const [residential, deep, commercial, carpet, appliances, painting] = services;

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden px-4 pb-16 pt-10 sm:px-6 sm:pt-16">
        <div className="aurora pointer-events-none absolute inset-0" />
        <div className="grid-lines pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-6xl text-center">
          <p className="glass mx-auto inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium text-ink/80">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-aqua opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-aqua" />
            </span>
            {hero.pill}
          </p>
          <h1 className="mx-auto mt-7 max-w-5xl text-balance text-[44px] font-semibold leading-[0.95] tracking-[-0.05em] sm:text-7xl lg:text-[88px]">
            {hero.h1}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-[18px] leading-relaxed text-slate sm:text-[20px]">{hero.sub}</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="flex min-h-14 w-full items-center justify-center rounded-full bg-ink px-8 text-[16px] font-medium text-white shadow-[0_14px_40px_-14px_rgb(7_17_29/0.8)] transition hover:bg-aqua-deep sm:w-auto"
            >
              Get a free quote
            </Link>
            <a
              href={`tel:${site.phone}`}
              className="glass flex min-h-14 w-full items-center justify-center gap-2 rounded-full px-7 text-[16px] font-medium sm:w-auto"
            >
              <Phone className="h-4 w-4 text-aqua" />
              Call {site.phoneDisplay}
            </a>
          </div>
        </div>

        <div className="relative mx-auto mt-14 max-w-6xl">
          <div className="rounded-[34px] bg-white/50 p-1.5 shadow-[0_40px_120px_-40px_rgb(7_17_29/0.45)] ring-1 ring-white/80 sm:rounded-[46px] sm:p-2">
            <CleanSweep src="/images/hero.webp" width={1387} height={1016} alt="Bright, freshly cleaned living room with a white armchair by the window" />
          </div>

          {/* Floating HUD cards */}
          <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:pointer-events-none lg:absolute lg:inset-x-0 lg:-bottom-10 lg:mt-0 lg:px-10">
            {[
              { icon: <Leaf className="h-5 w-5" />, k: "Products", v: "Natural ingredients" },
              { icon: <Shield className="h-5 w-5" />, k: "Coverage", v: "Insured, every visit" },
              { icon: <Chat className="h-5 w-5" />, k: "Updates", v: "Until the job is done" },
            ].map((c) => (
              <div key={c.k} className="glass flex items-center gap-3 rounded-2xl px-4 py-3.5">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-ink text-glow">{c.icon}</span>
                <span className="text-left">
                  <span className="block font-mono text-[11px] uppercase tracking-[0.16em] text-slate">{c.k}</span>
                  <span className="block text-[15px] font-medium text-ink">{c.v}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES BENTO */}
      <section aria-labelledby="services" className="px-4 pb-24 pt-16 sm:px-6 lg:pt-28">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 id="services" className="max-w-2xl text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-[56px]">
              One crew for the whole house. And the office.
            </h2>
            <p className="max-w-sm text-[17px] leading-relaxed text-slate">
              Comfort Home Cleaners handles regular cleaning, deep cleans, commercial spaces, carpets, appliances and even the paint on the walls.
            </p>
          </div>

          <div className="mt-12 grid auto-rows-[minmax(220px,auto)] gap-4 md:grid-cols-6">
            {/* Residential: hero tile */}
            <Link
              href={`/services#${residential.id}`}
              className="group relative overflow-hidden rounded-[32px] bg-night text-white md:col-span-4 md:row-span-2"
            >
              <img
                src={residential.image.src}
                width={residential.image.w}
                height={residential.image.h}
                alt={residential.image.alt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-transparent" />
              <div className="relative flex h-full min-h-[420px] flex-col justify-end p-7 sm:p-9">
                <h3 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">{residential.name}</h3>
                <p className="mt-3 max-w-md text-[16px] leading-relaxed text-white/80">{residential.short}</p>
              </div>
            </Link>

            <Link href={`/services#${deep.id}`} className="group glass flex flex-col justify-between rounded-[32px] p-7 md:col-span-2">
              <Sparkle className="sparkle h-8 w-8 text-aqua" />
              <div>
                <h3 className="text-2xl font-semibold tracking-[-0.025em]">{deep.name}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate">{deep.short}</p>
              </div>
            </Link>

            <Link href={`/services#${appliances.id}`} className="group flex flex-col justify-between rounded-[32px] bg-gradient-to-br from-[#dff7f3] to-[#e3e8ff] p-7 md:col-span-2">
              <span className="font-mono text-[12px] uppercase tracking-[0.16em] text-aqua-deep">Enamel · Chrome · Stainless</span>
              <div>
                <h3 className="text-2xl font-semibold tracking-[-0.025em]">Fridge and stove deep cleaning</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate">{appliances.short}</p>
              </div>
            </Link>

            <Link
              href={`/services#${commercial.id}`}
              className="group relative overflow-hidden rounded-[32px] bg-night text-white md:col-span-3"
            >
              <img
                src={commercial.image.src}
                width={commercial.image.w}
                height={commercial.image.h}
                alt={commercial.image.alt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-night/90 via-night/40 to-transparent" />
              <div className="relative flex h-full min-h-[260px] flex-col justify-end p-7">
                <h3 className="text-2xl font-semibold tracking-[-0.025em]">{commercial.name}</h3>
                <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-white/80">{commercial.short}</p>
              </div>
            </Link>

            <Link href={`/services#${carpet.id}`} className="group glass flex flex-col justify-between rounded-[32px] p-7 md:col-span-3">
              <Paw className="h-8 w-8 text-aqua" />
              <div>
                <h3 className="text-2xl font-semibold tracking-[-0.025em]">{carpet.name}</h3>
                <p className="mt-2 max-w-md text-[15px] leading-relaxed text-slate">{carpet.short}</p>
              </div>
            </Link>

            <Link href={`/services#${painting.id}`} className="group relative flex flex-col justify-between gap-6 overflow-hidden rounded-[32px] bg-ink p-7 text-white md:col-span-6 md:min-h-[260px] md:flex-row md:items-end">
              <img
                src={painting.image.src}
                width={painting.image.w}
                height={painting.image.h}
                alt={painting.image.alt}
                loading="lazy"
                className="absolute inset-y-0 right-0 h-full w-full object-cover opacity-60 transition duration-700 group-hover:scale-[1.03] md:w-3/5"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/20" />
              <div className="relative">
                <h3 className="text-2xl font-semibold tracking-[-0.025em]">{painting.name}</h3>
                <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-white/70">{painting.short}</p>
              </div>
              <p className="relative font-mono text-[12px] uppercase tracking-[0.16em] text-glow">Also: {extras.join(" · ")}</p>
            </Link>
          </div>
        </div>
      </section>

      {/* SPEC SHEET */}
      <section aria-labelledby="spec" className="relative overflow-hidden bg-night px-4 py-24 text-white sm:px-6 sm:py-32">
        <div className="pointer-events-none absolute -left-40 top-0 h-[32rem] w-[32rem] rounded-full bg-aqua/30 blur-[120px]" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-[28rem] w-[28rem] rounded-full bg-lilac/20 blur-[120px]" />
        <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 id="spec" className="text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-[56px]">
              What you get, written down.
            </h2>
            <p className="mt-5 max-w-sm text-[17px] leading-relaxed text-white/65">
              What we use to clean your home makes its way into your body. So the spec starts with the bottle, and ends with someone answering the phone.
            </p>
          </div>
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">Comfort Home Cleaners service specification</caption>
            <tbody>
              {specs.map((s) => (
                <tr key={s.k} className="border-t border-white/12 last:border-b">
                  <th scope="row" className="w-36 py-5 pr-6 align-top font-mono text-[12px] font-normal uppercase tracking-[0.16em] text-glow sm:w-48">
                    {s.k}
                  </th>
                  <td className="py-5 text-[16px] leading-relaxed text-white/85 sm:text-[17px]">{s.v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ROOM BY ROOM */}
      <section aria-labelledby="rooms" className="px-4 py-24 sm:px-6 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 id="rooms" className="max-w-2xl text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-[56px]">
              What a clean covers, room by room.
            </h2>
            <p className="max-w-sm text-[17px] leading-relaxed text-slate">
              A typical visit, so you know what to expect. Every home is different, so tell us what to add or skip.
            </p>
          </div>
          <div className="mt-12">
            <RoomScanner />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section aria-labelledby="process" className="px-4 pb-24 sm:px-6 sm:pb-32">
        <div className="mx-auto max-w-6xl rounded-[40px] bg-white/70 p-6 ring-1 ring-ink/5 sm:p-12">
          <h2 id="process" className="max-w-xl text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-5xl">
            From first call to a finished clean.
          </h2>
          <ol className="mt-12 grid gap-8 md:grid-cols-3 md:gap-6">
            {steps.map((s, i) => (
              <li key={s.title} className="relative">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink font-mono text-[14px] text-glow">{i + 1}</span>
                  <span className="h-px flex-1 bg-gradient-to-r from-ink/20 to-transparent" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-xl font-semibold tracking-[-0.02em]">{s.title}</h3>
                <p className="mt-2 text-[16px] leading-relaxed text-slate">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq" className="px-4 pb-8 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <h2 id="faq" className="text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-5xl">
              Questions people ask before booking.
            </h2>
            <p className="mt-5 max-w-sm text-[17px] leading-relaxed text-slate">
              Not here? Call <a href={`tel:${site.phone}`} className="font-medium text-aqua">{site.phoneDisplay}</a> and ask a person.
            </p>
          </div>
          <Faq />
        </div>
      </section>

      <QuoteBlock />
      <JsonLd data={faqSchema()} />
    </>
  );
}
