/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        'subtle-pulse': {
          '0%, 100%': { 
            backgroundColor: 'var(--bg-card)',
            boxShadow: '0 0 30px rgba(0, 255, 255, 0.1)' 
          },
          '50%': { 
            backgroundColor: 'var(--bg-card-alt, var(--bg-card))',
            boxShadow: '0 0 50px rgba(0, 255, 255, 0.2)' 
          }
        },
        'border-pulse': {
          '0%, 100%': {
            boxShadow: '0 0 0 rgba(0, 255, 255, 0)',
          },
          '50%': {
            boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
          }
        },
        'spotlight-pulse': { // New keyframe for spotlight
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' } // Subtle scale change
        },
        'grid-move': { // New keyframe for grid animation
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '40px 40px' }
        },
        'pulse-slow': { // New keyframe for slow pulse
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' }
        }
      },
      animation: {
        'subtle-pulse': 'subtle-pulse 8s ease-in-out infinite',
        'border-pulse': 'border-pulse 4s ease-in-out infinite',
        'float-1': 'float-1 15s ease-in-out infinite',
        'float-2': 'float-2 12s ease-in-out infinite',
        'float-3': 'float-3 18s ease-in-out infinite',
        'spotlight-pulse': 'spotlight-pulse 2s ease-in-out infinite',
        'grid-move': 'grid-move 10s linear infinite', // New animation
        'pulse-slow': 'pulse-slow 3s ease-in-out infinite' // New animation
      }
    }
  },
  plugins: [],
}
// tailwind.config.js
module.exports = {
    // ... your existing config
    theme: {
      extend: {
        keyframes: {
          // ... your other keyframes
          "fade-in": {
            "0%": { opacity: "0", transform: "scale(0.95)" },
            "100%": { opacity: "1", transform: "scale(1)" },
          },
        },
        animation: {
          // ... your other animations
          "fade-in": "fade-in 0.2s ease-out forwards",
        },
      },
    },
    // ...
  };