import { breadcrumbSchema, pageMetadata, site } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import QuoteForm from "@/components/QuoteForm";
import { Breadcrumbs } from "@/components/Sections";
import { Facebook, Mail, Phone } from "@/components/Icons";

export const metadata = pageMetadata({
  title: "Get a Cleaning Quote in Milwaukee | Comfort Home Cleaners",
  description:
    "Ask Comfort Home Cleaners for a quote on your first appointment. Call (414) 275-7608, email us, or send your address and home size. Open Monday to Friday.",
  path: "/contact",
});

export default function ContactPage() {
  const crumbs = [{ name: "Contact", path: "/contact" }];
  const channels = [
    { icon: <Phone className="h-5 w-5" />, k: "Call or text", v: site.phoneDisplay, href: `tel:${site.phone}` },
    { icon: <Mail className="h-5 w-5" />, k: "Email", v: site.email, href: `mailto:${site.email}` },
    { icon: <Facebook className="h-5 w-5" />, k: "Facebook", v: "Photos and reviews", href: site.social.facebook, ext: true },
  ];
  return (
    <>
      <section className="relative overflow-hidden px-4 pb-24 pt-14 sm:px-6 sm:pt-20">
        <div className="aurora pointer-events-none absolute inset-0" />
                <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.15fr]">
          <div className="enter">
            <Breadcrumbs items={crumbs} />
            <h1 className="mt-6 text-balance text-[52px] font-semibold leading-[0.92] tracking-[-0.05em] sm:text-7xl lg:text-[80px]">
              Get a cleaning quote
            </h1>
            <p className="mt-6 max-w-md text-[18px] leading-relaxed text-slate">
              Milwaukee homes and businesses: email or call for our current openings, or send the form and we&apos;ll quote your first appointment. We work {site.hours}.
            </p>
            <h2 id="reach-us" className="sr-only">
              Other ways to reach us
            </h2>
            <ul data-stagger className="mt-10 space-y-3">
              {channels.map((c) => (
                <li key={c.k}>
                  <a
                    href={c.href}
                    {...(c.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="glass flex min-h-16 items-center gap-4 rounded-2xl px-5 py-3"
                  >
                    <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-ink text-glow">{c.icon}</span>
                    <span className="min-w-0">
                      <span className="block text-[15px] text-slate">{c.k}</span>
                      <span className="block truncate text-[17px] font-medium">{c.v}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-8 hidden overflow-hidden rounded-[28px] lg:block">
              <img src="/images/kitchen.webp" width={1600} height={959} alt="Bright white kitchen with a marble island" className="aspect-[16/10] w-full object-cover" />
            </div>
          </div>
          <div className="enter glass rounded-[32px] p-5 sm:p-9">
            <h2 id="quote-form" className="mb-6 text-2xl font-semibold tracking-[-0.025em]">
              Quote for your first appointment
            </h2>
            <QuoteForm />
          </div>
        </div>
      </section>
      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
