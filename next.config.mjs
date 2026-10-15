/**
 * En-têtes de sécurité.
 *
 * Ce site avait déjà nosniff, X-Frame-Options, Referrer-Policy et
 * Permissions-Policy — le seul des quatre du portefeuille à les poser. Il
 * manquait les deux qui comptent le plus ici : une CSP, qui cloisonne les
 * domaines pouvant charger quoi que ce soit dans la page, et HSTS, qui
 * empêche une première visite en clair.
 *
 * Sur la CSP : Next.js injecte ses propres scripts en ligne pour
 * l'hydratation. Les interdire demanderait des « nonces », donc un middleware
 * et un rendu dynamique à chaque requête — on paierait la performance de tout
 * le site pour un gain nul ici, puisque aucune donnée visiteur n'est affichée.
 * 'unsafe-inline' est donc assumé : la CSP sert à cloisonner les domaines
 * externes, pas à bloquer l'inline.
 */
const CSP = [
  "default-src 'self'",
  // googletagmanager : la balise GA4, chargée seulement si un ID de mesure est
  // renseigné (google.gaId, lib/data.ts), en mode consentement « refusé » tant
  // que le visiteur n'a pas accepté (voir components/Analytics.tsx).
  "script-src 'self' 'unsafe-inline' https://*.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.googletagmanager.com https://*.google-analytics.com",
  // next/font héberge les polices sur notre propre domaine : aucun tiers ici.
  "font-src 'self' data:",
  // GA4 envoie ses mesures vers des serveurs régionaux (region1.google-analytics.com,
  // *.analytics.google.com) : sans les jokers, les visites seraient bloquées.
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com",
  // La carte Google Maps, chargée uniquement au clic du visiteur.
  "frame-src https://www.google.com https://maps.google.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  images: { formats: ["image/avif", "image/webp"] },
  compress: true,
  poweredByHeader: false,
  // L'ancienne adresse Vercel renvoie vers le nom de domaine : une seule
  // adresse pour Google, pas de contenu en double.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "odinner-site.vercel.app" }],
        destination: "https://www.odinner.fr/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: CSP },
          { key: "X-Content-Type-Options", value: "nosniff" },
          // frame-ancestors ci-dessus fait le vrai travail ; celui-ci couvre
          // les navigateurs qui ne l'appliquent pas.
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=(), interest-cohort=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};
export default nextConfig;
