
import { MapPin, Navigation } from "lucide-react";
import Reveal from "./Reveal";

export default function Location() {
  const mapDirectionsUrl =
    "https://www.google.com/maps/place/Victoria+Club+Hotel/@19.794751,85.822972,17z/data=!3m1!4b1!4m9!3m8!1s0x3a19c424a7ad6d03:0x97a8790938d82117!8m2!3d19.7947512!4d85.8229721!16s%2Fg%2F1tppqcr6";

  return (
    <section id="contact" className="bg-background py-16 sm:py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal className="mb-10 sm:mb-14 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-gold">
            Where We Are
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-navy">
            Find Us in Puri, Odisha
          </h2>
          <div className="mx-auto mt-4 h-0.5 w-16 bg-gold/60" />
        </Reveal>

        {/* Full Clean Google Map - Victoria Club Hotel, Puri */}
        <Reveal className="relative rounded-2xl overflow-hidden border border-gold/20 shadow-2xl shadow-navy/10">
          <div className="relative h-[420px] w-full sm:h-[500px] lg:h-[550px]">
            <iframe
              title="Google Map showing Victoria Club Hotel location in Puri, Odisha"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.10373030248!2d85.82039727602888!3d19.79475622728956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19c424a7ad6d03%3A0x97a8790938d82117!2sVictoria%20Club%20Hotel!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>

        {/* Address and Directions Below Map */}
        <Reveal
          delay={0.1}
          className="mt-8 flex flex-col items-center justify-between gap-6 rounded-xl border border-navy/10 bg-white p-6 shadow-md sm:flex-row sm:p-8"
        >
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
              <MapPin size={22} aria-hidden />
            </span>
            <div>
              <h3 className="font-serif text-lg font-semibold text-navy">Address</h3>
              <p className="mt-1 text-sm leading-relaxed text-navy/70">
                Victoria Club Hotel,
                <br />
                Marine Drive Road, Sea Beach Road, Bali Sahi, Puri, Odisha 752001
              </p>
            </div>
          </div>

          <a
            href={mapDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-lg bg-navy px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-gold hover:text-navy shadow-md"
          >
            <Navigation size={16} aria-hidden />
            Get Directions
          </a>
        </Reveal>
      </div>
    </section>
  );
}