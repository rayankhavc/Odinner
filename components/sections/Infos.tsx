import { site, areaServedDisplay, hoursNote } from "@/lib/data";
import { PinIcon, RouteIcon, PhoneIcon } from "@/components/icons";
import HoursTable from "@/components/HoursTable";
import MapEmbed from "@/components/MapEmbed";
import StatusPill from "@/components/StatusPill";
import CallButton from "@/components/CallButton";
import Backdrop from "@/components/motion/Backdrop";
import { Reveal } from "@/components/motion/Reveal";

const practical = [
  { label: "Stationnement", value: "Gratuit dans la rue, place accessible en fauteuil roulant" },
  { label: "Sur place", value: "Salle et toilettes, menu enfant" },
  { label: "Régimes", value: "Viandes halal, options végétariennes" },
];

export default function Infos() {
  return (
    <section id="infos" className="grain relative overflow-hidden bg-ink py-20 sm:py-24">
      <Backdrop intensity={0.6} />

      <div className="wrap relative">
        <Reveal>
          <div className="max-w-2xl">
            <p className="eyebrow text-brand">Horaires et accès</p>
            <h2 className="h2 mt-5 text-balance text-bone">
              On est là sept jours sur sept.
            </h2>
            <p className="lede mt-5 text-bone/60">{hoursNote}</p>
            <div className="mt-6">
              <StatusPill />
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {/* Colonne gauche : horaires puis infos pratiques ; colonne droite :
              la carte, qui s'etire sur toute la hauteur. */}
          <div className="grid content-start gap-4">
            <Reveal>
              <div className="overflow-hidden rounded-2xl border border-char-line bg-char">
                <HoursTable />
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="rounded-2xl border border-char-line bg-char p-7">
                <div className="flex flex-wrap items-start justify-between gap-6">
                  <div className="flex gap-4">
                    <PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                    <address className="not-italic leading-relaxed text-bone/75">
                      <span className="block font-semibold text-bone">
                        {site.address.street}
                      </span>
                      {site.address.zip} {site.address.city}
                      <br />
                      Vendée, France
                    </address>
                  </div>
                  <a
                    href={site.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline-dark !px-5 !py-2.5 !text-sm"
                  >
                    <RouteIcon className="h-4 w-4" />
                    Itinéraire
                  </a>
                </div>

                <dl className="mt-7 grid gap-4 border-t border-char-line pt-6 sm:grid-cols-3">
                  {practical.map((p) => (
                    <div key={p.label}>
                      <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-bone/35">
                        {p.label}
                      </dt>
                      <dd className="mt-1.5 text-[0.875rem] leading-relaxed text-bone/70">
                        {p.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-7 border-t border-char-line pt-6">
                  <CallButton className="btn-brand w-full sm:w-auto">
                    <PhoneIcon className="h-[1.125rem] w-[1.125rem]" />
                    {site.phoneDisplay}
                  </CallButton>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="h-full">
            <div className="h-full overflow-hidden rounded-2xl border border-char-line">
              <MapEmbed />
            </div>
          </Reveal>
        </div>

        <p className="mt-10 max-w-3xl text-[0.9375rem] leading-relaxed text-bone/40">
          On est au cœur du bourg de {site.city}, à quelques minutes de{" "}
          {areaServedDisplay}.
        </p>
      </div>
    </section>
  );
}
