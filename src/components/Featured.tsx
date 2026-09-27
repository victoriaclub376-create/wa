import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

export default function Featured() {
  return (
    <section className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="grid overflow-hidden rounded-sm shadow-xl shadow-navy/10 lg:grid-cols-[1fr_1.1fr_1fr]">
          {/* Left — dining */}
          <div className="relative h-72 lg:h-auto lg:min-h-[520px]">
            <Image
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop"
              alt="Fine dining restaurant with beautifully plated cuisine"
              fill
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>

          {/* Center — text panel */}
          <div className="relative flex flex-col items-center justify-center bg-navy px-8 py-16 text-center lg:px-12">
            <div className="absolute inset-0 opacity-20">
              <Image
                src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1200&auto=format&fit=crop"
                alt=""
                fill
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 36vw"
                className="object-cover"
              />
            </div>
            <div className="relative z-10">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-amber-100/80">
                The Experience
              </p>
              <h2 className="font-serif text-3xl leading-snug text-white sm:text-4xl">
                In the Heart of Bani Park,
                <br />
                <span className="italic text-amber-100">Outstanding Views</span>
              </h2>
              <div className="mx-auto mt-6 h-px w-20 bg-amber-100/50" />
              <p className="mx-auto mt-6 max-w-sm text-sm leading-relaxed text-white/70">
                Wake to rooftop sunrises over the Pink City, dine under starlit
                skies and unwind beside our tranquil courtyard pool.
              </p>
              <Link
                href="#gallery"
                className="mt-9 inline-flex items-center gap-3 rounded-sm border border-amber-100/60 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.25em] text-amber-100 transition-all duration-300 hover:bg-amber-100 hover:text-navy"
              >
                Discover the Hotel
                <ArrowRight size={15} aria-hidden />
              </Link>
            </div>
          </div>

          {/* Right — scenic */}
          <div className="relative h-72 lg:h-auto lg:min-h-[520px]">
            <Image
              src="https://lh3.googleusercontent.com/gps-cs-s/ANWiy9QWC2PpIG7HBt6lJZ-BaDdP7v-6hdqI_h1J1ymtZmVCBgFW7excFBT0b3Hy0DfD1PWijND5QtieSHen3ulFFMJ8YASu7O5diP_Hj03T8LSRO9aC4oVRDth_TtIHurz4k1wQteGDFA=s1360-w1360-h1020-rw"
              alt="Scenic golden sunset over serene waters"
              fill
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
