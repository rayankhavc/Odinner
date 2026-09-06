import Image from "next/image";
import { photos, menu } from "@/lib/data";
import { ArrowIcon } from "@/components/icons";

const signature = menu
  .find((c) => c.id === "speciaux")!
  .items.find((i) => i.signature)!;

const proofs = [
  {
    title: "Pain maison",
    text: "Les burgers et les sandwichs sont montés dans un pain préparé sur place.",
  },
  {
    title: "Viande hachée fraîche",
    text: "100 % bœuf pour les burgers, grillée au moment de la commande.",
  },
  {
    title: "Sauce fromagère maison",
    text: "Celle des tacos et des bowls est faite ici, pas sortie d'un bidon.",
  },
];

export default function Maison() {
  return (
    <section id="maison" className="grain relative bg-ink py-20 sm:py-24">
      <div className="wrap relative">
        <div className="max-w-2xl">
          <p className="eyebrow text-brand">La maison</p>
          <h2 className="h2 mt-5 text-balance text-bone">
            Une signature, et une vitrine sucrée.
          </h2>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          {/* La spécialité qui porte le nom du restaurant */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-brand/30 bg-char p-8 sm:p-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(80% 60% at 100% 0%, rgba(244,0,0,0.18), transparent 60%)",
              }}
            />
            <div className="relative">
              <span className="inline-block rounded-full bg-brand px-3 py-1 text-[0.625rem] font-bold uppercase tracking-[0.16em] text-white">
                La spécialité
              </span>
              <h3 className="mt-6 font-display text-[clamp(2.25rem,5vw,3.5rem)] font-extrabold leading-[0.9] tracking-tightest text-bone">
                Le sandwich
                <br />
                O<span className="text-brand">&apos;</span>dinner
              </h3>
              <p className="lede mt-5 max-w-sm text-bone/60">
                {signature.description}. Celui qui porte le nom de la maison,
                dans un pain maison ou une tortilla, avec crudités.
              </p>
            </div>
            <div className="relative mt-10 flex items-end justify-between gap-6">
              <span className="font-display text-[clamp(3rem,9vw,5rem)] font-extrabold leading-none tracking-tightest text-brand">
                {signature.price}
              </span>
              <a
                href="#cat-speciaux"
                className="inline-flex items-center gap-2 pb-2 text-[0.9375rem] font-medium text-bone/70 transition-colors hover:text-bone"
              >
                Les autres spéciaux
                <ArrowIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* La vitrine de pâtisseries, photo réelle de l'établissement */}
          <div className="relative overflow-hidden rounded-2xl border border-char-line">
            <div className="relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-auto lg:h-full lg:min-h-[26rem]">
              <Image
                src={photos.patisseries}
                alt="Vitrine réfrigérée de pâtisseries orientales chez O'dinner : baklava, cornes de gazelle et makrouts"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              {/* Voile assez dense au pied de l'image : la vitrine est très
                  chargée, le texte doit rester lisible par-dessus. */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 via-40% to-transparent"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-8 sm:p-10">
              <h3 className="font-display text-[1.75rem] font-extrabold leading-none tracking-tightest text-bone">
                La vitrine à pâtisseries
              </h3>
              <p className="mt-3 max-w-sm text-[0.9375rem] leading-relaxed text-bone/70">
                Baklava, cornes de gazelle, makrouts : la vitrine change au fil
                des jours. À la pièce, dès 2&nbsp;€.
              </p>
            </div>
          </div>
        </div>

        <ul className="mt-4 grid gap-4 sm:grid-cols-3">
          {proofs.map((p) => (
            <li
              key={p.title}
              className="rounded-2xl border border-char-line bg-char-soft p-6"
            >
              <h3 className="h3 text-bone">{p.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-bone/55">
                {p.text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
