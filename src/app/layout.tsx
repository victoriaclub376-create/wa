import type { Metadata, Viewport } from "next";
import BookingProvider from "@/components/BookingProvider";
import "./globals.css";

const siteUrl = "https://www.victoriaclubhotal.online";
const siteName = "Victoria Club Hotel";
const siteTitle = "Victoria Club Hotel | Oceanfront Luxury in Puri";
const siteDescription =
  "Victoria Club Hotel is an oceanfront boutique hotel on Marine Drive Road, Puri. Elegant rooms, fine dining, warm hospitality and the beach just steps away. Call +91 8684870142 to reserve your stay.";

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
    "luxury hotel Puri Odisha",
    "sea view hotel Puri",
    "Marine Drive Puri hotel",
    "boutique hotel Odisha",
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
        alt: "Victoria Club Hotel — oceanfront luxury stay in Puri, Odisha",
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
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0f172a",
  colorScheme: "light",
};

const hotelSchema = {
  "@context": "https://schema.org",
  "@type": "Hotel",
  name: siteName,
  url: siteUrl,
  description: siteDescription,
  telephone: "+91-8684870142",
  image: `${siteUrl}/og-image.png`,
  logo: `${siteUrl}/logo.png`,
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Marine Drive Road, Sea Beach Rd, Bali Sahi",
    addressLocality: "Puri",
    addressRegion: "Odisha",
    postalCode: "752001",
    addressCountry: "IN",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelSchema) }}
        />
        <BookingProvider>{children}</BookingProvider>
      </body>
    </html>
  );
}

