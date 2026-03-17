/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#00a1fc',
        secondary: '#00204A',
        cyan: {
          400: '#33b4fd',
          500: '#00a1fc',
          600: '#0090e0',
        },
        slate: {
          800: '#002a5e',
          900: '#00204A',
          950: '#001530',
        },
      },
    },
  },
  plugins: [],
};
