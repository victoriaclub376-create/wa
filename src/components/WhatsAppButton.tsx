"use client";

import { FaWhatsapp } from 'react-icons/fa';


export default function WhatsAppButton() {
  return (
      
    <a
  href="https://wa.me/918684870142?text=Hello%20Victoria%20Club%20Hotel%2C%20I%20would%20like%20to%20book%20a%20stay."
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Chat with us on WhatsApp"
  className="floating-action floating-action-right fixed z-[90] flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-black/25 transition-all duration-500 hover:scale-110 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-emerald-300 sm:h-14 sm:w-14"
>
  <FaWhatsapp size={30} aria-hidden />
  <span className="absolute inline-flex -z-10 h-full w-full animate-ping rounded-full bg-[#25D366] opacity-25" />
</a>

  );
}
