"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

/**
 * Filet rouge en haut de page qui suit l'avancement de la lecture.
 * La carte est longue : c'est le repère le moins encombrant possible.
 */
export default function ScrollProgress() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  if (reduced) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX: width }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-brand"
    />
  );
}
