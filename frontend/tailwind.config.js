/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "background": "#faf8ff",
        "surface": "#ffffff",
        "surface-dim": "#f1f3fa",
        "surface-container": "#eaedff",
        "surface-container-low": "#f2f3ff",
        "surface-container-highest": "#dae2fd",
        "primary": "#1d4ed8",
        "primary-container": "#eff4ff",
        "secondary": "#ea580c",
        "secondary-container": "#fff7ed",
        "tertiary": "#059669",
        "tertiary-container": "#ecfdf5",
        "on-surface": "#0f172a",
        "on-surface-variant": "#475569",
        "outline": "#cbd5e1",
        "outline-variant": "#e2e8f0"
      },
      fontFamily: {
        "display": ["Plus Jakarta Sans", "sans-serif"],
        "headline": ["Plus Jakarta Sans", "sans-serif"],
        "body": ["Inter", "sans-serif"],
        "mono": ["JetBrains Mono", "monospace"]
      },
      boxShadow: {
        "soft": "0 2px 10px -2px rgba(15, 23, 42, 0.05), 0 1px 3px -1px rgba(15, 23, 42, 0.03)",
        "elevated": "0 10px 30px -4px rgba(29, 78, 216, 0.08), 0 4px 12px -2px rgba(15, 23, 42, 0.04)",
        "glow-blue": "0 0 25px -3px rgba(29, 78, 216, 0.2)",
        "glow-saffron": "0 0 25px -3px rgba(234, 88, 12, 0.2)"
      }
    },
  },
  plugins: [],
}
