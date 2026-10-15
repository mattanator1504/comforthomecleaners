import Link from "next/link";
import { nav, site } from "@/lib/site";
import { services } from "@/content/services";

// Apple-style footer: quiet, grey, dense, everything findable.
export default function Footer() {
  return (
    <footer className="bg-frost text-[13px] leading-relaxed text-slate">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <p className="pb-5 shadow-[0_1px_0_rgb(0_0_0/0.1)]">
          {site.legalName} is a local, owner-operated cleaning business in {site.city}, {site.region}. Every visit uses natural-ingredient products and is covered by our insurance. Reviews quoted on this site are from our Facebook page, word for word.
        </p>

        <div className="grid gap-8 py-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h2 id="footer-services" className="text-[13px] font-semibold text-ink">
              Services
            </h2>
            <ul className="mt-2.5 space-y-2">
              {services.map((s) => (
                <li key={s.id}>
                  <Link href={`/services#${s.id}`} className="hover:text-ink hover:underline">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 id="footer-company" className="text-[13px] font-semibold text-ink">
              Comfort Home
            </h2>
            <ul className="mt-2.5 space-y-2">
              <li>
                <Link href="/" className="hover:text-ink hover:underline">
                  Home
                </Link>
              </li>
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="hover:text-ink hover:underline">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 id="footer-contact" className="text-[13px] font-semibold text-ink">
              Contact
            </h2>
            <ul className="mt-2.5 space-y-2">
              <li>
                <a href={`tel:${site.phone}`} className="hover:text-ink hover:underline">
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="break-all hover:text-ink hover:underline">
                  {site.email}
                </a>
              </li>
              <li>Open {site.hours}</li>
            </ul>
          </div>
          <div>
            <h2 id="footer-follow" className="text-[13px] font-semibold text-ink">
              Follow
            </h2>
            <ul className="mt-2.5 space-y-2">
              <li>
                <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-ink hover:underline">
                  Facebook
                </a>
              </li>
              <li>
                <a href={site.social.facebookReviews} target="_blank" rel="noopener noreferrer" className="hover:text-ink hover:underline">
                  Facebook reviews
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-5 shadow-[0_-1px_0_rgb(0_0_0/0.1)] sm:flex-row sm:justify-between">
          <p>
            Copyright © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <p>
            <Link href="/privacy" className="hover:text-ink hover:underline">
              Privacy Policy
            </Link>
            <span className="px-2 text-ink/20" aria-hidden="true">
              |
            </span>
            {site.city}, {site.region}
          </p>
        </div>
      </div>
    </footer>
  );
}
