import Link from "next/link";
import { breadcrumbSchema, pageMetadata } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import ReviewWall from "@/components/Reviews";
import { PageHero, QuoteBlock } from "@/components/Sections";

export const metadata = pageMetadata({
  title: "Comfort Home Cleaners Reviews | Milwaukee House Cleaning",
  description:
    "Real Facebook reviews of Comfort Home Cleaners in Milwaukee: carpets that look new, spotless bathrooms, stains removed and painting done right. 100% recommend.",
  path: "/reviews",
});

export default function ReviewsPage() {
  const crumbs = [{ name: "Reviews", path: "/reviews" }];
  return (
    <>
      <PageHero
        crumbs={crumbs}
        title="Reviews from Milwaukee homes we've cleaned."
        intro="Every one of the 10 people who reviewed Comfort Home Cleaners on Facebook recommends us. Here is what they wrote, word for word."
      />
      <section aria-labelledby="what-clients-say" className="px-4 pb-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 id="what-clients-say" className="sr-only">
            What clients say
          </h2>
          <ReviewWall />
          <p className="mt-10 text-[16px] text-slate">
            Seen the kind of job you need? Check the details on our{" "}
            <Link href="/services" className="font-medium text-aqua underline-offset-2 hover:underline">
              cleaning services
            </Link>{" "}
            page.
          </p>
        </div>
      </section>
      <QuoteBlock heading="Book a clean worth recommending" />
      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
