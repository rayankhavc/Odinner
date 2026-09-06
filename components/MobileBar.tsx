"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/data";
import { PhoneIcon, RouteIcon, WhatsappIcon } from "@/components/icons";
import CallButton from "@/components/CallButton";

/**
 * Barre d'actions fixe en bas d'écran sur mobile : appeler, WhatsApp,
 * itinéraire. Elle n'apparaît qu'une fois le hero passé, pour ne pas
 * recouvrir les boutons principaux dès l'arrivée.
 */
export default function MobileBar() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 620);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink/95 backdrop-blur-xl transition-transform duration-300 lg:hidden ${
        shown ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-stretch gap-2 px-4 py-3">
        <CallButton className="btn-brand flex-1 !py-3">
          <PhoneIcon className="h-4 w-4" />
          Appeler
        </CallButton>
        <a
          href={site.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline-dark !px-4 !py-3"
          aria-label="Écrire à O'dinner sur WhatsApp"
        >
          <WhatsappIcon className="h-5 w-5" />
        </a>
        <a
          href={site.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline-dark !px-4 !py-3"
          aria-label="Itinéraire vers O'dinner"
        >
          <RouteIcon className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
}
