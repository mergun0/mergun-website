import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SiteChrome } from "@/components/SiteChrome";
import { AppCard, AppsGrid, Hero, Screenshots, SupportEmail, Values } from "@/components/Sections";
import { SITE_CONFIG, type Locale } from "@/config/site";
import { apps, getAppBySlug } from "@/data/apps";
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
  }
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
  if (path === "/" || path === "/en") return <><Hero locale={locale} /><section className="section shell"><SectionHeader eyebrow={isTr ? "Uygulamalar" : "Apps"} title={isTr ? "Yayına hazırlanan ürünler" : "Products in progress"} text={isTr ? "Mergun uygulamaları sade işlevlere, hızlı açılışa ve açık gizlilik yaklaşımına odaklanır." : "Mergun apps focus on clear utility, fast starts and a transparent privacy approach."} /><AppsGrid locale={locale} /></section><section className="section shell"><SectionHeader title={isTr ? "Ürün değerleri" : "Product values"} /><Values locale={locale} /></section></>;
  if (path === "/uygulamalar" || path === "/en/apps") return <section className="page-section shell"><SectionHeader eyebrow="Mergun" title={isTr ? "Uygulamalar" : "Apps"} text={isTr ? "Tüm uygulamalar merkezi veri yapısından yönetilir; mağaza bağlantısı bilinmeyen ürünlerde sahte bağlantı gösterilmez." : "All apps are managed from central data; products without a known store URL do not show fake links."} /><AppsGrid locale={locale} /></section>;
  if (path === "/hakkinda" || path === "/en/about") return <TextPage locale={locale} title={isTr ? "Mergun hakkında" : "About Mergun"} paragraphs={isTr ? ["Mergun, faydalı fikirleri sade ve erişilebilir dijital ürünlere dönüştürmek amacıyla oluşturulmuş bağımsız bir geliştirici markasıdır.", "Odak alanı mobil uygulama geliştirme, kullanıcı deneyimi, gizlilik, sade tasarım ve sürekli iyileştirmedir. Mergun kendisini büyük bir şirket gibi konumlandırmadan, küçük ama özenli ürünler geliştirmeyi hedefler."] : ["Mergun is an independent developer brand created to turn useful ideas into simple and accessible digital products.", "The focus is mobile app development, user experience, privacy, simple design and continuous improvement. Mergun aims to build small but thoughtful products without presenting itself as a large company."]} />;
  if (path === "/destek" || path === "/en/support") return <SupportPage locale={locale} />;
  if (path === "/gizlilik" || path === "/en/privacy") return <SitePrivacy locale={locale} />;
  if (path === "/kvkk") return <KvkkPage />;
  const appMatch = apps.find((app) => path === app[locale].detailPath || path === app[locale].privacyPath);
  if (appMatch && path.endsWith(isTr ? "/gizlilik" : "/privacy")) return <AppPrivacy app={appMatch} locale={locale} />;
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
        <Image src={app.icon} alt="" width={72} height={72} />
        <div><span className={`status ${data.status}`}>{data.statusLabel}</span><h1>{data.name}</h1><p className="lead">{data.subtitle}</p></div>
      </div>
      <div className="actions">
        {app.storeUrl ? <a className="button primary" href={app.storeUrl} target="_blank" rel="noopener noreferrer">Google Play</a> : <span className="button disabled">{isTr ? "Google Play’de Yakında" : "Coming Soon on Google Play"}</span>}
        <Link className="button secondary" href={data.privacyPath}>{isTr ? "Gizlilik Politikası" : "Privacy Policy"}</Link>
        <Link className="button secondary" href={isTr ? "/destek" : "/en/support"}>{isTr ? "Destek" : "Support"}</Link>
      </div>
      <div className="two-col">
        <section><h2>{app.key === "satir-arasi" ? (isTr ? "Planlanan özellikler" : "Planned features") : (isTr ? "Özellikler" : "Features")}</h2><ul className="check-list">{(data.plannedFeatures ?? data.features).map((f) => <li key={f}>{app.key === "satir-arasi" ? `${f} ${isTr ? "(planlanan)" : "(planned)"}` : f}</li>)}</ul></section>
        <section><h2>{isTr ? "Teknik bilgiler" : "Technical details"}</h2><dl className="spec-list">{Object.entries(data.technical).map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl></section>
      </div>
      <section className="section"><SectionHeader title={isTr ? "Ekran görüntüleri" : "Screenshots"} text={isTr ? "Gerçek ekran görüntüleri eklendiğinde bu alan veri yapısından otomatik güncellenebilir." : "When real screenshots are added, this area can be updated from the data structure."} /><Screenshots app={app} locale={locale} /></section>
    </section>
  );
}

function AppPrivacy({ app, locale }: { app: (typeof apps)[number]; locale: Locale }) {
  const data = app[locale];
  const isDice = app.key === "dice";
  const isTr = locale === "tr";
  if (!isDice) return <TextPage locale={locale} title={`${data.name} ${isTr ? "Gizlilik Politikası" : "Privacy Policy"}`} paragraphs={isTr ? ["Satır Arası geliştirme aşamasındadır. Gizlilik politikası, uygulamanın yayın öncesi nihai teknik yapısı ve veri davranışı netleştikten sonra güncellenecektir.", "Bu sayfa, tamamlanmamış bir uygulama için kesin veri güvenliği beyanı oluşturmaz."] : ["Satır Arası is in development. Its privacy policy will be updated before release according to the final technical structure and data behavior of the app.", "This page does not make a final data safety statement for an unpublished app."]} />;
  const sections = isTr ? [
    ["Uygulama ve geliştirici", ["Uygulama adı: Zar At", "Geliştirici: Mergun"]],
    ["Veri toplama", ["Zar At kişisel veri toplamaz.", "Kullanıcı hesabı istemez.", "İsim, e-posta, telefon numarası veya konum bilgisi istemez.", "Kullanıcı davranışlarını takip eden analytics sistemi içermez.", "Reklam SDK’sı içermez.", "Veriler üçüncü taraflara gönderilmez."]],
    ["İnternet", ["Uygulama çevrimdışı çalışır.", "İnternet bağlantısına ihtiyaç duymaz."]],
    ["Hareket sensörü", ["Telefonu sallayarak zar atma özelliği için cihazın hareket sensörü kullanılabilir.", "Sensör verileri yalnızca cihaz üzerinde anlık olarak işlenir.", "Sensör verileri kaydedilmez.", "Sensör verileri sunucuya veya üçüncü taraflara aktarılmaz."]],
    ["Yerel veriler", ["Uygulama tercih veya ayar saklıyorsa bu bilgiler yalnızca cihaz üzerinde tutulur ve Mergun sunucularına gönderilmez. Mevcut Android proje belgeleri bu siteye eklenmediği için metin, uygulamanın doğrulanmış davranışıyla yayın öncesinde tekrar karşılaştırılmalıdır."]],
    ["Çocukların gizliliği", ["Uygulama bilerek kişisel veri toplamaz; çocuklardan da kişisel veri toplanması amaçlanmaz."]],
    ["Politika değişiklikleri", ["Uygulama işlevleri değişirse bu politika güncellenebilir."]],
    ["İletişim", ["Destek e-posta adresi yayın öncesinde eklenecektir."]],
  ] : [
    ["App and developer", ["App name: Dice Roller", "Developer: Mergun"]],
    ["Data collection", ["Dice Roller does not collect personal data.", "It does not require a user account.", "It does not ask for name, email, phone number or location.", "It does not include analytics that tracks user behavior.", "It does not include an advertising SDK.", "Data is not sent to third parties."]],
    ["Internet", ["The app works offline.", "It does not require an internet connection."]],
    ["Motion sensor", ["The device motion sensor may be used for the shake-to-roll feature.", "Sensor data is processed instantly on the device only.", "Sensor data is not stored.", "Sensor data is not sent to a server or third parties."]],
    ["Local data", ["If the app stores preferences or settings, they remain on the device and are not sent to Mergun servers. Because Android project documentation is not included in this website, this text should be checked against the verified app behavior before publication."]],
    ["Children’s privacy", ["The app does not knowingly collect personal data, including from children."]],
    ["Policy changes", ["This policy may be updated if app functionality changes."]],
    ["Contact", ["The support email address will be added before publication."]],
  ];
  return <section className="page-section shell narrow"><p className="eyebrow">{data.name}</p><h1>{data.name} {isTr ? "Gizlilik Politikası" : "Privacy Policy"}</h1><p className="body-text">{isTr ? "Bu metin hukuki tavsiye değildir; uygulamanın mevcut teknik davranışıyla sınırlı sade bir bilgilendirmedir." : "This text is not legal advice; it is a plain notice limited to the app’s current technical behavior."}</p>{sections.map(([title, items]) => <section className="legal-block" key={title as string}><h2>{title as string}</h2><ul>{(items as string[]).map((item) => <li key={item}>{item}</li>)}</ul></section>)}</section>;
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
  const dice = getAppBySlug(locale, isTr ? "zar-at" : "dice-roller")!;
  const faqs = isTr ? [["Uygulama internet gerektiriyor mu?", "Hayır. Zar At çevrimdışı çalışacak şekilde tasarlanmıştır."], ["Zar sonuçları rastgele mi?", "Zar sonuçları cihaz üzerinde rastgele üretilir."], ["Telefonu sallayarak zar nasıl atılır?", "Sallama özelliği cihazın hareket sensörünü anlık olarak kullanır."], ["Uygulama veri topluyor mu?", "Hayır. Zar At kişisel veri toplamaz, analytics veya reklam SDK’sı içermez."], ["Tek ve çift zar arasında nasıl geçilir?", "Uygulama içindeki mod seçimiyle tek veya çift zar kullanılabilir."]]
    : [["Does the app require internet?", "No. Dice Roller is designed to work offline."], ["Are dice results random?", "Dice results are generated randomly on the device."], ["How does shake-to-roll work?", "The feature uses the device motion sensor instantly on the device."], ["Does the app collect data?", "No. Dice Roller does not collect personal data and does not include analytics or advertising SDKs."], ["How do I switch between one and two dice?", "The app mode selection lets you use one or two dice."]];
  return <section className="page-section shell"><SectionHeader eyebrow="Mergun" title={isTr ? "Destek" : "Support"} text={isTr ? "İletişim formu yerine yayın öncesinde doğrulanacak e-posta adresi kullanılacaktır." : "A verified support email address will be used instead of a contact form."} /><div className="two-col"><section><h2>{isTr ? "Uygulama seçimi" : "Choose an app"}</h2><AppCard app={dice} locale={locale} /></section><section><h2>{isTr ? "E-posta ile destek" : "Email support"}</h2><SupportEmail locale={locale} /></section></div><section className="section"><h2>{isTr ? "Sık sorulan sorular" : "Frequently asked questions"}</h2><div className="faq-list">{faqs.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></section></section>;
}
