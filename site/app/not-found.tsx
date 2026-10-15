import Link from "next/link";

export const metadata = {
  title: { absolute: "Page not found | Comfort Home Cleaners, Milwaukee WI" },
  description: "This page could not be found. Head back to Comfort Home Cleaners for house, deep and commercial cleaning in Milwaukee, or get in touch for a quote.",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="relative overflow-hidden px-4 py-28 text-center sm:px-6">
      <div className="aurora pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-xl">
        <p className="text-[14px] font-medium text-aqua">Error 404</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-[-0.045em] sm:text-6xl">We cleaned so well this page vanished.</h1>
        <p className="mt-5 text-[18px] text-slate">Try one of these instead.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="inline-flex min-h-12 items-center rounded-full bg-ink px-6 text-white">
            Home
          </Link>
          <Link href="/services" className="glass inline-flex min-h-12 items-center rounded-full px-6">
            Cleaning services
          </Link>
          <Link href="/contact" className="glass inline-flex min-h-12 items-center rounded-full px-6">
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
