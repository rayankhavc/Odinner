"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * Fond animé des sections sombres : deux halos rouges très diffus qui
 * dérivent lentement, plus une légère parallaxe liée au défilement.
 *
 * Tout est en `transform` (composé par le GPU, pas de repaint), les halos
 * sont derrière le contenu et non cliquables. Rien ne bouge si le visiteur
 * a réduit les animations dans son système.
 */
export default function Backdrop({
  intensity = 1,
  className = "",
}: {
  intensity?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const driftA = useTransform(scrollYProgress, [0, 1], ["-6%", "10%"]);
  const driftB = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  const glow = (alpha: number) =>
    `radial-gradient(circle, rgba(244,0,0,${alpha * intensity}), transparent 68%)`;

  if (reduced) {
    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      >
        <div
          className="absolute -right-[15%] -top-[25%] h-[45rem] w-[45rem] rounded-full"
          style={{ background: glow(0.16) }}
        />
      </div>
    );
  }

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <motion.div
        style={{ y: driftA, background: glow(0.18) }}
        className="animate-driftA absolute -right-[18%] -top-[28%] h-[48rem] w-[48rem] rounded-full will-change-transform"
      />
      <motion.div
        style={{ y: driftB, background: glow(0.11) }}
        className="animate-driftB absolute -bottom-[30%] -left-[20%] h-[40rem] w-[40rem] rounded-full will-change-transform"
      />
    </div>
  );
}
