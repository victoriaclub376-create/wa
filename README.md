# Victoria Club Hotel

Website for Victoria Club Hotel, an oceanfront hotel experience built with Next.js.

## Getting Started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Scripts

- `npm run dev` starts the development server.
- `npm run lint` runs ESLint.
- `npm run build` creates a production build.
- `npm run start` serves the production build.

## Project Structure

- `src/app/` contains the home page, room detail pages, and global styles.
- `src/components/` contains the site's page sections and interactive components.
- `src/data/rooms.json` contains room data used by the site.

## Brand assets & SEO files

Every brand asset is self-hosted under `public/`, so the logo, tab icon and gallery never
depend on an external image host:

| File | Purpose |
| --- | --- |
| `public/logo.png` | Official Victoria Club Hotel logo (navbar, footer, structured data). |
| `public/favicon.ico` | Multi-size browser tab icon (16px, 32px, 48px). |
| `public/icons/favicon-16x16.png`, `favicon-32x32.png`, `favicon-48x48.png` | Favicons referenced from `<head>`. |
| `public/icons/apple-touch-icon.png` | 180px iOS home-screen icon. |
| `public/icons/icon-192x192.png`, `icon-512x512.png` | Android / PWA launcher icons. |
| `public/og-image.png` | 1200x630 Open Graph / social sharing preview. |
| `public/site.webmanifest` | Web app manifest. |
| `public/robots.txt`, `public/sitemap.xml` | Crawler instructions and page list. |
| `public/gallery/` | Self-hosted hotel gallery photos. |

The icons, manifest, Open Graph/Twitter metadata, canonical URL and Hotel structured data
are all declared in `src/app/layout.tsx`.

## Call button (Truecaller first)

`src/components/call/CallButton.tsx` renders the floating call button for
**+91 8684870142**. On Android and iOS it gives Truecaller the first chance
(`truecaller://search`, or an `intent://` URL with `S.browser_fallback_url` on Android).
Only when the page is still visible and focused after a short grace period
(2.5s Android / 3s iOS) does it fall back to the normal `tel:` dialer. Desktop browsers
and any unknown device simply use the `tel:` link.
