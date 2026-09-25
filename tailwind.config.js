/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        trinex: {
          dark: "#07131C",
          navy: "#0D1B24",
          slate: "#152430",
          card: "#11222E",
          gold: "#C8922E",
          "gold-light": "#E5B84B",
          "gold-dark": "#A87620",
          "gold-hover": "#D99D36",
          silver: "#B8BEC5",
          gray: "#F3F4F6",
          "light-bg": "#FAFAFC",
        },
      },
      fontFamily: {
        sans: ['Inter', 'Montserrat', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 20px rgba(200, 146, 46, 0.25)',
        'premium': '0 10px 30px -5px rgba(7, 19, 28, 0.15)',
        'card-dark': '0 8px 25px rgba(0, 0, 0, 0.4)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #E5B84B 0%, #C8922E 100%)',
        'gold-metallic': 'linear-gradient(135deg, #F0CA65 0%, #C8922E 50%, #9B6E1C 100%)',
        'navy-gradient': 'linear-gradient(180deg, #07131C 0%, #0D1B24 100%)',
        'navy-radial': 'radial-gradient(circle at top right, #152A38 0%, #07131C 70%)',
      }
    },
  },
  plugins: [],
}
