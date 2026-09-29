


"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, ChevronDown, MapPin, Search, Users, Phone } from "lucide-react";
import { useState } from "react";

import { useBooking } from "./BookingProvider";

// Swiper Imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";

// Swiper CSS
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

// 7 High Quality Beautiful Images with Custom Slide Text
const heroSlides = [
  {
    id: "slide-1",
    url: "https://lh3.googleusercontent.com/gps-cs-s/ANWiy9QWC2PpIG7HBt6lJZ-BaDdP7v-6hdqI_h1J1ymtZmVCBgFW7excFBT0b3Hy0DfD1PWijND5QtieSHen3ulFFMJ8YASu7O5diP_Hj03T8LSRO9aC4oVRDth_TtIHurz4k1wQteGDFA=s1360-w1360-h1020-rw",
    alt: "Victoria Club Hotel oceanfront resort glowing at sunset",
    title: "Victoria Club Hotel",
    subtitle: "Sun-Kissed Beaches & Golden Sands",
    location: "Marine Drive Road, Sea Beach Rd, Bali Sahi, Puri, Odisha 752001",
    phone: "+918684870142",
  },
  {
    id: "slide-2",
    url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=85&w=2200&auto=format&fit=crop",
    alt: "Victoria Club Hotel oceanfront resort glowing at sunset",
    title: "Victoria Club Hotel",
    subtitle: "A Moment of Comfort & Elegance",
    location: "Marine Drive Road, Sea Beach Rd, Bali Sahi, Puri, Odisha 752001",
    phone: "+918684870142",
  },
  {
    id: "slide-3",
    url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=85&w=2200&auto=format&fit=crop",
    alt: "Luxury hotel entrance and evening pool view",
    title: "Victoria Club Hotel",
    subtitle: "Experience Bespoke Hospitality",
    location: "Marine Drive Road, Sea Beach Rd, Bali Sahi, Puri, Odisha 752001",
    phone: "+918684870142",
  },
  {
    id: "slide-4",
    url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=85&w=2200&auto=format&fit=crop",
    alt: "Beautiful resort pool with comfortable sun loungers",
    title: "Victoria Club Hotel",
    subtitle: "Rejuvenate Your Mind & Soul",
    location: "Marine Drive Road, Sea Beach Rd, Bali Sahi, Puri, Odisha 752001",
    phone: "+918684870142",
  },
  {
    id: "slide-5",
    url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=85&w=2200&auto=format&fit=crop",
    alt: "Elegant luxury bedroom suite with scenic views",
    title: "Victoria Club Hotel",
    subtitle: "Designed For Ultimate Perfection",
    location: "Marine Drive Road, Sea Beach Rd, Bali Sahi, Puri, Odisha 752001",
    phone: "+918684870142",
  },
  {
    id: "slide-6",
    url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=85&w=2200&auto=format&fit=crop",
    alt: "Tropical beach resort with private palms",
    title: "Victoria Club Hotel",
    subtitle: "Sun-Kissed Beaches & Golden Sands",
    location: "Marine Drive Road, Sea Beach Rd, Bali Sahi, Puri, Odisha 752001",
    phone: "+918684870142",
  },
  {
    id: "slide-7",
    url: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=85&w=2200&auto=format&fit=crop",
    alt: "Modern luxury hotel interior and grand lobby area",
    title: "Victoria Club Hotel",
    subtitle: "Where Architecture Meets Art",
    location: "Marine Drive Road, Sea Beach Rd, Bali Sahi, Puri, Odisha 752001",
    phone: "+918684870142",
  },
  {
    id: "slide-8",
    url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=85&w=2200&auto=format&fit=crop",
    alt: "Relaxing outdoor lounge area with sea view",
    title: "Victoria Club Hotel",
    subtitle: "Memories That Last A Lifetime",
    location: "Marine Drive Road, Sea Beach Rd, Bali Sahi, Puri, Odisha 752001",
    phone: "+918684870142",
  },
];

export default function Hero() {
  const { openBooking } = useBooking();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");
  const [roomId, setRoomId] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      id="home"
      className="relative flex min-h-[640px] flex-col items-center justify-center overflow-hidden pb-20 pt-28 sm:min-h-[720px] sm:pt-32 lg:min-h-[800px] lg:pb-44 lg:pt-32"
    >
      {/* 1. BACKGROUND CAROUSEL SLIDER WITH KEN BURNS ZOOM ANIMATION */}
      <div className="absolute inset-0 z-0">
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          effect="fade"
          loop={true}
          speed={1500}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          pagination={{
            clickable: true,
            bulletActiveClass: "!bg-gold !w-8 transition-all duration-500",
            bulletClass:
              "inline-block w-2.5 h-2.5 rounded-full bg-white/50 mx-1 cursor-pointer transition-all duration-300",
          }}
          className="h-full w-full hero-swiper"
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={slide.id || index} className="relative h-full w-full overflow-hidden">
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: activeIndex === index ? 1.15 : 1 }}
                transition={{
                  duration: 6,
                  ease: "easeOut",
                }}
                className="relative h-full w-full"
              >
                <Image
                  src={slide.url}
                  alt={slide.alt}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover object-center"
                />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* OVERLAY WITH GRADIENT */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-navy/80 via-navy/55 to-navy/90" />

      {/* 2. DYNAMIC SLIDE CONTENT WITH ANIMATIONS */}
      <div className="relative z-10 mx-auto w-full max-w-4xl px-5 text-center sm:px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-5 text-xs font-semibold uppercase tracking-[0.42em] text-gold"
            >
              Welcome to
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 25, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-serif text-[2.35rem] leading-[1.05] text-white drop-shadow-lg sm:text-6xl sm:leading-[0.95] lg:text-8xl"
            >
              {heroSlides[activeIndex].title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="mt-5 text-[11px] font-medium uppercase tracking-[0.22em] text-white/90 sm:mt-6 sm:text-base sm:tracking-[0.28em]"
            >
              {heroSlides[activeIndex].subtitle}
            </motion.p>

            {/* LOCATION */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="mt-4 flex flex-wrap items-center justify-center gap-2 text-[13px] leading-5 text-white/75 sm:mt-5 sm:text-sm"
            >
              <MapPin size={16} aria-hidden className="text-gold animate-bounce" />
              {heroSlides[activeIndex].location}
            </motion.p>

            {/* CALL NOW BUTTON */}
            {heroSlides[activeIndex].phone && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.75 }}
                className="mt-6 w-full max-w-[200px]"
              >
                <a
                  href={`tel:${heroSlides[activeIndex].phone}`}
                  className="relative flex items-center justify-center gap-2 overflow-hidden rounded-sm border border-gold bg-gold px-6 py-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-navy transition-colors duration-300 before:absolute before:inset-0 before:-z-0 before:translate-x-[-100%] before:bg-navy before:transition-transform before:duration-300 before:ease-out hover:text-gold hover:before:translate-x-0"
                >
                  <Phone size={14} className="relative z-10" />
                  <span className="relative z-10">CALL NOW</span>
                </a>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 3. ANIMATED BOOKING FORM BAR */}
      <motion.form
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.7, ease: "easeOut" }}
        onSubmit={(event) => {
          event.preventDefault();
          openBooking({
            roomId: roomId || undefined,
            checkIn,
            checkOut,
            guests: Number(guests),
          });
        }}
        className="relative z-20 mx-5 mt-8 grid w-[calc(100%-2.5rem)] max-w-[1100px] gap-3 rounded-xl border border-white/20 bg-white/95 p-4 text-left shadow-2xl backdrop-blur sm:mt-10 sm:grid-cols-2 lg:absolute lg:bottom-10 lg:mt-0 lg:grid-cols-[1.05fr_1.05fr_.85fr_1.2fr_auto] lg:items-end lg:p-5"
      >
        <label className="min-w-0">
          <span className="mb-1.5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-navy/60">
            <CalendarDays size={14} className="text-gold" /> Check-in
          </span>
          <input
            required
            type="date"
            min={new Date().toISOString().slice(0, 10)}
            value={checkIn}
            onChange={(event) => setCheckIn(event.target.value)}
            className="w-full bg-transparent text-sm font-medium text-navy outline-none cursor-pointer"
          />
        </label>
        <label className="min-w-0 border-navy/10 lg:border-l lg:pl-4">
          <span className="mb-1.5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-navy/60">
            <CalendarDays size={14} className="text-gold" /> Check-out
          </span>
          <input
            required
            type="date"
            min={checkIn || new Date().toISOString().slice(0, 10)}
            value={checkOut}
            onChange={(event) => setCheckOut(event.target.value)}
            className="w-full bg-transparent text-sm font-medium text-navy outline-none cursor-pointer"
          />
        </label>
        <label className="min-w-0 border-navy/10 lg:border-l lg:pl-4">
          <span className="mb-1.5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-navy/60">
            <Users size={14} className="text-gold" /> Guests
          </span>
          <select
            value={guests}
            onChange={(event) => setGuests(event.target.value)}
            className="w-full bg-transparent text-sm font-medium text-navy outline-none cursor-pointer"
          >
            <option value="1">1 guest</option>
            <option value="2">2 guests</option>
            <option value="3">3 guests</option>
            <option value="4">4 guests</option>
          </select>
        </label>
        <label className="min-w-0 border-navy/10 lg:border-l lg:pl-4">
          <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.15em] text-navy/60">
            Room type
          </span>
          <select
            value={roomId}
            onChange={(event) => setRoomId(event.target.value)}
            className="w-full bg-transparent text-sm font-medium text-navy outline-none cursor-pointer"
          >
            <option value="">Any room</option>
          </select>
        </label>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-sm bg-gold px-6 text-xs font-bold uppercase tracking-[0.16em] text-navy shadow-md transition hover:bg-gold-dark sm:col-span-2 lg:col-span-1"
        >
          <Search size={16} /> Search
        </motion.button>
      </motion.form>

      {/* 4. SCROLL DOWN ARROW WITH ANIMATION */}
      <a
        href="#about"
        aria-label="Scroll to hotel introduction"
        className="absolute bottom-2 left-1/2 z-20 -translate-x-1/2 pb-1 text-white/70 transition-colors hover:text-white"
      >
        <ChevronDown size={26} className="animate-bounce" aria-hidden />
      </a>
    </section>
  );
}