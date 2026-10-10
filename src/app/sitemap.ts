import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/config/site";
import { routePairs } from "@/lib/routes";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!SITE_CONFIG.siteUrl) return [];
  const base = SITE_CONFIG.siteUrl;
  const lastModified = new Date("2026-10-10T00:00:00+03:00");
  return Object.keys(routePairs).map((path) => ({
    url: `${base}${path === "/" ? "/" : `${path}/`}`,
    lastModified,
    changeFrequency: "monthly",
    priority: path === "/" || path === "/en" ? 1 : 0.7,
  }));
}
