/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        maya: {
          dark: '#1a1a2e',
          blue: '#0f3460',
          red: '#e94560',
          gold: '#f9a825',
          jade: '#16a085',
        }
      }
    },
  },
  plugins: [],
}
