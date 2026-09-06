"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Apparition au défilement.
 *
 * Volontairement sobre : 14 px de course, 0,55 s, une seule fois. Au-delà,
 * une page vitrine donne le mal de mer plus qu'elle n'impressionne.
 * Si le visiteur a demandé moins d'animations dans son système, on ne bouge
 * rien du tout : le contenu s'affiche directement.
 */
export function Reveal({
  children,
  delay = 0,
  y = 14,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Conteneur qui fait entrer ses enfants les uns après les autres.
 * À utiliser avec <RevealItem> pour chaque enfant.
 */
export function Stagger({
  children,
  gap = 0.07,
  className,
}: {
  children: ReactNode;
  gap?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{
        hidden: {},
        shown: { transition: { staggerChildren: gap } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  y = 12,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        shown: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/** Même effet, mais sur un <li> pour ne pas casser la sémantique des listes. */
export function RevealListItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) return <li className={className}>{children}</li>;

  return (
    <motion.li
      className={className}
      variants={{
        hidden: { opacity: 0, y: 10 },
        shown: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
        },
      }}
    >
      {children}
    </motion.li>
  );
}

export function StaggerList({
  children,
  gap = 0.05,
  className,
}: {
  children: ReactNode;
  gap?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) return <ul className={className}>{children}</ul>;

  return (
    <motion.ul
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      variants={{ hidden: {}, shown: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </motion.ul>
  );
}
