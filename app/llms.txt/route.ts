import {
  site,
  menu,
  faq,
  openingHours,
  formatSlot,
  areaServedDisplay,
  rating,
  viandes,
  sauces,
} from "@/lib/data";

/**
 * /llms.txt — fiche factuelle en texte brut.
 *
 * Les moteurs de reponse (AI Overviews, ChatGPT, Perplexity) citent plus
 * volontiers une source dont les faits sont lisibles sans JavaScript et sans
 * mise en page. C'est le pendant "GEO" du sitemap.
 */
export const dynamic = "force-static";

export function GET() {
  const hours = openingHours
    .map(
      (d) =>
        `- ${d.day} : ${d.slots.length === 0 ? "Fermé" : d.slots.map(formatSlot).join(" et ")}`
    )
    .join("\n");

  const carte = menu
    .map((c) => {
      const head = `### ${c.title}${c.note ? ` (${c.note})` : ""}`;
      const lines = c.items
        .map(
          (i) =>
            `- ${i.name}${i.description ? ` — ${i.description}` : ""} : ${i.price}`
        )
        .join("\n");
      return `${head}\n${lines}`;
    })
    .join("\n\n");

  const questions = faq
    .map((i) => `### ${i.question}\n${i.answer}`)
    .join("\n\n");

  const body = `# ${site.name}

> Restauration rapide halal à ${site.address.city} (${site.address.zip}), en Vendée.
> Kebabs, burgers au pain maison, tacos, paninis, assiettes, bowls, salades et
> pâtisseries orientales, préparés à la commande. Sur place ou à emporter.

## Coordonnées

- Nom : ${site.name}
- Adresse : ${site.address.full}, France
- Téléphone (commandes) : ${site.phoneDisplay} (${site.phoneE164})
- WhatsApp : ${site.whatsappUrl}
- Coordonnées GPS : ${site.geo.lat}, ${site.geo.lng}
- Site web : ${site.url}
- Fiche Google : ${site.googleReviewsUrl}
- Facebook : ${site.facebookUrl}
- Note Google : ${rating.value}/5 sur ${rating.count} avis
- Services : ${site.services.join(", ")}
- Viandes halal : oui — Options végétariennes : oui
- Communes desservies : ${site.city}, ${areaServedDisplay}

## Horaires d'ouverture

${hours}

Lundi et vendredi : service du soir uniquement.

## Carte et prix

${carte}

### Viandes au choix (tacos, maxis, assiettes, bowls)
${viandes.join(", ")}. Viande supplémentaire : +2,50 €.

### Sauces au choix
${sauces.join(", ")}.

## Questions fréquentes

${questions}

## Mentions

- Mentions légales : ${site.url}/mentions-legales
- Confidentialité : ${site.url}/confidentialite
- SIRET : ${site.siret}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
