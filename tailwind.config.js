/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        beige: {
          50: '#F5F1EB',
          100: '#EDE8E0',
          200: '#E5E0D8',
          300: '#C4B5A0',
          400: '#8B7355',
          500: '#6B6B6B',
        },
        accent: {
          DEFAULT: '#8B7355',
          light: '#C4B5A0',
        },
      },
      letterSpacing: {
        widest: '0.3em',
      },
    },
  },
  plugins: [],
}