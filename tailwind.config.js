/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'axiom-bg': '#24273a',    // Catppuccin Macchiato Base
        'axiom-accent': '#b7bdf8', // Lavender highlight
      },
    },
  },
  plugins: [],
}
