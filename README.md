# Mergun Website

Mergun; Mergun tarafından geliştirilen mobil uygulamaları tanıtmak, destek bilgilerini sunmak ve uygulama gizlilik politikalarını yayınlamak için hazırlanmış statik, iki dilli geliştirici portföyü sitesidir.

## Teknoloji

- Next.js App Router
- TypeScript
- Merkezi CSS değişkenleri ve sade global CSS
- Statik export uyumlu yapı
- Analytics, reklam, çerez banner'ı, backend, üyelik sistemi veya veri tabanı içermez

## Kurulum

```bash
npm install
```

## Geliştirme

```bash
npm run dev
```

Yerel adres varsayılan olarak `http://localhost:3000` olur.

## Production Build

```bash
npm run lint
npm run typecheck
npm run build
```

`next.config.ts` içinde `output: "export"` kullanıldığı için statik çıktı `out/` klasörüne üretilir.

## Klasör Yapısı

- `src/config/site.ts`: Marka, GitHub, domain ve destek e-postası ayarları
- `src/data/apps.ts`: Uygulama verileri, slug, özellikler, durumlar ve gizlilik bağlantıları
- `src/app/[[...slug]]/page.tsx`: Türkçe ve İngilizce sayfaları üreten rota katmanı
- `src/components/`: Header, footer, marka ve tekrar kullanılan sayfa bölümleri
- `public/brand/`: Logo ve uygulama ikonları
- `public/apps/*/screenshots/`: Gerçek uygulama ekran görüntüleri için klasörler

## Yeni Uygulama Ekleme

1. `src/data/apps.ts` içine yeni uygulama kaydı ekleyin.
2. TR ve EN slug, açıklama, durum, özellikler ve gizlilik yollarını girin.
3. `public/brand/` içine uygulama ikonunu ekleyin.
4. Gerekirse `src/lib/routes.ts` içinde TR/EN karşılıklarını ekleyin.
5. Uygulama ekran görüntülerini `public/apps/<slug>/screenshots/` altına koyun ve veri kaydındaki `screenshots` alanını güncelleyin.

## Gizlilik Sayfası Ekleme

Uygulama gizlilik sayfaları rota/veri yapısına bağlıdır. Yeni bir uygulama için gizlilik yolu `apps.ts` içinde tanımlanmalı, karşılığı `routes.ts` içine eklenmeli ve sayfa metni gerçek uygulama veri davranışıyla karşılaştırılarak yayınlanmalıdır.

## Domain ve SEO

Gerçek domain belli olduğunda `src/config/site.ts` içindeki `siteUrl` alanını güncelleyin. Bu alan boş bırakıldığında sahte canonical veya sosyal görsel URL'si yayınlanmaz. Sitemap üretimi için geçici `.invalid` alan adı yalnızca yayın öncesi değiştirilmesi gereken teknik işaret olarak kullanılır.

## Deployment

Önerilen platform: Vercel. Next.js App Router ve statik export desteği nedeniyle kurulum sade kalır. Cloudflare Pages ve Netlify de statik çıktı ile uygundur.

Vercel için:

1. GitHub'da `mergun-website` deposu oluşturun.
2. Bu projeyi depoya push edin.
3. Vercel'de depoyu içe aktarın.
4. Build komutu `npm run build`, çıktı klasörü `out` olacak şekilde ayarlayın.
5. Gerçek domain bağlandıktan sonra `siteUrl` alanını güncelleyin.

## Yayın Öncesi Değiştirilecekler

- Gerçek domain ve `siteUrl`
- Gerçek destek e-postası
- Zar At Play Store URL'si
- Gerçek uygulama ekran görüntüleri
- Hukuki metinlerin son kontrolü
- Favicon ve sosyal paylaşım önizlemeleri
- Analytics kullanılacaksa gizlilik politikası ve çerez yaklaşımı

