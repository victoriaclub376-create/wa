







import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BedDouble, Check, ChevronLeft, Maximize2, Users, Waves } from "lucide-react";
import { notFound } from "next/navigation";
import AvailabilityWidget from "@/components/AvailabilityWidget";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RoomGallery from "@/components/RoomGallery";
import WhatsAppButton from "@/components/WhatsAppButton";
import CallButton from "@/components/call/CallButton";
import { getLuxuryRoomLabel, getRoom, rooms } from "@/lib/rooms";
import {
  breadcrumbSchema,
  business,
  schemaGraph,
  serializeSchema,
  webPageSchema,
} from "@/lib/site";

/** Builds a natural, per-room description from the room's own real data. */
function roomDescription(room: NonNullable<ReturnType<typeof getRoom>>) {
  return (
    `${room.title} in Puri — a ${room.roomSize} ${room.category.toLowerCase()} for ` +
    `${room.capacity} guests, with ${room.bed.toLowerCase()} and ${room.view.toLowerCase()}. ` +
    `Free Wi-Fi, air conditioning and 24-hour room service. Call ${business.phoneDisplay}.`
  );
}

function roomTitle(room: NonNullable<ReturnType<typeof getRoom>>) {
  return `${room.title} in Puri, Odisha | Victoria Club Hotel`;
}

export function generateStaticParams() {
  return rooms.map((room) => ({ slug: room.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const room = getRoom(slug);
  if (!room) return { title: "Room Not Found" };

  const title = roomTitle(room);
  const description = roomDescription(room);

  return {
    // `absolute` stops the root layout template appending the brand a second time.
    title: { absolute: title },
    description,
    keywords: [
      `${room.title} Puri`,
      `${room.category} in Puri`,
      `${room.bed} room Puri`,
      "Victoria Club Hotel Puri",
    ],
    alternates: { canonical: `/rooms/${room.id}` },
    openGraph: {
      type: "article",
      url: `/rooms/${room.id}`,
      siteName: "Victoria Club Hotel",
      title,
      description,
      locale: "en_IN",
      images: [{ url: room.image, alt: room.imageAlt, width: 1600, height: 1067 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [room.image],
    },
  };
}

export default async function RoomDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const room = getRoom(slug);
  if (!room) notFound();
  const recommendations = rooms.filter((candidate) => candidate.id !== room.id);

  const roomSchema = schemaGraph(
    webPageSchema({
      path: `/rooms/${room.id}`,
      name: roomTitle(room),
      description: roomDescription(room),
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Rooms", path: "/rooms" },
      { name: room.title, path: `/rooms/${room.id}` },
    ]),
    {
      "@type": "Product",
      "@id": `https://www.victoriaclubhotal.online/rooms/${room.id}#room`,
      name: room.title,
      description: roomDescription(room),
      image: room.image,
      category: room.category,
      brand: { "@type": "Brand", name: "Victoria Club Hotel" },
      offers: {
        "@type": "Offer",
        url: `https://www.victoriaclubhotal.online/rooms/${room.id}`,
        priceCurrency: room.currency,
        price: room.pricePerNight,
        availability: "https://schema.org/InStock",
        seller: { "@id": "https://www.victoriaclubhotal.online/#hotel" },
      },
    },
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeSchema(roomSchema) }}
      />
      <Navbar />
      <main className="bg-cream pb-20">
        <RoomGallery images={room.gallery} title={room.title} />
        <div className="mx-auto max-w-[1140px] px-5 pt-7 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-navy/55">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2">
              <Link href="/" className="transition hover:text-gold">Home</Link>
              <span>/</span>
              <Link href="/rooms" className="transition hover:text-gold">Rooms</Link>
              <span>/</span>
              <span className="text-navy">{room.title}</span>
            </nav>
            <Link href="/rooms" className="inline-flex items-center gap-1.5 font-semibold text-navy transition hover:text-gold">
              <ChevronLeft size={15} />Back to all rooms
            </Link>
          </div>

          <div className="mt-9 grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <article>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">{room.category}</p>
              
              {/* Header Title aur Luxury Room Badge */}
              <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
                <h1 className="font-serif text-4xl leading-tight text-navy sm:text-5xl">{room.title}</h1>
                <p className="rounded-sm bg-navy px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-gold">
                  {getLuxuryRoomLabel()}
                </p>
              </div>

              <div className="mt-7 grid grid-cols-2 gap-3 border-y border-navy/10 py-5 sm:grid-cols-4">
                <Spec icon={Maximize2} label="Room size" value={room.roomSize} />
                <Spec icon={BedDouble} label="Bed type" value={room.bed} />
                <Spec icon={Users} label="Capacity" value={`${room.capacity} Adults`} />
                <Spec icon={Waves} label="View" value={room.view} />
              </div>

              <section className="mt-10">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">A moment of luxury</p>
                <h2 className="mt-2 font-serif text-3xl text-navy">Your private horizon</h2>
                <div className="mt-5 space-y-4 text-base leading-8 text-navy/70">
                  {room.overview.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>

              <section className="mt-12">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">In-room comforts</p>
                <h2 className="mt-2 font-serif text-3xl text-navy">Everything, considered</h2>
                <div className="mt-6 grid gap-x-10 gap-y-4 sm:grid-cols-2">
                  {room.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-3 text-sm text-navy/75">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold">
                        <Check size={15} strokeWidth={2.3} />
                      </span>
                      {amenity}
                    </div>
                  ))}
                </div>
              </section>
            </article>

            <AvailabilityWidget room={room} />
          </div>

          {/* Recommendations Section */}
          <section className="mt-16 border-t border-navy/10 pt-12">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">More to discover</p>
                <h2 className="mt-2 font-serif text-3xl text-navy">Other Victoria Club stays</h2>
              </div>
              <Link href="/rooms" className="text-xs font-bold uppercase tracking-[0.15em] text-navy transition hover:text-gold">
                View all rooms
              </Link>
            </div>
            
            <div className="mt-7 grid gap-6 md:grid-cols-2">
              {recommendations.map((candidate) => (
                <Link key={candidate.id} href={`/rooms/${candidate.id}`} className="group overflow-hidden rounded-sm bg-white shadow-lg shadow-navy/5">
                  <div className="relative aspect-[16/8] overflow-hidden">
                    <Image
                      src={candidate.image}
                      alt={candidate.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-4 p-5">
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">{candidate.category}</p>
                      <h3 className="mt-1 font-serif text-xl text-navy">{candidate.title}</h3>
                    </div>
                    <span className="shrink-0 text-xs font-bold uppercase tracking-wider text-gold">
                      Luxury Room
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Footer Component Added */}
      <Footer />

      {/* Floating WhatsApp + Call buttons - room pages par bhi dikhna chahiye */}
      <WhatsAppButton />
      <CallButton />
    </>
  );
}

function Spec({ icon: Icon, label, value }: { icon: typeof Maximize2; label: string; value: string }) {
  return (
    <div className="flex min-w-0 gap-2.5">
      <Icon size={18} className="mt-0.5 shrink-0 text-gold" strokeWidth={1.6} />
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-navy/45">{label}</p>
        <p className="mt-0.5 text-xs font-semibold leading-5 text-navy sm:text-sm">{value}</p>
      </div>
    </div>
  );
}