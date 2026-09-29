/**
 * Generates public/robots.txt and public/sitemap.xml from src/data/rooms.json
 * so the sitemap can never drift out of sync with the actual room pages.
 *
 * Runs automatically before `next build` (see package.json "prebuild").
 * With `output: "export"` these static files are copied straight into /out.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");

/** Must match `siteUrl` in src/lib/site.ts - the one canonical host. */
const SITE_URL = "https://www.victoriaclubhotal.online";
const LAST_MOD = new Date().toISOString().slice(0, 10);

const rooms = JSON.parse(readFileSync(join(root, "src", "data", "rooms.json"), "utf8"));

const urls = [
  { loc: "/", priority: "1.0", changefreq: "weekly" },
  { loc: "/rooms", priority: "0.9", changefreq: "weekly" },
  ...rooms.map((room, index) => ({
    loc: `/rooms/${room.id}`,
    priority: index < 3 ? "0.8" : "0.7",
    changefreq: "monthly",
  })),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${SITE_URL}${u.loc}</loc>
    <lastmod>${LAST_MOD}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

const robots = `# Victoria Club Hotel - Puri, Odisha
User-agent: *
Allow: /

# Assets that must stay crawlable for Google Search branding
Allow: /favicon.ico
Allow: /logo.png
Allow: /og-image.png
Allow: /icons/
Allow: /site.webmanifest

Sitemap: ${SITE_URL}/sitemap.xml
`;

writeFileSync(join(root, "public", "sitemap.xml"), sitemap, "utf8");
writeFileSync(join(root, "public", "robots.txt"), robots, "utf8");

console.log(`Generated sitemap.xml (${urls.length} URLs) and robots.txt`);
