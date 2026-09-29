/**
 * Single source of truth for Victoria Club Hotel's VERIFIED business details.
 *
 * Every value here is cross-checked against:
 *  - the Google Maps place embedded in src/components/Location.tsx
 *  - the hotel's own site (victoriaclubhotel.com -> "Sea Beach, Puri, Pin 752001")
 *
 * Do NOT add ratings, review counts, awards or prices that are not verifiable.
 * Structured data must match what is actually visible on the page.
 */

/** Primary (canonical) host. All canonical URLs, sitemap and robots use this. */
export const siteUrl = "https://www.victoriaclubhotal.online";

/** Bare host - documented only, as the redirect target must live at the host. */
export const siteOrigin = "https://victoriaclubhotal.online";

export const siteName = "Victoria Club Hotel";

export const business = {
  name: siteName,
  /** Human-readable phone (matches the site's call buttons). */
  phoneDisplay: "+91 8684870142",
  /** E.164 form for tel: links. */
  phone: "+918684870142",
  phoneSchema: "+91-8684870142",
  /** Verified on the hotel's own official site. */
  email: "reservations@victoriaclubhotel.com",
  address: {
    streetAddress: "Marine Drive Road, Sea Beach Road, Bali Sahi",
    addressLocality: "Puri",
    addressRegion: "Odisha",
    postalCode: "752001",
    addressCountry: "IN",
  },
  /** Coordinates taken from the embedded Google Maps place for this hotel. */
  geo: {
    latitude: 19.7947512,
    longitude: 85.8229721,
  },
  priceRange: "₹₹",
  /**
   * Only the hotel's own long-standing official site. No social profiles are
   * listed because the footer social links are still placeholders ("#").
   */
  sameAs: ["http://www.victoriaclubhotel.com"],
} as const;

/** Absolute URL helper, so metadataBase and schema never disagree. */
export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

/** One-line location string reused in metadata and schema. */
export const addressLine = `${business.address.streetAddress}, ${business.address.addressLocality}, ${business.address.addressRegion} ${business.address.postalCode}`;

/* -------------------------------------------------------------------------- */
/*  Structured data (JSON-LD)                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Site-wide entities. Rendered once in the root layout so every page shares the
 * same @id values and Google never sees two conflicting definitions.
 *
 * NOTE: `aggregateRating` and `review` are intentionally NOT included - the site
 * has no verifiable on-page review data.
 */
export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: business.name,
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/logo.png"),
      width: 194,
      height: 73,
    },
    image: absoluteUrl("/logo.png"),
    email: business.email,
    telephone: business.phoneSchema,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.streetAddress,
      addressLocality: business.address.addressLocality,
      addressRegion: business.address.addressRegion,
      postalCode: business.address.postalCode,
      addressCountry: business.address.addressCountry,
    },
    sameAs: [...business.sameAs],
  };
}

export function webSiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: siteName,
    inLanguage: "en-IN",
    publisher: { "@id": `${siteUrl}/#organization` },
  };
}

/** Hotel / LocalBusiness. `priceRange` only - never a made-up rating. */
export function hotelSchema() {
  return {
    "@type": "Hotel",
    "@id": `${siteUrl}/#hotel`,
    name: business.name,
    url: siteUrl,
    description:
      "Boutique hotel on Sea Beach Road in Bali Sahi, Puri, Odisha, offering sea-facing rooms, suites and a villa, with a multi-cuisine restaurant, free Wi-Fi and on-site parking.",
    image: [absoluteUrl("/og-image.png"), absoluteUrl("/logo.png")],
    logo: absoluteUrl("/logo.png"),
    telephone: business.phoneSchema,
    email: business.email,
    priceRange: business.priceRange,
    currenciesAccepted: "INR",
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.streetAddress,
      addressLocality: business.address.addressLocality,
      addressRegion: business.address.addressRegion,
      postalCode: business.address.postalCode,
      addressCountry: business.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.geo.latitude,
      longitude: business.geo.longitude,
    },
    hasMap:
      "https://www.google.com/maps/place/Victoria+Club+Hotel/@19.794751,85.822972,17z/data=!3m1!4b1!4m9!3m8!1s0x3a19c424a7ad6d03:0x97a8790938d82117",
    sameAs: [...business.sameAs],
    parentOrganization: { "@id": `${siteUrl}/#organization` },
    // Mirrors the six facilities listed in the visible Amenities section.
    amenityFeature: [
      "Free high-speed Wi-Fi",
      "Multi-cuisine restaurant",
      "Same-day laundry and dry cleaning",
      "Breakfast",
      "On-site parking with valet",
      "24-hour in-room room service",
    ].map((name) => ({
      "@type": "LocationFeatureSpecification",
      name,
      value: true,
    })),
  };
}

/** Wraps entities in a single @graph so multiple schema types ship together. */
export function schemaGraph(...entities: object[]) {
  return {
    "@context": "https://schema.org",
    "@graph": entities,
  };
}

/** Home > Rooms > {Room} trail, mirroring the visible breadcrumb nav. */
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(trail[trail.length - 1]?.path ?? "/")}#breadcrumb`,
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

/** Generic page wrapper so each page describes itself distinctly. */
export function webPageSchema({
  path,
  name,
  description,
}: {
  path: string;
  name: string;
  description: string;
}) {
  return {
    "@type": "WebPage",
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name,
    description,
    isPartOf: { "@id": `${siteUrl}/#website` },
    about: { "@id": `${siteUrl}/#hotel` },
    inLanguage: "en-IN",
  };
}

/** Safe to inline in <script type="application/ld+json">. */
export function serializeSchema(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
