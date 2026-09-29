


"use client";

import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import { useMemo, useState } from "react";
import { useBooking } from "./BookingProvider";

const weekdayLabels = ["S", "M", "T", "W", "T", "F", "S"];

function toDateString(date: Date) {
  const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
  return offsetDate.toISOString().slice(0, 10);
}

function getNights(checkIn: string, checkOut: string) {
  if (!checkIn || !checkOut) return 0;
  const difference = new Date(`${checkOut}T00:00:00Z`).getTime() - new Date(`${checkIn}T00:00:00Z`).getTime();
  return difference > 0 && difference % 86_400_000 === 0 ? difference / 86_400_000 : 0;
}

export default function AvailabilityWidget({ room }: { room: any }) {
  const today = useMemo(() => new Date(), []);
  const [month, setMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");
  const { openBooking } = useBooking();
  const nights = getNights(checkIn, checkOut);

  const days = useMemo(() => {
    const firstDay = month.getDay();
    const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    return Array.from({ length: firstDay + daysInMonth }, (_, index) => {
      if (index < firstDay) return null;
      const date = new Date(month.getFullYear(), month.getMonth(), index - firstDay + 1);
      return { number: date.getDate(), value: toDateString(date) };
    });
  }, [month]);

  const chooseDate = (value: string) => {
    if (room?.unavailableDates?.includes(value) || value < toDateString(today)) return;
    if (!checkIn || checkOut || value < checkIn) {
      setCheckIn(value);
      setCheckOut("");
      return;
    }
    if (value === checkIn) return;
    setCheckOut(value);
  };

  return (
    <aside className="rounded-sm border border-navy/10 bg-white p-5 shadow-xl shadow-navy/5 sm:p-6 lg:sticky lg:top-24">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Availability</p>
          <h2 className="mt-1 font-serif text-2xl text-navy">Plan your stay</h2>
        </div>
        <CalendarDays className="text-gold" size={23} strokeWidth={1.5} />
      </div>

      {/* Rupees / Price ki jagah Luxury Room Tag */}
      <p className="mt-3 text-xs font-bold uppercase tracking-wider text-gold">
        Luxury Room · taxes included
      </p>

      <div className="mt-5 rounded-lg bg-sand p-3">
        <div className="mb-3 flex items-center justify-between">
          <button
            type="button"
            aria-label="Previous month"
            onClick={() => setMonth((date) => new Date(date.getFullYear(), date.getMonth() - 1, 1))}
            className="rounded-full p-1.5 text-navy/60 transition hover:bg-white hover:text-navy"
          >
            <ChevronLeft size={17} />
          </button>
          <p className="min-w-0 truncate text-[11px] font-bold uppercase tracking-[0.1em] text-navy sm:text-xs sm:tracking-[0.16em]">
            {month.toLocaleString("en-US", { month: "long", year: "numeric" })}
          </p>
          <button
            type="button"
            aria-label="Next month"
            onClick={() => setMonth((date) => new Date(date.getFullYear(), date.getMonth() + 1, 1))}
            className="rounded-full p-1.5 text-navy/60 transition hover:bg-white hover:text-navy"
          >
            <ChevronRight size={17} />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center">
          {weekdayLabels.map((day, index) => (
            <span key={`${day}-${index}`} className="py-1 text-[10px] font-bold text-navy/40">
              {day}
            </span>
          ))}
          {days.map((day, index) => {
            if (!day) return <span key={`blank-${index}`} />;
            const unavailable = room?.unavailableDates?.includes(day.value) || day.value < toDateString(today);
            const selected = day.value === checkIn || day.value === checkOut;
            const inRange = Boolean(checkIn && checkOut && day.value > checkIn && day.value < checkOut);
            return (
              <button
                key={day.value}
                type="button"
                disabled={unavailable}
                onClick={() => chooseDate(day.value)}
                className={`aspect-square rounded-full text-[11px] transition ${
                  selected
                    ? "bg-navy font-bold text-white"
                    : inRange
                    ? "bg-gold/25 text-navy"
                    : unavailable
                    ? "cursor-not-allowed text-navy/25 line-through"
                    : "text-navy hover:bg-gold/30"
                }`}
              >
                {day.number}
              </button>
            );
          })}
        </div>

        <div className="mt-3 flex items-center gap-3 border-t border-navy/10 pt-3 text-[10px] text-navy/55">
          <span className="inline-flex items-center gap-1.5">
            <i className="h-2 w-2 rounded-full bg-navy" />Selected
          </span>
          <span className="inline-flex items-center gap-1.5">
            <i className="h-2 w-2 rounded-full bg-navy/20" />Unavailable
          </span>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2 sm:gap-3">
        <label className="min-w-0">
          <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.13em] text-navy/55">Check-in</span>
          <input
            type="date"
            min={toDateString(today)}
            value={checkIn}
            onChange={(event) => {
              setCheckIn(event.target.value);
              if (checkOut && event.target.value >= checkOut) setCheckOut("");
            }}
            className="w-full min-w-0 rounded-sm border border-navy/15 bg-white px-2 py-2 text-xs text-navy outline-none focus:border-gold"
          />
        </label>
        <label className="min-w-0">
          <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.13em] text-navy/55">Check-out</span>
          <input
            type="date"
            min={checkIn || toDateString(today)}
            value={checkOut}
            onChange={(event) => setCheckOut(event.target.value)}
            className="w-full min-w-0 rounded-sm border border-navy/15 bg-white px-2 py-2 text-xs text-navy outline-none focus:border-gold"
          />
        </label>
      </div>

      <label className="mt-4 block">
        <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.13em] text-navy/55">Guests</span>
        <select
          value={guests}
          onChange={(event) => setGuests(event.target.value)}
          className="w-full rounded-sm border border-navy/15 bg-white px-3 py-2.5 text-sm text-navy outline-none focus:border-gold"
        >
          {Array.from({ length: room?.capacity || 2 }, (_, index) => index + 1).map((count) => (
            <option key={count} value={count}>
              {count} guest{count === 1 ? "" : "s"}
            </option>
          ))}
        </select>
      </label>

      {/* Nights aur Price counter strip ki jagah Luxury Room display */}
      <div className="mt-4 flex items-center justify-between rounded-sm bg-navy px-4 py-3 text-white">
        <span className="text-xs text-white/65">
          {nights ? `${nights} night${nights === 1 ? "" : "s"} selected` : "Select dates"}
        </span>
        <span className="text-xs font-bold uppercase tracking-wider text-gold">
          Luxury Room
        </span>
      </div>

    <button
    type="button"
          onClick={() => {
            openBooking({ roomId: room?.id, checkIn, checkOut, guests: Number(guests) });
            window.open("https://wa.me/918684870142", "_blank");
          }}
          className="mt-4 w-full rounded-sm bg-gold px-5 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-navy transition hover:bg-gold-dark"
        >
          Reserve this room
        </button>
    </aside>
  );
}