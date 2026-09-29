import type { Metadata, Viewport } from "next";
import BookingProvider from "@/components/BookingProvider";
import "./globals.css";
import {
  absoluteUrl,
  business,
  hotelSchema,
  organizationSchema,
  schemaGraph,
  serializeSchema,
  siteName,
  siteUrl,
  webSiteSchema,
} from "@/lib/site";

const siteTitle = "Victoria Club Hotel | Beachside Hotel & Rooms in Puri, Odisha";
const siteDescription =
  "Victoria Club Hotel is a boutique hotel on Sea Beach Road, Bali Sahi, Puri. Book sea-facing rooms, suites and a villa with restaurant, free Wi-Fi and parking. Call +91 8684870142.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  category: "Hotel & Resort",
  keywords: [
    "Victoria Club Hotel",
    "Victoria Club Hotel Puri",
    "hotel in Puri",
    "Puri Odisha hotel",
    "sea view hotel Puri",
    "Sea Beach Road Puri hotel",
    "Bali Sahi Puri accommodation",
    "boutique hotel Odisha",
    "rooms and suites in Puri",
    "book hotel in Puri",
  ],
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  alternates: {
    canonical: "/",
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icons/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/icons/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/icons/favicon-48x48.png", type: "image/png", sizes: "48x48" },
      { url: "/icons/icon-192x192.png", type: "image/png", sizes: "192x192" },
      { url: "/icons/icon-512x512.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [
      { url: "/icons/apple-touch-icon.png", type: "image/png", sizes: "180x180" },
    ],
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName,
    title: siteTitle,
    description: siteDescription,
    locale: "en_IN",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Victoria Club Hotel — beachside rooms and suites in Puri, Odisha",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  appleWebApp: {
    capable: true,
    title: siteName,
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  other: {
    "geo.region": "IN-OD",
    "geo.placename": `${business.address.addressLocality}, ${business.address.addressRegion}`,
    "geo.position": `${business.geo.latitude};${business.geo.longitude}`,
    ICBM: `${business.geo.latitude}, ${business.geo.longitude}`,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0f172a",
  colorScheme: "light",
};

/**
 * One @graph for the whole site: Organization + WebSite + Hotel.
 * Emitted once in the root layout so every page references the same @id and
 * Google never receives two competing definitions of the business.
 */
const siteSchema = schemaGraph(
  organizationSchema(),
  webSiteSchema(),
  hotelSchema(),
);

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN">
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeSchema(siteSchema) }}
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://lh3.googleusercontent.com" />
        <link rel="alternate" href={absoluteUrl("/sitemap.xml")} type="application/xml" />
        <BookingProvider>{children}</BookingProvider>
      </body>
    </html>
  );
}

