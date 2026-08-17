/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#050814',
          900: '#0a0e27',
          800: '#0f1535',
          700: '#161d4a',
        },
        electric: {
          400: '#4d9fff',
          500: '#2f7fff',
          600: '#1a5cff',
        },
        cyan: {
          300: '#7ff5ff',
          400: '#3ee8f5',
          500: '#00d4e8',
        },
        purple: {
          400: '#a78bfa',
          500: '#8b5cf6',
        },
        emerald: {
          400: '#34e2a8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Clash Display"', 'Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'aurora': 'aurora 15s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 0.4, filter: 'blur(40px)' },
          '50%': { opacity: 0.8, filter: 'blur(60px)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        aurora: {
          '0%, 100%': { transform: 'translate(0,0) rotate(0deg)' },
          '33%': { transform: 'translate(30px,-30px) rotate(5deg)' },
          '66%': { transform: 'translate(-20px,20px) rotate(-5deg)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};