import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BedDouble, Maximize2, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CallButton from "@/components/call/CallButton";
import { rooms } from "@/lib/rooms";
import { business, breadcrumbSchema, schemaGraph, serializeSchema, webPageSchema } from "@/lib/site";

const title = "Rooms & Suites in Puri, Odisha";
const description =
  "Browse all eight rooms, suites and the villa at Victoria Club Hotel, Puri. Sea-facing rooms from the Deluxe Ocean View Room to the Royal Honeymoon Villa, with sizes, beds and views listed. Call +91 8684870142.";

export const metadata: Metadata = {
  title: { absolute: `${title} | Victoria Club Hotel` },
  description,
  alternates: { canonical: "/rooms" },
  openGraph: {
    type: "website",
    url: "/rooms",
    siteName: "Victoria Club Hotel",
    title: `${title} | Victoria Club Hotel`,
    description,
    locale: "en_IN",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rooms and suites at Victoria Club Hotel in Puri, Odisha",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | Victoria Club Hotel`,
    description,
    images: ["/og-image.png"],
  },
};

const pageSchema = schemaGraph(
  webPageSchema({ path: "/rooms", name: title, description }),
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Rooms", path: "/rooms" },
  ]),
  {
    "@type": "ItemList",
    "@id": "https://www.victoriaclubhotal.online/rooms#itemlist",
    name: "Rooms and suites at Victoria Club Hotel, Puri",
    numberOfItems: rooms.length,
    itemListElement: rooms.map((room, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://www.victoriaclubhotal.online/rooms/${room.id}`,
      name: room.title,
    })),
  },
);

export default function RoomsIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeSchema(pageSchema) }}
      />
      <Navbar />
      <main className="bg-cream pb-20 pt-28 sm:pt-32">
        <div className="mx-auto max-w-[1140px] px-5 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-navy/55">
            <Link href="/" className="transition hover:text-gold">Home</Link>
            <span>/</span>
            <span className="text-navy">Rooms</span>
          </nav>

          <header className="mt-8 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">
              Stay at Victoria Club Hotel, Puri
            </p>
            <h1 className="mt-3 font-serif text-4xl leading-tight text-navy sm:text-5xl">
              Rooms &amp; Suites in Puri, Odisha
            </h1>
            <p className="mt-5 text-base leading-7 text-navy/70">
              Eight room types sit within walking distance of the beach at Bali Sahi — from the
              Deluxe Ocean View Room to the Royal Honeymoon Villa with its private plunge pool.
              Every room includes high-speed Wi-Fi, air conditioning and 24-hour room service.
              To check availability, call {business.phoneDisplay} or message us on WhatsApp.
            </p>
            <div className="mt-6 h-px w-20 bg-gold/50" />
          </header>

          <div className="mt-12 grid gap-7 sm:grid-cols-2">
            {rooms.map((room) => (
              <article
                key={room.id}
                className="group flex flex-col overflow-hidden rounded-sm bg-white shadow-lg shadow-navy/5"
              >
                <Link href={`/rooms/${room.id}`} className="relative block aspect-[16/10] overflow-hidden">
                  <Image
                    src={room.image}
                    alt={room.imageAlt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <p className="absolute bottom-4 left-5 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                    {room.category}
                  </p>
                </Link>

                <div className="flex flex-1 flex-col p-6">
                  <h2 className="font-serif text-2xl leading-tight text-navy">
                    <Link href={`/rooms/${room.id}`} className="transition-colors hover:text-gold">
                      {room.title}
                    </Link>
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-navy/65">{room.description}</p>

                  <dl className="mt-5 grid grid-cols-3 gap-2 border-y border-navy/10 py-4 text-center text-[11px] text-navy/65">
                    <div className="flex min-w-0 flex-col items-center gap-1.5">
                      <Users size={16} className="text-gold" aria-hidden />
                      <dt className="sr-only">Guests</dt>
                      <dd>{room.capacity} guests</dd>
                    </div>
                    <div className="flex min-w-0 flex-col items-center gap-1.5 border-x border-navy/10 px-1">
                      <BedDouble size={16} className="text-gold" aria-hidden />
                      <dt className="sr-only">Bed</dt>
                      <dd className="line-clamp-1">{room.bed}</dd>
                    </div>
                    <div className="flex min-w-0 flex-col items-center gap-1.5">
                      <Maximize2 size={16} className="text-gold" aria-hidden />
                      <dt className="sr-only">Room size</dt>
                      <dd className="line-clamp-1">{room.roomSize}</dd>
                    </div>
                  </dl>

                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <Link
                      href={`/rooms/${room.id}`}
                      className="inline-flex items-center gap-2 whitespace-nowrap rounded-sm bg-navy px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-navy-light"
                    >
                      View {room.title}
                      <ArrowRight size={15} aria-hidden />
                    </Link>
                    <a
                      href={`tel:${business.phone}`}
                      className="whitespace-nowrap text-xs font-semibold uppercase tracking-[0.16em] text-navy transition-colors hover:text-gold"
                    >
                      Call {business.phoneDisplay}
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
      <CallButton />
    </>
  );
}

