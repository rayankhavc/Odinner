import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import { site, openingHoursSchema, faq, menu } from "@/lib/data";
import Analytics from "@/components/Analytics";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-display",
  display: "swap",
});

const sans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0B0B0D",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  // Sous 60 caracteres : au-dela, Google tronque et le taux de clic chute.
  title: "Kebab, Burger & Tacos à Mareuil-sur-Lay · O'dinner",
  // Sous 160 caracteres, arguments de clic en tete (prix, halal, horaires).
  description:
    "Kebab, burgers, tacos et assiettes halal à Mareuil-sur-Lay-Dissais (85320). Carte et prix en ligne, sandwich dès 8 €. Ouvert 7j/7, sur place ou à emporter.",
  applicationName: site.name,
  authors: [{ name: "Raythan Web Design", url: "https://raythan.fr" }],
  keywords: [
    "kebab Mareuil-sur-Lay-Dissais",
    "kebab halal Mareuil-sur-Lay",
    "burger Mareuil-sur-Lay",
    "tacos Mareuil-sur-Lay-Dissais",
    "restaurant halal 85320",
    "fast food Mareuil-sur-Lay",
    "kebab Luçon",
    "tacos Luçon",
    "kebab Sainte-Hermine",
    "restauration rapide Sud Vendée",
    "pâtisseries orientales Vendée",
    "O'dinner Mareuil-sur-Lay",
    "kebab à emporter 85",
    "sandwich halal Vendée",
    "menu enfant Mareuil-sur-Lay",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: site.url,
    siteName: site.name,
    title: "O'dinner · Kebab, Burger & Tacos à Mareuil-sur-Lay-Dissais",
    description:
      "Toute la carte et les prix en ligne. Kebabs, burgers au pain maison, tacos, assiettes, bowls et pâtisseries orientales. Halal, 7j/7, sur place ou à emporter.",
  },
  twitter: {
    card: "summary_large_image",
    title: "O'dinner · Kebab, Burger & Tacos à Mareuil-sur-Lay-Dissais",
    description:
      "Carte et prix en ligne. Halal, options végétariennes, ouvert 7j/7. Commandes au 06 25 86 93 17.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  other: {
    "geo.region": "FR-85",
    "geo.placename": site.city,
    "geo.position": `${site.geo.lat};${site.geo.lng}`,
    ICBM: `${site.geo.lat}, ${site.geo.lng}`,
  },
  // Renseigne via la variable d'environnement Vercel GOOGLE_SITE_VERIFICATION
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
};

const priceOf = (p: string) =>
  p.split("·")[0].trim().replace("€", "").replace(",", ".").trim();

const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": `${site.url}/#restaurant`,
  name: site.name,
  legalName: site.legalName,
  description:
    "Restauration rapide halal à Mareuil-sur-Lay-Dissais : kebabs, burgers au pain maison, tacos, paninis, assiettes, bowls, salades et pâtisseries orientales. Sur place ou à emporter.",
  servesCuisine: ["Kebab", "Burger", "Tacos", "Panini", "Street food", "Halal"],
  url: site.url,
  image: `${site.url}/opengraph-image`,
  logo: `${site.url}/photos/logo.png`,
  telephone: site.phoneE164,
  priceRange: "€",
  currenciesAccepted: "EUR",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    postalCode: site.address.zip,
    addressLocality: site.address.city,
    addressRegion: "Vendée",
    addressCountry: "FR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: site.geo.lat,
    longitude: site.geo.lng,
  },
  areaServed: site.areaServed.map((name) => ({ "@type": "City", name })),
  hasDeliveryMethod: "http://purl.org/goodrelations/v1#DeliveryModePickUp",
  openingHoursSpecification: openingHoursSchema,
  // Carte complete : chaque article avec son prix reel releve sur les panneaux.
  hasMenu: {
    "@type": "Menu",
    name: `Carte ${site.name}`,
    inLanguage: "fr-FR",
    hasMenuSection: menu.map((category) => ({
      "@type": "MenuSection",
      name: category.title,
      ...(category.note ? { description: category.note } : {}),
      hasMenuItem: category.items.map((item) => ({
        "@type": "MenuItem",
        name: item.name,
        ...(item.description ? { description: item.description } : {}),
        ...(item.veggie
          ? { suitableForDiet: "https://schema.org/VegetarianDiet" }
          : {}),
        offers: {
          "@type": "Offer",
          price: priceOf(item.price),
          priceCurrency: "EUR",
        },
      })),
    })),
  },
  // Note : la note et les avis sont affiches sur la page mais volontairement
  // absents du balisage. Google considere comme "auto-promotionnel" un
  // aggregateRating qu'un site publie sur lui-meme, et peut sanctionner les
  // extraits enrichis correspondants. La fiche Google fait deja foi.
  sameAs: [site.facebookUrl, site.googleReviewsUrl],
  hasMap: site.directionsUrl,
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
