"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Préférence "réduire les animations", lue seulement une fois la page
 * hydratée. Le serveur ne la connaît pas : la lire dès le premier rendu
 * donnerait un HTML différent entre serveur et navigateur (erreur
 * d'hydratation React chez les visiteurs qui ont activé l'option).
 */
export function useReducedMotionSafe() {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted && reduced === true;
}
