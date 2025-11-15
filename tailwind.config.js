/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: '#090b1a',
        surface: 'rgba(16, 18, 40, 0.8)',
        neon: '#6c4bff',
        accent: '#00f5ff',
      },
      boxShadow: {
        glow: '0 0 25px rgba(0, 255, 234, 0.4)',
      },
    },
  },
  plugins: [],
};
