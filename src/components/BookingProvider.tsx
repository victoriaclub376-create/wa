


"use client";

import { CheckCircle2, LoaderCircle, X } from "lucide-react";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type BookingDefaults = {
  roomId?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
};

type BookingContextValue = {
  openBooking: (defaults?: BookingDefaults) => void;
};

type BookingResponse = {
  bookingReference: string;
  totalNights: number;
};

const BookingContext = createContext<BookingContextValue | null>(null);

function getNights(checkIn: string, checkOut: string) {
  if (!checkIn || !checkOut) return 0;
  const start = new Date(`${checkIn}T00:00:00Z`).getTime();
  const end = new Date(`${checkOut}T00:00:00Z`).getTime();
  const difference = end - start;
  return difference > 0 && difference % 86_400_000 === 0 ? difference / 86_400_000 : 0;
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) throw new Error("useBooking must be used within BookingProvider");
  return context;
}

export default function BookingProvider({ children }: { children: React.ReactNode }) {
  const [defaults, setDefaults] = useState<BookingDefaults>({});
  const [isOpen, setIsOpen] = useState(false);

  const openBooking = useCallback((nextDefaults: BookingDefaults = {}) => {
    setDefaults(nextDefaults);
    setIsOpen(true);
  }, []);

  const closeBooking = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ openBooking }), [openBooking]);

  return (
    <BookingContext.Provider value={value}>
      {children}
      {isOpen && <BookingModal defaults={defaults} onClose={closeBooking} />}
    </BookingContext.Provider>
  );
}

function BookingModal({ defaults, onClose }: { defaults: BookingDefaults; onClose: () => void }) {
  const [checkIn, setCheckIn] = useState(defaults.checkIn ?? "");
  const [checkOut, setCheckOut] = useState(defaults.checkOut ?? "");
  const [guests, setGuests] = useState(String(defaults.guests ?? 2));
  const [guestName, setGuestName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<BookingResponse | null>(null);

  const nights = getNights(checkIn, checkOut);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    // Mock response setup without price calculation
    setConfirmation({
      bookingReference: "VCH-RESERVE",
      totalNights: nights,
    });
    setSubmitting(false);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end bg-navy/75 p-0 backdrop-blur-sm sm:items-center sm:justify-center sm:p-6"
      onMouseDown={onClose}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        className="relative max-h-[94vh] w-full overflow-y-auto rounded-t-3xl bg-cream shadow-2xl sm:max-w-2xl sm:rounded-2xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close booking form"
          className="absolute right-5 top-5 z-10 rounded-full p-2 text-navy/60 transition hover:bg-navy/5 hover:text-navy"
        >
          <X size={20} />
        </button>

        {confirmation ? (
          <div className="px-6 py-14 text-center sm:px-14">
            <CheckCircle2 className="mx-auto h-14 w-14 text-gold" strokeWidth={1.5} />
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.28em] text-gold">Reservation received</p>
            <h2 id="booking-title" className="mt-3 font-serif text-3xl text-navy">Your stay is reserved.</h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-navy/65">
              Your booking reference is <strong className="text-navy">{confirmation.bookingReference}</strong>. We’ll send the next details to your email shortly.
            </p>

            {/* Confirmation Box - Luxury Room Tag */}
            <div className="mx-auto mt-7 flex max-w-sm items-center justify-between rounded-xl border border-navy/10 bg-white px-5 py-4 text-sm font-medium text-navy/75">
              <span>
                {confirmation.totalNights ? `${confirmation.totalNights} night${confirmation.totalNights === 1 ? "" : "s"}` : "Dates confirmed"}
              </span>
              <span className="font-semibold uppercase tracking-wider text-gold">
                Luxury Room
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="mt-8 rounded-sm bg-navy px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-navy-light"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="p-6 pt-12 sm:p-9 sm:pt-10">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">Victoria Club Reservations</p>
            <h2 id="booking-title" className="mt-2 font-serif text-3xl text-navy">Reserve your escape</h2>
            <p className="mt-2 text-sm text-navy/60">Secure your preferred room in just a few details.</p>

            <form onSubmit={submit} className="mt-7 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-navy/65">Room Type</span>
                <div className="w-full rounded-sm border border-navy/15 bg-white px-4 py-3 text-sm font-semibold text-navy">
                  Luxury Room
                </div>
              </div>

              <label>
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-navy/65">Check-in</span>
                <input
                  required
                  type="date"
                  min={new Date().toISOString().slice(0, 10)}
                  value={checkIn}
                  onChange={(event) => setCheckIn(event.target.value)}
                  className="w-full rounded-sm border border-navy/15 bg-white px-4 py-3 text-sm text-navy outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
                />
              </label>

              <label>
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-navy/65">Check-out</span>
                <input
                  required
                  type="date"
                  min={checkIn || new Date().toISOString().slice(0, 10)}
                  value={checkOut}
                  onChange={(event) => setCheckOut(event.target.value)}
                  className="w-full rounded-sm border border-navy/15 bg-white px-4 py-3 text-sm text-navy outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
                />
              </label>

              <label>
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-navy/65">Guests</span>
                <select
                  value={guests}
                  onChange={(event) => setGuests(event.target.value)}
                  className="w-full rounded-sm border border-navy/15 bg-white px-4 py-3 text-sm text-navy outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
                >
                  {[1, 2, 3, 4].map((count) => (
                    <option key={count} value={count}>
                      {count} guest{count === 1 ? "" : "s"}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-navy/65">Full name</span>
                <input
                  required
                  minLength={2}
                  maxLength={100}
                  value={guestName}
                  onChange={(event) => setGuestName(event.target.value)}
                  placeholder="Your name"
                  className="w-full rounded-sm border border-navy/15 bg-white px-4 py-3 text-sm text-navy placeholder:text-navy/35 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
                />
              </label>

              <label className="sm:col-span-2">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-navy/65">Email address</span>
                <input
                  required
                  type="email"
                  maxLength={254}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-sm border border-navy/15 bg-white px-4 py-3 text-sm text-navy placeholder:text-navy/35 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
                />
              </label>

              {/* Bottom Summary Strip - Luxury Room */}
              <div className="sm:col-span-2 mt-1 flex items-center justify-between rounded-lg bg-navy px-4 py-3 text-white">
                <span className="text-sm text-white/70">
                  {nights ? `${nights} night${nights === 1 ? "" : "s"}` : "Select your dates"}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-gold">
                  Luxury Room
                </span>
              </div>

              {error && <p role="alert" className="sm:col-span-2 text-sm text-red-700">{error}</p>}

              <button
                disabled={submitting}
                type="submit"
                className="sm:col-span-2 inline-flex items-center justify-center gap-2 rounded-sm bg-gold px-7 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-navy transition hover:bg-gold-dark disabled:cursor-not-allowed disabled:opacity-65"
              >
                {submitting && <LoaderCircle size={16} className="animate-spin" />}
                {submitting ? "Confirming" : "Confirm reservation"}
              </button>
            </form>
          </div>
        )}
      </section>
    </div>
  );
}