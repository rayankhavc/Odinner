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
    title: "Responsable du traitement",
    body: `${site.legalName}, ${site.legalForm} au capital de ${site.capital}, ${site.rcs}, dont le siège est situé ${site.address.full}, représentée par ${site.manager}, gérant. Téléphone : ${site.phoneDisplay}.`,
  },
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
    title: "Avis clients",
    body: "Les avis affichés sur la page d'accueil ont été publiés publiquement par leurs auteurs sur notre fiche Google. Seuls le prénom et l'initiale du nom, tels qu'ils apparaissent sur Google, sont repris. Si vous êtes l'auteur d'un de ces avis et souhaitez qu'il soit retiré du site, il suffit de nous le demander : nous le retirons sans délai.",
  },
  {
    title: "Liens sortants",
    body: "Les boutons Facebook, Google Maps et « laisser un avis » ouvrent des services tiers, qui appliquent alors leurs propres règles de confidentialité.",
  },
  {
    title: "Hébergement et journaux techniques",
    body: "Le site est hébergé par Vercel Inc., société établie aux États-Unis. Pour la sécurité et le bon fonctionnement du service, Vercel conserve des journaux techniques (adresse IP, type de navigateur, pages demandées) pendant une durée limitée. Ce transfert hors de l'Union européenne est encadré par le Data Privacy Framework UE-États-Unis, auquel Vercel est certifié. Les polices de caractères sont servies par notre propre site : aucune requête n'est envoyée à Google Fonts.",
  },
  {
    title: "Vos droits",
    body: `Conformément au RGPD et à la loi Informatique et Libertés, vous disposez d'un droit d'accès, de rectification, d'effacement, d'opposition et de limitation du traitement de vos données. Pour les exercer, contactez-nous au ${site.phoneDisplay} ou par courrier à l'adresse : ${site.address.full}. Si vous estimez, après nous avoir contactés, que vos droits ne sont pas respectés, vous pouvez adresser une réclamation à la CNIL (cnil.fr).`,
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
              <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-ink/60">
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
