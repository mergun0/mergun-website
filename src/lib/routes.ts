import type { Locale } from "@/config/site";

export const routePairs: Record<string, string> = {
  "/": "/en",
  "/uygulamalar": "/en/apps",
  "/uygulamalar/satir-arasi": "/en/apps/satir-arasi",
  "/uygulamalar/satir-arasi/gizlilik": "/en/apps/satir-arasi/privacy",
  "/uygulamalar/satir-arasi/kvkk": "/en/apps/satir-arasi/kvkk",
  "/uygulamalar/satir-arasi/kullanim-kosullari": "/en/apps/satir-arasi/terms",
  "/uygulamalar/satir-arasi/topluluk-kurallari": "/en/apps/satir-arasi/community-rules",
  "/uygulamalar/satir-arasi/hesap-silme": "/en/apps/satir-arasi/account-deletion",
  "/satir-arasi/destek": "/en/apps/satir-arasi/support",
  "/uygulamalar/dice-roller": "/en/apps/dice-roller",
  "/uygulamalar/dice-roller/gizlilik": "/en/apps/dice-roller/privacy",
  "/uygulamalar/dice-roller/kvkk": "/en/apps/dice-roller/kvkk",
  "/uygulamalar/dice-roller/kullanim-kosullari": "/en/apps/dice-roller/terms",
  "/uygulamalar/dice-roller/topluluk-kurallari": "/en/apps/dice-roller/community-rules",
  "/uygulamalar/dice-roller/hesap-silme": "/en/apps/dice-roller/account-deletion",
  "/dice-roller/destek": "/en/apps/dice-roller/support",
  "/uygulamalar/sheet2contacts": "/en/apps/sheet2contacts",
  "/uygulamalar/sheet2contacts/gizlilik": "/en/apps/sheet2contacts/privacy",
  "/uygulamalar/sheet2contacts/kvkk": "/en/apps/sheet2contacts/kvkk",
  "/uygulamalar/sheet2contacts/kullanim-kosullari": "/en/apps/sheet2contacts/terms",
  "/uygulamalar/sheet2contacts/destek": "/en/apps/sheet2contacts/support",
  "/uygulamalar/kimin-eseri": "/en/apps/kimin-eseri",
  "/uygulamalar/kimin-eseri/gizlilik": "/en/apps/kimin-eseri/privacy",
  "/uygulamalar/kimin-eseri/kvkk": "/en/apps/kimin-eseri/kvkk",
  "/uygulamalar/kimin-eseri/hesap-silme": "/en/apps/kimin-eseri/account-deletion",
  "/kimin-eseri/destek": "/en/apps/kimin-eseri/support",
  "/gizlilik": "/en/privacy",
  "/kvkk": "/en/privacy",
  "/hakkinda": "/en/about",
  "/destek": "/en/support",
  "/en": "/",
  "/en/apps": "/uygulamalar",
  "/en/apps/satir-arasi": "/uygulamalar/satir-arasi",
  "/en/apps/satir-arasi/privacy": "/uygulamalar/satir-arasi/gizlilik",
  "/en/apps/satir-arasi/kvkk": "/uygulamalar/satir-arasi/kvkk",
  "/en/apps/satir-arasi/terms": "/uygulamalar/satir-arasi/kullanim-kosullari",
  "/en/apps/satir-arasi/community-rules": "/uygulamalar/satir-arasi/topluluk-kurallari",
  "/en/apps/satir-arasi/account-deletion": "/uygulamalar/satir-arasi/hesap-silme",
  "/en/apps/satir-arasi/support": "/satir-arasi/destek",
  "/en/apps/dice-roller": "/uygulamalar/dice-roller",
  "/en/apps/dice-roller/privacy": "/uygulamalar/dice-roller/gizlilik",
  "/en/apps/dice-roller/kvkk": "/uygulamalar/dice-roller/kvkk",
  "/en/apps/dice-roller/terms": "/uygulamalar/dice-roller/kullanim-kosullari",
  "/en/apps/dice-roller/community-rules": "/uygulamalar/dice-roller/topluluk-kurallari",
  "/en/apps/dice-roller/account-deletion": "/uygulamalar/dice-roller/hesap-silme",
  "/en/apps/dice-roller/support": "/dice-roller/destek",
  "/en/apps/sheet2contacts": "/uygulamalar/sheet2contacts",
  "/en/apps/sheet2contacts/privacy": "/uygulamalar/sheet2contacts/gizlilik",
  "/en/apps/sheet2contacts/kvkk": "/uygulamalar/sheet2contacts/kvkk",
  "/en/apps/sheet2contacts/terms": "/uygulamalar/sheet2contacts/kullanim-kosullari",
  "/en/apps/sheet2contacts/support": "/uygulamalar/sheet2contacts/destek",
  "/en/apps/kimin-eseri": "/uygulamalar/kimin-eseri",
  "/en/apps/kimin-eseri/privacy": "/uygulamalar/kimin-eseri/gizlilik",
  "/en/apps/kimin-eseri/kvkk": "/uygulamalar/kimin-eseri/kvkk",
  "/en/apps/kimin-eseri/account-deletion": "/uygulamalar/kimin-eseri/hesap-silme",
  "/en/apps/kimin-eseri/support": "/kimin-eseri/destek",
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
