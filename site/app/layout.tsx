import type { Metadata, Viewport } from "next";
import "./globals.css";
import { site, orgSchema, websiteSchema } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import Motion from "@/components/Motion";

// Type is the platform's own (SF Pro on Apple devices, Segoe on Windows):
// optical sizing and tracking tables come for free, and no font file loads.

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#fbfbfd",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="antialiased">
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <JsonLd data={[orgSchema, websiteSchema]} />
        <Motion />
      </body>
    </html>
  );
}
