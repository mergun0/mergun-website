export const SITE_CONFIG = {
  name: "Mergun",
  title: "Mergun",
  tagline: {
    tr: "Fikirlerden uygulamalara.",
    en: "From ideas to applications.",
  },
  description: {
    tr: "Mergun; sade, kullanışlı ve özenle geliştirilmiş dijital ürünler oluşturur.",
    en: "Mergun creates simple, useful and thoughtfully built digital products.",
  },
  githubUrl: "https://github.com/mergun0",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mergun.com.tr",
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? "destek@mergun.com.tr",
  privacyEmail: process.env.NEXT_PUBLIC_PRIVACY_EMAIL ?? "gizlilik@mergun.com.tr",
  defaultLocale: "tr",
  copyrightYear: 2026,
} as const;

export type Locale = "tr" | "en";

export const locales: Locale[] = ["tr", "en"];
