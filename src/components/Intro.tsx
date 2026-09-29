import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

export default function Intro() {
  return (
    <section id="about" className="bg-cream py-16 sm:py-20 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <Reveal>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-olive">
            Victoria Club Hotel
          </p>
          <h2 className="font-serif text-3xl leading-tight text-navy sm:text-4xl lg:text-5xl">
            Discover a New Look
            <br />
            Of Hotel
          </h2>
          <div className="mt-6 h-px w-24 bg-olive/50" />
          <p className="mt-8 text-base leading-relaxed text-navy/70">
            Nestled in the heart of Bani Park, Victoria Club Hotel blends old-world
            Rajasthani charm with contemporary luxury. Every corner of our boutique
            property has been crafted for guests who appreciate refined comfort —
            from elegantly appointed suites and a rooftop restaurant serving
            authentic cuisine, to a serene poolside courtyard where evenings unfold
            in golden light.
          </p>
          <p className="mt-4 text-base leading-relaxed text-navy/70">
            Our attentive team is devoted to making each stay memorable, whether
            you visit for leisure, celebration or business. Experience warm
            hospitality, thoughtful amenities and timeless elegance — all just
            minutes from Jaipur&apos;s iconic landmarks.
          </p>
          <Link
            href="#rooms"
            className="mt-9 inline-flex items-center gap-3 rounded-sm bg-olive px-8 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-white transition-all duration-300 hover:bg-olive-dark hover:shadow-lg hover:shadow-olive/30"
          >
            Discover More
            <ArrowRight size={16} aria-hidden />
          </Link>
        </Reveal>

        <Reveal delay={0.15} className="relative">
          <div className="relative overflow-hidden rounded-sm">
            <Image
              src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=1400&auto=format&fit=crop"
              alt="Elegant hotel exterior with pool at Victoria Club Hotel"
              width={1400}
              height={1600}
              loading="lazy"
              className="h-[320px] w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-[440px] lg:h-[560px]"
            />
          </div>
          <div className="absolute -bottom-6 left-6 hidden rounded-sm bg-navy px-8 py-6 text-white shadow-xl sm:block lg:-left-6">
            <p className="font-serif text-4xl text-amber-100">25+</p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/70">
              Years of Hospitality
            </p>
          </div>
          <div className="absolute -right-4 -top-4 -z-10 hidden h-full w-full rounded-sm border border-olive/40 lg:block" />
        </Reveal>
      </div>
    </section>
  );
}
