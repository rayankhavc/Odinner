import type { MetadataRoute } from "next";
import { site } from "@/lib/data";

/**
 * Uniquement des URL canoniques (https, sans www, sans slash final) :
 * toute autre forme est une redirection et n'a rien a faire ici.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: site.url, lastModified, changeFrequency: "weekly", priority: 1 },
    {
      url: `${site.url}/mentions-legales`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${site.url}/confidentialite`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
