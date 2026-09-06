import { reviews, site } from "@/lib/data";
import { StarIcon, ArrowIcon } from "@/components/icons";
import { Reveal, StaggerList, RevealListItem } from "@/components/motion/Reveal";

function Stars({ n = 5, className = "h-3.5 w-3.5" }: { n?: number; className?: string }) {
  return (
    <span className="flex items-center gap-0.5 text-brand" aria-hidden="true">
      {Array.from({ length: n }).map((_, i) => (
        <StarIcon key={i} className={className} />
      ))}
    </span>
  );
}

export default function Reviews() {
  return (
    <section id="avis" className="on-paper bg-paper py-20 text-ink sm:py-24">
      <div className="wrap">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div className="max-w-xl">
              <p className="eyebrow text-brand-ink">Les avis</p>
              <h2 className="h2 mt-5 text-balance">
                Ce qu&apos;en disent nos clients.
              </h2>
            </div>
            <a
              href={site.googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[0.9375rem] font-medium text-ink/70 transition-colors hover:text-brand-ink"
            >
              Tout lire sur Google
              <ArrowIcon className="h-4 w-4" />
            </a>
          </div>
        </Reveal>

        <StaggerList className="mt-12 grid gap-4 md:grid-cols-3" gap={0.1}>
          {reviews.map((r) => (
            <RevealListItem
              key={r.author}
              className="flex flex-col rounded-2xl bg-white p-7 shadow-card"
            >
              <Stars n={r.rating} />
              <blockquote className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-ink/75">
                « {r.text} »
              </blockquote>
              <figcaption className="mt-6 border-t border-paper-line pt-4">
                <span className="block text-[0.9375rem] font-semibold">{r.author}</span>
                <span className="block text-[0.8125rem] text-ink/40">
                  Avis Google · {r.dateLabel}
                </span>
              </figcaption>
            </RevealListItem>
          ))}
        </StaggerList>

        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={site.writeReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-light"
            >
              Laisser un avis
            </a>
            <p className="text-[0.8125rem] text-ink/40">
              Avis publiés sur notre fiche Google, repris tels quels.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
