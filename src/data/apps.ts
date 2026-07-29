import type { Locale } from "@/config/site";

export type AppStatus = "preparing" | "in-development";

export type AppInfo = {
  key: "dice" | "satir-arasi";
  icon: string;
  platform: string;
  storeUrl: string;
  screenshots: string[];
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
  };
};

export const apps: AppInfo[] = [
  {
    key: "dice",
    icon: "/brand/app-dice.svg",
    platform: "Android",
    storeUrl: "",
    screenshots: [],
    tr: {
      name: "Zar At",
      slug: "zar-at",
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
        "İnternet bağlantısı": "Gerekmez",
        "Veri toplama": "Yok",
      },
      privacyPath: "/uygulamalar/zar-at/gizlilik",
      detailPath: "/uygulamalar/zar-at",
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
    },
  },
  {
    key: "satir-arasi",
    icon: "/brand/app-satir-arasi.svg",
    platform: "Android",
    storeUrl: "",
    screenshots: [],
    tr: {
      name: "Satır Arası",
      slug: "satir-arasi",
      status: "in-development",
      statusLabel: "Geliştirme aşamasında",
      summary: "Film, dizi ve kitaplardan sevilen alıntıları keşfetmek ve paylaşmak için geliştirilen sosyal alıntı uygulaması.",
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
    },
  },
];

export function getAppBySlug(locale: Locale, slug: string) {
  return apps.find((app) => app[locale].slug === slug);
}

