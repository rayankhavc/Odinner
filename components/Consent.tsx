"use client";

/**
 * Bandeau de consentement à la mesure d'audience.
 *
 * Il ne s'affiche que si la mesure est réellement branchée. Sans
 * NEXT_PUBLIC_GA_ID, aucun traceur n'est chargé (voir Analytics.tsx) : il n'y
 * a alors rien à demander, et un bandeau qui réclame un accord pour un cookie
 * qui n'existe pas est une nuisance, pas une conformité.
 *
 * Quand la mesure est branchée, trois règles de la CNIL s'appliquent, et
 * elles se voient dans le code :
 *
 * - rien n'est déposé avant la réponse. Le mode consentement de Google est
 *   posé à « refusé » avant le chargement de la balise ; ce composant ne fait
 *   que relever la réponse et la transmettre ;
 * - refuser doit être aussi simple qu'accepter. Les deux boutons ont donc la
 *   même taille, la même place et le même poids visuel ;
 * - le choix doit pouvoir être retiré aussi facilement qu'il a été donné,
 *   d'où le lien « Cookies » du pied de page.
 *
 * Le refus est mémorisé comme l'acceptation. Redemander à chaque visite à
 * quelqu'un qui a déjà dit non, c'est le harceler jusqu'à ce qu'il cède — et
 * c'est précisément ce que la CNIL sanctionne.
 */

import { useEffect, useState } from "react";
import Link from "next/link";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const CLE = "odinner-mesure";

export default function Consent({ actif }: { actif: boolean }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!actif) return;

    let reponse: string | null = null;
    try {
      reponse = localStorage.getItem(CLE);
    } catch {
      /* stockage refusé par le navigateur */
    }
    if (reponse !== "oui" && reponse !== "non") setVisible(true);

    // Le lien « Cookies » du pied de page pointe sur #cookies. Il peut changer
    // de page (on arrive avec l'ancre) ou non (on y est déjà, seul le hash
    // change) : les deux cas doivent rouvrir le choix.
    const ouvrirSiAncre = () => {
      if (window.location.hash === "#cookies") setVisible(true);
    };
    ouvrirSiAncre();
    window.addEventListener("hashchange", ouvrirSiAncre);
    return () => window.removeEventListener("hashchange", ouvrirSiAncre);
  }, [actif]);

  function repondre(valeur: "oui" | "non") {
    try {
      localStorage.setItem(CLE, valeur);
    } catch {
      /* le choix vaut alors pour cette visite seulement */
    }
    window.gtag?.("consent", "update", {
      analytics_storage: valeur === "oui" ? "granted" : "denied",
    });
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="consent-titre"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-char-line bg-char p-4 sm:inset-x-auto sm:bottom-5 sm:left-5 sm:max-w-sm sm:rounded-lg sm:border"
    >
      <p id="consent-titre" className="text-sm font-semibold text-paper">
        Mesure d’audience
      </p>
      <p className="mt-2 text-sm leading-relaxed text-paper/70">
        Nous aimerions compter les visites pour savoir ce qui est utile sur ce
        site. Cela dépose un cookie. Le site fonctionne exactement pareil si
        vous refusez.{" "}
        <Link href="/confidentialite#cookies" className="underline underline-offset-2">
          En savoir plus
        </Link>
      </p>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => repondre("non")}
          className="rounded border border-char-line px-4 py-2 text-sm font-semibold text-paper transition-colors hover:border-brand"
        >
          Refuser
        </button>
        <button
          type="button"
          onClick={() => repondre("oui")}
          className="rounded border border-char-line px-4 py-2 text-sm font-semibold text-paper transition-colors hover:border-brand"
        >
          Accepter
        </button>
      </div>
    </div>
  );
}
