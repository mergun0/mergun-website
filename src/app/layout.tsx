import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Mergun",
    template: "%s | Mergun",
  },
  description: "Mergun; sade, kullanışlı ve özenle geliştirilmiş dijital ürünler oluşturur.",
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.svg",
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={geistSans.variable}>
      <body>{children}</body>
    </html>
  );
}
