"use client";

import { useCallback, useEffect, useRef } from "react";
import { Phone } from "lucide-react";

const PHONE_E164 = "+918684870142";
const PHONE_SPOKEN = "+91 8684870142";
const TEL_URL = `tel:${PHONE_E164}`;
const CALL_QUERY = encodeURIComponent(PHONE_SPOKEN);

/** Custom scheme: opens the Truecaller app when it is installed (Android + iOS). */
const TRUECALLER_SCHEME = `truecaller://search?q=${CALL_QUERY}`;

/** Android browsers (Chrome, Edge, Samsung Internet) resolve intent:// and use
 *  S.browser_fallback_url themselves when Truecaller is not installed. */
const TRUECALLER_INTENT = `intent://search?q=${CALL_QUERY}#Intent;scheme=truecaller;package=com.truecaller;S.browser_fallback_url=${encodeURIComponent(
  TEL_URL
)};end`;

/** How long Truecaller gets to open before we hand over to the normal dialer. */
const GRACE_ANDROID_MS = 2500;
const GRACE_IOS_MS = 3000;

export default function CallButton() {
  const handedOff = useRef(false);
  const fallbackTimer = useRef<number | null>(null);

  /* If the page loses focus / is hidden, another app (Truecaller, the app chooser
     or the dialer) has taken over - so our own fallback must stay quiet. */
  useEffect(() => {
    const markHandedOff = () => {
      handedOff.current = true;
    };
    const onVisibilityChange = () => {
      if (document.hidden) markHandedOff();
    };

    window.addEventListener("blur", markHandedOff);
    window.addEventListener("pagehide", markHandedOff);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      window.removeEventListener("blur", markHandedOff);
      window.removeEventListener("pagehide", markHandedOff);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      if (fallbackTimer.current !== null) window.clearTimeout(fallbackTimer.current);
    };
  }, []);

  const scheduleDialerFallback = useCallback((delay: number) => {
    if (fallbackTimer.current !== null) window.clearTimeout(fallbackTimer.current);
    fallbackTimer.current = window.setTimeout(() => {
      fallbackTimer.current = null;
      const stillOnPage =
        !handedOff.current && document.visibilityState === "visible" && document.hasFocus();
      if (stillOnPage) window.location.href = TEL_URL;
    }, delay);
  }, []);

  const handleCall = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (typeof navigator === "undefined") return;

      const userAgent = navigator.userAgent;
      const isIOS =
        /iPhone|iPad|iPod/i.test(userAgent) ||
        (/Macintosh/i.test(userAgent) && (navigator.maxTouchPoints ?? 0) > 1);
      const isAndroid = /Android/i.test(userAgent);

      // Phones/tablets without Truecaller support (laptops, desktops, unknown
      // browsers) keep the plain `tel:` behaviour of the link below.
      if (!isIOS && !isAndroid) return;

      // Always let Truecaller get the first chance - never the dialer.
      event.preventDefault();
      handedOff.current = false;

      window.location.href = isAndroid ? TRUECALLER_INTENT : TRUECALLER_SCHEME;
      scheduleDialerFallback(isAndroid ? GRACE_ANDROID_MS : GRACE_IOS_MS);
    },
    [scheduleDialerFallback]
  );

  return (
    <a
      href={TEL_URL}
      onClick={handleCall}
      aria-label={`Call Victoria Club Hotel on ${PHONE_SPOKEN} (opens Truecaller when installed)`}
      title={`Call Victoria Club Hotel on ${PHONE_SPOKEN}`}
      className="floating-action floating-action-left group fixed z-[90] flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white shadow-xl shadow-black/25 transition-all duration-500 hover:scale-110 hover:bg-emerald-700 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-emerald-300 sm:h-14 sm:w-14"
    >
      <Phone size={26} strokeWidth={2.5} aria-hidden="true" />

      {/* Pulse animation */}
      <span
        className="absolute inset-0 -z-10
          animate-ping rounded-full
          bg-emerald-500 opacity-30"
      />
    </a>
  );
}