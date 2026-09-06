"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { boards } from "@/lib/data";
import { CloseIcon, ZoomIcon, ArrowIcon } from "@/components/icons";

export default function Boards() {
  const [index, setIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const go = useCallback(
    (delta: number) =>
      setIndex((i) => (i === null ? i : (i + delta + boards.length) % boards.length)),
    []
  );

  const open = (i: number, el: HTMLElement) => {
    openerRef.current = el;
    setIndex(i);
  };

  // Clavier + verrouillage du défilement pendant que la visionneuse est ouverte
  useEffect(() => {
    if (index === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
      openerRef.current?.focus();
    };
  }, [index, close, go]);

  const current = index === null ? null : boards[index];

  return (
    <section id="panneaux" className="bg-char py-20 sm:py-24">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="eyebrow text-brand">Les panneaux</p>
            <h2 className="h2 mt-5 text-balance text-bone">
              La carte, comme au comptoir.
            </h2>
          </div>
          <p className="max-w-sm text-[0.9375rem] text-bone/50">
            Nos quatre panneaux, en grand. Cliquez sur l&apos;un d&apos;eux pour
            le lire tranquillement.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {boards.map((b, i) => (
            <button
              key={b.src}
              type="button"
              onClick={(e) => open(i, e.currentTarget)}
              className="group relative block overflow-hidden rounded-xl text-left ring-1 ring-white/10 transition duration-300 hover:ring-brand/60"
            >
              <div className="relative aspect-[16/9]">
                <Image
                  src={b.src}
                  alt={b.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 45vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-ink to-transparent px-4 pb-3.5 pt-10">
                <span className="text-[0.9375rem] font-semibold text-bone">
                  {b.label}
                </span>
                <span className="inline-flex items-center gap-1.5 text-[0.8125rem] text-bone/60 transition-colors group-hover:text-brand">
                  <ZoomIcon className="h-4 w-4" />
                  Agrandir
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {current ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.label}
          className="fixed inset-0 z-[100] flex flex-col bg-ink/97 backdrop-blur-sm"
          onClick={close}
        >
          <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-8">
            <p className="text-[0.9375rem] font-semibold text-bone">
              {current.label}
              <span className="ml-2 font-normal text-bone/40">
                {(index ?? 0) + 1} / {boards.length}
              </span>
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              className="rounded-full bg-white/10 p-2.5 text-bone transition-colors hover:bg-white/20"
              aria-label="Fermer"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Conteneur défilant : sur petit écran, l'image reste assez large
              pour que les prix soient lisibles, on fait défiler à l'horizontale. */}
          <div
            className="flex-1 overflow-auto px-5 pb-5 sm:px-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto flex min-h-full w-full max-w-6xl items-center">
              <img
                src={current.src}
                alt={current.alt}
                className="h-auto w-full min-w-[46rem] rounded-lg"
              />
            </div>
          </div>

          <div
            className="flex items-center justify-center gap-3 px-5 pb-6 sm:pb-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => go(-1)}
              className="btn-outline-dark !px-4 !py-2.5"
              aria-label="Panneau précédent"
            >
              <ArrowIcon className="h-4 w-4 rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="btn-outline-dark !px-4 !py-2.5"
              aria-label="Panneau suivant"
            >
              <ArrowIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
