import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-navy px-6 text-center text-white">
      <div><p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">Victoria Club Hotel</p><h1 className="mt-4 font-serif text-5xl">This room has drifted away.</h1><p className="mx-auto mt-5 max-w-md text-sm leading-6 text-white/65">The page you requested is unavailable, but a beautiful stay is still waiting.</p><Link href="/" className="mt-8 inline-flex rounded-sm bg-gold px-7 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-navy transition hover:bg-gold-dark">Return home</Link></div>
    </main>
  );
}
