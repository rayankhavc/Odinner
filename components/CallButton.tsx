"use client";

import { useCallback, useState } from "react";
import { site } from "@/lib/data";

/**
 * Lien téléphone : sur mobile il déclenche l'appel, sur ordinateur `tel:`
 * n'ouvre généralement rien — on copie alors le numéro et on le confirme.
 */
export default function CallButton({
  className,
  children,
  label,
}: {
  className?: string;
  children: React.ReactNode;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const isTouch =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: none), (pointer: coarse)").matches;

    if (isTouch || !navigator.clipboard) return;

    e.preventDefault();
    navigator.clipboard
      .writeText(site.phoneDisplay)
      .then(() => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2400);
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <a
        href={site.phoneHref}
        onClick={handleClick}
        className={className}
        aria-label={label ?? `Appeler ${site.name} au ${site.phoneDisplay}`}
      >
        {children}
      </a>
      {copied ? (
        <span
          role="status"
          className="fixed inset-x-0 bottom-24 z-[90] mx-auto flex w-max items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-bone shadow-lift ring-1 ring-white/10 sm:bottom-8"
        >
          Numéro copié · {site.phoneDisplay}
        </span>
      ) : null}
    </>
  );
}
