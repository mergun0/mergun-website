import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mergun",
    short_name: "Mergun",
    description: "Fikirlerden uygulamalara.",
    start_url: "/",
    display: "standalone",
    background_color: "#F5F7FB",
    theme_color: "#243B6B",
    icons: [
      { src: "/icons/icon-192.svg", sizes: "192x192", type: "image/svg+xml" },
      { src: "/icons/icon-512.svg", sizes: "512x512", type: "image/svg+xml" },
    ],
  };
}
