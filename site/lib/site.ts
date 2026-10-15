// Every business fact the site uses lives here. Change it once, it changes everywhere.

export const site = {
  name: "Comfort Home Cleaners",
  legalName: "The Home Comfort Cleaners LLC",
  url: "https://thehomecomfortcleaners.com",
  city: "Milwaukee",
  region: "WI",
  phone: "+14142757608",
  phoneDisplay: "(414) 275-7608",
  email: "mircale.booker@gmail.com",
  hours: "Monday to Friday",
  hoursSchema: ["Mo", "Tu", "We", "Th", "Fr"],
  // Set this to a form endpoint (Formspree, Make, Zapier, GoHighLevel…) to receive leads.
  // Left empty, the quote form opens a pre-filled email instead.
  leadWebhook: "",
  social: {
    facebook: "https://www.facebook.com/chcservu",
    facebookReviews: "https://www.facebook.com/chcservu/reviews",
  },
  ogImage: "/images/hero.webp",
};

export const nav = [
  { href: "/services", label: "Services" },
  { href: "/reviews", label: "Reviews" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export type PageMeta = { title: string; description: string; path: string };

export function pageMetadata({ title, description, path }: PageMeta) {
  const url = path === "/" ? site.url : `${site.url}${path}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website" as const,
      siteName: site.name,
      images: [{ url: site.ogImage, width: 1387, height: 1016 }],
    },
    twitter: { card: "summary_large_image" as const, title, description, images: [site.ogImage] },
  };
}

export const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${site.url}/#org`,
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  logo: `${site.url}/icon.svg`,
  areaServed: { "@type": "City", name: `${site.city}, ${site.region}` },
  sameAs: [site.social.facebook],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.url,
  publisher: { "@id": `${site.url}/#org` },
};

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.path === "/" ? site.url : `${site.url}${it.path}`,
    })),
  };
}
