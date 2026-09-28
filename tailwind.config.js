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
          // Refined Industrial Crimson (Sophisticated, authoritative B2B red)
          red: "#B91C1C",
          "red-dark": "#991B1B",
          "red-light": "#FEF2F2",
          "red-muted": "#DC2626",
          
          // Deep Slate Navy & Charcoal (Corporate, matches official Trinex logo)
          navy: "#0F172A",
          "navy-dark": "#0B1120",
          "navy-light": "#1E293B",
          black: "#0F172A",
          dark: "#0F172A",
          
          // Typography & Grayscale
          gray: "#334155",
          "gray-muted": "#64748B",
          "light-gray": "#F8FAFC",
          surface: "#F1F5F9",
          border: "#E2E8F0",
          "border-dark": "#CBD5E1",
          
          // Warm Gold / Amber Accent (from Trinex official emblem)
          gold: "#C8922E",
          "gold-light": "#F59E0B",
          "gold-dark": "#92400E",
          
          // Polished Business WhatsApp Green
          whatsapp: "#128C7E",
          "whatsapp-hover": "#075E54",
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['Montserrat', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(15, 23, 42, 0.05), 0 1px 2px rgba(15, 23, 42, 0.06)',
        'card': '0 4px 16px -2px rgba(15, 23, 42, 0.06), 0 2px 6px -2px rgba(15, 23, 42, 0.04)',
        'card-hover': '0 12px 28px -4px rgba(15, 23, 42, 0.1), 0 4px 12px -2px rgba(15, 23, 42, 0.06)',
        'red-glow': '0 4px 16px rgba(185, 28, 28, 0.25)',
      },
    },
  },
  plugins: [],
}
