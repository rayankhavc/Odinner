import Image from "next/image";
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

// Entrée en cascade au chargement : le lieu, le titre, le texte, puis les
// boutons. En CSS pur et non en JavaScript : l'animation part dès que la page
// s'affiche, sans attendre l'hydratation, ce qui garde un affichage rapide sur
// mobile. Coupée d'office si le visiteur a réduit les animations.
export default function Hero() {
  return (
    <section id="haut" className="grain relative overflow-hidden bg-ink pt-[4.5rem]">
      <Backdrop />

      <div className="wrap relative">
        <div className="grid items-center gap-14 pb-12 pt-14 lg:grid-cols-[1.28fr_0.72fr] lg:gap-10 lg:pb-16 lg:pt-20">
          <div>
            <p className="eyebrow text-brand-light animate-rise" style={{ animationDelay: "0.00s" }}>
              {site.shortCity} · Vendée {site.zip}
            </p>

            {/* Traits d'union insécables : le nom de la commune ne doit
                jamais se couper en fin de ligne. */}
            <h1 className="h1 mt-6 animate-rise" style={{ animationDelay: "0.06s" }}>
              <span className="block">Kebab, burger, tacos</span>
              <span className="block text-brand">à Mareuil&#8209;sur&#8209;Lay</span>
            </h1>

            <p
              className="lede mt-7 max-w-xl text-pretty text-bone/65 animate-rise" style={{ animationDelay: "0.12s" }}
            >
              Pain maison, viande hachée fraîche 100&nbsp;% bœuf, sauce
              fromagère maison. On prépare votre plat quand vous commandez, à
              manger sur place ou à emporter.
            </p>

            <div className="mt-8 animate-rise" style={{ animationDelay: "0.18s" }}>
              <StatusPill />
            </div>

            <div
              className="mt-8 flex flex-col gap-3 sm:flex-row animate-rise" style={{ animationDelay: "0.24s" }}
            >
              <CallButton className="btn-brand w-full sm:w-auto">
                <PhoneIcon className="h-[1.125rem] w-[1.125rem]" />
                {site.phoneDisplay}
              </CallButton>
              <SmoothLink href="#carte" className="btn-outline-dark w-full sm:w-auto">
                Voir la carte et les prix
              </SmoothLink>
            </div>

            <ul
              className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-[0.8125rem] text-bone/55 animate-rise" style={{ animationDelay: "0.30s" }}
            >
              {facts.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span aria-hidden="true" className="h-1 w-1 rounded-full bg-brand-solid" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* L'emblème de l'enseigne, posé sans cadre */}
          {/* Pas de fondu d'opacité ici : le logo est le plus grand élément
              visible au chargement, le masquer retarderait son affichage. */}
          <div className="relative mx-auto w-full max-w-[24rem] animate-settle lg:max-w-none">
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
                alt="Logo O'dinner"
                fill
                priority
                sizes="(max-width: 1024px) 70vw, 34vw"
                className="object-contain drop-shadow-[0_20px_60px_rgba(244,0,0,0.25)]"
              />
            </div>
          </div>
        </div>

        {/* Invitation à descendre : le contenu commence à la carte */}
        <div
          className="relative flex justify-center pb-10 animate-rise"
          style={{ animationDelay: "0.5s" }}
        >
          <SmoothLink
            href="#carte"
            className="group inline-flex flex-col items-center gap-2 text-[0.8125rem] text-bone/50 transition-colors hover:text-bone/80"
            ariaLabel="Descendre vers la carte"
          >
            <span>La carte</span>
            <ChevronDownIcon className="h-4 w-4 animate-nudge" />
          </SmoothLink>
        </div>
      </div>

      {/* Aperçu des panneaux du restaurant, en rail */}
      <div className="relative border-t border-white/[0.07] py-6">
        <div className="wrap mb-4 flex items-baseline justify-between gap-4">
          <p className="text-[0.8125rem] text-bone/50">Nos panneaux, en entier</p>
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
              ariaLabel={`Voir le panneau : ${b.label}`}
              className="relative aspect-[16/9] w-[15rem] shrink-0 snap-start overflow-hidden rounded-lg ring-1 ring-white/10 transition duration-300 hover:ring-brand/50 sm:w-[19rem]"
            >
              <Image src={b.src} alt="" fill sizes="(max-width: 640px) 15rem, 19rem" className="object-cover" />
            </SmoothLink>
          ))}
        </div>
      </div>
    </section>
  );
}
