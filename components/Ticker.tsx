const ITEMS = [
  "Kebab",
  "Burger",
  "Tacos",
  "Panini",
  "Assiette",
  "Bowl",
  "Salade",
  "Pâtisseries orientales",
  "Halal",
  "Pain maison",
];

export default function Ticker() {
  const loop = [...ITEMS, ...ITEMS];
  return (
    <div className="select-none overflow-hidden bg-brand py-3">
      <div className="flex w-max animate-marquee" aria-hidden="true">
        {loop.map((item, i) => (
          <span
            key={i}
            className="flex items-center whitespace-nowrap font-display text-[0.9375rem] font-bold uppercase tracking-[0.12em] text-white"
          >
            {item}
            <span className="mx-5 text-white/45">/</span>
          </span>
        ))}
      </div>
      <p className="sr-only">
        Spécialités : {ITEMS.join(", ")}.
      </p>
    </div>
  );
}
