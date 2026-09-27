"use client";

import { useEffect, useState } from "react";
import { FaWhatsapp } from 'react-icons/fa';


export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
      
    <a
  href="https://wa.me/918684870142?text=Hello%20Victoria%20Club%20Hotel%2C%20I%20would%20like%20to%20book%20a%20stay."
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Chat with us on WhatsApp"
  className={`fixed bottom-6 right-6 z-[90] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-black/25 transition-all duration-500 hover:scale-110 hover:shadow-2xl ${
    visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
  }`}
>
  <FaWhatsapp size={32} aria-hidden />
  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-25" />
</a>

  );
}
