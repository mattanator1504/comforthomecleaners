import Link from "next/link";
import { site } from "@/lib/site";
import { Sparkle } from "@/components/Icons";

export const metadata = {
  title: { absolute: "Thanks, your quote request is on its way | Comfort Home" },
  description: "Thanks for contacting Comfort Home Cleaners. We will reply with a quote for your first appointment. For anything urgent, call (414) 275-7608.",
  robots: { index: false, follow: true },
  alternates: { canonical: `${site.url}/thank-you` },
};

export default function ThankYou() {
  return (
    <section className="relative overflow-hidden px-4 py-24 text-center sm:px-6 sm:py-32">
      <div className="aurora pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-2xl">
        <Sparkle className="sparkle mx-auto h-12 w-12 text-aqua" />
        <h1 className="mt-6 text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl">Thanks. Your request is in.</h1>
        <p className="mt-6 text-[18px] leading-relaxed text-slate">
          We&apos;ll reply with a quote for your first appointment. If your email app opened, just press send. In a hurry? Call{" "}
          <a href={`tel:${site.phone}`} className="font-medium text-aqua">
            {site.phoneDisplay}
          </a>
          , Monday to Friday.
        </p>
        <Link href="/services" className="mt-10 inline-flex min-h-12 items-center rounded-full bg-ink px-6 text-[15px] font-medium text-white hover:bg-aqua-deep">
          Browse our cleaning services
        </Link>
      </div>
    </section>
  );
}
