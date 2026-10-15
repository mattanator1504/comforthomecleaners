import Link from "next/link";
import { nav, site } from "@/lib/site";
import { Mark, Phone } from "./Icons";

export default function Header() {
  return (
    <header className="site-header sticky top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <div className="glass mx-auto flex max-w-6xl items-center gap-2 rounded-full py-2 pl-3 pr-2 sm:pl-5">
        <Link href="/" className="flex min-h-12 items-center gap-2.5 rounded-full pr-2" aria-label={`${site.name} home`}>
          <Mark className="h-8 w-8" />
          <span className="whitespace-nowrap text-[15px] font-semibold tracking-tight">
            Comfort Home <span className="hidden font-normal text-slate min-[420px]:inline">Cleaners</span>
          </span>
        </Link>

        <nav aria-label="Main" className="ml-auto hidden items-center md:flex">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="rounded-full px-4 py-3 text-[14px] text-ink/80 transition-colors hover:bg-white/80 hover:text-ink"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <a
          href={`tel:${site.phone}`}
          className="ml-auto hidden min-h-12 items-center gap-2 rounded-full px-4 text-[14px] font-medium text-ink/80 hover:text-ink sm:flex md:ml-2"
        >
          <Phone className="h-4 w-4 text-aqua" />
          {site.phoneDisplay}
        </a>
        <a
          href={`tel:${site.phone}`}
          aria-label={`Call ${site.phoneDisplay}`}
          className="ml-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/80 text-aqua sm:hidden"
        >
          <Phone className="h-5 w-5" />
        </a>
        <Link
          href="/contact"
          className="flex min-h-12 items-center whitespace-nowrap rounded-full bg-ink px-4 text-[14px] font-medium text-white sm:px-5 transition-colors hover:bg-aqua-deep"
        >
          Get a quote
        </Link>

        <details className="group relative md:hidden">
          <summary
            aria-label="Menu"
            className="flex h-12 w-12 cursor-pointer list-none items-center justify-center rounded-full bg-white/80 [&::-webkit-details-marker]:hidden"
          >
            <span className="relative block h-3 w-5">
              <span className="absolute inset-x-0 top-0 h-0.5 rounded bg-ink transition-transform group-open:translate-y-[5px] group-open:rotate-45" />
              <span className="absolute inset-x-0 bottom-0 h-0.5 rounded bg-ink transition-transform group-open:-translate-y-[5px] group-open:-rotate-45" />
            </span>
          </summary>
          <nav aria-label="Mobile" className="glass absolute right-0 top-14 flex w-56 flex-col rounded-3xl p-2">
            <Link href="/" className="rounded-2xl px-4 py-3 text-[15px] hover:bg-white">
              Home
            </Link>
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="rounded-2xl px-4 py-3 text-[15px] hover:bg-white">
                {n.label}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
