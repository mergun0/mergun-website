# Deployment

Bu proje statik yayınlamaya uygundur. Backend, veri tabanı veya çalışma zamanı API anahtarı gerektirmez.

## Önerilen Platform

Vercel önerilir. Alternatif olarak Cloudflare Pages veya Netlify üzerinde `out/` klasörü yayınlanabilir.

## Build

```bash
npm install
npm run lint
npm run typecheck
npm run build
```

## Vercel

- Framework: Next.js
- Build command: `npm run build`
- Output directory: `out`
- Environment variable zorunlu değildir.

Gerçek domain bağlandıktan sonra `src/config/site.ts` içindeki `siteUrl` alanı doldurulmalıdır.

## Cloudflare Pages

- Build command: `npm run build`
- Build output directory: `out`
- Node.js sürümü: güncel LTS veya proje bağımlılıklarıyla uyumlu sürüm

## Netlify

- Build command: `npm run build`
- Publish directory: `out`

## GitHub Pages

Statik export çıktısı kullanılabilir. Alt yol altında yayınlanacaksa Next.js `basePath` ve bağlantılar ayrıca değerlendirilmelidir.

