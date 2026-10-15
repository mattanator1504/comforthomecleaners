import Link from "next/link";
import { nav, site } from "@/lib/site";
import { services } from "@/content/services";
import { Facebook, Mark } from "./Icons";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-night text-white">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-aqua/25 blur-3xl" />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-3" aria-label={`${site.name} home`}>
            <Mark className="h-10 w-10" />
            <span className="text-lg font-semibold tracking-tight">{site.name}</span>
          </Link>
          <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-white/65">
            {site.legalName}. Owner-operated house and commercial cleaning in {site.city}, {site.region}, with eco-friendly products and insured work.
          </p>
          <div className="mt-6 space-y-1.5 text-[15px]">
            <p>
              <a href={`tel:${site.phone}`} className="text-white hover:text-glow">
                {site.phoneDisplay}
              </a>
            </p>
            <p>
              <a href={`mailto:${site.email}`} className="text-white/80 hover:text-glow">
                {site.email}
              </a>
            </p>
            <p className="text-white/60">Open {site.hours}</p>
          </div>
        </div>

        <div>
          <h2 id="footer-services" className="font-mono text-xs uppercase tracking-[0.18em] text-white/50">
            Services
          </h2>
          <ul className="mt-4 space-y-2 text-[15px]">
            {services.map((s) => (
              <li key={s.id}>
                <Link href={`/services#${s.id}`} className="text-white/80 hover:text-white">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 id="footer-company" className="font-mono text-xs uppercase tracking-[0.18em] text-white/50">
            Company
          </h2>
          <ul className="mt-4 space-y-2 text-[15px]">
            <li>
              <Link href="/" className="text-white/80 hover:text-white">
                Home
              </Link>
            </li>
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-white/80 hover:text-white">
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/privacy" className="text-white/80 hover:text-white">
                Privacy policy
              </Link>
            </li>
          </ul>
          <a
            href={site.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full border border-white/15 px-4 text-[14px] text-white/85 hover:border-white/40"
          >
            <Facebook className="h-4 w-4" />
            Follow us on Facebook
          </a>
        </div>
      </div>
      <div className="relative border-t border-white/10">
        <p className="mx-auto max-w-6xl px-5 py-6 text-[13px] text-white/45 sm:px-8">
          © {new Date().getFullYear()} {site.legalName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
