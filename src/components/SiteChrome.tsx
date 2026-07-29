import Link from "next/link";
import { SITE_CONFIG, type Locale } from "@/config/site";
import { localizedPath } from "@/lib/routes";
import { Brand } from "./Brand";

const nav = {
  tr: [
    ["Uygulamalar", "/uygulamalar"],
    ["Hakkında", "/hakkinda"],
    ["Destek", "/destek"],
  ],
  en: [
    ["Apps", "/en/apps"],
    ["About", "/en/about"],
    ["Support", "/en/support"],
  ],
} satisfies Record<Locale, [string, string][]>;

export function Header({ locale, path }: { locale: Locale; path: string }) {
  const home = locale === "en" ? "/en" : "/";
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Brand href={home} />
        <nav className="desktop-nav" aria-label={locale === "tr" ? "Ana navigasyon" : "Main navigation"}>
          {nav[locale].map(([label, href]) => (
            <Link key={href} href={href}>{label}</Link>
          ))}
        </nav>
        <div className="language-switch" aria-label={locale === "tr" ? "Dil seçimi" : "Language selection"}>
          <Link className={locale === "tr" ? "active" : ""} href={localizedPath(path, "tr")} hrefLang="tr">TR</Link>
          <Link className={locale === "en" ? "active" : ""} href={localizedPath(path, "en")} hrefLang="en">EN</Link>
        </div>
        <details className="mobile-menu">
          <summary aria-label={locale === "tr" ? "Menüyü aç" : "Open menu"}><span></span><span></span><span></span></summary>
          <nav aria-label={locale === "tr" ? "Mobil navigasyon" : "Mobile navigation"}>
            {nav[locale].map(([label, href]) => (
              <Link key={href} href={href}>{label}</Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}

export function Footer({ locale }: { locale: Locale }) {
  const year = new Date().getFullYear();
  const copy = locale === "tr" ? "Faydalı fikirleri sade dijital ürünlere dönüştüren bağımsız geliştirici markası." : "An independent developer brand turning useful ideas into simple digital products.";
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <Brand href={locale === "en" ? "/en" : "/"} />
          <p>{copy}</p>
        </div>
        <div className="footer-links">
          <Link href={locale === "en" ? "/en/apps" : "/uygulamalar"}>{locale === "tr" ? "Uygulamalar" : "Apps"}</Link>
          <Link href={locale === "en" ? "/en/privacy" : "/gizlilik"}>{locale === "tr" ? "Gizlilik" : "Privacy"}</Link>
          {locale === "tr" ? <Link href="/kvkk">KVKK</Link> : null}
          <Link href={locale === "en" ? "/en/support" : "/destek"}>{locale === "tr" ? "Destek" : "Support"}</Link>
          <a href={SITE_CONFIG.githubUrl} target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </div>
      <div className="shell copyright">© {year} Mergun. {locale === "tr" ? "Tüm hakları saklıdır." : "All rights reserved."}</div>
    </footer>
  );
}

export function SiteChrome({ locale, path, children }: { locale: Locale; path: string; children: React.ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#main">{locale === "tr" ? "İçeriğe geç" : "Skip to content"}</a>
      <Header locale={locale} path={path} />
      <main id="main" lang={locale}>{children}</main>
      <Footer locale={locale} />
    </>
  );
}
