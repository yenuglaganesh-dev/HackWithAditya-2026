/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Premium White & Orange Design System
        brand: {
          orange: "#F58220",
          "orange-dark": "#E96B16",
          "orange-light": "#FFF3E8",
          charcoal: "#202124",
          grey: "#707070",
          "grey-light": "#F8F9FA",
          "grey-border": "#E8EAED",
        },
        background: "#FFFFFF",
        surface: "#FFFFFF",
        "surface-dim": "#F8F9FA",
        "surface-container": "#F1F3F4",
        primary: {
          DEFAULT: "#F58220",
          dark: "#E96B16",
          light: "#FFA04D",
          container: "#FFF3E8"
        },
        secondary: {
          DEFAULT: "#202124",
          container: "#F8F9FA"
        },
        "on-surface": "#202124",
        "on-surface-variant": "#707070",
        "outline": "#E8EAED",
        "outline-variant": "#F1F3F4"
      },
      fontFamily: {
        display: ["Plus Jakarta Sans", "Inter", "sans-serif"],
        headline: ["Plus Jakarta Sans", "Inter", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"]
      },
      boxShadow: {
        soft: "0 2px 10px -2px rgba(32, 33, 36, 0.05), 0 1px 3px -1px rgba(32, 33, 36, 0.03)",
        elevated: "0 10px 30px -4px rgba(245, 130, 32, 0.12), 0 4px 12px -2px rgba(32, 33, 36, 0.05)",
        card: "0 4px 20px -2px rgba(32, 33, 36, 0.06), 0 2px 6px -1px rgba(32, 33, 36, 0.04)",
        "card-hover": "0 12px 32px -4px rgba(245, 130, 32, 0.18), 0 4px 12px -2px rgba(32, 33, 36, 0.06)",
        orange: "0 8px 24px -4px rgba(245, 130, 32, 0.35)"
      }
    },
  },
  plugins: [],
}
