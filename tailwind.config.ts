import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Rouge exact releve sur le logo de l'enseigne (#F40000) : c'est la
        // seule couleur de marque. Le reste est une echelle neutre chaude,
        // pensee pour alterner surfaces sombres et surfaces "papier".
        brand: {
          DEFAULT: "#F40000",
          bright: "#FF2A1F",
          // variante assombrie, seule a passer le contraste AA sur le papier
          ink: "#C20D10",
          // fond des boutons et pastilles a texte blanc : le rouge du logo ne
          // donne que 4,3:1 avec du blanc, celui-ci passe l'AA (5,3:1)
          solid: "#DA0000",
          // petits textes rouges sur fond sombre (sur-titres) : plus clair
          // pour rester lisible meme devant les halos rouges du fond
          light: "#FF4D40",
          hover: "#C40000",
        },
        ink: "#0B0B0D",
        char: {
          DEFAULT: "#131418",
          soft: "#191B20",
          line: "#282A31",
        },
        paper: {
          DEFAULT: "#F7F3EC",
          soft: "#EFE9DE",
          line: "#DED5C6",
        },
        bone: "#F5F3F0",
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
      boxShadow: {
        lift: "0 24px 60px -28px rgba(0,0,0,0.65)",
        card: "0 2px 0 0 rgba(0,0,0,0.04), 0 18px 40px -30px rgba(0,0,0,0.35)",
      },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        rise: {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        pulseDot: {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: "0.35" },
        },
        // Derive tres lente des halos de fond : uniquement des transforms,
        // pour rester sur le compositeur et ne rien repeindre.
        driftA: {
          "0%,100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(-4%,3%,0) scale(1.08)" },
        },
        driftB: {
          "0%,100%": { transform: "translate3d(0,0,0) scale(1.06)" },
          "50%": { transform: "translate3d(5%,-3%,0) scale(1)" },
        },
        settle: {
          from: { transform: "scale(0.95)" },
          to: { transform: "scale(1)" },
        },
        nudge: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(5px)" },
        },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        rise: "rise 0.6s cubic-bezier(0.16,1,0.3,1) both",
        pulseDot: "pulseDot 2s ease-in-out infinite",
        driftA: "driftA 26s ease-in-out infinite",
        driftB: "driftB 32s ease-in-out infinite",
        nudge: "nudge 2.4s ease-in-out infinite",
        settle: "settle 0.9s cubic-bezier(0.16,1,0.3,1) both",
      },
    },
  },
  plugins: [],
};

export default config;
