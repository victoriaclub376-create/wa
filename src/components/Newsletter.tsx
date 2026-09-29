"use client";

import Image from "next/image";
import { useState } from "react";
import { CheckCircle2, LoaderCircle, Send } from "lucide-react";
import Reveal from "./Reveal";

const thumbs = [
  { src: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=400&auto=format&fit=crop", alt: "Hotel suite bedroom" },
  { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=400&auto=format&fit=crop", alt: "Fine dining table setting" },
  { src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=400&auto=format&fit=crop", alt: "Luxury pool deck" },
  { src: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=400&auto=format&fit=crop", alt: "Oceanfront hotel exterior" },
];

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage("Thank you. You are on the Victoria Club Hotel mailing list.");
    setEmail("");
    setSubmitting(false);
  };

  return (
    <section id="newsletter" className="bg-white py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-[1140px] px-5 lg:px-8">
        <Reveal className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div><p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-gold">The Victoria journal</p><h2 className="font-serif text-3xl leading-snug text-navy sm:text-4xl lg:text-5xl">A little more <span className="italic text-gold">escape</span>, delivered to your inbox.</h2></div>
          <form onSubmit={submit} className="w-full"><div className="flex flex-col gap-3 sm:flex-row"><label htmlFor="newsletter-email" className="sr-only">Email address</label><input id="newsletter-email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter your email address" className="min-w-0 flex-1 rounded-sm border border-navy/15 bg-cream px-5 py-4 text-sm text-navy placeholder:text-navy/40 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20" /><button disabled={submitting} type="submit" className="inline-flex items-center justify-center gap-2 rounded-sm bg-navy px-7 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-navy-light disabled:opacity-65">{submitting ? <LoaderCircle size={16} className="animate-spin" /> : <Send size={15} />}Subscribe</button></div>{message && <p role="status" className="mt-3 flex items-center gap-2 text-sm text-navy/65"><CheckCircle2 size={16} className="text-gold" />{message}</p>}</form>
        </Reveal>
        <Reveal delay={0.15} className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">{thumbs.map((thumb) => <div key={thumb.src} className="group relative aspect-[4/3] overflow-hidden rounded-sm"><Image src={thumb.src} alt={thumb.alt} fill loading="lazy" sizes="(max-width: 640px) 50vw, 25vw" className="object-cover transition duration-700 group-hover:scale-110" /></div>)}</Reveal>
      </div>
    </section>
  );
}
