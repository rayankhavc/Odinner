import Image from "next/image";
import { photos, site } from "@/lib/data";

/**
 * Signature de marque : l'emblème réel de l'enseigne + le nom composé.
 * Le badge du logo est très détaillé : sous ~36 px il devient illisible,
 * on ne l'affiche donc qu'à partir de la taille "md".
 */
export default function Wordmark({
  size = "md",
  tone = "dark",
  className = "",
}: {
  size?: "sm" | "md" | "lg";
  tone?: "dark" | "light";
  className?: string;
}) {
  const mark = { sm: 0, md: 36, lg: 52 }[size];
  const text = {
    sm: "text-[1.35rem]",
    md: "text-[1.6rem]",
    lg: "text-[2.1rem]",
  }[size];

  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      {mark > 0 ? (
        <span
          className="relative shrink-0"
          style={{ width: mark, height: mark }}
        >
          <Image
            src={photos.logo}
            alt=""
            fill
            sizes={`${mark}px`}
            className="object-contain"
          />
        </span>
      ) : null}
      <span
        className={`font-display font-extrabold leading-none tracking-tightest ${text} ${
          tone === "dark" ? "text-bone" : "text-ink"
        }`}
      >
        O<span className="text-brand">&apos;</span>dinner
      </span>
      <span className="sr-only">{site.tagline}</span>
    </span>
  );
}
