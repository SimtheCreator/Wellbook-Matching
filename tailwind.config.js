/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wellnista: {
          bg: '#fdfbf7', // Ivory/Cream
          card: '#ffffff',
          border: '#e8e5df',
          olive: '#6b7b5c', // Main brand green
          oliveDark: '#4f5b44',
          sage: '#8ba382',
          sageLight: '#eef2eb',
          sand: '#c4b5a2',
          textDark: '#2c3329',
          textMuted: '#6b7280',
          gold: '#d4af37'
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(212, 175, 55, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.6)' }
        }
      }
    },
  },
  plugins: [],
}
