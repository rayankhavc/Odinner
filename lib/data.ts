/**
 * ==============================================================
 *  DONNEES DU SITE O'DINNER
 *
 *  Sources (tout est verifie, rien n'est invente) :
 *   - fiche Google Business : nom, logo, adresse, GPS, place_id,
 *     telephone, categorie, photo de la vitrine
 *   - panneaux menu photographies par le restaurant (page Facebook,
 *     visuels 1600x900) : integralite de la carte et des prix
 *   - annuaire public des entreprises : SIRET et gerant
 *   - avis Google, repris tels quels
 *
 *  Tout ce qui est modifiable est centralise dans ce fichier.
 * ==============================================================
 */

export const site = {
  name: "O'dinner",
  legalName: "O'DINNER",
  tagline: "Kebab · Burger · Tacos · Pizza",
  city: "Mareuil-sur-Lay-Dissais",
  shortCity: "Mareuil-sur-Lay",
  department: "Vendée",
  zip: "85320",

  // >>> A REMPLACER par le vrai domaine a la mise en ligne. Une seule ligne :
  //     metadonnees, canonique, sitemap, robots et donnees structurees suivent.
  //     En attendant, c'est l'URL de production Vercel : la canonique et le
  //     sitemap pointent donc vers un hote qui existe reellement.
  url: "https://odinner-site.vercel.app",

  phoneDisplay: "06 25 86 93 17",
  phoneHref: "tel:+33625869317",
  phoneE164: "+33625869317",
  // Le restaurant a annonce sur sa page Facebook (14 aout 2026) que la ligne
  // fixe etait hors service et qu'on pouvait le joindre sur WhatsApp, au meme
  // numero. Les commandes, elles, se passent par appel.
  whatsappUrl: "https://wa.me/33625869317",

  address: {
    street: "51 Rue Hervé de Mareuil",
    zip: "85320",
    city: "Mareuil-sur-Lay-Dissais",
    full: "51 Rue Hervé de Mareuil, 85320 Mareuil-sur-Lay-Dissais",
  },

  geo: { lat: 46.5358215, lng: -1.2247702 },

  placeId: "ChIJzch7-W-fBkgR1owUiDzmAUk",
  siret: "979 527 447 00010",
  ape: "56.10C",
  manager: "Ali Yahiaoui",

  // Zone de chalandise reelle (maillage SEO local)
  areaServed: [
    "Mareuil-sur-Lay-Dissais",
    "Luçon",
    "Sainte-Hermine",
    "Moutiers-sur-le-Lay",
    "Château-Guibert",
    "Les Pineaux",
    "Bessay",
    "Corpe",
    "Péault",
    "Les Magnils-Reigniers",
  ],

  services: ["Sur place", "À emporter"],

  dietary: { halal: true, vegetarian: true },

  facebookUrl: "https://www.facebook.com/p/Odinner-100094451359855/",

  // Liens Google construits sur le place_id : valides meme si la fiche change
  googleReviewsUrl:
    "https://www.google.com/maps/place/?q=place_id:ChIJzch7-W-fBkgR1owUiDzmAUk",
  writeReviewUrl:
    "https://search.google.com/local/writereview?placeid=ChIJzch7-W-fBkgR1owUiDzmAUk",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=51%20Rue%20Herv%C3%A9%20de%20Mareuil%2C%2085320%20Mareuil-sur-Lay-Dissais&destination_place_id=ChIJzch7-W-fBkgR1owUiDzmAUk",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=51+Rue+Herv%C3%A9+de+Mareuil%2C+85320+Mareuil-sur-Lay-Dissais&output=embed",
};

export const areaServedDisplay = site.areaServed
  .filter((name) => name !== site.city)
  .join(", ");

export const photos = {
  logo: "/photos/logo.png",
  patisseries: "/photos/patisseries-orientales.jpg",
};

/* ============================================================
   LES PANNEAUX DE LA CARTE (photos reelles du restaurant)
   ============================================================ */

export type Board = {
  src: string;
  label: string;
  alt: string;
};

export const boards: Board[] = [
  {
    src: "/photos/carte-sandwichs.jpg",
    label: "Sandwichs, spéciaux & paninis",
    alt: "Carte O'dinner : sandwichs classiques, sandwichs spéciaux et paninis, avec les prix",
  },
  {
    src: "/photos/carte-burgers.jpg",
    label: "Burgers, menus & sauces",
    alt: "Carte O'dinner : burgers, menu duo, menu enfant et sauces au choix, avec les prix",
  },
  {
    src: "/photos/carte-tacos-assiettes.jpg",
    label: "Maxis, tacos, assiettes & bowls",
    alt: "Carte O'dinner : sandwichs maxis, tacos, assiettes, bowls et viandes au choix, avec les prix",
  },
  {
    src: "/photos/carte-salades-desserts.jpg",
    label: "Salades, petites faims & desserts",
    alt: "Carte O'dinner : salades, barquettes, petites faims, suppléments, desserts et boissons, avec les prix",
  },
];

/* ============================================================
   LA CARTE — relevee sur les panneaux du restaurant
   ============================================================ */

export type MenuItem = {
  name: string;
  description?: string;
  price: string;
  /** met l'article en avant (specialite de la maison) */
  signature?: boolean;
  /** repere vegetarien */
  veggie?: boolean;
};

export type MenuCategory = {
  id: string;
  title: string;
  short: string;
  note?: string;
  items: MenuItem[];
};

export const menu: MenuCategory[] = [
  {
    id: "menus",
    title: "Les menus",
    short: "Menus",
    items: [
      {
        name: "Menu Duo",
        description:
          "Sandwich kebab frites & cheddar + P'tit Cheese steak 50 g + boisson 33 cl",
        price: "15 €",
      },
      {
        name: "Menu Enfant",
        description:
          "P'tit Cheese 50 g, 5 nuggets, kébab ou 1 tender + frites + Capri-Sun",
        price: "7,50 €",
      },
    ],
  },
  {
    id: "sandwichs",
    title: "Sandwichs classiques",
    short: "Sandwichs",
    note: "Pain maison ou tortilla, servis avec crudités + frites",
    items: [
      { name: "Kebab", price: "8 €" },
      { name: "Américain", price: "8,50 €" },
      { name: "Chicken", price: "8,50 €" },
      { name: "Cordon bleu", price: "8,50 €" },
      { name: "Escalope", price: "8,50 €" },
      { name: "Falafel", price: "8,50 €", veggie: true },
      { name: "Tenders", price: "8,50 €" },
      { name: "Merguez", price: "8,50 €" },
      { name: "Kefta", price: "8,50 €" },
      {
        name: "Kebab Royal",
        description: "Kebab + cheddar + œuf au plat",
        price: "9,50 €",
      },
    ],
  },
  {
    id: "speciaux",
    title: "Sandwichs spéciaux",
    short: "Spéciaux",
    note: "Pain maison ou tortilla, servis avec crudités",
    items: [
      {
        name: "O'dinner",
        description: "2 steaks + cheddar + cordon bleu",
        price: "11 €",
        signature: true,
      },
      {
        name: "Triplex",
        description: "3 steaks + cheddar + œuf au plat",
        price: "11 €",
      },
      {
        name: "Radical",
        description: "2 steaks + cheddar + merguez + œuf au plat",
        price: "11 €",
      },
      {
        name: "Blindé",
        description: "3 steaks + cheddar + rösti de pomme de terre",
        price: "11 €",
      },
      {
        name: "Boursin",
        description: "Escalope de poulet + poivron + sauce fromagère Boursin",
        price: "11 €",
      },
    ],
  },
  {
    id: "tacos",
    title: "Tacos",
    short: "Tacos",
    note: "Sauce fromagère maison, servis avec des frites",
    items: [
      { name: "1 viande", price: "9 €" },
      { name: "2 viandes", price: "10,50 €" },
      { name: "3 viandes", price: "12 €" },
    ],
  },
  {
    id: "maxis",
    title: "Sandwichs Maxis",
    short: "Maxis",
    note: "Double tortilla, crudités + frites",
    items: [
      { name: "1 viande", price: "11 €" },
      { name: "2 viandes", price: "13 €" },
      { name: "3 viandes", price: "15 €" },
    ],
  },
  {
    id: "assiettes",
    title: "Assiettes",
    short: "Assiettes",
    note: "Servies avec crudités + frites",
    items: [
      { name: "1 viande", price: "11 €" },
      { name: "2 viandes", price: "13 €" },
      { name: "3 viandes", price: "15 €" },
    ],
  },
  {
    id: "bowls",
    title: "Bowls",
    short: "Bowls",
    note: "Base frites + sauce fromagère + oignons croustillants + cheddar fondu",
    items: [
      { name: "1 viande", price: "11 €" },
      { name: "2 viandes", price: "13 €" },
      { name: "3 viandes", price: "15 €" },
    ],
  },
  {
    id: "burgers",
    title: "Burgers",
    short: "Burgers",
    note: "Viande hachée fraîche 100 % bœuf, pain maison, crudités",
    items: [
      { name: "P'tit Cheese", description: "Steak 50 g + cheddar", price: "5 €" },
      {
        name: "Double P'tit Cheese",
        description: "2 steaks 50 g + cheddar",
        price: "7 €",
      },
      { name: "Cheeseburger", description: "Steak 130 g + cheddar", price: "8 €" },
      {
        name: "Double Cheeseburger",
        description: "2 steaks 130 g + cheddar",
        price: "10 €",
      },
      {
        name: "Raclette",
        description: "Steak 130 g + cheddar + fromage à raclette",
        price: "9 €",
      },
      {
        name: "Double Raclette",
        description: "2 steaks 130 g + cheddar + fromage à raclette",
        price: "11 €",
      },
      {
        name: "Royal",
        description: "Steak 130 g + cheddar + filet de poulet pané",
        price: "10 €",
      },
      {
        name: "Farmer",
        description: "Steak 130 g + cheddar + rösti de pomme de terre",
        price: "9,50 €",
      },
      {
        name: "Double Farmer",
        description: "2 steaks 130 g + cheddar + rösti de pomme de terre",
        price: "11 €",
      },
      { name: "Fish", description: "Poisson pané + cheddar", price: "8 €" },
      {
        name: "Double Fish",
        description: "2 poissons panés + cheddar",
        price: "10 €",
      },
      { name: "Chicken", description: "Poulet pané + cheddar", price: "8 €" },
      {
        name: "Double Chicken",
        description: "2 poulets panés + cheddar",
        price: "9,50 €",
      },
    ],
  },
  {
    id: "paninis",
    title: "Paninis",
    short: "Paninis",
    note: "À base de mozzarella",
    items: [
      {
        name: "Viande",
        description: "1 viande au choix (sauf cordon bleu)",
        price: "7 €",
      },
      {
        name: "3 Fromages",
        description: "Mozzarella + gorgonzola + fromage de chèvre",
        price: "7 €",
        veggie: true,
      },
      {
        name: "Chèvre Miel",
        description: "Fromage de chèvre + miel",
        price: "7 €",
        veggie: true,
      },
    ],
  },
  {
    id: "salades",
    title: "Salades",
    short: "Salades",
    note: "Base salade verte + tomates + olives",
    items: [
      {
        name: "Végane",
        description: "Falafel + poivron + chou rouge",
        price: "7 €",
        veggie: true,
      },
      { name: "Mixte", description: "Fromage de chèvre", price: "6 €", veggie: true },
      { name: "Poulet", description: "Poulet + gruyère", price: "7 €" },
      {
        name: "Fermière",
        description: "Poulet + poivron + chèvre",
        price: "7 €",
      },
    ],
  },
  {
    id: "barquettes",
    title: "Barquettes",
    short: "Barquettes",
    items: [
      { name: "Viande kebab", description: "Moyenne / grande", price: "8 · 12 €" },
      { name: "Frites", description: "Moyenne / grande", price: "3 · 5 €" },
    ],
  },
  {
    id: "petites-faims",
    title: "Petites faims",
    short: "Petites faims",
    items: [
      {
        name: "Mozza sticks",
        description: "4 pièces / 7 / 10",
        price: "5 · 8 · 11 €",
        veggie: true,
      },
      {
        name: "Onion rings",
        description: "6 pièces / 9 / 12",
        price: "5 · 7 · 9 €",
        veggie: true,
      },
      { name: "Tenders", description: "3 pièces / 6 / 9", price: "6,50 · 9,50 · 13 €" },
      { name: "Nuggets", description: "6 pièces / 10", price: "6 · 9 €" },
      {
        name: "Camemberts panés",
        description: "4 pièces / 7 / 10",
        price: "5 · 8 · 11 €",
        veggie: true,
      },
    ],
  },
  {
    id: "desserts",
    title: "Desserts",
    short: "Desserts",
    items: [
      { name: "Pâtisserie orientale", price: "2 €" },
      { name: "Tiramisu", price: "3 €" },
      { name: "Tarte au Daim", price: "3 €" },
      { name: "Panini Nutella", price: "4,50 €" },
    ],
  },
  {
    id: "boissons",
    title: "Boissons",
    short: "Boissons",
    items: [
      {
        name: "Soda",
        description: "Canette 33 cl / bouteille 50 cl / bouteille 1,25 L",
        price: "2 · 2,50 · 4 €",
      },
      { name: "Red Bull", description: "Canette 25 cl", price: "2,50 €" },
      {
        name: "Eau",
        description: "Bouteille 50 cl / 1,5 L",
        price: "1,50 · 2,50 €",
      },
    ],
  },
];

/** Viandes au choix pour tacos, maxis, assiettes et bowls */
export const viandes = [
  "Steak 100 % bœuf",
  "Kebab",
  "Merguez",
  "Escalope",
  "Poulet curry",
  "Cordon bleu",
  "Tenders",
  "Nuggets",
  "Kefta",
  "Falafels (végétarien)",
];

export const sauces = [
  "Curry",
  "Andalouse",
  "Harissa",
  "Biggy Burger",
  "Samouraï",
  "Mayonnaise",
  "Ketchup",
  "Moutarde",
  "Barbecue",
  "Algérienne",
  "Blanche",
];

export const supplements = [
  {
    price: "1 €",
    items: ["Œuf au plat", "Olives", "Cheddar", "Mozzarella", "Gruyère", "Gorgonzola", "Poivron"],
  },
  {
    price: "1,50 €",
    items: ["Boursin", "Feta", "Cheddar fondu", "Raclette", "Rösti", "Jambon de dinde"],
  },
];

/** Formules d'accompagnement affichees sur les panneaux */
export const extras = [
  { label: "Avec frites", price: "+1 €" },
  { label: "Avec frites + boisson", price: "+2,50 €" },
  { label: "Avec 1 boisson 33 cl", price: "+1,50 €" },
  { label: "Viande supplémentaire", price: "+2,50 €" },
];

/* ============================================================
   AVIS GOOGLE (repris tels quels, non modifies)
   ============================================================ */

export type Review = {
  author: string;
  text: string;
  rating: number;
  date: string; // ISO
  dateLabel: string;
};

export const rating = { value: "4,9", count: 76 };

export const reviews: Review[] = [
  {
    author: "Rémy A.",
    rating: 5,
    date: "2025-09-06",
    dateLabel: "Septembre 2025",
    text: "Meilleur kebab dans les parages. Je me suis régalé avec une viande délicieuse en bonne quantité. Je reviendrai les yeux fermés.",
  },
  {
    author: "Kevin E.",
    rating: 5,
    date: "2025-08-23",
    dateLabel: "Août 2025",
    text: "Je viens souvent ici et jamais été déçu ! En plus d'être sympas, ils font du bon job ! Burgers, tacos, kebabs excellent !",
  },
  {
    author: "Jérémy I.",
    rating: 5,
    date: "2025-08-24",
    dateLabel: "Août 2025",
    text: "Le double burger est garni comme il faut et le kebab est bon ! Je ne pensais pas trouver ça à 10 minutes de chez moi. Je reviendrai !",
  },
  {
    author: "Mathis A.",
    rating: 5,
    date: "2025-08-29",
    dateLabel: "Août 2025",
    text: "Endroit chaleureux, toujours le sourire et bien servi, je recommande.",
  },
];

/* ============================================================
   HORAIRES
   Ouvert 7j/7. Deux services, sauf lundi et vendredi (soir seul).
   ============================================================ */

export type Slot = { open: string; close: string };

export type DayHours = {
  day: string;
  schemaDay: string;
  /** 0 = dimanche, comme Date.getDay() */
  index: number;
  slots: Slot[]; // vide = ferme
};

export const openingHours: DayHours[] = [
  { day: "Lundi", schemaDay: "Monday", index: 1, slots: [{ open: "18:30", close: "22:00" }] },
  {
    day: "Mardi",
    schemaDay: "Tuesday",
    index: 2,
    slots: [
      { open: "11:00", close: "14:30" },
      { open: "18:00", close: "22:00" },
    ],
  },
  {
    day: "Mercredi",
    schemaDay: "Wednesday",
    index: 3,
    slots: [
      { open: "11:00", close: "14:30" },
      { open: "18:00", close: "22:00" },
    ],
  },
  {
    day: "Jeudi",
    schemaDay: "Thursday",
    index: 4,
    slots: [
      { open: "11:00", close: "14:30" },
      { open: "18:00", close: "22:00" },
    ],
  },
  { day: "Vendredi", schemaDay: "Friday", index: 5, slots: [{ open: "18:00", close: "23:00" }] },
  {
    day: "Samedi",
    schemaDay: "Saturday",
    index: 6,
    slots: [
      { open: "11:00", close: "14:30" },
      { open: "18:00", close: "23:00" },
    ],
  },
  {
    day: "Dimanche",
    schemaDay: "Sunday",
    index: 0,
    slots: [
      { open: "12:00", close: "14:30" },
      { open: "17:00", close: "22:00" },
    ],
  },
];

export const formatHour = (v: string) => v.replace(":", "h");
export const formatSlot = (s: Slot) => `${formatHour(s.open)} – ${formatHour(s.close)}`;
export const formatDay = (d: DayHours) =>
  d.slots.length === 0 ? "Fermé" : d.slots.map(formatSlot).join(" · ");

export const hoursSummary = "Ouvert 7j/7, midi et soir";
export const hoursNote = "Lundi et vendredi : service du soir uniquement.";

/** schema.org : une entree par creneau */
export const openingHoursSchema = openingHours.flatMap((d) =>
  d.slots.map((s) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: `https://schema.org/${d.schemaDay}`,
    opens: s.open,
    closes: s.close,
  }))
);

/* ============================================================
   FAQ (visible + schema FAQPage)
   ============================================================ */

export type FaqItem = { question: string; answer: string };

export const faq: FaqItem[] = [
  {
    question: "Où manger un kebab à Mareuil-sur-Lay-Dissais ?",
    answer:
      "Chez O'dinner, au 51 Rue Hervé de Mareuil à Mareuil-sur-Lay-Dissais (85320). Kebabs, burgers, tacos, paninis, assiettes et bowls y sont préparés à la commande, sur place ou à emporter, à une dizaine de minutes de Luçon.",
  },
  {
    question: "Quels sont les horaires d'O'dinner ?",
    answer:
      "Ouvert 7j/7. Du mardi au jeudi de 11h00 à 14h30 et de 18h00 à 22h00, le vendredi de 18h00 à 23h00, le samedi de 11h00 à 14h30 et de 18h00 à 23h00, le dimanche de 12h00 à 14h30 et de 17h00 à 22h00, et le lundi de 18h30 à 22h00.",
  },
  {
    question: "O'dinner est-il ouvert le midi ?",
    answer:
      "Oui, du mardi au jeudi et le samedi de 11h00 à 14h30, et le dimanche de 12h00 à 14h30. Le lundi et le vendredi, le restaurant n'ouvre que le soir.",
  },
  {
    question: "Comment commander chez O'dinner ?",
    answer:
      "Les commandes se prennent par téléphone au 06 25 86 93 17, puis vous passez récupérer sur place. Vous pouvez aussi manger sur place. Le restaurant est également joignable sur WhatsApp au même numéro.",
  },
  {
    question: "La viande est-elle halal chez O'dinner ?",
    answer:
      "Oui, les viandes servies chez O'dinner sont halal : steak 100 % bœuf, kebab, merguez, escalope, poulet curry, cordon bleu, tenders, nuggets et kefta.",
  },
  {
    question: "Y a-t-il des plats végétariens ?",
    answer:
      "Oui. Les falafels sont proposés en sandwich, en tacos, en assiette et en bowl, et la salade Végane (falafel, poivron, chou rouge) est entièrement végétale. Côté fromages : paninis 3 Fromages et Chèvre Miel, mozza sticks, onion rings et camemberts panés.",
  },
  {
    question: "Combien coûte un repas chez O'dinner ?",
    answer:
      "Un sandwich classique servi avec frites démarre à 8 €, un tacos 1 viande à 9 €, un burger à partir de 5 €. Le Menu Duo est à 15 € et le Menu Enfant à 7,50 €.",
  },
  {
    question: "Y a-t-il un parking près d'O'dinner ?",
    answer:
      "Oui, stationnement gratuit dans la rue Hervé de Mareuil, avec une place accessible en fauteuil roulant devant le restaurant.",
  },
];
