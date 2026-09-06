"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { site, photos, boards } from "@/lib/data";
import { PhoneIcon, ChevronDownIcon } from "@/components/icons";
import CallButton from "@/components/CallButton";
import StatusPill from "@/components/StatusPill";
import SmoothLink from "@/components/SmoothLink";
import Backdrop from "@/components/motion/Backdrop";

const facts = [
  "Viandes halal",
  "Options végétariennes",
  "Sur place et à emporter",
  "Parking gratuit",
];

export default function Hero() {
  const reduced = useReducedMotion();

  // Entrée en cascade au chargement : le lieu, le titre, le texte, puis les
  // boutons. Chaque bloc déclare son rang, la transition fait le reste.
  const rise = (i: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.7,
            delay: 0.06 * i,
            ease: [0.16, 1, 0.3, 1] as const,
          },
        };

  return (
    <section id="haut" className="grain relative overflow-hidden bg-ink pt-[4.5rem]">
      <Backdrop />

      <div className="wrap relative">
        <div className="grid items-center gap-14 pb-12 pt-14 lg:grid-cols-[1.28fr_0.72fr] lg:gap-10 lg:pb-16 lg:pt-20">
          <div>
            <motion.p className="eyebrow text-brand" {...rise(0)}>
              {site.shortCity} · Vendée {site.zip}
            </motion.p>

            {/* Traits d'union insécables : le nom de la commune ne doit
                jamais se couper en fin de ligne. */}
            <motion.h1 className="h1 mt-6" {...rise(1)}>
              <span className="block">Kebab, burger, tacos</span>
              <span className="block text-brand">à Mareuil&#8209;sur&#8209;Lay</span>
            </motion.h1>

            <motion.p
              className="lede mt-7 max-w-xl text-pretty text-bone/65"
              {...rise(2)}
            >
              Notre pain, on le fait ici. La viande est hachée du jour, la sauce
              fromagère préparée maison. Rien n&apos;attend sous une lampe : on
              lance votre plat quand vous commandez.
            </motion.p>

            <motion.div className="mt-8" {...rise(3)}>
              <StatusPill />
            </motion.div>

            <motion.div
              className="mt-8 flex flex-col gap-3 sm:flex-row"
              {...rise(4)}
            >
              <CallButton className="btn-brand w-full sm:w-auto">
                <PhoneIcon className="h-[1.125rem] w-[1.125rem]" />
                {site.phoneDisplay}
              </CallButton>
              <SmoothLink href="#carte" className="btn-outline-dark w-full sm:w-auto">
                Voir la carte et les prix
              </SmoothLink>
            </motion.div>

            <motion.ul
              className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-[0.8125rem] text-bone/45"
              {...rise(5)}
            >
              {facts.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span aria-hidden="true" className="h-1 w-1 rounded-full bg-brand" />
                  {f}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* L'emblème de l'enseigne, posé sans cadre */}
          <motion.div
            className="relative mx-auto w-full max-w-[24rem] lg:max-w-none"
            initial={reduced ? undefined : { opacity: 0, scale: 0.94 }}
            animate={reduced ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-[86%] w-[86%] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(244,0,0,0.28), transparent 68%)",
              }}
            />
            <div className="relative aspect-square">
              <Image
                src={photos.logo}
                alt="Logo O'dinner, pizza et fast food"
                fill
                priority
                sizes="(max-width: 1024px) 70vw, 34vw"
                className="object-contain drop-shadow-[0_20px_60px_rgba(244,0,0,0.25)]"
              />
            </div>
          </motion.div>
        </div>

        {/* Invitation à descendre : le contenu commence à la carte */}
        <motion.div
          className="relative flex justify-center pb-10"
          initial={reduced ? undefined : { opacity: 0 }}
          animate={reduced ? undefined : { opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.55 }}
        >
          <SmoothLink
            href="#carte"
            className="group inline-flex flex-col items-center gap-2 text-[0.8125rem] text-bone/40 transition-colors hover:text-bone/80"
            ariaLabel="Descendre vers la carte"
          >
            <span>La carte</span>
            <ChevronDownIcon className="h-4 w-4 animate-nudge" />
          </SmoothLink>
        </motion.div>
      </div>

      {/* Aperçu des panneaux du restaurant, en rail */}
      <div className="relative border-t border-white/[0.07] py-6">
        <div className="wrap mb-4 flex items-baseline justify-between gap-4">
          <p className="text-[0.8125rem] text-bone/40">Nos panneaux, en entier</p>
          <SmoothLink
            href="#panneaux"
            className="text-[0.8125rem] font-medium text-brand transition-opacity hover:opacity-75"
          >
            Tout voir
          </SmoothLink>
        </div>
        <div className="fade-x no-scrollbar flex snap-x gap-3 overflow-x-auto px-5 pb-1 sm:px-8">
          {boards.map((b) => (
            <SmoothLink
              key={b.src}
              href="#panneaux"
              className="relative aspect-[16/9] w-[15rem] shrink-0 snap-start overflow-hidden rounded-lg ring-1 ring-white/10 transition duration-300 hover:ring-brand/50 sm:w-[19rem]"
            >
              <Image src={b.src} alt="" fill sizes="19rem" className="object-cover" />
            </SmoothLink>
          ))}
        </div>
      </div>
    </section>
  );
}
