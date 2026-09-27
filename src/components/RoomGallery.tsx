"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import type { RoomGalleryImage } from "@/lib/rooms";

export default function RoomGallery({ images, title }: { images: RoomGalleryImage[]; title: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex];

  const previous = () => setActiveIndex((index) => (index + images.length - 1) % images.length);
  const next = () => setActiveIndex((index) => (index + 1) % images.length);

  return (
    <section className="relative bg-navy pt-20 sm:pt-24">
      <div className="mx-auto max-w-[1140px] px-5 pb-5 lg:px-8">
        <div className="relative aspect-[16/11] overflow-hidden rounded-sm bg-navy-light shadow-2xl sm:aspect-[16/9]">
          <AnimatePresence mode="wait">
            <motion.div key={activeImage.src} initial={{ opacity: 0.35, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0.35, scale: 0.99 }} transition={{ duration: 0.45 }} className="absolute inset-0">
              <Image src={activeImage.src} alt={activeImage.alt} fill priority sizes="(max-width: 1140px) 100vw, 1140px" className="object-cover" />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
          <p className="absolute bottom-5 left-5 max-w-[75%] text-sm text-white/90 sm:bottom-7 sm:left-7">{activeImage.alt}</p>
          <div className="absolute bottom-4 right-4 flex gap-2 sm:bottom-6 sm:right-6">
            <button type="button" onClick={previous} aria-label="Previous image" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-navy/50 text-white transition hover:bg-white hover:text-navy"><ChevronLeft size={19} /></button>
            <button type="button" onClick={next} aria-label="Next image" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-navy/50 text-white transition hover:bg-white hover:text-navy"><ChevronRight size={19} /></button>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-4 gap-2 sm:gap-3">
          {images.map((image, index) => <button type="button" key={image.src} onClick={() => setActiveIndex(index)} aria-label={`View ${image.alt}`} aria-current={index === activeIndex} className={`relative aspect-[4/3] overflow-hidden rounded-sm border-2 transition ${index === activeIndex ? "border-gold" : "border-transparent opacity-65 hover:opacity-100"}`}><Image src={image.src} alt="" fill sizes="(max-width: 640px) 25vw, 260px" className="object-cover" /></button>)}
        </div>
      </div>
      <div className="sr-only">Image gallery for {title}</div>
    </section>
  );
}
