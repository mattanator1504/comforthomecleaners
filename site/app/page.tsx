import Link from "next/link";
import { pageMetadata, site } from "@/lib/site";
import { hero, steps } from "@/content/home";
import { services, extras } from "@/content/services";
import { reviews, reviewStats } from "@/content/reviews";
import CleanSweep from "@/components/CleanSweep";
import RoomScanner from "@/components/RoomScanner";
import Rail from "@/components/Rail";
import JsonLd from "@/components/JsonLd";
import { Faq, faqSchema, QuoteBlock } from "@/components/Sections";
import { Chat, Leaf, Shield, Sparkle } from "@/components/Icons";

export const metadata = pageMetadata({
  title: "Comfort Home Cleaners: House Cleaning in Milwaukee, WI",
  description:
    "Owner-operated house, deep and commercial cleaning in Milwaukee. Natural-ingredient products, insured work and updates until the job is done. Get a quote.",
  path: "/",
});

const specs = [
  { k: "Products", v: "Natural ingredients only, so fewer chemicals are left on your surfaces and in your air." },
  { k: "Kids and pets", v: "Eco-friendly products that are safe and effective around both." },
  { k: "Insurance", v: "Covers our employees and the work we do in your home." },
  { k: "Guarantee", v: "Something missed? Let us know and we put it right." },
  { k: "Updates", v: "Constant communication from first call until the job is done." },
  { k: "Schedule", v: "Monday to Friday. Businesses book one-time, daily, weekly or monthly." },
];

const why = [
  { icon: <Sparkle className="h-7 w-7" />, t: "Owner-operated.", b: "No call centre between you and the people cleaning your home. The owner answers for every visit." },
  { icon: <Leaf className="h-7 w-7" />, t: "Natural ingredients.", b: "What we clean with ends up in your air. So we only use products with natural ingredients." },
  { icon: <Shield className="h-7 w-7" />, t: "Insured and guaranteed.", b: "Our insurance covers our employees and the work in your home, and we guarantee your satisfaction." },
  { icon: <Chat className="h-7 w-7" />, t: "You always know.", b: "Our process is about transparency: you hear from us until the job is done." },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="overflow-hidden px-4 pb-20 pt-14 sm:px-6 sm:pt-20">
        <div className="enter mx-auto max-w-4xl text-center">
          <p className="t-sub text-aqua">Comfort Home Cleaners</p>
          <h1 className="t-hero mt-2 text-balance">{hero.h1}.</h1>
          <p className="t-lead mx-auto mt-5 max-w-xl text-slate">{hero.sub}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <Link href="/contact" className="flex min-h-12 items-center rounded-full bg-aqua px-7 text-[17px] text-white hover:bg-aqua-deep">
              Get a free quote
            </Link>
            <a href={`tel:${site.phone}`} className="chev text-[17px] text-aqua hover:underline">
              Call {site.phoneDisplay}
            </a>
          </div>
        </div>

        <div className="hero-frame mx-auto mt-14 max-w-6xl">
          <CleanSweep src="/images/hero.webp" width={1387} height={1016} alt="Bright, freshly cleaned living room with a white armchair by the window" />
        </div>
        <p className="mt-4 text-center text-[14px] text-slate">Drag the line, or flick it.</p>
      </section>

      {/* STATS */}
      <section aria-labelledby="stats" className="px-4 pb-24 sm:px-6">
        <h2 id="stats" className="sr-only">
          Comfort Home Cleaners in numbers
        </h2>
        <dl data-stagger className="mx-auto grid max-w-5xl gap-10 text-center sm:grid-cols-3">
          <div className="flex flex-col">
            <dt className="text-[17px] text-slate">of Facebook reviewers recommend us</dt>
            <dd className="order-first text-[64px] font-bold leading-none tracking-[-0.04em] text-ink sm:text-[80px]" data-count="100" data-suffix="%">
              {reviewStats.recommend}
            </dd>
          </div>
          <div className="flex flex-col">
            <dt className="text-[17px] text-slate">people follow our work on Facebook</dt>
            <dd className="order-first text-[64px] font-bold leading-none tracking-[-0.04em] text-ink sm:text-[80px]">{reviewStats.followers}</dd>
          </div>
          <div className="flex flex-col">
            <dt className="text-[17px] text-slate">days a week we clean, Monday to Friday</dt>
            <dd className="order-first text-[64px] font-bold leading-none tracking-[-0.04em] text-ink sm:text-[80px]" data-count="5">
              5
            </dd>
          </div>
        </dl>
      </section>

      {/* SERVICES RAIL */}
      <section aria-labelledby="services" className="bg-frost py-24 sm:py-32">
        <div data-reveal className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 id="services" className="t-display">
            Get to know the services.
          </h2>
          <p className="t-lead mt-4 max-w-2xl text-slate">
            Regular and deep cleaning, commercial spaces, carpets, appliances, even the paint on the walls. Also {extras.join(" and ").toLowerCase()}.
          </p>
        </div>
        <div className="mt-12">
          <Rail label="Cleaning services">
            {services.map((s) => (
              <Link
                key={s.id}
                href={`/services#${s.id}`}
                data-spotlight
                className="group relative flex h-[500px] w-[300px] flex-none flex-col overflow-hidden rounded-[28px] bg-white sm:h-[560px] sm:w-[380px]"
              >
                <div className="relative z-10 p-7 sm:p-8">
                  <h3 className="text-[24px] font-bold leading-tight tracking-[-0.02em] sm:text-[28px]">{s.name}</h3>
                  <p className="mt-3 text-[17px] leading-snug text-slate">{s.short}</p>
                </div>
                <img
                  src={s.image.src}
                  width={s.image.w}
                  height={s.image.h}
                  alt={s.image.alt}
                  loading="lazy"
                  className="mt-auto h-[55%] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </Link>
            ))}
          </Rail>
        </div>
      </section>

      {/* MATERIALS, on black */}
      <section aria-labelledby="spec" className="overflow-hidden bg-night px-4 py-28 text-white sm:px-6 sm:py-36">
        <div data-reveal className="mx-auto max-w-4xl text-center">
          <h2 id="spec" className="t-hero text-balance">
            Natural ingredients. <span className="text-white/45">Nothing harsh.</span>
          </h2>
          <p className="t-lead mx-auto mt-6 max-w-2xl text-white/70">
            What we use to clean your home makes its way into your body. So the standard starts with the bottle, and ends with someone answering the phone.
          </p>
        </div>
        <div className="scale-in mx-auto mt-16 max-w-6xl overflow-hidden rounded-[28px] sm:rounded-[36px]">
          <img src="/images/kitchen.webp" width={1600} height={959} alt="Spotless white kitchen with a marble island" loading="lazy" className="aspect-[4/3] w-full object-cover sm:aspect-[21/9]" />
        </div>
        <dl data-stagger className="mx-auto mt-16 grid max-w-6xl gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {specs.map((s) => (
            <div key={s.k}>
              <dt className="text-[21px] font-semibold tracking-[-0.015em] text-glow">{s.k}</dt>
              <dd className="mt-2 text-[17px] leading-relaxed text-white/75">{s.v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* REVIEWS RAIL */}
      <section aria-labelledby="reviews" className="py-24 sm:py-32">
        <div data-reveal className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 id="reviews" className="t-display">
            Ten reviews. Ten recommend.
          </h2>
          <p className="t-lead mt-4 max-w-2xl text-slate">
            Carpets that look new, wine and pet stains gone, bathrooms cleaned &ldquo;like Mr. Clean.&rdquo; From our Facebook reviews, word for word.{" "}
            <Link href="/reviews" className="chev text-aqua hover:underline">
              Read all reviews
            </Link>
          </p>
        </div>
        <div className="mt-12">
          <Rail label="Client reviews">
            {reviews.map((r) => (
              <figure key={r.id} className="flex w-[300px] flex-none flex-col rounded-[28px] bg-frost p-7 sm:w-[400px] sm:p-9">
                <p className="text-[15px] font-semibold text-aqua">{r.topic}</p>
                <blockquote className="mt-4 flex-1 text-[19px] leading-snug tracking-[-0.012em] text-ink sm:text-[21px]">&ldquo;{r.quote}&rdquo;</blockquote>
                <figcaption className="mt-8 text-[15px]">
                  <span className="block font-semibold">{r.name}</span>
                  <span className="block text-slate">Recommends us on Facebook</span>
                </figcaption>
              </figure>
            ))}
          </Rail>
        </div>
      </section>

      {/* ROOM BY ROOM */}
      <section aria-labelledby="rooms" className="bg-frost px-4 py-24 sm:px-6 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <div data-reveal className="text-center">
            <h2 id="rooms" className="t-display">
              What we clean, room by room.
            </h2>
            <p className="t-lead mx-auto mt-4 max-w-2xl text-slate">A typical visit, so you know what to expect. Tell us what to add or skip.</p>
          </div>
          <div data-reveal className="mt-12">
            <RoomScanner />
          </div>
        </div>
      </section>

      {/* WHY */}
      <section aria-labelledby="why" className="px-4 py-24 sm:px-6 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <h2 id="why" data-reveal className="t-display">
            Why Comfort Home.
          </h2>
          <div data-stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {why.map((w) => (
              <div key={w.t} data-spotlight className="flex flex-col rounded-[28px] bg-frost p-8">
                <span className="text-aqua">{w.icon}</span>
                <h3 className="mt-10 text-[24px] font-bold leading-tight tracking-[-0.02em]">{w.t}</h3>
                <p className="mt-3 text-[17px] leading-snug text-slate">{w.b}</p>
              </div>
            ))}
          </div>

          <h3 data-reveal className="t-title mt-28">
            From first call to finished clean.
          </h3>
          <ol data-stagger className="mt-10 grid gap-10 md:grid-cols-3">
            {steps.map((s) => (
              <li key={s.title}>
                <p className="text-[21px] font-semibold tracking-[-0.015em]">{s.title}</p>
                <p className="mt-2 text-[17px] leading-relaxed text-slate">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq" className="px-4 pb-28 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 id="faq" data-reveal className="t-display">
            Questions? Answers.
          </h2>
          <p data-reveal className="t-lead mt-4 text-slate">
            Not here?{" "}
            <a href={`tel:${site.phone}`} className="chev text-aqua hover:underline">
              Call {site.phoneDisplay}
            </a>
          </p>
          <div className="mt-10">
            <Faq />
          </div>
        </div>
      </section>

      <QuoteBlock />
      <JsonLd data={faqSchema()} />
    </>
  );
}
