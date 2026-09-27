import {
  Wifi,
  UtensilsCrossed,
  WashingMachine,
  Coffee,
  Car,
  ConciergeBell,
} from "lucide-react";
import Reveal from "./Reveal";

const amenities = [
  {
    icon: Wifi,
    title: "Free Wi-Fi",
    desc: "High-speed fibre internet in every room and public space.",
  },
  {
    icon: UtensilsCrossed,
    title: "Restaurant",
    desc: "Rooftop multi-cuisine dining with authentic Rajasthani flavours.",
  },
  {
    icon: WashingMachine,
    title: "Laundry Service",
    desc: "Same-day laundry and dry cleaning, pressed to perfection.",
  },
  {
    icon: Coffee,
    title: "Breakfast Included",
    desc: "A generous breakfast spread served fresh every morning.",
  },
  {
    icon: Car,
    title: "Parking",
    desc: "Secure on-site parking with valet assistance around the clock.",
  },
  {
    icon: ConciergeBell,
    title: "Room Service",
    desc: "24-hour in-room dining and attentive turndown service.",
  },
];

export default function Amenities() {
  return (
    <section id="amenities" className="relative overflow-hidden bg-navy py-20 sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
        <div
          className="h-full w-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1600&auto=format&fit=crop')",
          }}
        />
      </div>
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="mb-14 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-amber-100/80">
            Hotel Facilities
          </p>
          <h2 className="font-serif text-4xl text-white sm:text-5xl">
            Our Best Amenities
          </h2>
          <div className="mx-auto mt-6 h-px w-20 bg-amber-100/50" />
        </Reveal>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {amenities.map((a, i) => (
            <Reveal key={a.title} delay={(i % 3) * 0.1}>
              <div className="group flex items-start gap-5">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-amber-100/30 text-amber-100 transition-all duration-300 group-hover:border-olive group-hover:bg-olive group-hover:text-white">
                  <a.icon size={24} aria-hidden strokeWidth={1.5} />
                </span>
                <div>
                  <h3 className="font-serif text-xl text-white">{a.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">
                    {a.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
