"use client";

import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Reveal from "./Reveal";







const photos = [
  {
    src: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1000&auto=format&fit=crop",
    alt: "Grand hotel exterior facade at golden hour",
    tall: true,
  },
  {
    src: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1000&auto=format&fit=crop",
    alt: "Luxurious bedroom with king bed and warm lighting",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000&auto=format&fit=crop",
    alt: "Modern marble bathroom with freestanding bathtub",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop",
    alt: "Elegant restaurant interior set for dinner",
    tall: true,
  },
  {
    src: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1000&auto=format&fit=crop",
    alt: "Sophisticated hotel lobby lounge",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1000&auto=format&fit=crop",
    alt: "Outdoor swimming pool surrounded by loungers",
    tall: true,
  },
  {
    src: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1000&auto=format&fit=crop",
    alt: "Smiling hotel staff member in professional attire",
    tall: false,
  },
  {
    src: "/gallery/img-1-1-300x300.jpg",
    alt: "Victoria Club Hotel exterior lit up at night",
    tall: false,
  },
  {
    src: "/gallery/king_queen-300x236.jpg",
    alt: "Four-poster bed in a Victoria Club Hotel guest room",
    tall: false,
  },
  {
    src: "/gallery/img-4.jpg",
    alt: "Hotel chefs and staff beside a banquet table set for dinner", 
    tall: false,
  },
  {
    src: "/img-5.jpg",
    alt: "Guest room with double bed and air conditioning", 
    tall: false,
  },
  {
    src: "/gallery/img-6.jpg",
    alt: "Grilled fish plated at the hotel restaurant", 
    tall: false,
  },
  {
    src: "/gallery/img-7.jpg",
    alt: "Guest room with four-poster bed and a wall-mounted television", 
    tall: false,
  },
  {
    src: "/gallery/img-8.jpg",
    alt: "Four-poster bed beside a window at Victoria Club Hotel", 
    tall: false,
  },
  {
    src: "/gallery/img-9.jpg",
    alt: "Four-poster bed dressed in gold linens", 
    tall: false,
  },
  {
    src: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWnkXA44vCjgy_r0KheCTUW1Q0jmgGaB9BEjAbADWzAmGSj6tKM-WoDBGdcl9nPQYBN3kGU49Q12JAfho_jusYZ-qYTtshcCNsr5Bzlzv6B9vlJ5QnpEW1PuszSmW3ib9OhnFVoj_nBYq6dQ=s1360-w1360-h1020-rw",
    alt: "Victoria Club Hotel courtyard lit with festive string lights", 
    tall: false,
  },
  {
    src: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWmBWe4DFj-Q9xI_zt12bxzIkDItregTjwxIQn7o5An2g7qUuS6N2pD3668Xr13pkdJjlgmUfzJWhQw9FeW3fkU_tAAWEL7nGvzeslr2-sHTqVeyWp5cVAhA3qkxcLSmOvmnJO3L=s1360-w1360-h1020-rw",
    alt: "Victoria Club Hotel at night overlooking Sea Beach Road", 
    tall: false,
  },
  {
    src: "/gallery/img-12.jpg",
    alt: "Guests dining together at the hotel restaurant", 
    tall: false,
  },
  {
    src: "https://lh3.googleusercontent.com/gps-cs-s/ANWiy9SrL9aS5E3EGVkbc5odWaPKfMhBaW0_JEhrhmdzOOOWqYHx-RGta7fVmjBOJRZesC8kKoV53hXgP19reHK4tdZjzFzjFNmzPPKQ-gjJfXvuV2dn6MmJmZf6u8aM8uFjSqxyD6u4=s1360-w1360-h1020-rw",
    alt: "Victoria Club Hotel entrance banner and sand sculpture", 
    tall: false,
  },
  {
    src: "https://media.istockphoto.com/id/1039616694/photo/modern-scandinavian-living-room-interior-3d-render.jpg?s=612x612&w=0&k=20&c=fexdb0CZTOXhbFEzigvfCOrXOwC4N6cBgrE1-0MrBJ0=",
    alt: "Living room interior with a sofa and large windows", 
    tall: false,
  },
  {
    src: "https://r1imghtlak.mmtcdn.com/dfd18c6e4af611ed8e680a58a9feac02.jpeg?downsize=540:*",
    alt: "Rooftop lounge with window seating and hanging lights",
    tall: false,
  },
  {
    src: "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/htl-imgs/201808221622098319-abaefe1c76e211e98b850242ac110003.jpg?downsize=540:*",
    alt: "Victoria Hotel entrance lit in green at night", 
    tall: false,
  }
];


 export default function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const prev = useCallback(
    () => setActive((i) => (i === null ? i : (i + photos.length - 1) % photos.length)),
    []
  );
  const next = useCallback(
    () => setActive((i) => (i === null ? i : (i + 1) % photos.length)),
    []
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, prev, next]);

  return (
    <>
      <section id="gallery" className="bg-cream py-16 sm:py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal className="mb-14 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-olive">
              Photo Gallery
            </p>
            <h2 className="font-serif text-4xl text-navy sm:text-5xl">
              Checkout Our Gallery
            </h2>
            <div className="mx-auto mt-6 h-px w-20 bg-olive/50" />
          </Reveal>

          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
            {photos.map((p, i) => (
              <Reveal key={`${p.src}-${i}`} delay={(i % 3) * 0.08} className="break-inside-avoid">
                <button
                  onClick={() => setActive(i)}
                  className="group relative block w-full cursor-zoom-in overflow-hidden rounded-sm"
                  aria-label={`Enlarge photo: ${p.alt}`}
                >
                  <Image
                    src={p.src}
                    alt={p.alt}
                    width={1000}
                    height={p.tall ? 1400 : 800}
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                      p.tall ? "aspect-[5/7]" : "aspect-[4/3]"
                    }`}
                  />
                  <span className="absolute inset-0 bg-navy/0 transition-colors duration-500 group-hover:bg-navy/25" />
                </button>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Lightbox Modal */}
        {active !== null && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Photo lightbox"
            onClick={close}
          >
            <button
              onClick={close}
              aria-label="Close lightbox"
              className="absolute right-5 top-5 text-white/80 transition-colors hover:text-white"
            >
              <X size={30} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous photo"
              className="absolute left-3 flex h-12 w-12 items-center justify-center rounded-full border border-white/25 text-white transition-all hover:bg-white hover:text-navy sm:left-8"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next photo"
              className="absolute right-3 flex h-12 w-12 items-center justify-center rounded-full border border-white/25 text-white transition-all hover:bg-white hover:text-navy sm:right-8"
            >
              <ChevronRight size={24} />
            </button>
            <figure
              className="relative max-h-[85vh] w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" 
                src={photos[active].src}
                alt={photos[active].alt}
                width={1600}
                height={1100}
                priority
                className="mx-auto max-h-[78vh] w-auto rounded-sm object-contain"
              />
              <figcaption className="mt-4 text-center text-sm text-white/70">
                {photos[active].alt}
              </figcaption>
            </figure>
          </div>
        )}
      </section>

      {/* 2. FOOTER SECTION INCLUDED */}
    </>
  );
}