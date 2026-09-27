"use client";

import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";


const links = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Rooms", href: "/#rooms" },
  { label: "Amenities", href: "/#amenities" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // const { openBooking } = useBooking();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "bg-navy/95 py-3 shadow-lg shadow-black/20 backdrop-blur" : "bg-gradient-to-b from-black/65 to-transparent py-4"}`}>
      <nav className="mx-auto flex max-w-[1140px] items-center justify-between px-5 lg:px-8" aria-label="Main navigation">
     

        <Link
            href="#home"
            className="flex items-center gap-3 cursor-pointer"
            onClick={(e) => {
              setOpen(false);
              
              // Smooth scroll to Hero Section (#home)
              const heroSection = document.getElementById("home");
              if (heroSection) {
                e.preventDefault();
                heroSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <span className="leading-tight">
              <img
                src="https://victriaclubhotel.com/wp-content/uploads/2024/11/logo-header.png"
                alt="Victoria Club Hotel"
                className="h-20 w-20 object-contain"
              />
            </span>
          </Link>
        <ul className = "hidden items-center gap-6 xl:gap-8 lg:flex">
          {links.map((link) => <li key={link.href}><Link href={link.href} className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/85 transition-colors hover:text-gold">{link.label}</Link></li>)}
        </ul>

        <div className="hidden items-center gap-4 lg:flex">
          <a
           href="tel:+918684870142"
           className="flex items-center gap-2 text-xs text-white/80 transition-colors duration-300 hover:text-gold"
          aria-label="Call Victoria Club Hotel">
          <Phone size={14} aria-hidden="true" />
           <span>+91 8684870142</span>  
           </a>
 
        
      <li className="list-none pt-3">
            <a
              href="https://wa.me/+918684870142"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="relative block w-full overflow-hidden rounded-sm border border-gold bg-gold px-6 py-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-navy transition-colors duration-300 before:absolute before:inset-0 before:-z-0 before:translate-x-[-100%] before:bg-navy before:transition-transform before:duration-300 before:ease-out hover:text-gold hover:before:translate-x-0"
            >
              <span className="relative z-10">ENQUIRE NOW</span>
            </a>
          </li>
  

        </div>

        <button className="rounded-sm p-2 text-white lg:hidden" onClick={() => setOpen((current) => !current)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
          {open ? <X size={25} /> : <Menu size={25} />}
        </button>
      </nav>

      <div className={`overflow-hidden bg-navy transition-all duration-300 lg:hidden ${open ? "max-h-[440px] border-t border-white/10" : "max-h-0"}`}>
        <ul className="space-y-1 px-6 py-4">
       
         <li className="pt-3">
     <a
    href="https://wa.me/918684870142?text=Hello%20Victoria%20Club%20Hotel%2C%20I%20would%20like%20to%20book%20a%20stay."
    target="_blank"
    rel="noopener noreferrer"
    onClick={() => setOpen(false)}
    className="block w-full rounded-sm bg-gold px-6 py-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-navy transition-opacity hover:opacity-90"
  >
    Book Now
  </a>
</li>
        </ul>
      </div>
    </header>
  );
}
