"use client";

import Image from "next/image";
import type { CSSProperties, KeyboardEvent } from "react";
import { useState } from "react";
import { apps, type AppKey } from "@/data/apps";

type ShowcaseApp = {
  key: AppKey;
  name: string;
  icon: string;
  theme?: {
    primary: string;
    secondary: string;
    dark: string;
  };
  description: string;
  accent: string;
  preview: {
    title: string;
    primary: string;
    secondary: string;
    chips: string[];
    actionLabel?: string;
  };
};

const showcaseContent: Record<AppKey, Omit<ShowcaseApp, "key" | "name" | "icon">> = {
  "satir-arasi": {
    description: "Film, dizi ve kitaplardan alıntıları keşfetmek, kaydetmek ve paylaşmak için geliştiriliyor.",
    accent: "#6C63FF",
    preview: {
      title: "Topluluk Alıntıları",
      primary: "Hikâyelerden kalan sözler.",
      secondary: "Film • Dizi • Kitap",
      chips: ["Keşfet", "Favoriler", "Spoiler"],
    },
  },
  dice: {
    description: "Tek dokunuşla 3D zar deneyimi; tek ve çift zar modlarıyla hazırlanıyor.",
    accent: "#2A3F74",
    preview: {
      title: "Tek dokunuşla 3D zar deneyimi",
      primary: "Zar At",
      secondary: "Sonuç: -",
      chips: ["Tek Zar", "Çift Zar", "Salla"],
    },
  },
  sheet2contacts: {
    description: "XLSX ve CSV dosyalarındaki kişileri cihaz üzerinde önizleyip rehbere aktar.",
    accent: "#22c55e",
    preview: {
      title: "XLSX · CSV",
      primary: "Dosya seçimi",
      secondary: "Önizleme hazır • Yerel işleme",
      chips: ["Hazır kişiler", "Mükerrer kontrol", "Gizli işleme"],
      actionLabel: "Aktarımı başlat",
    },
  },
  "kimin-eseri": {
    description: "Eser-sanatçı eşleştirmeleri, dönemler ve sınav odaklı quizlerle hızlı tekrar için hazırlanıyor.",
    accent: "#f5b642",
    preview: {
      title: "Edebiyat quizleri",
      primary: "Kimin Eseri",
      secondary: "Skor • XP • Rozet",
      chips: ["Eserler", "Dönemler", "Destanlar"],
    },
  },
};

const showcaseApps: ShowcaseApp[] = apps.map((app) => ({
  key: app.key,
  name: app.tr.name,
  icon: app.icon,
  theme: app.theme,
  ...showcaseContent[app.key],
}));

export function AppShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeApp = showcaseApps[activeIndex];

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft" && event.key !== "Home" && event.key !== "End") return;
    event.preventDefault();
    const nextIndex = event.key === "Home"
      ? 0
      : event.key === "End"
        ? showcaseApps.length - 1
        : event.key === "ArrowRight"
          ? (activeIndex + 1) % showcaseApps.length
          : (activeIndex - 1 + showcaseApps.length) % showcaseApps.length;
    setActiveIndex(nextIndex);
    document.getElementById(`showcase-tab-${showcaseApps[nextIndex].key}`)?.focus();
  }

  const showcaseStyle = {
    "--showcase-accent": activeApp.theme?.primary ?? activeApp.accent,
    "--showcase-secondary": activeApp.theme?.secondary ?? activeApp.accent,
    "--showcase-dark": activeApp.theme?.dark ?? "var(--text)",
  } as CSSProperties;

  return (
    <div className="app-showcase" data-active-app={activeApp.key} style={showcaseStyle}>
      <div className="showcase-tabs" role="tablist" aria-label="Ana sayfa uygulama vitrini" onKeyDown={onKeyDown}>
        {showcaseApps.map((app, index) => (
          <button
            aria-controls={`showcase-panel-${app.key}`}
            aria-selected={activeIndex === index}
            className="showcase-tab"
            id={`showcase-tab-${app.key}`}
            key={app.key}
            onClick={() => setActiveIndex(index)}
            role="tab"
            type="button"
          >
            {app.name}
          </button>
        ))}
      </div>

      <div
        aria-labelledby={`showcase-tab-${activeApp.key}`}
        className="phone-frame app-showcase-phone"
        id={`showcase-panel-${activeApp.key}`}
        role="tabpanel"
        tabIndex={0}
      >
        <div className="showcase-screen" key={activeApp.key}>
          <div className="showcase-app-head">
            <Image src={activeApp.icon} alt={`${activeApp.name} ikonu`} width={64} height={64} priority />
            <div>
              <p className="showcase-kicker">Mergun</p>
              <h2>{activeApp.name}</h2>
            </div>
          </div>
          <p className="showcase-description">{activeApp.description}</p>
          <div className="showcase-preview" aria-label={`${activeApp.name} doğrulanmış içerik özeti`}>
            <p>{activeApp.preview.title}</p>
            <strong>{activeApp.preview.primary}</strong>
            <span>{activeApp.preview.secondary}</span>
            <div>
              {activeApp.preview.chips.map((chip) => <em key={chip}>{chip}</em>)}
            </div>
            {activeApp.preview.actionLabel ? <button type="button" tabIndex={-1}>{activeApp.preview.actionLabel}</button> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
