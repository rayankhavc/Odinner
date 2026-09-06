"use client";

import type { ReactNode } from "react";

/**
 * Lien d'ancre qui descend en douceur vers sa section.
 *
 * `scroll-behavior: smooth` en CSS suffit la plupart du temps, mais il est
 * ignoré dans quelques cas (certains navigateurs in-app, ancre déjà dans
 * l'URL). On pilote donc le défilement nous-mêmes, et on remet l'ancre dans
 * l'URL après coup pour que le lien reste partageable.
 */
export default function SmoothLink({
  href,
  children,
  className,
  ariaLabel,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // On laisse le navigateur faire s'il s'agit d'un clic modifié
    // (nouvel onglet, etc.) ou si la cible n'existe pas.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    const target = document.querySelector(href);
    if (!(target instanceof HTMLElement)) return;

    e.preventDefault();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "start",
    });
    window.history.replaceState(null, "", href);
  };

  return (
    <a href={href} onClick={handleClick} className={className} aria-label={ariaLabel}>
      {children}
    </a>
  );
}
