import Image from "next/image";
import Link from "next/link";
import { apps, type AppInfo } from "@/data/apps";
import { SITE_CONFIG, type Locale } from "@/config/site";
import { AppShowcase } from "./AppShowcase";

export function Hero({ locale }: { locale: Locale }) {
  const isTr = locale === "tr";
  return (
    <section className="hero shell">
      <div className="hero-copy">
        <p className="eyebrow">Mergun</p>
        <h1>{SITE_CONFIG.tagline[locale]}</h1>
        <p className="lead">{SITE_CONFIG.description[locale]}</p>
        <div className="actions">
          <Link className="button primary" href={isTr ? "/uygulamalar" : "/en/apps"}>{isTr ? "Uygulamaları Keşfet" : "Explore Apps"}</Link>
          <Link className="button secondary" href={isTr ? "/uygulamalar/satir-arasi" : "/en/apps/satir-arasi"}>{isTr ? "Satır Arası’nı İncele" : "View Satır Arası"}</Link>
        </div>
      </div>
      <div className="hero-visual">
        <AppShowcase />
      </div>
    </section>
  );
}

export function AppCard({ app, locale }: { app: AppInfo; locale: Locale }) {
  const data = app[locale];
  return (
    <article className="app-card">
      <div className="app-card-top">
        <span className="app-icon-shell"><Image src={app.icon} alt="" width={52} height={52} /></span>
        <span className={`status ${data.status}`}>{data.statusLabel}</span>
      </div>
      <h3>{data.name}</h3>
      <p>{data.summary}</p>
      <dl className="mini-spec">
        <div><dt>Platform</dt><dd>{app.platform}</dd></div>
      </dl>
      <div className="card-actions">
        <Link className="text-link" href={data.detailPath}>{locale === "tr" ? "Detayları Gör" : "View Details"}</Link>
        <Link className="text-link muted" href={data.privacyPath}>{locale === "tr" ? "Gizlilik" : "Privacy"}</Link>
      </div>
    </article>
  );
}

export function AppsGrid({ locale }: { locale: Locale }) {
  return <div className="apps-grid">{apps.map((app) => <AppCard key={app.key} app={app} locale={locale} />)}</div>;
}

export function Values({ locale }: { locale: Locale }) {
  const values = locale === "tr"
    ? [["Sadelik", "Gereksiz karmaşadan arınmış, amacı net ürünler."], ["Gizlilik", "Varsayılan olarak az veri, açık beyan ve takipten uzak deneyim."], ["Kullanılabilirlik", "Mobilde hızlı, anlaşılır ve erişilebilir akışlar."], ["Özenli geliştirme", "Küçük ayrıntılara dikkat eden sürdürülebilir ürün yaklaşımı."]]
    : [["Simplicity", "Focused products without unnecessary complexity."], ["Privacy", "Less data by default, clear statements and no tracking."], ["Usability", "Fast, understandable and accessible mobile flows."], ["Thoughtful development", "A sustainable product approach that respects small details."]];
  return <div className="value-grid">{values.map(([title, text]) => <article key={title} className="value-card"><h3>{title}</h3><p>{text}</p></article>)}</div>;
}

export function Screenshots({ locale }: { app: AppInfo; locale: Locale }) {
  const label = locale === "tr" ? "Gerçek ekran görüntüsü bulunmuyor" : "No verified screenshot available";
  return (
    <div className="screenshot-grid">
      {[0, 1, 2].map((index) => (
        <div className="screenshot-placeholder" key={index}>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}

export function SupportEmail() {
  return <a className="button primary" href={`mailto:${SITE_CONFIG.supportEmail}`}>{SITE_CONFIG.supportEmail}</a>;
}
