import { faq } from "@/lib/data";

export default function Faq() {
  return (
    <section id="faq" className="on-paper bg-paper py-20 text-ink sm:py-24">
      <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="eyebrow text-brand-ink">Bon à savoir</p>
          <h2 className="h2 mt-5 text-balance">Questions fréquentes</h2>
        </div>

        <div className="divide-y divide-paper-line border-y border-paper-line">
          {faq.map((item) => (
            <details key={item.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-semibold marker:content-none">
                <span className="text-pretty">{item.question}</span>
                <span
                  aria-hidden="true"
                  className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ink/5 text-ink/50 transition-transform duration-200 group-open:rotate-45"
                >
                  <svg viewBox="0 0 12 12" className="h-2.5 w-2.5">
                    <path
                      d="M6 1v10M1 6h10"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-ink/60">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
