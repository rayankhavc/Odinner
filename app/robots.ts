import type { MetadataRoute } from "next";
import { site } from "@/lib/data";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/_next/static/chunks/"],
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
