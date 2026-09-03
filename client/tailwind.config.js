/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef4fd',
          100: '#dbe8fa',
          200: '#b8d0f5',
          300: '#8ab0ec',
          400: '#4d82db',
          500: '#1f5fc4',
          600: '#004FA4', // primary buttons and headings
          700: '#0b3c8d',
          800: '#0a3272',
          900: '#082756',
        },
        ink: {
          DEFAULT: '#1c2b3a',
          muted: '#5b6b7f',
        },
        sell: '#d93025',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Arial', 'sans-serif'],
        display: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      maxWidth: { content: '1180px' },
      boxShadow: {
        card: '0 10px 30px -12px rgba(10, 50, 114, 0.18)',
        panel: '0 20px 45px -20px rgba(10, 50, 114, 0.35)',
      },
    },
  },
  plugins: [],
};