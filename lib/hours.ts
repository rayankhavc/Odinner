import { openingHours, formatHour, type DayHours, type Slot } from "@/lib/data";

export type Status = {
  open: boolean;
  /** "Ouvert" / "Fermé" + precision ("ferme à 22h00", "ouvre à 18h00"...) */
  label: string;
  detail: string;
  /** index 0-6 (dimanche = 0) du jour courant a Paris */
  todayIndex: number;
};

const MIN = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

/**
 * Heure locale du restaurant (Europe/Paris) quel que soit le fuseau du
 * visiteur : on lit les champs via Intl plutot que de manipuler des offsets,
 * ce qui reste juste au changement d'heure.
 */
function parisNow(now: Date): { day: number; minutes: number } {
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Paris",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const parts = fmt.formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const days: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  return {
    day: days[get("weekday")] ?? 0,
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

const byIndex = (i: number): DayHours =>
  openingHours.find((d) => d.index === ((i % 7) + 7) % 7)!;

/** Prochain creneau d'ouverture a partir de maintenant, sur 7 jours glissants. */
function nextOpening(day: number, minutes: number): { day: DayHours; slot: Slot; sameDay: boolean } | null {
  for (let offset = 0; offset < 8; offset++) {
    const d = byIndex(day + offset);
    for (const slot of d.slots) {
      if (offset > 0 || MIN(slot.open) > minutes) {
        return { day: d, slot, sameDay: offset === 0 };
      }
    }
  }
  return null;
}

export function getStatus(now: Date = new Date()): Status {
  const { day, minutes } = parisNow(now);
  const today = byIndex(day);

  const current = today.slots.find(
    (s) => minutes >= MIN(s.open) && minutes < MIN(s.close)
  );

  if (current) {
    return {
      open: true,
      label: "Ouvert",
      detail: `Ferme à ${formatHour(current.close)}`,
      todayIndex: day,
    };
  }

  const next = nextOpening(day, minutes);
  if (!next) {
    return { open: false, label: "Fermé", detail: "", todayIndex: day };
  }

  const heure = formatHour(next.slot.open);
  const tomorrow = byIndex(day + 1);
  const detail = next.sameDay
    ? `Ouvre à ${heure}`
    : next.day.day === tomorrow.day
      ? `Ouvre demain à ${heure}`
      : `Ouvre ${next.day.day.toLowerCase()} à ${heure}`;

  return { open: false, label: "Fermé", detail, todayIndex: day };
}
