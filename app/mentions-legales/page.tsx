import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/data";
import { ArrowIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Mentions légales · O'dinner",
  description:
    "Mentions légales du site O'dinner : éditeur, hébergeur et responsable de publication du restaurant de Mareuil-sur-Lay-Dissais (85320).",
  alternates: { canonical: "/mentions-legales" },
};

const blocks = [
  {
    title: "Éditeur du site",
    body: (
      <>
        {site.legalName}
        <br />
        {site.address.full}
        <br />
        Téléphone : {site.phoneDisplay}
        <br />
        SIRET : {site.siret}
        <br />
        Code APE : {site.ape}, restauration de type rapide
        <br />
        Responsable de la publication : {site.manager}, gérant
      </>
    ),
  },
  {
    title: "Hébergement",
    body: (
      <>
        Vercel Inc.
        <br />
        340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis
        <br />
        vercel.com
      </>
    ),
  },
  {
    title: "Conception",
    body: (
      <>
        Site conçu et développé par Raythan Web Design.
        <br />
        Contact : raythanwebdesign@gmail.com
      </>
    ),
  },
  {
    title: "Propriété intellectuelle",
    body: (
      <>
        L&apos;ensemble des contenus de ce site (textes, photographies, logo,
        panneaux de la carte, mise en page) est protégé. Le logo, les visuels
        de la carte et les photographies proviennent de l&apos;établissement.
        Toute reproduction, même partielle, sans autorisation est interdite.
      </>
    ),
  },
  {
    title: "Avis clients",
    body: (
      <>
        Les avis reproduits sur ce site sont publiés par leurs auteurs sur la
        fiche Google du restaurant et repris sans modification. La note
        moyenne affichée est celle constatée sur cette même fiche.
      </>
    ),
  },
];

export default function MentionsLegales() {
  return (
    <main className="on-paper min-h-screen bg-paper py-20 text-ink sm:py-28">
      <div className="wrap max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[0.9375rem] font-medium text-brand-ink transition-opacity hover:opacity-70"
        >
          <ArrowIcon className="h-4 w-4 rotate-180" />
          Retour à l&apos;accueil
        </Link>

        <h1 className="h2 mt-8">Mentions légales</h1>

        <div className="mt-12 divide-y divide-paper-line border-y border-paper-line">
          {blocks.map((b) => (
            <section key={b.title} className="grid gap-2 py-7 sm:grid-cols-[13rem_1fr] sm:gap-8">
              <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-ink/40">
                {b.title}
              </h2>
              <p className="leading-relaxed text-ink/70">{b.body}</p>
            </section>
          ))}
          <section className="grid gap-2 py-7 sm:grid-cols-[13rem_1fr] sm:gap-8">
            <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-ink/40">
              Données personnelles
            </h2>
            <p className="leading-relaxed text-ink/70">
              Ce site ne recueille aucune donnée personnelle via un formulaire.
              Pour en savoir plus, consultez la{" "}
              <Link
                href="/confidentialite"
                className="font-medium text-brand-ink underline underline-offset-4"
              >
                politique de confidentialité
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
