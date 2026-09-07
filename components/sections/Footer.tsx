import Link from "next/link";
import { site, hoursSummary, hoursNote } from "@/lib/data";
import { FacebookIcon, PhoneIcon } from "@/components/icons";
import CallButton from "@/components/CallButton";
import Wordmark from "@/components/Wordmark";

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-char-line bg-ink">
      <div className="wrap py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Wordmark size="lg" />
            <p className="mt-4 max-w-xs text-[0.9375rem] leading-relaxed text-bone/50">
              Kebabs, burgers, tacos, assiettes et pâtisseries orientales à{" "}
              {site.city} ({site.zip}), en Vendée. À emporter ou sur place.
            </p>
            <div className="mt-6">
              <CallButton className="btn-brand">
                <PhoneIcon className="h-[1.125rem] w-[1.125rem]" />
                {site.phoneDisplay}
              </CallButton>
            </div>
          </div>

          <div>
            <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-bone/35">
              Adresse
            </h2>
            <address className="mt-4 not-italic leading-relaxed text-bone/70">
              {site.address.street}
              <br />
              {site.address.zip} {site.address.city}
              <br />
              Vendée, France
            </address>
            <a
              href={site.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-[0.9375rem] text-bone/60 transition-colors hover:text-bone"
            >
              <FacebookIcon className="h-4 w-4" />
              Facebook
            </a>
          </div>

          <div>
            <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-bone/35">
              Horaires
            </h2>
            <p className="mt-4 leading-relaxed text-bone/70">
              {hoursSummary}
              <br />
              <span className="text-[0.875rem] text-bone/45">{hoursNote}</span>
            </p>
            <a
              href="#infos"
              className="mt-4 inline-block text-[0.9375rem] font-medium text-brand transition-opacity hover:opacity-75"
            >
              Voir le détail
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-char-line pt-7 text-[0.8125rem] text-bone/35 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name} · {site.address.city} ·
            Viandes halal
          </p>
          <nav className="flex items-center gap-5">
            <Link href="/mentions-legales" className="transition-colors hover:text-bone/70">
              Mentions légales
            </Link>
            <Link href="/confidentialite" className="transition-colors hover:text-bone/70">
              Confidentialité
            </Link>
            {/* Retirer son consentement doit être aussi simple que de le
                donner : ce lien rouvre le bandeau quand la mesure d'audience
                est branchée (voir components/Consent.tsx). */}
            <Link href="/confidentialite#cookies" className="transition-colors hover:text-bone/70">
              Cookies
            </Link>
          </nav>
        </div>

        {/* Crédit agence. Lien suivi volontairement (rel sans nofollow) :
            c'est un lien éditorial légitime entre le site livré et son auteur. */}
        <p className="mt-5 text-[0.8125rem] text-bone/30">
          Site conçu et réalisé par{" "}
          <a
            href="https://raythan.fr"
            target="_blank"
            rel="noopener"
            className="font-medium text-bone/50 underline decoration-brand/50 underline-offset-4 transition-colors hover:text-brand"
          >
            Raythan Web Design
          </a>
        </p>
      </div>
    </footer>
  );
}
