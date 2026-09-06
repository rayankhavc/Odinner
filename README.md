# O'dinner — site vitrine

Restaurant **O'dinner**, 51 Rue Hervé de Mareuil, 85320 Mareuil-sur-Lay-Dissais
(Vendée). Next.js 14 (App Router), Tailwind CSS, aucune dépendance runtime
au-delà de React. Déployé sur Vercel.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Ce que le site fait

- **Carte complète avec les prix**, relevée sur les quatre panneaux du
  restaurant : 14 catégories, viandes au choix, sauces, suppléments, formules.
- **Les panneaux en photo**, en pleine résolution, dans une visionneuse
  (clavier : `←` `→` `Échap`).
- **Statut « Ouvert / Fermé » en direct**, calculé à l'heure de Paris, avec
  l'heure de fermeture ou de prochaine ouverture, et le jour du jour mis en
  avant dans le tableau des horaires.
- **Avis Google réels** (4,9/5 · 76 avis), repris sans modification.
- **Barre d'actions fixe sur mobile** : appeler, WhatsApp, itinéraire.

## Où modifier le contenu

Tout est dans **`lib/data.ts`** :

| À changer | Clé |
| --- | --- |
| Nom de domaine | `site.url` — une seule ligne : SEO, canonique, sitemap, robots, JSON-LD et `llms.txt` suivent. Actuellement `https://odinner-site.vercel.app` |
| Téléphone, adresse, GPS | `site.phoneDisplay`, `site.address`, `site.geo` |
| Horaires | `openingHours` — plusieurs créneaux par jour, `slots: []` = fermé |
| Carte et prix | `menu` (+ `viandes`, `sauces`, `supplements`, `extras`) |
| Avis et note | `reviews`, `rating` |
| Communes ciblées | `site.areaServed` |
| FAQ | `faq` — alimente aussi le bloc FAQPage de Google |

Photos dans `public/photos/` : `logo.png` (logo détouré de la fiche Google),
`patisseries-orientales.jpg`, et les quatre panneaux `carte-*.jpg`.

## SEO / GEO

- Title < 60 caractères, description < 160, canonique, Open Graph, Twitter
  Card, balises `geo.*` / ICBM.
- JSON-LD `Restaurant` : adresse, GPS, horaires **par créneau**, zone
  desservie, et `hasMenu` complet — chaque article avec son prix.
- JSON-LD `FAQPage` sur les 8 questions de la page.
- `robots.txt`, `sitemap.xml`, `manifest.webmanifest`, favicon, icône Apple et
  image Open Graph générés par le framework.
- `/llms.txt` : fiche factuelle en texte brut (carte et prix compris) pour les
  moteurs de réponse.
- Images AVIF/WebP, aucun script tiers, carte Google chargée seulement au clic
  → pas de cookie tiers, donc pas de bandeau cookies.

> La note et les avis sont affichés sur la page mais volontairement **absents**
> du balisage `schema.org`. Google considère comme auto-promotionnel un
> `aggregateRating` qu'un site publie sur lui-même et peut retirer l'extrait
> enrichi correspondant. La fiche Google fait foi.

## À activer à la livraison du domaine

Vercel → Settings → Environment Variables, puis redéployer :

| Variable | Effet |
| --- | --- |
| `NEXT_PUBLIC_GA_ID` | branche Google Analytics 4 (`G-XXXXXXXXXX`) |
| `GOOGLE_SITE_VERIFICATION` | balise de vérification Search Console |

Tant qu'elles sont absentes, aucun script tiers n'est chargé.

---

Conçu et réalisé par [Raythan Web Design](https://raythan.fr).
