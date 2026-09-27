


"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BedDouble, ChevronLeft, ChevronRight, Maximize2, Users } from "lucide-react";
import { rooms } from "@/lib/rooms";

export default function Rooms() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 8);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, [updateScrollState]);

  const scrollByCard = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-room-card]");
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  return (
    <section id="rooms" className="bg-sand/45 py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-dark">
            Stay at Victoria Club
          </p>
          <h2 className="mt-4 font-serif text-3xl text-navy sm:text-4xl lg:text-5xl">
            Rooms made for lingering
          </h2>
          <p className="mt-5 text-sm leading-7 text-navy/65 sm:text-base">
            Thoughtfully layered spaces, considered comforts and an unhurried view from every stay.
          </p>
        </div>

        <div className="relative mt-12 lg:mt-16">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label="Previous rooms"
            disabled={atStart}
            className="absolute left-1 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-navy shadow-lg shadow-navy/20 transition-all duration-300 hover:bg-gold hover:text-navy disabled:pointer-events-none disabled:opacity-30 sm:h-12 sm:w-12 lg:-left-5"
          >
            <ChevronLeft size={24} aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label="Next rooms"
            disabled={atEnd}
            className="absolute right-1 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-navy shadow-lg shadow-navy/20 transition-all duration-300 hover:bg-gold hover:text-navy disabled:pointer-events-none disabled:opacity-30 sm:h-12 sm:w-12 lg:-right-5"
          >
            <ChevronRight size={24} aria-hidden />
          </button>

          <div
            ref={trackRef}
            onScroll={updateScrollState}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
             {/* {rooms && Array.isArray(rooms) && rooms.map((room) => ( */}
              {rooms.map((room) => (
              <article
                key={room.id}
                data-room-card
                className="group flex w-[85%] min-w-0 shrink-0 snap-start flex-col overflow-hidden rounded-sm bg-white shadow-lg shadow-navy/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/10 sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                <Link href={`/rooms/${room.id}`} className="relative block aspect-[4/3] overflow-hidden bg-navy/5">
                  <Image
                    src={room.image || "/placeholder.jpg"}
                    alt={room.imageAlt || room.title || "Room Image"}
                    fill
                    unoptimized
                    sizes="(max-width: 639px) 85vw, (max-width: 1023px) calc(50vw - 36px), 380px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-navy/55 to-transparent" />
                  <p className="absolute bottom-4 left-5 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                    {room.category}
                  </p>
                </Link>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-serif text-2xl leading-tight text-navy">
                      <Link href={`/rooms/${room.id}`} className="transition-colors hover:text-gold-dark">
                        {room.title}
                      </Link>
                    </h3>
                    
                    {/* Currency/Price ki jagah Luxury Room Tag */}
                    <p className="shrink-0 text-right text-xs font-semibold uppercase tracking-[0.12em] text-gold-dark">
                      Luxury Room
                    </p>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-navy/65">{room.description}</p>

                  <dl className="mt-5 grid grid-cols-3 gap-2 border-y border-navy/10 py-4 text-center text-[11px] text-navy/65">
                    <div className="flex min-w-0 flex-col items-center gap-1.5">
                      <Users size={16} className="text-gold-dark" aria-hidden />
                      <dt className="sr-only">Guests</dt>
                      <dd>{room.capacity} guests</dd>
                    </div>
                    <div className="flex min-w-0 flex-col items-center gap-1.5 border-x border-navy/10 px-1">
                      <BedDouble size={16} className="text-gold-dark" aria-hidden />
                      <dt className="sr-only">Bed</dt>
                      <dd className="line-clamp-1">{room.bed}</dd>
                    </div>
                    <div className="flex min-w-0 flex-col items-center gap-1.5">
                      <Maximize2 size={16} className="text-gold-dark" aria-hidden />
                      <dt className="sr-only">Room size</dt>
                      <dd className="line-clamp-1">{room.roomSize}</dd>
                    </div>
                  </dl>

                  <div className="mt-5 flex items-center justify-between gap-3">
                    <Link
                      href={`/rooms/${room.id}`}
                      className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-navy transition-colors hover:text-gold-dark"
                    >
                      Explore room
                      <ArrowRight size={15} aria-hidden />
                    </Link>

                    <a
                      href="https://wa.me/+918684870142"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-sm bg-navy px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-navy-light"
                    >
                      Book Now
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}