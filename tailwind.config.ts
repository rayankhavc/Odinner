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
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        rise: "rise 0.6s cubic-bezier(0.16,1,0.3,1) both",
        pulseDot: "pulseDot 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
