"use client";

import { openingHours, formatSlot } from "@/lib/data";
import { useStatus } from "@/components/StatusPill";

export default function HoursTable() {
  // Le jour courant dépend de l'heure du visiteur : on ne le met en avant
  // qu'après montage, sinon le rendu serveur figerait un jour au build.
  const status = useStatus();

  return (
    <ul className="divide-y divide-char-line">
      {openingHours.map((d) => {
        const today = status?.todayIndex === d.index;
        const eveningOnly = d.slots.length === 1;
        return (
          <li
            key={d.day}
            className={`flex items-baseline justify-between gap-4 px-5 py-3.5 transition-colors ${
              today ? "bg-white/[0.04]" : ""
            }`}
          >
            <span
              className={`flex items-center gap-2 ${
                today ? "font-semibold text-bone" : "text-bone/70"
              }`}
            >
              {d.day}
              {today ? (
                <span className="rounded-full bg-brand px-2 py-0.5 text-[0.625rem] font-bold uppercase tracking-wider text-white">
                  Aujourd&apos;hui
                </span>
              ) : null}
            </span>

            {d.slots.length === 0 ? (
              <span className="text-bone/35">Fermé</span>
            ) : (
              <span className="flex flex-col items-end gap-0.5 text-right tabular-nums sm:flex-row sm:items-baseline sm:gap-4">
                {d.slots.map((s) => (
                  <span
                    key={s.open}
                    className={eveningOnly ? "text-brand" : "text-bone/70"}
                  >
                    {formatSlot(s)}
                  </span>
                ))}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
