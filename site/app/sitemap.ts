import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

const updated = new Date("2026-10-15");

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/services", "/about", "/contact"].map((p) => ({
    url: `${site.url}${p}`,
    lastModified: updated,
  }));
}
