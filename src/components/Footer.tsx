import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";

function FacebookIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Rooms", href: "/#rooms" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Contact", href: "/#contact" },
];

const socials = [
  { icon: FacebookIcon, label: "Facebook", href: "#" },
  { icon: InstagramIcon, label: "Instagram", href: "#" },
  { icon: TwitterIcon, label: "Twitter", href: "#" },
  { icon: YoutubeIcon, label: "YouTube", href: "#" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy text-white">
      <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
        <div
          className="h-full w-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1600&auto=format&fit=crop')",
          }}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/85 to-navy" />

      <div className="relative mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <span className="leading-tight">
            <img src="https://victriaclubhotel.com/wp-content/uploads/2024/11/logo-header.png" alt="Victoria Club Hotel" className="flex h-20 w-20 " />
          </span>
              <span className="leading-tight">
                <span className="block font-serif text-xl tracking-wide">
                  Victoria Club
                </span>
                <span className="block text-[10px] uppercase tracking-[0.3em] text-amber-100/70">
                  Hotel
                </span>
              </span>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-white/60">
              A boutique luxury hotel in the heart of Bani Park, Jaipur — where
              timeless elegance meets warm Rajasthani hospitality.
            </p>
            <div className="mt-7 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/75 transition-all duration-300 hover:border-olive hover:bg-olive hover:text-white"
                >
                  <s.icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer">
            <h3 className="font-serif text-lg">Quick Links</h3>
            <div className="mt-5 h-px w-10 bg-olive" />
            <ul className="mt-5 space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/60 transition-colors hover:text-amber-100"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-lg">Contact Us</h3>
            <div className="mt-5 h-px w-10 bg-olive" />
            <ul className="mt-5 space-y-4 text-sm text-white/60">
              <li className="flex items-start gap-3">
                <Phone size={17} aria-hidden className="mt-0.5 shrink-0 text-amber-100" />
                <a href="tel:+91 8684870142" className="transition-colors hover:text-amber-100">
                  +91 8684870142 
                </a>
                
              </li>
              <li className="flex items-start gap-3">
                <Mail size={17} aria-hidden className="mt-0.5 shrink-0 text-amber-100" />
                <a
                  href="mailto:stay@victoriaclubhotel.com"
                  className="transition-colors hover:text-amber-100"
                >
                  stay@victoriaclubhotel.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={17} aria-hidden className="mt-0.5 shrink-0 text-amber-100" />
                Kabir Marg, Bani Park,
                <br />
               Marine Drive Road, Sea Beach Rd, Bali Sahi, Puri, Odisha 752001
              </li>
            </ul>
          </div>

          {/* Big elegant icons */}
          <div>
            <h3 className="font-serif text-lg">At a Glance</h3>
            <div className="mt-5 h-px w-10 bg-olive" />
            <div className="mt-6 flex gap-5">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-amber-100/30 text-amber-100">
                <MapPin size={24} aria-hidden strokeWidth={1.5} />
              </span>
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-amber-100/30 text-amber-100">
                <Mail size={24} aria-hidden strokeWidth={1.5} />
              </span>
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-amber-100/30 text-amber-100">
                <Phone size={24} aria-hidden strokeWidth={1.5} />
              </span>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-white/55">
              Front desk available 24/7. Reach out any time — we are always
              delighted to assist you.
            </p>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-white/45">
            &copy; {new Date().getFullYear()} Victoria Club Hotel. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
