import type { Locale } from "@/config/site";

export type AppStatus = "preparing" | "in-development";
export type AppKey = "satir-arasi" | "dice" | "sheet2contacts" | "kimin-eseri";

export type AppInfo = {
  key: AppKey;
  icon: string;
  platform: string;
  storeUrl: string;
  screenshots: string[];
  theme?: {
    primary: string;
    secondary: string;
    dark: string;
  };
  tr: {
    name: string;
    slug: string;
    status: AppStatus;
    statusLabel: string;
    summary: string;
    subtitle: string;
    features: string[];
    plannedFeatures?: string[];
    technical: Record<string, string>;
    privacyPath: string;
    detailPath: string;
    supportPath: string;
    legalLinks?: { label: string; href: string }[];
  };
  en: {
    name: string;
    slug: string;
    status: AppStatus;
    statusLabel: string;
    summary: string;
    subtitle: string;
    features: string[];
    plannedFeatures?: string[];
    technical: Record<string, string>;
    privacyPath: string;
    detailPath: string;
    supportPath: string;
    legalLinks?: { label: string; href: string }[];
  };
};

export const apps: AppInfo[] = [
  {
    key: "satir-arasi",
    icon: "/apps/showcase/satir-arasi-icon.png",
    platform: "Android",
    storeUrl: "",
    screenshots: [],
    tr: {
      name: "Satır Arası",
      slug: "satir-arasi",
      status: "in-development",
      statusLabel: "Geliştirme aşamasında",
      summary: "Film, dizi ve kitaplardan sevilen alıntıları keşfetmek, kaydetmek ve paylaşmak için geliştirilen sosyal alıntı uygulaması.",
      subtitle: "Alıntıları keşfetmek, kaydetmek ve paylaşmak için geliştirilen bir mobil uygulama.",
      features: [],
      plannedFeatures: [
        "Film, dizi ve kitap alıntıları",
        "Kategori filtreleri",
        "Favoriler",
        "Spoiler kontrollü içerikler",
        "Kullanıcı profilleri",
        "Paylaşım özellikleri",
      ],
      technical: {
        Platform: "Android",
        Durum: "Geliştirme aşamasında",
        Geliştirici: "Mergun",
      },
      privacyPath: "/uygulamalar/satir-arasi/gizlilik",
      detailPath: "/uygulamalar/satir-arasi",
      supportPath: "/satir-arasi/destek",
      legalLinks: [
        { label: "Gizlilik Politikası", href: "/uygulamalar/satir-arasi/gizlilik" },
        { label: "KVKK Bilgilendirmesi", href: "/uygulamalar/satir-arasi/kvkk" },
        { label: "Kullanım Koşulları", href: "/uygulamalar/satir-arasi/kullanim-kosullari" },
        { label: "Topluluk Kuralları", href: "/uygulamalar/satir-arasi/topluluk-kurallari" },
        { label: "Hesap Silme", href: "/uygulamalar/satir-arasi/hesap-silme" },
      ],
    },
    en: {
      name: "Satır Arası",
      slug: "satir-arasi",
      status: "in-development",
      statusLabel: "In development",
      summary: "A social quotes app in development for discovering, saving and sharing quotes from films, series and books.",
      subtitle: "A mobile app in development for discovering, saving and sharing quotes.",
      features: [],
      plannedFeatures: [
        "Film, series and book quotes",
        "Category filters",
        "Favorites",
        "Spoiler-aware content",
        "User profiles",
        "Sharing features",
      ],
      technical: {
        Platform: "Android",
        Status: "In development",
        Developer: "Mergun",
      },
      privacyPath: "/en/apps/satir-arasi/privacy",
      detailPath: "/en/apps/satir-arasi",
      supportPath: "/en/apps/satir-arasi/support",
      legalLinks: [
        { label: "Privacy Policy", href: "/en/apps/satir-arasi/privacy" },
      ],
    },
  },
  {
    key: "dice",
    icon: "/apps/showcase/zar-at-icon.png",
    platform: "Android",
    storeUrl: "",
    screenshots: [],
    tr: {
      name: "Zar At",
      slug: "dice-roller",
      status: "preparing",
      statusLabel: "Yayına hazırlanıyor",
      summary: "Gerçek zamanlı 3D zar animasyonu, tek ve çift zar modu ve sallayarak zar atma deneyimi.",
      subtitle: "Modern ve gerçek zamanlı 3D zar deneyimi.",
      features: [
        "Gerçek 3D dönüş animasyonu",
        "Tek zar modu",
        "Çift zar modu",
        "Telefonu sallayarak zar atma",
        "Sistem temasını takip eden açık/koyu görünüm",
        "Tamamen çevrimdışı çalışma",
        "Hesap gerektirmez",
        "Reklam içermez",
        "Kişisel veri toplamaz",
      ],
      technical: {
        Platform: "Android",
        Durum: "Yayına hazırlanıyor",
        Geliştirici: "Mergun",
        "İnternet bağlantısı": "Gerektirmez",
        "Veri toplama": "Kişisel veri toplamaz",
      },
      privacyPath: "/uygulamalar/dice-roller/gizlilik",
      detailPath: "/uygulamalar/dice-roller",
      supportPath: "/dice-roller/destek",
      legalLinks: [
        { label: "Gizlilik Politikası", href: "/uygulamalar/dice-roller/gizlilik" },
        { label: "KVKK Bilgilendirmesi", href: "/uygulamalar/dice-roller/kvkk" },
        { label: "Kullanım Koşulları", href: "/uygulamalar/dice-roller/kullanim-kosullari" },
        { label: "Topluluk Kuralları", href: "/uygulamalar/dice-roller/topluluk-kurallari" },
        { label: "Hesap / Veri Silme", href: "/uygulamalar/dice-roller/hesap-silme" },
      ],
    },
    en: {
      name: "Dice Roller",
      slug: "dice-roller",
      status: "preparing",
      statusLabel: "Preparing for release",
      summary: "A real-time 3D dice experience with single and double dice modes and shake-to-roll support.",
      subtitle: "A modern real-time 3D dice experience.",
      features: [
        "Real 3D rotation animation",
        "Single die mode",
        "Double dice mode",
        "Shake the phone to roll",
        "Light and dark appearance following the system theme",
        "Fully offline operation",
        "No account required",
        "No ads",
        "Does not collect personal data",
      ],
      technical: {
        Platform: "Android",
        Status: "Preparing for release",
        Developer: "Mergun",
        "Internet connection": "Not required",
        "Data collection": "None",
      },
      privacyPath: "/en/apps/dice-roller/privacy",
      detailPath: "/en/apps/dice-roller",
      supportPath: "/en/apps/dice-roller/support",
    },
  },
  {
    key: "sheet2contacts",
    icon: "/apps/showcase/sheet2contacts-icon.png",
    platform: "Android",
    storeUrl: "",
    screenshots: [],
    theme: {
      primary: "#22c55e",
      secondary: "#14b8a6",
      dark: "#0f172a",
    },
    tr: {
      name: "Sheet2Contacts",
      slug: "sheet2contacts",
      status: "preparing",
      statusLabel: "Yayına hazırlanıyor",
      summary: "E-tablolardan rehbere saniyeler içinde kişi aktarmaya odaklanan Android yardımcı uygulaması.",
      subtitle: "XLSX ve CSV dosyalarındaki kişileri önizleyip Android rehberine kontrollü biçimde aktarmaya yardımcı olur.",
      features: [
        "XLSX ve UTF-8 CSV dosyalarından kişi okuma",
        "Ad-soyad ve telefon numarası alanlarını eşleştirme",
        "Aktarım öncesinde önizleme ve kullanıcı onayı",
        "Mevcut rehber kayıtları ve dosya içi tekrarlar için kontrol",
        "Kişileri yalnızca kullanıcının onayıyla Android rehberine ekleme",
      ],
      technical: {
        Platform: "Android",
        Durum: "Yayına hazırlanıyor",
        Geliştirici: "Mergun",
        "Dosya türleri": "XLSX ve UTF-8 CSV",
        "Veri işleme": "Cihaz üzerinde",
        Dil: "Türkçe ve İngilizce",
        "Google Play": "Henüz bağlantı yok",
      },
      privacyPath: "/uygulamalar/sheet2contacts/gizlilik",
      detailPath: "/uygulamalar/sheet2contacts",
      supportPath: "/uygulamalar/sheet2contacts/destek",
      legalLinks: [
        { label: "Gizlilik Politikası", href: "/uygulamalar/sheet2contacts/gizlilik" },
        { label: "KVKK Bilgilendirmesi", href: "/uygulamalar/sheet2contacts/kvkk" },
        { label: "Kullanım Koşulları", href: "/uygulamalar/sheet2contacts/kullanim-kosullari" },
      ],
    },
    en: {
      name: "Sheet2Contacts",
      slug: "sheet2contacts",
      status: "preparing",
      statusLabel: "Preparing for release",
      summary: "An Android utility focused on importing people from spreadsheets to contacts in seconds.",
      subtitle: "Helps preview contacts from XLSX and CSV files and import them to Android contacts with user approval.",
      features: [
        "Reads contacts from XLSX and UTF-8 CSV files",
        "Maps name-surname and phone number fields",
        "Preview and user approval before import",
        "Checks existing contacts and duplicate rows",
        "Adds people to Android contacts only after user approval",
      ],
      technical: {
        Platform: "Android",
        Status: "Preparing for release",
        Developer: "Mergun",
        "File types": "XLSX and UTF-8 CSV",
        "Data processing": "On device",
        Language: "Turkish and English",
        "Google Play": "No link yet",
      },
      privacyPath: "/en/apps/sheet2contacts/privacy",
      detailPath: "/en/apps/sheet2contacts",
      supportPath: "/en/apps/sheet2contacts/support",
      legalLinks: [
        { label: "Privacy Policy", href: "/en/apps/sheet2contacts/privacy" },
        { label: "KVKK Notice", href: "/en/apps/sheet2contacts/kvkk" },
        { label: "Terms of Use", href: "/en/apps/sheet2contacts/terms" },
      ],
    },
  },
  {
    key: "kimin-eseri",
    icon: "/apps/showcase/kimin-eseri-icon.png",
    platform: "Android",
    storeUrl: "",
    screenshots: [],
    tr: {
      name: "Kimin Eseri",
      slug: "kimin-eseri",
      status: "preparing",
      statusLabel: "Yayına hazırlanıyor",
      summary: "Eser-sanatçı eşleştirmeleri, edebiyat dönemleri, destanlar ve sınav odaklı quizlerle hızlı tekrar yapmanı sağlayan mobil uygulama.",
      subtitle: "Edebiyat ve sanat bilgisi için sınav odaklı quiz ve tekrar uygulaması.",
      features: [
        "Eser-sanatçı eşleştirmeleri",
        "Edebiyat dönemleri ve destanlara odaklanan quizler",
        "Sınav odaklı hızlı tekrar akışı",
        "Kullanıcı adıyla profil ve ilerleme takibi",
        "Skor, XP, rozet ve istatistik kayıtları",
        "Liderlik tablosu desteği",
      ],
      plannedFeatures: [
        "Reklam ve izin tercihleri uygulama ayarlarından yönetilebilir",
        "Google Play bağlantısı henüz eklenmedi",
      ],
      technical: {
        Platform: "Android",
        Durum: "Yayına hazırlanıyor",
        Geliştirici: "Mergun",
        "Hesap sistemi": "Kullanıcı adı ve e-posta ile giriş/kayıt akışı",
      },
      privacyPath: "/uygulamalar/kimin-eseri/gizlilik",
      detailPath: "/uygulamalar/kimin-eseri",
      supportPath: "/kimin-eseri/destek",
      legalLinks: [
        { label: "Gizlilik Politikası", href: "/uygulamalar/kimin-eseri/gizlilik" },
        { label: "KVKK", href: "/uygulamalar/kimin-eseri/kvkk" },
        { label: "Hesap Silme", href: "/uygulamalar/kimin-eseri/hesap-silme" },
      ],
    },
    en: {
      name: "Kimin Eseri",
      slug: "kimin-eseri",
      status: "preparing",
      statusLabel: "Preparing for release",
      summary: "A mobile quiz app for quick revision with work-artist matches, literature periods, epics and exam-focused questions.",
      subtitle: "An exam-focused quiz and revision app for literature and art knowledge.",
      features: [
        "Work-artist matching quizzes",
        "Literature periods and epics",
        "Exam-focused quick revision",
        "Profile and progress tracking with username",
        "Score, XP, badge and statistics records",
        "Leaderboard support",
      ],
      plannedFeatures: [
        "Advertising and consent preferences can be managed from app settings",
        "Google Play link has not been added yet",
      ],
      technical: {
        Platform: "Android",
        Status: "Preparing for release",
        Developer: "Mergun",
        "Account system": "Username and email-based sign-up/sign-in flow",
      },
      privacyPath: "/en/apps/kimin-eseri/privacy",
      detailPath: "/en/apps/kimin-eseri",
      supportPath: "/en/apps/kimin-eseri/support",
      legalLinks: [
        { label: "Privacy Policy", href: "/en/apps/kimin-eseri/privacy" },
        { label: "KVKK Notice", href: "/en/apps/kimin-eseri/kvkk" },
        { label: "Account Deletion", href: "/en/apps/kimin-eseri/account-deletion" },
      ],
    },
  },
];

export function getAppBySlug(locale: Locale, slug: string) {
  return apps.find((app) => app[locale].slug === slug);
}
