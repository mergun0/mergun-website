import type { Metadata } from "next";
import { SITE_CONFIG } from "@/config/site";

type MetaInput = {
  title: string;
  description: string;
  path: string;
};

export function pageMetadata({ title, description, path }: MetaInput): Metadata {
  const fullTitle = title === SITE_CONFIG.name ? title : `${title} | ${SITE_CONFIG.name}`;
  const url = SITE_CONFIG.siteUrl ? new URL(path, SITE_CONFIG.siteUrl).toString() : undefined;

  return {
    title: fullTitle,
    description,
    alternates: url ? { canonical: url } : undefined,
    openGraph: {
      title: fullTitle,
      description,
      type: "website",
      url,
      siteName: SITE_CONFIG.name,
      images: SITE_CONFIG.siteUrl ? [{ url: new URL("/og-default.svg", SITE_CONFIG.siteUrl).toString(), width: 1200, height: 630, alt: "Mergun" }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: SITE_CONFIG.siteUrl ? [new URL("/og-default.svg", SITE_CONFIG.siteUrl).toString()] : undefined,
    },
  };
}

