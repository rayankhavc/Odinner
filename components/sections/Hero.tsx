import Image from "next/image";
import { site, photos, rating, boards } from "@/lib/data";
import { PhoneIcon, StarIcon, WhatsappIcon } from "@/components/icons";
import CallButton from "@/components/CallButton";
import StatusPill from "@/components/StatusPill";

const facts = [
  "Viandes halal",
  "Options végétariennes",
  "Sur place & à emporter",
  "Parking gratuit",
];

export default function Hero() {
  return (
    <section id="haut" className="grain relative overflow-hidden bg-ink pt-[4.5rem]">
      {/* Halo rouge : la seule couleur de marque, posée comme une lumière */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(70% 55% at 78% 18%, rgba(244,0,0,0.22), transparent 62%), radial-gradient(55% 45% at 8% 4%, rgba(244,0,0,0.10), transparent 60%)",
        }}
      />

      <div className="wrap relative">
        <div className="grid items-center gap-14 pb-14 pt-14 lg:grid-cols-[1.28fr_0.72fr] lg:gap-10 lg:pb-20 lg:pt-20">
          <div className="animate-rise">
            <p className="eyebrow text-brand">
              {site.shortCity} · Vendée {site.zip}
            </p>

            {/* Traits d'union insécables : le nom de la commune ne doit
                jamais se couper en fin de ligne. */}
            <h1 className="h1 mt-6">
              <span className="block">Kebab, burger, tacos</span>
              <span className="block text-brand">à Mareuil&#8209;sur&#8209;Lay</span>
            </h1>

            <p className="lede mt-7 max-w-xl text-pretty text-bone/65">
              Pain maison, viande hachée fraîche 100&nbsp;% bœuf, sauce fromagère
              maison. Tout part en cuisine au moment où vous commandez — sur
              place ou à emporter, 7&nbsp;j/7.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <StatusPill />
              <a
                href="#avis"
                className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 text-[0.8125rem] text-bone/70 transition-colors hover:text-bone"
              >
                <StarIcon className="h-3.5 w-3.5 text-brand" />
                <span className="font-semibold text-bone">{rating.value}/5</span>
                <span className="opacity-70">· {rating.count} avis Google</span>
              </a>
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <CallButton className="btn-brand w-full sm:w-auto">
                <PhoneIcon className="h-[1.125rem] w-[1.125rem]" />
                {site.phoneDisplay}
              </CallButton>
              <a href="#carte" className="btn-outline-dark w-full sm:w-auto">
                Voir la carte et les prix
              </a>
              <a
                href={site.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-dark w-full sm:w-auto"
              >
                <WhatsappIcon className="h-[1.125rem] w-[1.125rem]" />
                WhatsApp
              </a>
            </div>

            <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-[0.8125rem] text-bone/45">
              {facts.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="h-1 w-1 rounded-full bg-brand"
                  />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Emblème réel de l'enseigne, posé sans cadre */}
          <div className="relative mx-auto w-full max-w-[26rem] lg:max-w-none">
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
                alt="Logo O'dinner — pizza, fast food"
                fill
                priority
                sizes="(max-width: 1024px) 70vw, 34vw"
                className="object-contain drop-shadow-[0_20px_60px_rgba(244,0,0,0.25)]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Aperçu des panneaux réels du restaurant, en rail */}
      <div className="relative border-t border-white/[0.07] py-6">
        <div className="wrap mb-4 flex items-baseline justify-between gap-4">
          <p className="text-[0.8125rem] text-bone/40">
            Les panneaux du restaurant, en entier
          </p>
          <a
            href="#panneaux"
            className="text-[0.8125rem] font-medium text-brand transition-opacity hover:opacity-75"
          >
            Tout voir
          </a>
        </div>
        <div className="fade-x no-scrollbar flex snap-x gap-3 overflow-x-auto px-5 pb-1 sm:px-8">
          {boards.map((b) => (
            <a
              key={b.src}
              href="#panneaux"
              className="relative aspect-[16/9] w-[15rem] shrink-0 snap-start overflow-hidden rounded-lg ring-1 ring-white/10 transition duration-300 hover:ring-brand/50 sm:w-[19rem]"
            >
              <Image
                src={b.src}
                alt=""
                fill
                sizes="19rem"
                className="object-cover"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
