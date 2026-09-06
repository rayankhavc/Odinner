"use client";

import { useEffect, useState } from "react";
import { getStatus, type Status } from "@/lib/hours";

/**
 * Pastille "Ouvert / Fermé" calculee a l'heure de Paris.
 *
 * Le calcul depend de l'heure courante : le faire au rendu serveur
 * produirait une valeur figee au moment du build et un ecart d'hydratation.
 * On ne l'affiche donc qu'apres montage, et on rafraichit chaque minute.
 */
export function useStatus(): Status | null {
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    const tick = () => setStatus(getStatus());
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return status;
}

export default function StatusPill({
  tone = "dark",
  className = "",
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  const status = useStatus();

  // Avant montage : on reserve la place sans rien affirmer sur l'ouverture.
  if (!status) {
    return (
      <span
        className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[0.8125rem] ${
          tone === "dark" ? "bg-white/5 text-bone/40" : "bg-ink/5 text-ink/40"
        } ${className}`}
        aria-hidden="true"
      >
        <span className="status-dot bg-current" />
        Horaires
      </span>
    );
  }

  const open = status.open;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[0.8125rem] font-medium ${
        tone === "dark"
          ? open
            ? "bg-emerald-400/10 text-emerald-300"
            : "bg-white/5 text-bone/55"
          : open
            ? "bg-emerald-600/10 text-emerald-700"
            : "bg-ink/5 text-ink/55"
      } ${className}`}
    >
      <span
        className={`status-dot ${open ? "animate-pulseDot bg-emerald-400" : "bg-current opacity-50"}`}
      />
      <span className="font-semibold">{status.label}</span>
      {status.detail ? (
        <span className="opacity-70">· {status.detail}</span>
      ) : null}
    </span>
  );
}
