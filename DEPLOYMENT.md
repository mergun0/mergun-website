# Deployment

Bu proje statik yayınlamaya uygundur. Backend, veri tabanı veya çalışma zamanı API anahtarı gerektirmez.

## Önerilen Platform

cPanel `public_html` bu sürüm için uygundur. Alternatif olarak Vercel, Cloudflare Pages veya Netlify üzerinde `out/` klasörü yayınlanabilir.

## Build

```bash
npm install
npm run lint
npm run typecheck
npm run build
```

## cPanel

1. Yerelde `npm run build` çalıştırın.
2. `out/` klasörünün içeriğini cPanel içindeki ilgili domainin `public_html` klasörüne yükleyin.
3. `.htaccess` dosyasının da yüklendiğini doğrulayın.
4. cPanel, DNS ve SSL ayarlarını hosting panelinden ayrıca tamamlayın.

## Vercel

- Framework: Next.js
- Build command: `npm run build`
- Output directory: `out`
- `NEXT_PUBLIC_SITE_URL=https://mergun.com.tr` kullanılabilir.

## Cloudflare Pages

- Build command: `npm run build`
- Build output directory: `out`
- Node.js sürümü: güncel LTS veya proje bağımlılıklarıyla uyumlu sürüm

## Netlify

- Build command: `npm run build`
- Publish directory: `out`

## GitHub Pages

Statik export çıktısı kullanılabilir. Alt yol altında yayınlanacaksa Next.js `basePath` ve bağlantılar ayrıca değerlendirilmelidir.
