import Link from "next/link";
import { pageMetadata, site } from "@/lib/site";
import { hero, steps } from "@/content/home";
import { services, extras } from "@/content/services";
import CleanSweep from "@/components/CleanSweep";
import RoomScanner from "@/components/RoomScanner";
import ReviewWall from "@/components/Reviews";
import JsonLd from "@/components/JsonLd";
import { Faq, faqSchema, QuoteBlock } from "@/components/Sections";
import { Paw, Phone, Sparkle } from "@/components/Icons";

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
      <section className="relative overflow-hidden px-4 pb-10 pt-8 sm:px-6 lg:pb-16 lg:pt-12">
        <div className="aurora pointer-events-none absolute inset-0" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="hero-copy lg:col-span-6">
           <div className="enter">
            <h1 className="text-[52px] font-semibold leading-[0.92] tracking-[-0.05em] sm:text-[80px] lg:text-[clamp(3.75rem,5.6vw,5.5rem)]">
              {hero.h1}
            </h1>
            <p className="mt-7 max-w-md text-[19px] leading-relaxed text-ink">{hero.sub}</p>
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Link
                href="/contact"
                className="press flex min-h-14 items-center justify-center rounded-full bg-ink px-8 text-[17px] font-medium text-white transition-colors hover:bg-aqua-deep"
              >
                Get a free quote
              </Link>
              <a href={`tel:${site.phone}`} className="press flex min-h-12 items-center gap-2 text-[17px] font-medium text-ink hover:text-aqua-deep">
                <Phone className="h-4 w-4 text-aqua" />
                or call {site.phoneDisplay}
              </a>
            </div>
            <Link href="/reviews" className="group mt-12 flex max-w-md items-center gap-4">
              <span className="flex -space-x-1.5" aria-hidden="true">
                {["M", "R", "T"].map((i, k) => (
                  <span key={i} className={`flex h-11 w-11 items-center justify-center rounded-full text-[15px] font-semibold text-white border-[3px] border-frost ${["bg-aqua-deep", "bg-aqua", "bg-ink"][k]}`}>
                    {i}
                  </span>
                ))}
              </span>
              <span className="text-[16px] leading-snug text-ink">
                <strong className="font-semibold">100% of 10 Facebook reviewers</strong> recommend us.{" "}
                <span className="text-aqua-deep group-hover:underline">Read what they said</span>
              </span>
            </Link>
           </div>
          </div>

          <div className="hero-frame lg:col-span-6">
            <CleanSweep src="/images/hero.webp" width={1387} height={1016} alt="Bright, freshly cleaned living room with a white armchair by the window" />
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker overflow-hidden bg-mist py-6" aria-hidden="true">
        <div className="ticker-track flex w-max gap-10 whitespace-nowrap text-[24px] font-medium tracking-[-0.02em] text-ink/70">
          {[0, 1].map((k) => (
            <div key={k} className="flex gap-10">
              {[...services.map((s) => s.name), ...extras].map((n) => (
                <span key={n + k} className="flex items-center gap-10">
                  {n}
                  <Sparkle className="h-4 w-4 text-aqua" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* SERVICES BENTO */}
      <section aria-labelledby="services" className="px-4 pb-24 pt-16 sm:px-6 lg:pt-24">
        <div className="mx-auto max-w-6xl">
          <div data-reveal className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <h2 id="services" className="max-w-2xl text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-[56px]">
              One crew for every room.
            </h2>
            <p className="max-w-sm text-[17px] leading-relaxed text-slate">
              Comfort Home Cleaners handles regular cleaning, deep cleans, commercial spaces, carpets, appliances and even the paint on the walls.
            </p>
          </div>

          <div data-stagger className="mt-12 grid auto-rows-[minmax(220px,auto)] gap-4 md:grid-cols-6">
            {/* Residential: hero tile */}
            <Link
              href={`/services#${residential.id}`}
              data-spotlight className="group relative overflow-hidden rounded-[32px] bg-night text-white md:col-span-4 md:row-span-2"
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

            <Link href={`/services#${deep.id}`} data-spotlight className="group glass flex flex-col justify-between rounded-[32px] p-7 md:col-span-2">
              <Sparkle className="sparkle h-8 w-8 text-aqua" />
              <div>
                <h3 className="text-2xl font-semibold tracking-[-0.025em]">{deep.name}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate">{deep.short}</p>
              </div>
            </Link>

            <Link href={`/services#${appliances.id}`} data-spotlight className="group flex flex-col justify-between rounded-[32px] bg-[#d9f2ee] p-7 md:col-span-2">
              <span className="text-[15px] font-medium text-aqua-deep">Enamel, chrome or stainless</span>
              <div>
                <h3 className="text-2xl font-semibold tracking-[-0.025em]">Fridge and stove deep cleaning</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate">{appliances.short}</p>
              </div>
            </Link>

            <Link
              href={`/services#${commercial.id}`}
              data-spotlight className="group relative overflow-hidden rounded-[32px] bg-night text-white md:col-span-3"
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

            <Link href={`/services#${carpet.id}`} data-spotlight className="group glass flex flex-col justify-between rounded-[32px] p-7 md:col-span-3">
              <Paw className="h-8 w-8 text-aqua" />
              <div>
                <h3 className="text-2xl font-semibold tracking-[-0.025em]">{carpet.name}</h3>
                <p className="mt-2 max-w-md text-[15px] leading-relaxed text-slate">{carpet.short}</p>
              </div>
            </Link>

            <Link href={`/services#${painting.id}`} data-spotlight className="group relative flex flex-col justify-between gap-6 overflow-hidden rounded-[32px] bg-ink p-7 text-white md:col-span-6 md:min-h-[260px] md:flex-row md:items-end">
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
              <p className="relative text-[15px] font-medium text-glow">Also: {extras.join(" · ")}</p>
            </Link>
          </div>
        </div>
      </section>

      {/* SPEC SHEET */}
      <section aria-labelledby="spec" className="relative overflow-hidden bg-night px-4 py-24 text-white sm:px-6 sm:py-32">
        <div className="drift-a pointer-events-none absolute -left-40 top-0 h-[32rem] w-[32rem] rounded-full bg-aqua/30 blur-[120px]" />
                <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div data-reveal className="lg:sticky lg:top-32 lg:self-start">
            <h2 id="spec" className="text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-[56px]">
              What you get, written down.
            </h2>
            <p className="mt-5 max-w-sm text-[17px] leading-relaxed text-white/65">
              What we use to clean your home makes its way into your body. So the spec starts with the bottle, and ends with someone answering the phone.
            </p>
          </div>
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">Comfort Home Cleaners service specification</caption>
            <tbody data-stagger>
              {specs.map((s) => (
                <tr key={s.k} className="border-t border-white/12 last:border-b">
                  <th scope="row" className="w-32 py-5 pr-6 align-top text-[16px] font-semibold text-glow sm:w-44">
                    {s.k}
                  </th>
                  <td className="py-5 text-[16px] leading-relaxed text-white/85 sm:text-[17px]">{s.v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* REVIEWS */}
      <section aria-labelledby="reviews" className="px-4 pt-24 sm:px-6 sm:pt-32">
        <div className="mx-auto max-w-6xl">
          <div data-reveal className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <h2 id="reviews" className="max-w-2xl text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-[56px]">
              Ten reviews. Ten recommend.
            </h2>
            <p className="max-w-sm text-[17px] leading-relaxed text-slate">
              Carpets that look new, wine and pet stains gone, bathrooms cleaned &ldquo;like Mr. Clean.&rdquo; Straight from our Facebook reviews, word for word.
            </p>
          </div>
          <div className="mt-12">
            <ReviewWall limit={5} />
          </div>
          <Link href="/reviews" className="mt-8 inline-flex min-h-12 items-center rounded-full bg-ink px-6 text-[15px] font-medium text-white hover:bg-aqua-deep">
            See all client reviews
          </Link>
        </div>
      </section>

      {/* ROOM BY ROOM */}
      <section aria-labelledby="rooms" className="px-4 py-24 sm:px-6 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <div data-reveal className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <h2 id="rooms" className="max-w-2xl text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-[56px]">
              What we clean, room by room.
            </h2>
            <p className="max-w-sm text-[17px] leading-relaxed text-slate">
              A typical visit, so you know what to expect. Every home is different, so tell us what to add or skip.
            </p>
          </div>
          <div data-reveal className="mt-12">
            <RoomScanner />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section aria-labelledby="process" className="px-4 pb-24 sm:px-6 sm:pb-32">
        <div data-reveal className="mx-auto max-w-6xl">
          <h2 id="process" className="max-w-xl text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-5xl">
            From first call to a finished clean.
          </h2>
          <ol data-stagger className="mt-12 grid gap-4 md:grid-cols-[1.2fr_1fr_1fr]">
            {steps.map((s, i) => (
              <li key={s.title} className={`rounded-[28px] p-7 sm:p-8 ${i === 0 ? "bg-ink text-white" : "bg-mist"}`}>
                <h3 className="text-2xl font-semibold tracking-[-0.025em]">{s.title}</h3>
                <p className={`mt-3 text-[17px] leading-relaxed ${i === 0 ? "text-white/80" : "text-ink"}`}>{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq" className="px-4 pb-8 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div data-reveal>
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
