"use client";

import { useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";

const testimonials = [
  {
    quote:
      "From the moment we arrived, the warmth of the staff made us feel like family. The suite was immaculate, the rooftop dinner unforgettable — we are already planning our return.",
    name: "Aditi & Rohan Sharma",
    detail: "Anniversary Stay • Delhi",
  },
  {
    quote:
      "A true boutique gem on the seafront. Impeccable housekeeping, superb breakfast and the quietest, most comfortable beds we have slept in on our entire Odisha trip.",
    name: "James Whitfield",
    detail: "Leisure Traveller • London",
  },
  {
    quote:
      "We hosted our corporate offsite here and everything was flawless — the conference arrangements, the dining, the attentive service. Highly recommended for business and leisure alike.",
    name: "Meera Krishnan",
    detail: "Corporate Retreat • Bangalore",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setIndex((i) => (i + 1) % testimonials.length),
      6000
    );
    return () => clearInterval(t);
  }, []);

  const t = testimonials[index];

  return (
    <section className="relative overflow-hidden bg-black py-16 sm:py-20 lg:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-10">
        <div
          className="h-full w-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=1600&auto=format&fit=crop')",
          }}
        />
      </div>
      <div className="relative mx-auto max-w-3xl px-5 text-center">
        <Reveal>
          <div className="flex justify-center gap-1.5" aria-label="5 star rating">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={20}
                aria-hidden
                className="fill-amber-300 text-amber-300"
              />
            ))}
          </div>
          <Quote size={44} aria-hidden className="mx-auto mt-8 text-olive/70" />

          <div className="mt-6 min-h-[220px] sm:min-h-[180px]">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={index}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5 }}
              >
                <p className="font-serif text-xl italic leading-relaxed text-white/90 sm:text-2xl">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="mt-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-100">
                    {t.name}
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/50">
                    {t.detail}
                  </p>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex justify-center gap-3">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Show testimonial ${i + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === index
                    ? "w-8 bg-olive"
                    : "w-2.5 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
