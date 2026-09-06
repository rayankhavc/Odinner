"use client";

import { useState } from "react";
import { site } from "@/lib/data";
import { PinIcon } from "@/components/icons";

/**
 * La carte Google n'est chargée qu'après un clic : tant qu'on ne clique pas,
 * aucun cookie tiers n'est déposé, donc pas de bandeau cookies à afficher.
 */
export default function MapEmbed() {
  const [show, setShow] = useState(false);

  if (show) {
    return (
      <iframe
        src={site.mapsEmbedUrl}
        title={`Localisation d'${site.name}, ${site.address.full}`}
        className="h-full min-h-[22rem] w-full"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setShow(true)}
      className="flex h-full min-h-[22rem] w-full flex-col items-center justify-center gap-3 bg-char-soft p-8 text-center transition-colors hover:bg-char"
    >
      <PinIcon className="h-7 w-7 text-brand" />
      <span className="font-display text-lg font-bold tracking-tight text-bone">
        Afficher la carte
      </span>
      <span className="max-w-xs text-[0.8125rem] leading-relaxed text-bone/45">
        Google Maps se charge à votre clic. Aucun cookie tiers n&apos;est déposé
        avant.
      </span>
    </button>
  );
}
