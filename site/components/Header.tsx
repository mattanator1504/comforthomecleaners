import Link from "next/link";
import { nav, site } from "@/lib/site";
import { Mark, Phone } from "./Icons";

// Apple-style global nav: a thin translucent bar that content scrolls under.
export default function Header() {
  return (
    <header className="site-header material sticky top-0 z-50">
      <div className="mx-auto flex h-12 max-w-6xl items-center gap-1 px-4 sm:px-6">
        <Link href="/" className="-ml-2 flex h-12 items-center gap-2 rounded-lg px-2" aria-label={`${site.name} home`}>
          <Mark className="h-6 w-6" />
          <span className="whitespace-nowrap text-[15px] font-semibold tracking-[-0.01em]">Comfort Home</span>
        </Link>

        <nav aria-label="Main" className="mx-auto hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="flex h-12 items-center px-4 text-[14px] text-ink/80 transition-colors hover:text-ink">
              {n.label}
            </Link>
          ))}
        </nav>

        <a
          href={`tel:${site.phone}`}
          aria-label={`Call ${site.phoneDisplay}`}
          className="ml-auto flex h-12 items-center gap-1.5 px-3 text-[14px] text-ink/80 hover:text-ink md:ml-0"
        >
          <Phone className="h-4 w-4" />
          <span className="hidden lg:inline">{site.phoneDisplay}</span>
        </a>
        <Link
          href="/contact"
          className="flex h-8 items-center whitespace-nowrap rounded-full bg-aqua px-4 text-[13px] font-medium text-white hover:bg-aqua-deep"
        >
          Get a quote
        </Link>

        <details className="group md:hidden">
          <summary
            aria-label="Menu"
            className="ml-1 flex h-12 w-11 cursor-pointer list-none items-center justify-center [&::-webkit-details-marker]:hidden"
          >
            <span className="relative block h-3 w-[18px]">
              <span className="absolute inset-x-0 top-0 h-[1.5px] rounded bg-ink transition-transform duration-300 group-open:translate-y-[5px] group-open:rotate-45" />
              <span className="absolute inset-x-0 bottom-0 h-[1.5px] rounded bg-ink transition-transform duration-300 group-open:-translate-y-[5px] group-open:-rotate-45" />
            </span>
          </summary>
          <nav aria-label="Mobile" className="menu-pop material fixed inset-x-0 top-12 h-[calc(100dvh-3rem)] px-8 pt-6">
            {[{ href: "/", label: "Home" }, ...nav].map((n) => (
              <Link key={n.href} href={n.href} className="block py-2.5 text-[28px] font-semibold tracking-[-0.02em] text-ink">
                {n.label}
              </Link>
            ))}
            <a href={`tel:${site.phone}`} className="mt-6 block py-2 text-[17px] text-aqua">
              Call {site.phoneDisplay}
            </a>
          </nav>
        </details>
      </div>
    </header>
  );
}
