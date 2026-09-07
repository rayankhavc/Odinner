import Script from "next/script";
import Consent from "@/components/Consent";

/**
 * Google Analytics 4, inerte par défaut.
 *
 * Rien n'est chargé tant que NEXT_PUBLIC_GA_ID n'est pas renseignée : aucun
 * script tiers, aucun cookie de mesure, donc aucun bandeau à afficher.
 * Pour activer : Vercel → Settings → Environment Variables →
 * NEXT_PUBLIC_GA_ID = G-XXXXXXXXXX, puis redéployer.
 *
 * ── Ce que poser cette variable entraîne ──────────────────────────────────
 * Google Analytics dépose des cookies de mesure, et la CNIL les soumet au
 * consentement dès lors que l'outil n'est pas configuré en mesure exemptée.
 * Poser NEXT_PUBLIC_GA_ID sans rien d'autre rendrait donc le site non
 * conforme, et la politique de confidentialité fausse.
 *
 * Ce composant s'occupe des deux conséquences plutôt que de les laisser à
 * faire : le mode consentement de Google est posé à « refusé » AVANT le
 * chargement de la balise, et le bandeau apparaît. L'ordre des deux premiers
 * scripts est ce qui fait la conformité — sans le premier, gtag.js écrit son
 * cookie avant que quiconque ait rien demandé.
 *
 * Retirer la variable défait l'ensemble : aucun traceur, aucun bandeau.
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function Analytics() {
  if (!GA_ID) return null;

  return (
    <>
      {/* Refus par défaut, posé avant tout chargement de balise. */}
      <Script id="ga4-consent-defaut" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = window.gtag || gtag;
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'denied',
            wait_for_update: 500
          });
          try {
            if (localStorage.getItem('odinner-mesure') === 'oui') {
              gtag('consent', 'update', { analytics_storage: 'granted' });
            }
          } catch (e) {}
        `}
      </Script>

      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="lazyOnload"
      />
      <Script id="ga4-init" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = window.gtag || gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>

      <Consent actif />
    </>
  );
}
