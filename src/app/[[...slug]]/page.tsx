import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SiteChrome } from "@/components/SiteChrome";
import { AppsGrid, Hero, Screenshots, SupportEmail, Values } from "@/components/Sections";
import { SITE_CONFIG, type Locale } from "@/config/site";
import { apps } from "@/data/apps";
import { localeFromPath, routePairs } from "@/lib/routes";
import { pageMetadata } from "@/lib/metadata";

type Params = { slug?: string[] };

export const dynamicParams = false;

function pathFromParams(params: Params) {
  return `/${params.slug?.join("/") ?? ""}`.replace(/\/$/, "") || "/";
}

export function generateStaticParams() {
  return Object.keys(routePairs).map((path) => ({ slug: path === "/" ? [] : path.slice(1).split("/") }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const resolved = await params;
  const path = pathFromParams(resolved);
  const locale = localeFromPath(path);
  const isTr = locale === "tr";
  const map: Record<string, { title: string; description: string }> = {
    "/": { title: "Mergun", description: SITE_CONFIG.description.tr },
    "/en": { title: "Mergun", description: SITE_CONFIG.description.en },
    "/uygulamalar": { title: "Uygulamalar", description: "Mergun tarafından geliştirilen mobil uygulamalar." },
    "/en/apps": { title: "Apps", description: "Mobile apps developed by Mergun." },
    "/gizlilik": { title: "Gizlilik Politikası", description: "Mergun web sitesinin mevcut gizlilik yaklaşımı." },
    "/en/privacy": { title: "Privacy Policy", description: "The current privacy approach of the Mergun website." },
    "/kvkk": { title: "KVKK Bilgilendirmesi", description: "Mergun web sitesinin mevcut teknik işleyişine göre sade KVKK bilgilendirmesi." },
    "/hakkinda": { title: "Hakkında", description: "Mergun bağımsız geliştirici markası hakkında." },
    "/en/about": { title: "About", description: "About Mergun, an independent developer brand." },
    "/destek": { title: "Destek", description: "Mergun uygulamaları için destek ve sık sorulan sorular." },
    "/en/support": { title: "Support", description: "Support and frequently asked questions for Mergun apps." },
  };
  for (const app of apps) {
    map[app.tr.detailPath] = { title: app.tr.name, description: app.tr.subtitle };
    map[app.en.detailPath] = { title: app.en.name, description: app.en.subtitle };
    map[app.tr.privacyPath] = { title: `${app.tr.name} Gizlilik Politikası`, description: `${app.tr.name} uygulamasının gizlilik politikası.` };
    map[app.en.privacyPath] = { title: `${app.en.name} Privacy Policy`, description: `Privacy policy for the ${app.en.name} app.` };
    map[app.tr.supportPath] = { title: `${app.tr.name} Destek`, description: `${app.tr.name} için destek ve iletişim bilgileri.` };
    map[app.en.supportPath] = { title: `${app.en.name} Support`, description: `Support and contact information for ${app.en.name}.` };
    app.tr.legalLinks?.forEach((link) => {
      map[link.href] = { title: `${app.tr.name} ${link.label}`, description: `${app.tr.name} için ${link.label.toLowerCase()}.` };
    });
  }
  map["/uygulamalar/sheet2contacts"] = {
    title: "Sheet2Contacts - XLSX ve CSV'den Android rehberine kişi aktarma",
    description: "Sheet2Contacts ile XLSX ve CSV dosyalarındaki kişileri cihaz üzerinde önizleyip Android rehberine kontrollü biçimde aktarın.",
  };
  map["/uygulamalar/sheet2contacts/gizlilik"] = {
    title: "Sheet2Contacts Gizlilik Politikası",
    description: "Sheet2Contacts uygulamasında dosya, rehber izni, reklam/analitik durumu ve cihaz üzerinde veri işleme yaklaşımı.",
  };
  map["/uygulamalar/sheet2contacts/kvkk"] = {
    title: "Sheet2Contacts KVKK Aydınlatma Metni",
    description: "Sheet2Contacts için cihaz üzerinde işlenen kişi bilgileri, amaçlar, izinler ve başvuru iletişimi.",
  };
  map["/uygulamalar/sheet2contacts/kullanim-kosullari"] = {
    title: "Sheet2Contacts Kullanım Koşulları",
    description: "Sheet2Contacts kullanımında dosya seçimi, önizleme, rehbere kayıt ve kullanıcı sorumlulukları.",
  };
  map["/uygulamalar/sheet2contacts/destek"] = {
    title: "Sheet2Contacts Destek",
    description: "Sheet2Contacts için destek, sık sorulan sorular ve güvenli e-posta paylaşımı.",
  };
  map["/en/apps/sheet2contacts"] = {
    title: "Sheet2Contacts - Import contacts from XLSX and CSV to Android",
    description: "Preview contacts from XLSX and CSV files on device and import them to Android contacts with user approval.",
  };
  map["/en/apps/sheet2contacts/privacy"] = {
    title: "Sheet2Contacts Privacy Policy",
    description: "Privacy details for Sheet2Contacts file processing, contact permissions and on-device operation.",
  };
  return pageMetadata(map[path] ? { ...map[path], path } : { title: isTr ? "Sayfa" : "Page", description: SITE_CONFIG.description[locale], path });
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const resolved = await params;
  const path = pathFromParams(resolved);
  const locale = localeFromPath(path);
  if (!routePairs[path]) notFound();
  return <SiteChrome locale={locale} path={path}>{renderPage(path, locale)}</SiteChrome>;
}

function SectionHeader({ eyebrow, title, text }: { eyebrow?: string; title: string; text?: string }) {
  return <div className="section-header">{eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}<h2>{title}</h2>{text ? <p>{text}</p> : null}</div>;
}

function renderPage(path: string, locale: Locale) {
  const isTr = locale === "tr";
  if (path === "/" || path === "/en") return <><Hero locale={locale} /><section className="section shell"><SectionHeader eyebrow={isTr ? "Uygulamalar" : "Apps"} title={isTr ? "Mergun uygulamaları" : "Mergun apps"} text={isTr ? "Satır Arası, Zar At, Sheet2Contacts ve Kimin Eseri aynı sade tasarım, açık gizlilik ve pratik kullanım yaklaşımıyla sunulur." : "Satır Arası, Dice Roller, Sheet2Contacts and Kimin Eseri share the same focus on simple design, clear privacy and practical use."} /><AppsGrid locale={locale} /></section><section className="section shell"><SectionHeader title={isTr ? "Ürün değerleri" : "Product values"} /><Values locale={locale} /></section></>;
  if (path === "/uygulamalar" || path === "/en/apps") return <section className="page-section shell"><SectionHeader eyebrow="Mergun" title={isTr ? "Uygulamalar" : "Apps"} text={isTr ? "Tüm uygulamalar merkezi veri yapısından yönetilir; mağaza bağlantısı bilinmeyen ürünlerde sahte bağlantı gösterilmez." : "All apps are managed from central data; products without a known store URL do not show fake links."} /><AppsGrid locale={locale} /></section>;
  if (path === "/hakkinda" || path === "/en/about") return <TextPage locale={locale} title={isTr ? "Mergun hakkında" : "About Mergun"} paragraphs={isTr ? ["Mergun, faydalı fikirleri sade ve erişilebilir dijital ürünlere dönüştürmek amacıyla oluşturulmuş bağımsız bir geliştirici markasıdır.", "Odak alanı mobil uygulama geliştirme, kullanıcı deneyimi, gizlilik, sade tasarım ve sürekli iyileştirmedir. Mergun kendisini büyük bir şirket gibi konumlandırmadan, küçük ama özenli ürünler geliştirmeyi hedefler."] : ["Mergun is an independent developer brand created to turn useful ideas into simple and accessible digital products.", "The focus is mobile app development, user experience, privacy, simple design and continuous improvement. Mergun aims to build small but thoughtful products without presenting itself as a large company."]} />;
  if (path === "/destek" || path === "/en/support") return <SupportPage locale={locale} />;
  if (path === "/gizlilik" || path === "/en/privacy") return <SitePrivacy locale={locale} />;
  if (path === "/kvkk") return <KvkkPage />;
  const supportApp = apps.find((app) => path === app[locale].supportPath);
  if (supportApp) return <AppSupportPage app={supportApp} locale={locale} />;
  const legalPage = getAppLegalPage(path);
  if (legalPage) return <LegalTextPage {...legalPage} />;
  const appMatch = apps.find((app) => path === app[locale].detailPath || path === app[locale].privacyPath);
  if (appMatch?.key === "sheet2contacts") return <Sheet2ContactsDetail app={appMatch} locale={locale} />;
  if (appMatch) return <AppDetail app={appMatch} locale={locale} />;
  return null;
}

function TextPage({ locale, title, paragraphs }: { locale: Locale; title: string; paragraphs: string[] }) {
  return <section className="page-section shell narrow" lang={locale}><p className="eyebrow">Mergun</p><h1>{title}</h1>{paragraphs.map((p) => <p key={p} className="body-text">{p}</p>)}</section>;
}

function AppDetail({ app, locale }: { app: (typeof apps)[number]; locale: Locale }) {
  const data = app[locale];
  const isTr = locale === "tr";
  const schema = { "@context": "https://schema.org", "@type": "SoftwareApplication", name: data.name, applicationCategory: "MobileApplication", operatingSystem: "Android", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, author: { "@type": "Organization", name: "Mergun" } };
  return (
    <section className="page-section shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="app-hero">
        <span className="app-icon-shell app-icon-shell-large"><Image src={app.icon} alt="" width={72} height={72} /></span>
        <div><span className={`status ${data.status}`}>{data.statusLabel}</span><h1>{data.name}</h1><p className="lead">{data.subtitle}</p></div>
      </div>
      <div className="actions">
        {app.storeUrl ? <a className="button primary" href={app.storeUrl} target="_blank" rel="noopener noreferrer">Google Play</a> : <span className="button disabled">{isTr ? "Google Play bağlantısı mevcut değil" : "Google Play link is not available"}</span>}
        <Link className="button secondary" href={data.privacyPath}>{isTr ? "Gizlilik Politikası" : "Privacy Policy"}</Link>
        <Link className="button secondary" href={data.supportPath}>{isTr ? "Destek" : "Support"}</Link>
      </div>
      <div className="two-col">
        <section><h2>{data.features.length ? (isTr ? "Özellikler" : "Features") : (isTr ? "Planlanan özellikler" : "Planned features")}</h2><ul className="check-list">{(data.features.length ? data.features : data.plannedFeatures ?? []).map((f) => <li key={f}>{f}</li>)}</ul>{data.plannedFeatures?.length && data.features.length ? <><h3 className="subheading">{isTr ? "Ek notlar" : "Additional notes"}</h3><ul className="check-list">{data.plannedFeatures.map((f) => <li key={f}>{f}</li>)}</ul></> : null}</section>
        <section><h2>{isTr ? "Teknik bilgiler" : "Technical details"}</h2><dl className="spec-list">{Object.entries(data.technical).map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl></section>
      </div>
      {data.legalLinks?.length ? <section className="section"><SectionHeader title={isTr ? "Hukuki bağlantılar" : "Legal links"} text={isTr ? `${data.name} için destek, gizlilik ve kullanım bilgilerine buradan erişebilirsiniz.` : `Support, privacy and usage information for ${data.name} is available here.`} /><div className="legal-link-grid">{data.legalLinks.map((link) => <Link className="button secondary" key={link.href} href={link.href}>{link.label}</Link>)}<Link className="button secondary" href={data.supportPath}>{isTr ? "Destek" : "Support"}</Link></div></section> : null}
      <section className="section"><SectionHeader title={isTr ? "Ekran görüntüleri" : "Screenshots"} text={isTr ? "Gerçek ekran görüntüleri eklendiğinde bu alan veri yapısından otomatik güncellenebilir." : "When real screenshots are added, this area can be updated from the data structure."} /><Screenshots app={app} locale={locale} /></section>
    </section>
  );
}

function Sheet2ContactsDetail({ app, locale }: { app: (typeof apps)[number]; locale: Locale }) {
  const data = app[locale];
  const isTr = locale === "tr";
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Sheet2Contacts",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Android",
    author: { "@type": "Organization", name: "Mergun" },
    url: `${SITE_CONFIG.siteUrl}${data.detailPath}`,
    image: `${SITE_CONFIG.siteUrl}${app.icon}`,
  };
  const steps = isTr ? [
    "XLSX veya UTF-8 CSV dosyasını Android dosya seçiciyle seçin.",
    "Uygulamanın bulduğu ad-soyad ve telefon alanlarını önizleyin.",
    "Hatalı, eksik veya tekrarlanan kayıtları kontrol edin.",
    "Yalnızca onayladığınız kişileri Android rehberine aktarın.",
  ] : [
    "Choose an XLSX or UTF-8 CSV file with the Android document picker.",
    "Preview the name-surname and phone fields detected by the app.",
    "Review invalid, missing or duplicate records.",
    "Import only the approved contacts to Android contacts.",
  ];
  const privacyItems = isTr ? [
    "Dosya içeriği cihaz üzerinde işlenir; Mergun sunucularına dosya yükleme akışı bu sitede beyan edilmez.",
    "Rehber okuma ve yazma izinleri, mevcut kayıtları kontrol etmek ve onaylanan kişileri kaydetmek için kullanılır.",
    "Üretim sürümü için bu sayfada reklam veya analitik SDK’sı kullanıldığı iddia edilmez.",
  ] : [
    "File contents are processed on device; this site does not state that files are uploaded to Mergun servers.",
    "Read and write contacts permissions are used to check existing contacts and save approved people.",
    "This page does not state that the production version uses advertising or analytics SDKs.",
  ];
  const limits = isTr ? [
    "Kişi verisi içeren dosyaları yalnızca yetkili olduğunuz durumlarda kullanın.",
    "Aktarım öncesi önizleme ve eşleştirme sonuçlarını kontrol edin.",
    "Uygulamayı kaldırmak, Android rehberine eklenmiş kişileri kendiliğinden silmez.",
  ] : [
    "Use files containing contact data only when you are authorized to do so.",
    "Review preview and mapping results before importing.",
    "Uninstalling the app does not automatically remove contacts added to Android contacts.",
  ];

  return (
    <section className="page-section shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="app-hero">
        <span className="app-icon-shell app-icon-shell-large"><Image src={app.icon} alt="" width={72} height={72} /></span>
        <div><span className={`status ${data.status}`}>{data.statusLabel}</span><h1>{data.name}</h1><p className="lead">{data.subtitle}</p></div>
      </div>
      <div className="actions">
        <span className="button disabled">{isTr ? "Google Play bağlantısı henüz yok" : "Google Play link is not available yet"}</span>
        <Link className="button secondary" href={data.supportPath}>{isTr ? "Destek" : "Support"}</Link>
        <Link className="button secondary" href={data.privacyPath}>{isTr ? "Gizlilik Politikası" : "Privacy Policy"}</Link>
      </div>
      <div className="two-col">
        <section>
          <h2>{isTr ? "Ne işe yarar?" : "What it does"}</h2>
          <p className="body-text">{isTr ? "Sheet2Contacts, tablo dosyalarındaki kişi kayıtlarını doğrudan rehbere aktarmadan önce görmenizi, kontrol etmenizi ve yalnızca onayladığınız kayıtları Android rehberine eklemenizi sağlar." : "Sheet2Contacts helps you preview and review people from spreadsheet files before adding only approved records to Android contacts."}</p>
          <ul className="check-list">{data.features.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
        <section>
          <h2>{isTr ? "Teknik bilgiler" : "Technical details"}</h2>
          <dl className="spec-list">{Object.entries(data.technical).map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
        </section>
      </div>
      <section className="section">
        <SectionHeader title={isTr ? "Nasıl çalışır?" : "How it works"} />
        <ol className="check-list">{steps.map((step) => <li key={step}>{step}</li>)}</ol>
      </section>
      <div className="two-col">
        <section>
          <h2>{isTr ? "Gizlilik özeti" : "Privacy summary"}</h2>
          <ul className="check-list">{privacyItems.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
        <section>
          <h2>{isTr ? "Kullanım sınırları" : "Usage limits"}</h2>
          <ul className="check-list">{limits.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
      </div>
      <section className="section">
        <SectionHeader title={isTr ? "Destek ve hukuki bilgiler" : "Support and legal information"} text={isTr ? "Destek, gizlilik ve kullanım bilgileri Sheet2Contacts sayfalarında ayrı tutulur." : "Support, privacy and usage information is kept in separate Sheet2Contacts pages."} />
        <div className="legal-link-grid">
          {data.legalLinks?.map((link) => <Link className="button secondary" key={link.href} href={link.href}>{link.label}</Link>)}
          <Link className="button secondary" href={data.supportPath}>{isTr ? "Destek" : "Support"}</Link>
        </div>
      </section>
    </section>
  );
}

function SitePrivacy({ locale }: { locale: Locale }) {
  const isTr = locale === "tr";
  return <TextPage locale={locale} title={isTr ? "Gizlilik Politikası" : "Privacy Policy"} paragraphs={isTr ? ["Bu web sitesinin başlangıç sürümü hesap oluşturmaz, iletişim formu kullanmaz, analytics veya reklam aracı içermez ve takip çerezi yerleştirmez.", "Site, kişisel veri toplamayı amaçlamaz. Teknik olarak zorunlu barındırma günlükleri seçilecek hosting sağlayıcısı tarafından işlenebilir; henüz kesin sağlayıcı belirtilmediği için bu konuda sağlayıcı adı uydurulmamıştır.", "Çerez kullanılmadığı için çerez banner’ı gösterilmez. İleride analytics, reklam veya veri işleyen özellikler eklenirse bu politika güncellenecektir."] : ["The initial version of this website does not create accounts, use contact forms, include analytics or advertising tools, or place tracking cookies.", "The site does not aim to collect personal data. Technically necessary hosting logs may be processed by the selected hosting provider; no provider name is invented before a final provider is chosen.", "Because cookies are not used, no cookie banner is shown. If analytics, advertising or data-processing features are added later, this policy will be updated."]} />;
}

function KvkkPage() {
  return <TextPage locale="tr" title="KVKK Bilgilendirmesi" paragraphs={["Bu sitenin başlangıç sürümü iletişim formu, hesap sistemi, analytics veya reklam içermez. Site üzerinden doğrudan kişisel veri toplanması amaçlanmaz.", "Kullanıcı gönüllü olarak e-posta gönderirse, paylaştığı bilgiler destek talebini yanıtlamak amacıyla işlenebilir.", "İleride veri işleyen özellikler eklenirse aydınlatma metni güncellenecektir.", "Bu metin, sitenin mevcut teknik işleyişine göre hazırlanmıştır ve gerektiğinde güncellenecektir."]} />;
}

function SupportPage({ locale }: { locale: Locale }) {
  const isTr = locale === "tr";
  return <section className="page-section shell"><SectionHeader eyebrow="Mergun" title={isTr ? "Destek" : "Support"} text={isTr ? "Genel destek için e-posta gönderebilir veya aşağıdan ilgili uygulamanın destek sayfasını açabilirsiniz." : "For general support, send an email or choose the relevant app support page below."} /><div className="two-col support-options"><section><h2>{isTr ? "E-posta ile destek" : "Email support"}</h2><SupportEmail /></section><section><h2>{isTr ? "Uygulama destek sayfaları" : "App support pages"}</h2><div className="legal-link-grid">{apps.map((app) => <Link className="button secondary" key={app.key} href={app[locale].supportPath}>{app[locale].name}</Link>)}</div></section></div><section className="section"><SectionHeader title={isTr ? "Uygulama seçenekleri" : "Choose an app"} /><AppsGrid locale={locale} /></section></section>;
}

function AppSupportPage({ app, locale }: { app: (typeof apps)[number]; locale: Locale }) {
  const data = app[locale];
  const isTr = locale === "tr";
  if (app.key === "sheet2contacts") {
    const supportItems = isTr ? [
      "Android sürümü ve cihaz modeli",
      "Dosya türü: XLSX veya UTF-8 CSV",
      "Sorunun dosya seçimi, önizleme, mükerrer kontrol veya rehbere kayıt adımında mı yaşandığı",
      "Kişisel verileri maskeleyerek paylaşabileceğiniz hata mesajı veya ekran görüntüsü",
    ] : [
      "Android version and device model",
      "File type: XLSX or UTF-8 CSV",
      "Whether the issue happens during file selection, preview, duplicate checking or contact import",
      "Any error message or screenshot you can share after masking personal data",
    ];
    const faq = isTr ? [
      ["Uygulama dosyamı internete yüklüyor mu?", "Bu sitedeki açıklama, dosya içeriğinin cihaz üzerinde işlendiği ve Mergun sunucularına dosya yükleme akışı beyan edilmediği temeline dayanır."],
      ["Rehber izni neden istenir?", "Mevcut rehber kayıtlarını kontrol etmek ve onayladığınız kişileri Android rehberine eklemek için rehber okuma/yazma izinleri gerekir."],
      ["Uygulamayı silersem eklenen kişiler silinir mi?", "Hayır. Android rehberine eklenmiş kişiler uygulama kaldırılınca kendiliğinden silinmez; kişiler cihazın rehber uygulamasından yönetilmelidir."],
      ["Hangi dosya türleri desteklenir?", "Site içeriği XLSX ve UTF-8 CSV dosyalarına göre hazırlanmıştır."],
    ] : [
      ["Does the app upload my file to the internet?", "This site states that file contents are processed on device and does not state a file-upload flow to Mergun servers."],
      ["Why is contacts permission requested?", "Read/write contacts permissions are needed to check existing contacts and add approved people to Android contacts."],
      ["Will imported contacts be removed if I uninstall the app?", "No. Contacts added to Android contacts are not automatically deleted when the app is uninstalled."],
      ["Which file types are supported?", "The site content is prepared for XLSX and UTF-8 CSV files."],
    ];
    return (
      <section className="page-section shell narrow">
        <p className="eyebrow">{data.name}</p>
        <h1>{data.name} {isTr ? "Destek" : "Support"}</h1>
        <p className="body-text">{isTr ? "Sheet2Contacts için destek talebinizde kişisel veri içeren dosyaları doğrudan göndermeden önce gerçekten gerekli olup olmadığını değerlendirin. Mümkünse sorunu örnek veya maskelemiş veriyle açıklayın." : "For Sheet2Contacts support, consider whether sending files with personal data is really necessary. When possible, explain the issue with sample or masked data."}</p>
        <div className="actions">
          <a className="button primary" href={`mailto:${SITE_CONFIG.supportEmail}?subject=${encodeURIComponent("Sheet2Contacts destek talebi")}`}>{SITE_CONFIG.supportEmail}</a>
          <Link className="button secondary" href={data.detailPath}>{isTr ? "Uygulama Detayı" : "App Details"}</Link>
        </div>
        <section className="legal-block">
          <h2>{isTr ? "E-postaya eklenebilecek bilgiler" : "Useful details to include"}</h2>
          <ul>{supportItems.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
        <section className="legal-block">
          <h2>{isTr ? "Sık sorulan sorular" : "FAQ"}</h2>
          <ul>{faq.map(([question, answer]) => <li key={question}><strong>{question}</strong><br />{answer}</li>)}</ul>
        </section>
        {data.legalLinks?.length ? <section className="legal-block"><h2>{isTr ? "İlgili sayfalar" : "Related pages"}</h2><div className="legal-link-grid">{data.legalLinks.map((link) => <Link className="button secondary" key={link.href} href={link.href}>{link.label}</Link>)}</div></section> : null}
      </section>
    );
  }
  const supportItems = isTr ? [
    "Uygulama adı, cihaz modeli ve Android sürümü",
    "Sorunun hangi adımda yaşandığı",
    "Varsa hata mesajı veya ekran görüntüsü",
  ] : [
    "App name, device model and Android version",
    "The step where the issue happens",
    "Any error message or screenshot, if available",
  ];
  return (
    <section className="page-section shell narrow">
      <p className="eyebrow">{data.name}</p>
      <h1>{data.name} {isTr ? "Destek" : "Support"}</h1>
      <p className="body-text">{isTr ? `${data.name} ile ilgili destek talepleri için ${SITE_CONFIG.supportEmail} adresine e-posta gönderebilirsiniz.` : `For support requests about ${data.name}, email ${SITE_CONFIG.supportEmail}.`}</p>
      <div className="actions">
        <a className="button primary" href={`mailto:${SITE_CONFIG.supportEmail}?subject=${encodeURIComponent(`${data.name} destek talebi`)}`}>{SITE_CONFIG.supportEmail}</a>
        <Link className="button secondary" href={data.detailPath}>{isTr ? "Uygulama Detayı" : "App Details"}</Link>
      </div>
      <section className="legal-block">
        <h2>{isTr ? "E-postaya eklenebilecek bilgiler" : "Useful details to include"}</h2>
        <ul>{supportItems.map((item) => <li key={item}>{item}</li>)}</ul>
      </section>
      {data.legalLinks?.length ? <section className="legal-block"><h2>{isTr ? "İlgili hukuki sayfalar" : "Related legal pages"}</h2><div className="legal-link-grid">{data.legalLinks.map((link) => <Link className="button secondary" key={link.href} href={link.href}>{link.label}</Link>)}</div></section> : null}
    </section>
  );
}

function LegalTextPage({ locale, title, intro, sections }: { locale: Locale; title: string; intro: string; sections: [string, string[]][] }) {
  return <section className="page-section shell narrow" lang={locale}><p className="eyebrow">Mergun</p><h1>{title}</h1><p className="body-text">{intro}</p>{sections.map(([heading, items]) => <section className="legal-block" key={heading}><h2>{heading}</h2><ul>{items.map((item) => <li key={item}>{renderLegalItem(item)}</li>)}</ul></section>)}</section>;
}

function renderLegalItem(item: string) {
  const marker = "[[KIMIN_ESERI_ACCOUNT_DELETION_EMAIL]]";
  if (!item.includes(marker)) return item;
  const [before, after] = item.split(marker);
  const subject = encodeURIComponent("Kimin Eseri Hesap Silme Talebi");
  return <>{before}<a className="text-link" href={`mailto:${SITE_CONFIG.supportEmail}?subject=${subject}`}>{SITE_CONFIG.supportEmail}</a>{after}</>;
}

function getAppLegalPage(path: string) {
  const support = SITE_CONFIG.supportEmail;
  const privacy = SITE_CONFIG.privacyEmail;
  const pages: Record<string, { locale: Locale; title: string; intro: string; sections: [string, string[]][] }> = {
    "/uygulamalar/satir-arasi/kvkk": {
      locale: "tr",
      title: "Satır Arası KVKK Bilgilendirmesi",
      intro: "Bu aydınlatma metni, Satır Arası uygulamasında hesap, profil, alıntı paylaşımı ve topluluk etkileşimi için işlenen verileri açıklar.",
      sections: [
        ["Veri kategorileri", ["Uygulamanın kimlik doğrulama sistemi tarafından işlenen e-posta adresi ve kullanıcı kimliği; kullanıcı adı; profil bilgileri; kullanıcı tarafından paylaşılan alıntı içerikleri; beğeni, favori, başarım, XP/seviye ve istatistik kayıtları; rapor ve moderasyon kayıtları; hesap silme talebi kayıtları işlenebilir."]],
        ["İşleme amaçları", ["Hesap oluşturma ve giriş, alıntı paylaşımı ve keşfi, kişisel koleksiyon oluşturma, sosyal etkileşim, kötüye kullanımı önleme, moderasyon, güvenlik ve hesap silme taleplerini yürütme amaçlarıyla veri işlenir."]],
        ["Toplama yöntemi ve aktarım", ["Veriler kullanıcının uygulama içi işlemleri, girdiği bilgiler ve uygulamanın kimlik doğrulama, veritabanı ve güvenlik altyapısı üzerinden oluşur. Bu altyapı nedeniyle ilgili teknik veriler uygulama hizmetini sunmak ve güvenliği sağlamak için işlenebilir."]],
        ["Başvuru ve iletişim", [`KVKK kapsamındaki talepler için ${privacy} adresine, destek ve hesap silme talepleri için ${support} adresine yazabilirsiniz. E-posta ile parola istenmez; kimlik doğrulama için yalnızca talebin ilgili hesaba ait olduğunu anlamaya yarayan sınırlı bilgiler istenebilir.`]],
      ],
    },
    "/uygulamalar/satir-arasi/gizlilik": {
      locale: "tr",
      title: "Satır Arası Gizlilik Politikası",
      intro: "Satır Arası, alıntı keşfi ve paylaşımı için hesap, kullanıcı içeriği ve topluluk etkileşimi kullanan bir mobil uygulamadır.",
      sections: [
        ["Hesap ve profil", ["Uygulama hesap oluşturma ve giriş için bir kimlik doğrulama sistemi kullanır. E-posta adresi giriş amacıyla işlenir; herkese açık profilde e-posta adresi yerine kullanıcı adı gibi görünür bilgiler kullanılmalıdır."]],
        ["Kullanıcı içerikleri", ["Paylaşılan alıntılar, alıntı başlığı, tür, eser/kişi bilgileri, karakter, sezon/bölüm, etiket ve spoiler bilgisi diğer kullanıcılar tarafından görülebilir. Beğeni ve benzeri sosyal etkileşimler uygulama deneyiminin parçasıdır."]],
        ["Favoriler ve özel alanlar", ["Favoriler veya kaydedilen içerikler kişisel koleksiyon amacıyla tutulur. Bu alanlar herkese açık alıntı paylaşımından farklıdır ve uygulama işlevini sunmak için kullanılır."]],
        ["Moderasyon ve güvenlik", ["Raporlar, moderasyon kayıtları ve uygulamanın güvenlik kontrollerine ait teknik veriler kötüye kullanımı önlemek, güvenli topluluk deneyimi sağlamak ve ihlal bildirimlerini değerlendirmek için tutulabilir."]],
        ["İletişim", [`Gizlilik soruları için ${privacy}, destek ve hesap silme talepleri için ${support} adresi kullanılabilir.`]],
      ],
    },
    "/uygulamalar/satir-arasi/kullanim-kosullari": {
      locale: "tr",
      title: "Satır Arası Kullanım Koşulları",
      intro: "Satır Arası’nı kullanarak bu koşullara, hukuka ve diğer kullanıcıların haklarına uygun davranmayı kabul edersiniz.",
      sections: [
        ["Hesap kullanımı", ["Hesabınızla yapılan işlemlerden siz sorumlusunuz. Başkasının hesabına erişmeye çalışamaz, yanıltıcı profil bilgileriyle topluluğu kötüye kullanamazsınız."]],
        ["Alıntı paylaşımı", ["Paylaştığınız alıntıların doğruluğu, bağlamı ve hukuka uygunluğu sizin sorumluluğunuzdadır. Telif hakkı, kişilik hakkı veya üçüncü kişi haklarını ihlal eden içerikler paylaşılmamalıdır."]],
        ["Uygunsuz kullanım", ["Spam, taciz, nefret söylemi, tehdit, manipülasyon, otomatik kötüye kullanım veya güvenlik kontrollerini aşma girişimleri yasaktır."]],
        ["Moderasyon", ["Mergun, bildirilen veya kuralları ihlal ettiği değerlendirilen içerikleri sınırlandırabilir, kaldırabilir veya ilgili hesap üzerinde güvenlik ve moderasyon önlemleri uygulayabilir."]],
      ],
    },
    "/uygulamalar/satir-arasi/topluluk-kurallari": {
      locale: "tr",
      title: "Satır Arası Topluluk Kuralları",
      intro: "Bu kurallar, Satır Arası içinde güvenli ve saygılı bir paylaşım ortamı hedefiyle hazırlanmıştır.",
      sections: [
        ["Saygılı paylaşım", ["Hakaret, hedef gösterme, nefret söylemi, taciz veya tehdit içeren içerikler paylaşılmamalıdır.", "Spoiler içerebilecek alıntılar, uygulama destekliyorsa spoiler kontrolüne uygun biçimde işaretlenmelidir."]],
        ["Telif ve kaynak", ["Alıntılar paylaşılırken eserin adı ve bağlamı doğru verilmeli, uzun veya izinsiz içerik kopyalamaktan kaçınılmalıdır.", "Başka kullanıcıların emeğini sahiplenmek veya yanıltıcı kaynak göstermek topluluk güvenini zedeler."]],
        ["Raporlama", ["Kural ihlali olduğunu düşündüğünüz içerikleri uygulama içindeki raporlama araçlarıyla bildirebilirsiniz. Raporlar kötüye kullanımı önleme ve moderasyon amacıyla değerlendirilir."]],
        ["Yaptırımlar", ["Kural ihlali içerikler sınırlandırılabilir veya kaldırılabilir. Tekrarlanan ya da ağır ihlaller hesap özelliklerinin kısıtlanmasına yol açabilir."]],
      ],
    },
    "/uygulamalar/satir-arasi/hesap-silme": {
      locale: "tr",
      title: "Satır Arası Hesap Silme",
      intro: "Satır Arası hesabınızı uygulama içinden veya uygulamaya erişemiyorsanız destek e-postasıyla silme talebi oluşturarak kapatabilirsiniz.",
      sections: [
        ["Uygulama içinden silme", ["Profil > Ayarlar > Hesabımı Sil yolunu izleyerek silme talebi oluşturabilirsiniz. Talep sırasında mevcut şifre veya onay metni istenebilir; bu adım hesabın size ait olduğunu doğrulamak içindir."]],
        ["Uygulamaya erişemiyorsanız", [`Uygulamaya erişemiyorsanız ${support} adresine hesap silme talebinizi gönderebilirsiniz. Talebinizde kullanıcı adınızı ve hesabınızla ilişkili e-posta adresini belirtin; e-posta ile parolanızı göndermeyin, Mergun sizden parola istemez.`]],
        ["Silinebilecek veriler", ["Kimlik doğrulama hesabı, kullanıcı profili, kullanıcı adı rezervasyonu, alıntılar, beğeniler, favoriler, başarımlar ve istatistikler silme sürecine dahil edilebilir."]],
        ["Sınırlı tutulabilecek kayıtlar", ["Raporlar, moderasyon aksiyonları ve kötüye kullanımı önleme kayıtları güvenlik ve denetim amacıyla anonimleştirilmiş veya sınırlandırılmış biçimde tutulabilir. Uygulamayı telefondan kaldırmak hesabı tek başına silmez."]],
      ],
    },
    "/uygulamalar/dice-roller/gizlilik": {
      locale: "tr",
      title: "Zar At Gizlilik Politikası",
      intro: "Zar At; hesap, reklam, analitik veya bulut eşitleme gerektirmeyen, çevrimdışı çalışan bir zar uygulamasıdır.",
      sections: [
        ["Veri toplama", ["Zar At kişisel veri toplamaz, satmaz, iletmez veya paylaşmaz. Uygulama ad, e-posta, telefon, konum, rehber veya hesap erişimi istemez."]],
        ["İnternet ve üçüncü taraf hizmetleri", ["Okunan Android proje belgelerine göre uygulama internet izni, Firebase, reklam SDK’sı, analitik SDK’sı veya bulut hizmeti kullanmaz."]],
        ["Cihazdaki veriler", ["Uygulama yalnızca yerel tercihler ve son zar geçmişi gibi uygulama içi kullanım verilerini cihazda tutabilir. Bu bilgiler cihaz dışına gönderilmez."]],
        ["Silme", ["Zar geçmişi uygulama ayarları veya geçmiş ekranı üzerinden temizlenebilir. Uygulama kaldırıldığında uygulamanın kendi yerel verileri Android tarafından kaldırılır; bu işlem herhangi bir çevrimiçi hesap silme süreci gerektirmez."]],
        ["İletişim", [`Destek ve veri silme soruları için ${support} adresine yazabilirsiniz.`]],
      ],
    },
    "/uygulamalar/dice-roller/kvkk": {
      locale: "tr",
      title: "Zar At KVKK Aydınlatma Metni",
      intro: "Zar At kişisel veri toplamayan, hesap açtırmayan ve çevrimdışı çalışan bir uygulama olarak tasarlanmıştır.",
      sections: [
        ["Kişisel veri işleme", ["Uygulama içinde kullanıcı hesabı, kimlik bilgisi, iletişim bilgisi, konum, rehber veya benzeri kişisel veri işlenmez."]],
        ["Yerel uygulama verileri", ["Son zar geçmişi ve tercih gibi yerel bilgiler kişisel veri olarak amaçlanmaz; uygulama deneyimini göstermek için yalnızca cihazda tutulur."]],
        ["Aktarım", ["Uygulama internet izni istemediği için bu yerel verileri Mergun sunucularına veya üçüncü taraflara aktarmaz."]],
        ["Başvuru", [`Uygulamayla ilgili KVKK veya veri silme sorularınızı ${support} adresine gönderebilirsiniz.`]],
      ],
    },
    "/uygulamalar/dice-roller/kullanim-kosullari": {
      locale: "tr",
      title: "Zar At Kullanım Koşulları",
      intro: "Zar At, günlük kullanım için basit bir dijital zar aracıdır.",
      sections: [
        ["Kullanım amacı", ["Uygulama eğlence, masa oyunu veya rastgele zar sonucu gerektiren gündelik senaryolar için sunulur. Kritik, hukuki, finansal veya güvenlik etkisi olan kararlar için garanti verilen bir rastgelelik hizmeti değildir."]],
        ["Hesap ve ödeme", ["Uygulama hesap oluşturmayı gerektirmez. Bu sitede doğrulanmış bir Google Play bağlantısı bulunmadığı için mağaza bağlantısı gösterilmez."]],
        ["Sorumluluk", ["Zar sonuçlarının nasıl kullanılacağı kullanıcının sorumluluğundadır. Uygulama cihaz uyumluluğu ve işletim sistemi koşullarına göre farklı davranabilir."]],
        ["Destek", [`Sorular için ${support} adresine yazabilirsiniz.`]],
      ],
    },
    "/uygulamalar/dice-roller/topluluk-kurallari": {
      locale: "tr",
      title: "Zar At Topluluk Kuralları",
      intro: "Zar At içinde kullanıcı hesabı, profil, paylaşım alanı veya topluluk etkileşimi bulunmadığı için uygulama içi topluluk kuralları uygulanmaz.",
      sections: [
        ["Topluluk özelliği yoktur", ["Uygulama çevrimdışı bir zar aracıdır; kullanıcılar birbirleriyle uygulama içinde içerik paylaşmaz veya mesajlaşmaz."]],
        ["Destek iletişimi", [`Destek e-postası üzerinden iletişim kurarken saygılı ve konuya odaklı bir dil kullanmanız beklenir. Kötüye kullanım, tehdit veya spam içeren iletiler yanıtlanmayabilir.`]],
        ["Uygulama dışı alanlar", ["Mergun tarafından yönetilen başka bir platformda yorum veya değerlendirme yaparsanız, ilgili platformun kuralları ayrıca geçerli olur."]],
      ],
    },
    "/uygulamalar/dice-roller/hesap-silme": {
      locale: "tr",
      title: "Zar At Hesap / Veri Silme Bilgisi",
      intro: "Zar At hesap oluşturmadığı için silinecek çevrimiçi bir kullanıcı hesabı bulunmaz.",
      sections: [
        ["Hesap silme", ["Uygulamada üyelik, giriş veya bulut hesabı bulunmadığından hesap silme işlemi gerekmez."]],
        ["Yerel veri silme", ["Son zar geçmişi uygulama ayarları veya geçmiş ekranı üzerinden temizlenebilir. Uygulamanın kaldırılması, uygulamanın kendi yerel verilerini cihazdan kaldırır."]],
        ["Destek", [`Yerel veriler veya uygulama davranışı hakkında yardım gerekiyorsa ${support} adresine yazabilirsiniz.`]],
      ],
    },
    "/uygulamalar/sheet2contacts/gizlilik": {
      locale: "tr",
      title: "Sheet2Contacts Gizlilik Politikası",
      intro: "Sheet2Contacts, kullanıcının seçtiği XLSX veya UTF-8 CSV dosyalarındaki kişi bilgilerini cihaz üzerinde önizleyip kullanıcının onayıyla Android rehberine aktarmaya yardımcı olur. Son güncelleme: 9 Ekim 2026.",
      sections: [
        ["Dosya işleme", ["Uygulama, kullanıcının Android dosya seçiciyle belirlediği XLSX veya UTF-8 CSV dosyasını okur. Dosyadaki kişi bilgileri cihaz üzerinde işlenir; bu sitede dosyanın Mergun sunucularına yüklendiği veya bulutta işlendiği yönünde bir beyan yoktur.", "Dosya içeriği ad-soyad ve telefon numarası alanlarını bulmak, önizleme göstermek, hatalı veya tekrar eden kayıtları işaretlemek ve kullanıcının onayladığı kişileri rehbere aktarmak için kullanılır."]],
        ["Rehber izinleri", ["READ_CONTACTS izni, cihaz rehberinde mevcut kayıtları kontrol etmek ve mükerrer kişileri göstermek için kullanılır. WRITE_CONTACTS izni, kullanıcının onayladığı kişileri Android rehberine eklemek için kullanılır.", "İzin verilmezse mevcut rehberle karşılaştırma veya rehbere kayıt işlemi tamamlanamayabilir."]],
        ["Hesap, reklam ve analitik", ["Sheet2Contacts için bu sitede hesap sistemi beyan edilmez. Üretim sürümü için bu sayfada reklam SDK’sı, analitik SDK’sı veya reklam ölçüm akışı kullanıldığı iddia edilmez.", "İleride reklam, analitik, bulut eşitleme veya hesap gibi veri işleyen özellikler eklenirse bu politika güncellenmelidir."]],
        ["Cihazda kalan veriler", ["Rehbere eklenen kişiler Android rehberinde kalır. Uygulamayı kaldırmak, rehbere eklenmiş kişileri kendiliğinden silmez; bu kişiler cihazın Kişiler/Rehber uygulamasından veya bağlı rehber hesabından yönetilmelidir.", "Android sistemi uygulama önbelleğini ve yerel uygulama verilerini kendi kurallarına göre yönetebilir. Kullanıcı, cihaz ayarlarından uygulama verilerini temizleyebilir veya uygulamayı kaldırabilir."]],
        ["İletişim", [`Destek talepleri için ${support}, gizlilik soruları için ${privacy} adresine yazabilirsiniz. Destek e-postasına gerçek kişi listeleri veya kişisel veri içeren dosyalar göndermeden önce gerçekten gerekli olup olmadığını değerlendirin; mümkünse örnek veya maskelemiş veri kullanın.`]],
      ],
    },
    "/uygulamalar/sheet2contacts/kvkk": {
      locale: "tr",
      title: "Sheet2Contacts KVKK Aydınlatma Metni",
      intro: "Bu metin, Sheet2Contacts uygulamasının cihaz üzerinde işlediği kişi bilgilerine ilişkin sade bilgilendirme sağlar. Son güncelleme: 9 Ekim 2026.",
      sections: [
        ["Veri sorumlusu ve iletişim", [`Veri sorumlusu Mustafa Ergün (Mergun) olarak belirtilir. KVKK kapsamındaki başvuru, destek ve iletişim adresi ${support} adresidir. Gizlilik soruları için ${privacy} adresi de kullanılabilir.`]],
        ["İşlenen veri kategorileri", ["Kullanıcının seçtiği XLSX veya UTF-8 CSV dosyasındaki ad-soyad ve telefon numarası bilgileri cihaz üzerinde işlenir. Rehberde mevcut kayıtları kontrol etmek ve onaylanan kişileri kaydetmek için Android rehber verisine erişim izni kullanılabilir.", "Kullanıcı destek için e-posta gönderirse e-posta adresi, mesaj içeriği ve kullanıcının gönüllü olarak paylaştığı teknik bilgiler destek talebini yanıtlamak amacıyla işlenebilir."]],
        ["Toplama yöntemi ve işleme amacı", ["Kişi bilgileri, kullanıcının seçtiği dosya ve verdiği rehber izinleri üzerinden cihaz üzerinde işlenir. Amaç; önizleme sağlamak, hatalı veya tekrar eden kayıtları göstermek ve kullanıcının onayıyla kişileri Android rehberine eklemektir.", "Destek e-postasıyla paylaşılan bilgiler, destek talebini yanıtlamak ve sorunu anlamak amacıyla işlenir."]],
        ["Hukuki sebep ve alıcı grupları", ["Dosya ve rehber işleme, kullanıcının açık eylemi ve uygulama işlevini kullanma talebi kapsamında gerçekleşir. Destek iletişimi, kullanıcının başvurusu ve talebin yanıtlanması amacıyla yürütülür.", "Bu sitede kişi dosyalarının Mergun sunucularına aktarıldığı iddia edilmez. Destek için e-posta gönderilirse e-posta hizmeti sağlayıcıları ve teknik hizmet sağlayıcılar sınırlı rol üstlenebilir. Yetkili kurumlara aktarım ancak hukuki zorunluluk halinde yapılabilir."]],
        ["Saklama ve silme", ["Uygulama tarafından Android rehberine eklenen kişiler, rehber uygulamasında veya bağlı rehber hesabında kalır; uygulamanın kaldırılması bu kişileri kendiliğinden silmez.", "Destek e-postaları, talebin yanıtlanması ve makul kayıt yönetimi için e-posta sisteminde tutulabilir. Bu sayfada doğrulanmamış kesin saklama süresi verilmez."]],
      ],
    },
    "/uygulamalar/sheet2contacts/kullanim-kosullari": {
      locale: "tr",
      title: "Sheet2Contacts Kullanım Koşulları",
      intro: "Sheet2Contacts kullanırken seçtiğiniz dosyanın, eşleştirdiğiniz alanların ve rehbere eklenecek kişilerin sorumluluğu size aittir. Son güncelleme: 9 Ekim 2026.",
      sections: [
        ["Dosya seçimi ve yetki", ["Yalnızca işlem yapmaya yetkili olduğunuz XLSX veya UTF-8 CSV dosyalarını seçmelisiniz. Dosyada yer alan kişilerin rehbere aktarılması için gerekli izin, bilgilendirme veya hukuki dayanaklardan kullanıcı sorumludur."]],
        ["Önizleme ve eşleştirme", ["Aktarım öncesinde uygulamanın gösterdiği önizleme, alan eşleştirme, hata ve mükerrer kayıt uyarılarını kontrol etmelisiniz. Hatalı ad, numara veya eşleştirme sonuçlarının düzeltilmesi kullanıcının sorumluluğundadır."]],
        ["Rehbere kayıt ve senkronizasyon", ["Uygulama, kullanıcının onayladığı kayıtları Android rehberine eklemeye çalışır. Cihaz, Android sürümü, rehber sağlayıcısı veya bağlı hesap ayarlarına göre kayıt ve senkronizasyon davranışı değişebilir.", "Sheet2Contacts bir mesajlaşma, pazarlama otomasyonu veya toplu bildirim aracı olarak sunulmaz. Kişilere yapılacak arama, mesaj veya diğer iletişimlerden kullanıcı sorumludur."]],
        ["Yedekleme", ["Toplu aktarım öncesinde mevcut rehberinizi ve işlem yapacağınız dosyayı yedeklemeniz önerilir. Hatalı dosya, yanlış eşleştirme veya kullanıcı onayıyla yapılan aktarım sonuçlarından kullanıcı sorumludur."]],
        ["Destek", [`Sorular için ${support} adresine yazabilirsiniz.`]],
      ],
    },
    "/en/apps/sheet2contacts/privacy": {
      locale: "en",
      title: "Sheet2Contacts Privacy Policy",
      intro: "Sheet2Contacts helps preview people from user-selected XLSX or UTF-8 CSV files on device and import approved records to Android contacts. Last updated: October 9, 2026.",
      sections: [
        ["File processing", ["The app reads the XLSX or UTF-8 CSV file selected by the user through the Android document picker. Contact data is processed on device; this site does not state that files are uploaded to Mergun servers or processed in the cloud.", "File contents are used to find name-surname and phone number fields, show a preview, mark invalid or duplicate records, and import approved people to contacts."]],
        ["Contacts permissions", ["READ_CONTACTS is used to check existing contacts and show possible duplicates. WRITE_CONTACTS is used to add approved people to Android contacts.", "If permission is not granted, comparison with existing contacts or contact import may not be completed."]],
        ["Account, ads and analytics", ["This site does not state that Sheet2Contacts has an account system. This page does not claim that the production version uses an advertising SDK, analytics SDK or advertising measurement flow.", "If data-processing features such as advertising, analytics, cloud sync or accounts are added later, this policy should be updated."]],
        ["Data left on the device", ["People added to Android contacts remain in Android contacts. Uninstalling the app does not automatically delete imported contacts; they must be managed from the device Contacts app or the connected contacts account.", "Android may manage app cache and local app data according to system rules. The user can clear app data from device settings or uninstall the app."]],
        ["Contact", [`For support requests, email ${support}. For privacy questions, email ${privacy}. Avoid sending real contact lists or files with personal data unless truly necessary; use sample or masked data when possible.`]],
      ],
    },
    "/uygulamalar/kimin-eseri/gizlilik": {
      locale: "tr",
      title: "Kimin Eseri Gizlilik Politikası",
      intro: "Kimin Eseri; eser-sanatçı eşleştirmeleri, edebiyat dönemleri, destanlar ve sınav odaklı quizlerle hızlı tekrar yapmaya yardımcı olan bir mobil uygulamadır. Son güncelleme: 2 Ekim 2026.",
      sections: [
        ["Hesap verileri", ["Hesap oluşturma ve giriş akışında kullanıcı adı ve e-posta adresi işlenebilir. E-posta adresi kimlik doğrulama amacıyla kullanılır; herkese açık profil veya liderlik alanlarında e-posta adresi yerine kullanıcı adı gibi uygulama içi bilgiler kullanılır.", "Uygulama, hesaba ait teknik kullanıcı kimliği ve oturum/güvenlik kayıtları gibi hesabı tanımaya yarayan sınırlı teknik kayıtlar oluşturabilir. Kullanıcıdan e-posta ile parola, doğrulama kodu veya kimlik belgesi göndermesi istenmez."]],
        ["Kullanım verileri", ["Quiz sonuçları, skor, XP, liderlik kayıtları, günlük ilerleme/seri bilgileri, rozetler/başarımlar, quiz geçmişi, gönderilen quiz kimlikleri, son yanlışlar ve istatistikler uygulama deneyimi için tutulabilir.", "Bu veriler quiz ilerlemesini kaydetmek, kullanıcıya istatistik göstermek, liderlik tablosu ve profil deneyimini sunmak, kötüye kullanımı önlemek ve uygulama güvenliğini sağlamak için işlenir."]],
        ["Reklam ve izin tercihleri", ["Kimin Eseri içinde reklam gösterimi kullanılabilir. Reklamların gösterilmesi, ölçülmesi, kötüye kullanımın önlenmesi ve kullanıcının gizlilik tercihinin uygulanması için cihazla ilişkili teknik bilgiler, reklam tanımlayıcıları ve izin tercihleri işlenebilir.", "Bölgenize ve cihaz ayarlarınıza bağlı olarak reklam ve gizlilik tercihlerinizi yönetebileceğiniz bir izin ekranı gösterilebilir. Bu tercihler reklam deneyimini ve reklam ölçümünü etkileyebilir."]],
        ["Verilerin saklandığı yer ve hizmet sağlayıcılar", ["Hesap, kimlik doğrulama, veritabanı/barındırma ve uygulama güvenliği için güvenli bulut altyapısı veya sunucu altyapısı kullanılabilir. Kullanıcıya dönük bu metinde altyapı ürün adı verilmez; hizmet sağlayıcılar uygulamanın çalışması, güvenliği ve talep yönetimi için sınırlı rol üstlenir.", "Reklam veya izin yönetimi etkinleşirse ilgili reklam ve consent hizmet sağlayıcıları da hizmetin sunumu, ölçümü ve kullanıcı tercihinin uygulanması için veri işleyebilir. Uygulama mağazası hizmetleri indirme, güncelleme ve mağaza güvenliği süreçlerinde kendi koşulları kapsamında veri işleyebilir."]],
        ["Saklama, silme ve kullanıcı hakları", ["Hesaba bağlı kayıtlar hesap aktif olduğu sürece veya uygulama deneyimini sunmak için gerekli olduğu süre boyunca tutulur. Onaylanmış hesap silme talebi kapsamında hesap kaydı, kullanıcı adı, skorlar, XP, liderlik tablosu kayıtları, quiz geçmişi/istatistikleri, günlük ilerleme, rozetler ve son yanlışlar silme sürecine dahil edilir.", "Hukuki yükümlülükler, güvenlik, kötüye kullanım önleme veya uyuşmazlık çözümü için zorunlu minimum kayıtlar gerektiği süre boyunca saklanabilir. Kullanıcılar gizlilik ve veri silme talepleri için destek e-postası üzerinden iletişime geçebilir."]],
        ["İletişim", [`Destek, gizlilik ve veri silme talepleri için ${support} adresi kullanılabilir.`]],
      ],
    },
    "/uygulamalar/kimin-eseri/kvkk": {
      locale: "tr",
      title: "Kimin Eseri KVKK Aydınlatma Metni",
      intro: "Bu aydınlatma metni, Kimin Eseri uygulamasında kişisel verilerin hangi amaçlarla işlendiğini sade biçimde açıklar. Son güncelleme: 2 Ekim 2026.",
      sections: [
        ["Veri sorumlusu ve iletişim", [`Veri sorumlusu Mustafa Ergün (Mergun) olarak belirtilir. KVKK kapsamındaki başvuru ve iletişim adresi ${support} adresidir.`]],
        ["İşlenen kişisel veri kategorileri", ["Kimlik/hesap verisi: kullanıcı adı, e-posta adresi ve hesaba bağlı teknik kullanıcı kimliği işlenebilir. E-posta adresi kimlik doğrulama amacıyla kullanılır; herkese açık uygulama alanlarında e-posta adresi yerine kullanıcı adı gibi uygulama içi bilgiler kullanılır.", "İşlem güvenliği verisi: oturum, güvenlik, kötüye kullanım önleme ve talep yönetimi için gerekli sınırlı teknik kayıtlar işlenebilir.", "Kullanım verisi: skor, XP, quiz geçmişi, gönderilen quiz kimlikleri, rozet/başarım, günlük ilerleme, seri bilgileri, liderlik bilgileri, son yanlışlar ve istatistikler işlenebilir.", "Reklam/cihaz verisi: reklam gösterimi ve izin yönetimi kapsamında reklam tanımlayıcıları, cihazla ilişkili teknik bilgiler ve izin tercihleri işlenebilir."]],
        ["İşleme amaçları", ["Hesap oluşturma ve giriş işlemlerini yürütmek, quiz ilerlemesini ve istatistikleri kaydetmek, liderlik tablosunu ve profil deneyimini sunmak, skor/XP/rozet gibi oyunlaştırma öğelerini çalıştırmak, uygulama güvenliğini sağlamak, kötüye kullanımı önlemek, destek ve hesap silme taleplerini sonuçlandırmak.", "Reklam ve izin yönetimi kapsamında reklam gösterimi, ölçüm, kullanıcı tercihlerini uygulama ve kötüye kullanımı önleme amaçlarıyla sınırlı işleme yapılabilir."]],
        ["Hukuki sebepler", ["Hesap, giriş, quiz ilerlemesi, profil ve liderlik işlevleri için sözleşmenin kurulması veya ifası; uygulama güvenliği ve kötüye kullanımı önleme için meşru menfaat; başvuru ve yasal taleplerin yönetimi için hukuki yükümlülük; reklam/consent gibi açık rıza gerektiren hallerde açık rıza hukuki sebebine dayanılabilir."]],
        ["Aktarım yapılan taraflar", ["Kimlik doğrulama, veritabanı, barındırma ve güvenlik hizmeti sağlayıcıları uygulamanın çalışması için gerekli teknik rolü üstlenebilir. Reklam, ölçüm ve izin yönetimi hizmetleri reklam gösterimi ve gizlilik tercihlerinin uygulanması için sınırlı rol üstlenebilir. Yetkili kurumlara aktarım ancak hukuki zorunluluk halinde yapılabilir.", "Kullanılan bulut, reklam ve uygulama mağazası altyapısı nedeniyle hizmet sağlayıcıların sunucu konumları ve teknik altyapı seçimlerine bağlı olarak yurt dışına aktarım ihtimali doğabilir."]],
        ["Saklama süresi ve başvuru hakları", ["Hesaba bağlı veriler hesap aktif olduğu sürece veya ilgili işleme amacı için gerekli süre boyunca tutulur. Hesap silme talebi onaylandığında hesap, profil ve ilerleme kayıtları silme sürecine alınır; hukuki yükümlülük, güvenlik veya uyuşmazlık çözümü için zorunlu minimum kayıtlar gerektiği süre boyunca saklanabilir.", `KVKK madde 11 kapsamındaki haklarınız için ${support} adresine başvurabilirsiniz. Başvuruda parola, doğrulama kodu veya kimlik belgesi göndermeyin; talebin ilgili hesaba ait olduğunu anlamaya yetecek sınırlı bilgileri paylaşmanız yeterlidir.`]],
      ],
    },
    "/uygulamalar/kimin-eseri/hesap-silme": {
      locale: "tr",
      title: "Kimin Eseri Hesap Silme Talebi",
      intro: "Kimin Eseri kullanıcıları hesaplarının ve hesapla ilişkili verilerinin silinmesini talep edebilir. Kullanıcı uygulamayı kaldırmış olsa bile bu sayfadan talep başlatabilir. Son güncelleme: 2 Ekim 2026.",
      sections: [
        ["Talep yöntemi", [`Hesap silme talebi için [[KIMIN_ESERI_ACCOUNT_DELETION_EMAIL]] adresine e-posta gönderin. E-posta konusu otomatik olarak “Kimin Eseri Hesap Silme Talebi” şeklinde doldurulur.`, "Mümkünse kayıtlı e-posta adresinizden gönderin. Mesajda kullanıcı adınızı ve kayıtlı e-posta adresinizi belirtin. Şifre, doğrulama kodu veya kimlik belgesi göndermeyin; Mergun bu bilgileri e-postayla istemez."]],
        ["Uygulama içinden", ["Uygulamada Ayarlar > Hesap Silme Talebi yolunu izleyerek hesap silme talebi başlatabilirsiniz. Bu akış, kayıtlı e-posta adresinizden gönderebileceğiniz bir e-posta talebi oluşturur.", "Cihazınızda e-posta uygulaması yoksa uygulama destek adresini kopyalamanız için bir seçenek gösterir. Bu durumda talebinizi kayıtlı e-posta adresinizden elle gönderebilirsiniz."]],
        ["Silinecek veriler", ["Onaylanmış talep kapsamında hesap kaydı, kullanıcı adı, kullanıcı adı rezervasyonu, skorlar, XP, liderlik tablosu kayıtları, quiz geçmişi/istatistikleri, günlük ilerleme ve seri bilgileri, rozetler/başarımlar, gönderilen quiz kimlikleri ve son yanlış cevap kayıtları silme sürecine dahil edilir."]],
        ["Silme sonrası", ["Hesaba erişim kaybolur. Profil, liderlik tablosu ve hesaba bağlı ilerleme verileri kaldırılır. İşlem tamamlandıktan sonra geri alınamayabilir.", "Cihazdaki yerel misafir verileri hesaplı kullanıcı verisinden ayrı olabilir. Uygulamayı kaldırmak veya cihaz ayarlarından uygulama verilerini temizlemek, cihazda kalan yerel verileri yönetmek için kullanılabilir; bu işlem sunucudaki hesap silme talebinin yerine geçmeyebilir."]],
        ["Saklanabilecek sınırlı kayıtlar ve süre", ["Hukuki yükümlülükler, güvenlik, kötüye kullanım önleme veya uyuşmazlık çözümü için zorunlu minimum kayıtlar gerektiği süre boyunca saklanabilir.", "Bu sayfada gün veya iş günü olarak kesin bir işlem süresi taahhüdü verilmez. Talep alındığında doğrulama ve silme süreci makul süre içinde yürütülür."]],
        ["İletişim", [`Hesap silme, destek ve veri silme soruları için ${support} adresi kullanılabilir.`]],
      ],
    },
  };
  if (pages[path]) return pages[path];
  if (/\/(privacy|kvkk|terms|community-rules|account-deletion)$/.test(path)) return englishLegalFallback(path);
  return undefined;
}

function englishLegalFallback(path: string) {
  const app = apps.find((item) => path.startsWith(item.en.detailPath));
  if (!app) return undefined;
  const data = app.en;
  return {
    locale: "en" as Locale,
    title: `${data.name} Legal Information`,
    intro: `This page provides the legal and support information for ${data.name}. The Turkish pages contain the primary local wording for app-specific support, privacy, terms, community and deletion details.`,
    sections: [
      ["Contact", [`Support requests: ${SITE_CONFIG.supportEmail}. Privacy questions: ${SITE_CONFIG.privacyEmail}.`]],
      ["App context", [data.summary]],
      ["Related pages", ["Use the language switch or the app details page to open the matching Turkish legal page."]],
    ] as [string, string[]][],
  };
}
