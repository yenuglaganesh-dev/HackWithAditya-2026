/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "background": "#f5faf7",
        "surface": "#ffffff",
        "surface-dim": "#ebf5ee",
        "surface-container": "#dcf0e4",
        "surface-container-low": "#f0f8f3",
        "surface-container-highest": "#c8e8d4",
        "primary": "#059669",
        "primary-dark": "#047857",
        "primary-light": "#10b981",
        "primary-container": "#ecfdf5",
        "secondary": "#0d9488",
        "secondary-container": "#f0fdfa",
        "tertiary": "#15803d",
        "tertiary-container": "#dcfce7",
        "on-surface": "#062c1e",
        "on-surface-variant": "#2d4a3e",
        "outline": "#bbf7d0",
        "outline-variant": "#d1fae5"
      },
      fontFamily: {
        "display": ["Plus Jakarta Sans", "sans-serif"],
        "headline": ["Plus Jakarta Sans", "sans-serif"],
        "body": ["Inter", "sans-serif"],
        "mono": ["JetBrains Mono", "monospace"]
      },
      boxShadow: {
        "soft": "0 2px 10px -2px rgba(6, 44, 30, 0.05), 0 1px 3px -1px rgba(6, 44, 30, 0.03)",
        "elevated": "0 10px 30px -4px rgba(5, 150, 105, 0.1), 0 4px 12px -2px rgba(6, 44, 30, 0.04)",
        "glow-emerald": "0 0 30px -4px rgba(16, 185, 129, 0.3)",
        "glow-mint": "0 0 25px -3px rgba(52, 211, 153, 0.25)"
      }
    },
  },
  plugins: [],
}
