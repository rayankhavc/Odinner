import Script from "next/script";

/**
 * Google Analytics 4, inerte par défaut.
 *
 * Rien n'est chargé tant que NEXT_PUBLIC_GA_ID n'est pas renseignée : aucun
 * script tiers, aucun cookie de mesure, donc pas de bandeau cookies requis.
 * Pour activer : Vercel → Settings → Environment Variables →
 * NEXT_PUBLIC_GA_ID = G-XXXXXXXXXX, puis redéployer.
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function Analytics() {
  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="lazyOnload"
      />
      <Script id="ga4-init" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
