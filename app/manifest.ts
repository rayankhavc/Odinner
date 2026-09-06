import type { MetadataRoute } from "next";
import { site } from "@/lib/data";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} · Kebab, Burger & Tacos à ${site.shortCity}`,
    short_name: site.name,
    description:
      "Kebabs, burgers, tacos, assiettes et pâtisseries orientales halal à Mareuil-sur-Lay-Dissais (85320).",
    start_url: "/",
    display: "standalone",
    background_color: "#0B0B0D",
    theme_color: "#0B0B0D",
    lang: "fr",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
