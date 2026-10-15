import { breadcrumbSchema, pageMetadata, site } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { PageHero } from "@/components/Sections";

export const metadata = {
  ...pageMetadata({
    title: "Privacy Policy | Comfort Home Cleaners, Milwaukee WI",
    description:
      "How Comfort Home Cleaners handles the details you send through the quote form or by phone and email: what we collect, why, and how to ask us to delete it.",
    path: "/privacy",
  }),
  robots: { index: false, follow: true },
};

export default function Privacy() {
  const crumbs = [{ name: "Privacy policy", path: "/privacy" }];
  return (
    <>
      <PageHero crumbs={crumbs} title="Privacy policy" intro={`How ${site.legalName} handles the information you share with us.`} />
      <div className="mx-auto max-w-3xl space-y-8 px-4 pb-24 text-[17px] leading-relaxed text-slate sm:px-6">
        <section aria-labelledby="collect">
          <h2 id="collect" className="text-2xl font-semibold text-ink">What we collect</h2>
          <p className="mt-3">
            When you ask for a quote we receive your name, phone number, email address, street address and the number of bedrooms and bathrooms in your home. We only collect what you choose to send.
          </p>
        </section>
        <section aria-labelledby="use">
          <h2 id="use" className="text-2xl font-semibold text-ink">How we use it</h2>
          <p className="mt-3">
            We use these details to prepare your quote, schedule visits and keep in touch about your service. We do not sell your information or share it for marketing.
          </p>
        </section>
        <section aria-labelledby="cookies">
          <h2 id="cookies" className="text-2xl font-semibold text-ink">Cookies and analytics</h2>
          <p className="mt-3">This website does not set advertising cookies.</p>
        </section>
        <section aria-labelledby="rights">
          <h2 id="rights" className="text-2xl font-semibold text-ink">Your choices</h2>
          <p className="mt-3">
            To see, correct or delete the information we hold about you, email{" "}
            <a href={`mailto:${site.email}`} className="text-aqua">
              {site.email}
            </a>{" "}
            or call{" "}
            <a href={`tel:${site.phone}`} className="text-aqua">
              {site.phoneDisplay}
            </a>
            .
          </p>
        </section>
      </div>
      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
