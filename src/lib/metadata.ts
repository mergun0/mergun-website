import type { Metadata } from "next";
import { SITE_CONFIG } from "@/config/site";

type MetaInput = {
  title: string;
  description: string;
  path: string;
  image?: {
    url: string;
    width: number;
    height: number;
    alt: string;
  };
};

export function pageMetadata({ title, description, path, image: inputImage }: MetaInput): Metadata {
  const fullTitle = title === SITE_CONFIG.name ? title : `${title} | ${SITE_CONFIG.name}`;
  const url = SITE_CONFIG.siteUrl ? new URL(path, SITE_CONFIG.siteUrl).toString() : undefined;
  const image = SITE_CONFIG.siteUrl
    ? {
        url: new URL(path.includes("/sheet2contacts") ? "/apps/showcase/sheet2contacts-icon.png" : "/og-default.svg", SITE_CONFIG.siteUrl).toString(),
        width: path.includes("/sheet2contacts") ? 1024 : 1200,
        height: path.includes("/sheet2contacts") ? 1024 : 630,
        alt: path.includes("/sheet2contacts") ? "Sheet2Contacts uygulama ikonu" : "Mergun",
      }
    : undefined;
  const metaImage = inputImage ?? image;

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
      images: metaImage ? [metaImage] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: metaImage ? [metaImage.url] : undefined,
    },
  };
}

