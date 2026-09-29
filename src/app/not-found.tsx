import type { Metadata } from "next";
import Link from "next/link";

// 404 pages must never be indexed, but the links on them must still be crawled.
export const metadata: Metadata = {
  // `absolute` avoids the layout template appending the brand a second time.
  title: { absolute: "Page Not Found (404) | Victoria Club Hotel" },
  description:
    "The page you were looking for is unavailable. Browse rooms, amenities and the gallery at Victoria Club Hotel in Puri, Odisha, or call +91 8684870142.",
  robots: { index: false, follow: true },
  // No canonical: this file serves every unknown URL and must not claim to be
  // a duplicate of the homepage.
  alternates: { canonical: null },
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-navy px-6 text-center text-white">
      <div><p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">Victoria Club Hotel</p><h1 className="mt-4 font-serif text-5xl">This room has drifted away.</h1><p className="mx-auto mt-5 max-w-md text-sm leading-6 text-white/65">The page you requested is unavailable, but a beautiful stay is still waiting.</p><Link href="/" className="mt-8 inline-flex rounded-sm bg-gold px-7 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-navy transition hover:bg-gold-dark">Return home</Link></div>
    </main>
  );
}
