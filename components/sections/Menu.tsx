import {
  menu,
  viandes,
  sauces,
  supplements,
  extras,
  site,
} from "@/lib/data";
import { LeafIcon, PhoneIcon } from "@/components/icons";
import MenuNav from "@/components/MenuNav";
import CallButton from "@/components/CallButton";

export default function Menu() {
  return (
    <section
      id="carte"
      className="on-paper bg-paper text-ink"
    >
      <div className="wrap pt-20 sm:pt-24">
        <div className="max-w-2xl">
          <p className="eyebrow text-brand-ink">La carte</p>
          <h2 className="h2 mt-5 text-balance">
            Toute la carte, prix compris.
          </h2>
          <p className="lede mt-5 text-pretty text-ink/60">
            Relevée sur les panneaux du restaurant. Sandwichs et assiettes sont
            servis avec crudités et frites, les burgers avec un pain maison et
            une viande hachée fraîche.
          </p>
        </div>
      </div>

      <div className="wrap mt-10">
        <MenuNav items={menu.map((c) => ({ id: c.id, short: c.short }))} />

        <div className="divide-y divide-paper-line">
          {menu.map((category) => (
            <div
              key={category.id}
              id={`cat-${category.id}`}
              className="scroll-mt-[8.5rem] py-10 sm:py-12"
            >
              <div className="mb-7 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="font-display text-[1.75rem] font-extrabold leading-none tracking-tightest">
                  {category.title}
                </h3>
                {category.note ? (
                  <p className="text-[0.8125rem] text-ink/45">{category.note}</p>
                ) : null}
              </div>

              <ul className="grid gap-x-14 gap-y-5 md:grid-cols-2">
                {category.items.map((item) => (
                  <li key={item.name}>
                    <div className="flex items-baseline justify-between gap-2 sm:justify-start">
                      <span
                        className={`font-semibold ${
                          item.signature ? "text-brand-ink" : ""
                        }`}
                      >
                        {item.name}
                        {item.veggie ? (
                          <LeafIcon
                            className="ml-1.5 inline h-3.5 w-3.5 -translate-y-px text-emerald-600"
                            aria-label="végétarien"
                          />
                        ) : null}
                        {item.signature ? (
                          <span className="ml-2 rounded-full bg-brand px-2 py-0.5 align-middle text-[0.625rem] font-bold uppercase tracking-wider text-white">
                            La maison
                          </span>
                        ) : null}
                      </span>
                      <span className="leader" aria-hidden="true" />
                      <span className="shrink-0 font-semibold tabular-nums">
                        {item.price}
                      </span>
                    </div>
                    {item.description ? (
                      <p className="mt-1 max-w-md text-sm leading-relaxed text-ink/50">
                        {item.description}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Choix et suppléments : la partie "configuration" de la carte */}
      <div className="wrap grid gap-4 border-t border-paper-line py-12 md:grid-cols-3">
        <div className="rounded-2xl bg-paper-soft p-6">
          <h3 className="h3">Les viandes au choix</h3>
          <p className="mt-1 text-[0.8125rem] text-ink/45">
            Tacos, maxis, assiettes et bowls · viande en plus {extras[3].price}
          </p>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {viandes.map((v) => (
              <li
                key={v}
                className="rounded-full bg-white px-2.5 py-1 text-[0.8125rem] text-ink/70 ring-1 ring-paper-line"
              >
                {v}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl bg-paper-soft p-6">
          <h3 className="h3">Les sauces</h3>
          <p className="mt-1 text-[0.8125rem] text-ink/45">Au choix, sans supplément</p>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {sauces.map((s) => (
              <li
                key={s}
                className="rounded-full bg-white px-2.5 py-1 text-[0.8125rem] text-ink/70 ring-1 ring-paper-line"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl bg-paper-soft p-6">
          <h3 className="h3">Suppléments & formules</h3>
          <dl className="mt-4 space-y-3">
            {supplements.map((group) => (
              <div key={group.price}>
                <dt className="text-[0.8125rem] font-semibold text-brand-ink">
                  {group.price}
                </dt>
                <dd className="text-[0.8125rem] leading-relaxed text-ink/60">
                  {group.items.join(", ")}
                </dd>
              </div>
            ))}
          </dl>
          <ul className="mt-4 space-y-1.5 border-t border-paper-line pt-4">
            {extras.slice(0, 3).map((e) => (
              <li
                key={e.label}
                className="flex items-baseline justify-between gap-3 text-[0.8125rem]"
              >
                <span className="text-ink/60">{e.label}</span>
                <span className="font-semibold tabular-nums">{e.price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="wrap pb-20 sm:pb-24">
        <div className="flex flex-col items-center gap-5 rounded-2xl bg-ink px-6 py-9 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="font-display text-[1.5rem] font-extrabold leading-none tracking-tightest text-bone">
              Les commandes se prennent par téléphone.
            </p>
            <p className="mt-2 text-[0.9375rem] text-bone/55">
              On prépare, vous passez récupérer. Ou vous mangez sur place.
            </p>
          </div>
          <CallButton className="btn-brand shrink-0">
            <PhoneIcon className="h-[1.125rem] w-[1.125rem]" />
            {site.phoneDisplay}
          </CallButton>
        </div>
      </div>
    </section>
  );
}
