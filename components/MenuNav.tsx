"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Rail de catégories collant sous l'en-tête. La catégorie visible est mise
 * en avant et le rail se recentre dessus : sur mobile, on sait toujours où
 * on se trouve dans une carte aussi longue.
 */
export default function MenuNav({
  items,
}: {
  items: { id: string; short: string }[];
}) {
  const [active, setActive] = useState(items[0]?.id ?? "");
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(`cat-${i.id}`))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id.replace("cat-", ""));
      },
      // bande de détection sous l'en-tête + le rail
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    const rail = railRef.current;
    const chip = rail?.querySelector<HTMLElement>(`[data-chip="${active}"]`);
    if (!rail || !chip) return;
    const target = chip.offsetLeft - rail.clientWidth / 2 + chip.clientWidth / 2;
    rail.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
  }, [active]);

  return (
    <div className="sticky top-[4.5rem] z-30 -mx-5 border-b border-paper-line bg-paper/90 backdrop-blur-md sm:-mx-8">
      <div
        ref={railRef}
        className="no-scrollbar flex gap-2 overflow-x-auto px-5 py-3 sm:px-8"
      >
        {items.map((i) => (
          <a
            key={i.id}
            data-chip={i.id}
            href={`#cat-${i.id}`}
            aria-current={active === i.id ? "true" : undefined}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-[0.8125rem] font-medium transition-colors ${
              active === i.id
                ? "bg-ink text-bone"
                : "bg-ink/[0.04] text-ink/60 hover:bg-ink/[0.08] hover:text-ink"
            }`}
          >
            {i.short}
          </a>
        ))}
      </div>
    </div>
  );
}
