import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/data";
import { ArrowIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Politique de confidentialité · O'dinner",
  description:
    "Politique de confidentialité et gestion des cookies du site O'dinner, restaurant à Mareuil-sur-Lay-Dissais (85320).",
  alternates: { canonical: "/confidentialite" },
};

/** La mesure d'audience est-elle réellement branchée ? Voir Analytics.tsx. */
const GA_ACTIF = Boolean(process.env.NEXT_PUBLIC_GA_ID);

const blocks: { id?: string; title: string; body: string }[] = [
  {
    title: "Données collectées",
    body: `Ce site est un site vitrine. Il ne propose ni formulaire de contact, ni compte client, ni paiement en ligne : aucune donnée personnelle n'est demandée ni enregistrée. Lorsque vous appelez le ${site.phoneDisplay}, l'échange se fait par téléphone, hors du site.`,
  },
  {
    // Cette page suit la configuration réelle plutôt que de la décrire de
    // mémoire. Poser NEXT_PUBLIC_GA_ID branche la mesure d'audience : si ce
    // texte restait figé sur « aucune mesure d'audience », la page la plus
    // formelle du site deviendrait fausse le jour où quelqu'un pose la
    // variable, sans que personne s'en aperçoive.
    id: "cookies",
    title: "Cookies",
    body: GA_ACTIF
      ? "Ce site utilise Google Analytics pour compter les visites et savoir quelles pages sont consultées. Cet outil dépose des cookies, et rien n'est déposé tant que vous n'avez pas accepté : un bandeau recueille votre choix à la première visite, refuser y est aussi simple qu'accepter, et le refus est conservé aussi longtemps que l'acceptation. Le lien « Cookies » en bas de page permet d'en changer à tout moment. Aucun cookie publicitaire n'est utilisé. La carte Google n'est chargée que si vous cliquez sur « Afficher la carte »."
      : "Le site ne dépose aucun cookie publicitaire ni de mesure d'audience. La carte Google n'est chargée que si vous cliquez sur « Afficher la carte » : ce n'est qu'à ce moment, et par votre action, que Google peut déposer ses propres cookies. Tant que vous ne cliquez pas, aucun cookie tiers n'est déposé. C'est pourquoi ce site n'affiche pas de bandeau cookies.",
  },
  {
    title: "Liens sortants",
    body: "Les boutons Facebook, Google Maps et « laisser un avis » ouvrent des services tiers, qui appliquent alors leurs propres règles de confidentialité.",
  },
  {
    title: "Hébergement et journaux techniques",
    body: "L'hébergeur (Vercel) peut conserver des journaux techniques (adresse IP, type de navigateur) à des fins de sécurité et de bon fonctionnement, conformément à sa propre politique.",
  },
  {
    title: "Vos droits",
    body: `Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour toute demande, contactez le restaurant au ${site.phoneDisplay} ou à l'adresse : ${site.address.full}.`,
  },
];

export default function Confidentialite() {
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

        <h1 className="h2 mt-8">Politique de confidentialité</h1>

        <div className="mt-12 divide-y divide-paper-line border-y border-paper-line">
          {blocks.map((b) => (
            <section
              key={b.title}
              id={b.id}
              className="scroll-mt-24 grid gap-2 py-7 sm:grid-cols-[13rem_1fr] sm:gap-8"
            >
              <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-ink/40">
                {b.title}
              </h2>
              <p className="leading-relaxed text-ink/70">{b.body}</p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
