import type { Locale } from "@/config/site";

export const routePairs: Record<string, string> = {
  "/": "/en",
  "/uygulamalar": "/en/apps",
  "/uygulamalar/zar-at": "/en/apps/dice-roller",
  "/uygulamalar/zar-at/gizlilik": "/en/apps/dice-roller/privacy",
  "/uygulamalar/satir-arasi": "/en/apps/satir-arasi",
  "/uygulamalar/satir-arasi/gizlilik": "/en/apps/satir-arasi/privacy",
  "/gizlilik": "/en/privacy",
  "/kvkk": "/en/privacy",
  "/hakkinda": "/en/about",
  "/destek": "/en/support",
  "/en": "/",
  "/en/apps": "/uygulamalar",
  "/en/apps/dice-roller": "/uygulamalar/zar-at",
  "/en/apps/dice-roller/privacy": "/uygulamalar/zar-at/gizlilik",
  "/en/apps/satir-arasi": "/uygulamalar/satir-arasi",
  "/en/apps/satir-arasi/privacy": "/uygulamalar/satir-arasi/gizlilik",
  "/en/privacy": "/gizlilik",
  "/en/about": "/hakkinda",
  "/en/support": "/destek",
};

export function localeFromPath(path: string): Locale {
  return path === "/en" || path.startsWith("/en/") ? "en" : "tr";
}

export function localizedPath(path: string, target: Locale) {
  const locale = localeFromPath(path);
  if (locale === target) return path;
  return routePairs[path] ?? (target === "en" ? "/en" : "/");
}

