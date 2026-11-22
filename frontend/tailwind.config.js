/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0a0f1d',
          800: '#0f172a',
          700: '#1e293b',
          600: '#334155'
        },
        bharat: {
          orange: '#FF9933',
          saffron: '#FF6F00',
          green: '#138808',
          blue: '#000080',
          violet: '#8B5CF6'
        }
      }
    },
  },
  plugins: [],
}
