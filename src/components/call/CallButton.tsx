"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";

export default function CallButton() {
  const [visible, setVisible] = useState(false);

  const phoneNumber = "+918684870142";
  const truecallerNumber = "+91 8684870142";

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  const handleCall = () => {
    // Truecaller open karne ki koshish
    window.location.href = `truecaller://search?q=${truecallerNumber}`;

    // Agar Truecaller available nahi hai → normal phone dialer
    setTimeout(() => {
      window.location.href = `tel:${phoneNumber}`;
    }, 700);
  };

  return (
    <button
      type="button"
      onClick={handleCall}
      aria-label="Call Victoria Club Hotel"
      title="Call Victoria Club Hotel"
      className={`fixed bottom-6 left-6 z-[90]
        flex h-14 w-14 items-center justify-center
        rounded-full bg-emerald-600 text-white
        shadow-xl shadow-black/25
        transition-all duration-500
        hover:scale-110 hover:bg-emerald-700
        hover:shadow-2xl
        focus:outline-none focus:ring-4 focus:ring-emerald-300
        ${
          visible
            ? "translate-y-0 opacity-100"
            : "translate-y-6 opacity-0"
        }`}
    >
      <Phone size={26} strokeWidth={2.5} aria-hidden="true" />

      {/* Pulse animation */}
      <span
        className="absolute inset-0 -z-10
          animate-ping rounded-full
          bg-emerald-500 opacity-30"
      />
    </button>
  );
}