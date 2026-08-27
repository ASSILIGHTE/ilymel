/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cute: {
          soft: '#FFE4EC',
          baby: '#FFC8D8',
          blush: '#FF9FBA',
          rose: '#FF6F91',
          deep: '#E04870',
          white: '#FFFFFF',
          cream: '#FFF9FB',
          card: '#FFF0F5',
        },
        night: {
          bg: '#0F0C1B',
          card: '#1D1730',
          purple: '#2E2248',
          accent: '#FFB3C6',
          soft: '#A799B7'
        }
      },
      fontFamily: {
        script: ['"Dancing Script"', '"Pacifico"', 'sans-serif'],
        body: ['"Quicksand"', '"Nunito"', 'sans-serif'],
        handwritten: ['"Quicksand"', '"Nunito"', 'sans-serif'],
      },
      boxShadow: {
        'cute': '0 10px 25px -5px rgba(255, 111, 145, 0.25), 0 8px 10px -6px rgba(255, 111, 145, 0.15)',
        'cute-lg': '0 20px 35px -10px rgba(255, 111, 145, 0.35), 0 10px 15px -8px rgba(255, 111, 145, 0.2)',
        'glow': '0 0 20px rgba(255, 111, 145, 0.6)',
        'night-glow': '0 0 20px rgba(255, 179, 198, 0.4)',
        'glass': '0 8px 32px 0 rgba(255, 111, 145, 0.15)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-medium': 'float 4s ease-in-out infinite',
        'float-fast': 'float 2.5s ease-in-out infinite',
        'pulse-gentle': 'pulseGentle 3s ease-in-out infinite',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        'swing': 'swing 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(3deg)' },
        },
        pulseGentle: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.9' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        swing: {
          '0%, 100%': { transform: 'rotate(-5deg)' },
          '50%': { transform: 'rotate(5deg)' },
        }
      }
    },
  },
  plugins: [],
}
