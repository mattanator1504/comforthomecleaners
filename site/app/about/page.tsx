import Link from "next/link";
import { breadcrumbSchema, pageMetadata, site } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { PageHero, QuoteBlock } from "@/components/Sections";
import { Chat, Leaf, Shield, Sparkle } from "@/components/Icons";

export const metadata = pageMetadata({
  title: "About Comfort Home Cleaners | Milwaukee Cleaning Crew",
  description:
    "A local, owner-operated cleaning business in Milwaukee, WI. Thorough staff, natural-ingredient products and a tailored approach to each home.",
  path: "/about",
});

const values = [
  {
    icon: <Sparkle className="h-6 w-6" />,
    title: "Thorough by default",
    body: "You get a staff member who is comprehensive and professional, with keen attention to detail. Professional, timely and efficient, every visit.",
  },
  {
    icon: <Leaf className="h-6 w-6" />,
    title: "Cleaner air, not just cleaner floors",
    body: "We only use products with natural ingredients, reducing chemicals on surfaces and in your air to keep your family safe and healthy.",
  },
  {
    icon: <Chat className="h-6 w-6" />,
    title: "You always know where things stand",
    body: "Our process is about transparency, so we stay in constant contact with customers until the job is done.",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Covered and guaranteed",
    body: "We carry insurance for our employees and for the work we do in your home, and we guarantee customer satisfaction.",
  },
];

export default function AboutPage() {
  const crumbs = [{ name: "About", path: "/about" }];
  return (
    <>
      <PageHero
        crumbs={crumbs}
        title="A Milwaukee cleaning company that cleans like it's home."
        intro="Comfort Home Cleaners is a local, owner-operated business. We take care of your home with the same care as if it were our own, and we tailor every visit to your needs, your style and your budget."
      />

      <section aria-labelledby="how-we-work" className="px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div data-reveal className="overflow-hidden rounded-[36px] ring-1 ring-ink/5">
            <img src="/images/kitchen.webp" width={1600} height={959} alt="Spotless white kitchen with a marble island" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div data-reveal>
            <h2 id="how-we-work" className="text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-5xl">
              Owner-operated means the owner answers for it.
            </h2>
            <p className="mt-5 text-[17px] leading-relaxed text-slate">
              There is no call centre between you and the people cleaning your home. Courteous customer service is part of the job, and so is listening: what matters to one household barely registers in the next, so we ask before we start.
            </p>
            <p className="mt-4 text-[17px] leading-relaxed text-slate">
              Beyond homes, we look after offices, hotels, restaurants and other businesses, and we handle post-construction cleanup. When a room needs more than a clean, we paint and repair drywall too.
            </p>
            <Link href="/services" className="mt-8 inline-flex min-h-12 items-center rounded-full bg-ink px-6 text-[15px] font-medium text-white hover:bg-aqua-deep">
              See all cleaning services
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="values" className="px-4 pb-24 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 id="values" className="max-w-2xl text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-5xl">
            What every visit includes.
          </h2>
          <div data-stagger className="mt-12 grid gap-4 md:grid-cols-2">
            {values.map((v) => (
              <div key={v.title} data-spotlight className="glass rounded-[28px] p-7 sm:p-9">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-glow">{v.icon}</span>
                <h3 className="mt-6 text-2xl font-semibold tracking-[-0.025em]">{v.title}</h3>
                <p className="mt-3 text-[16px] leading-relaxed text-slate">{v.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-[16px] text-slate">
            Want to see the work first? The{" "}
            <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="font-medium text-aqua underline-offset-2 hover:underline">
              Comfort Home Cleaners Facebook page
            </a>{" "}
            has photos from real jobs and client reviews.
          </p>
        </div>
      </section>

      <QuoteBlock heading="Ready when your home is" />
      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
