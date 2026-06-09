/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: '#c9a84c',
          dark: '#1a0a00',
          darker: '#0d0500',
          light: '#f5e6c8',
          red: '#8b1a1a',
          green: '#1a4a1a',
        },
        auction: {
          live: '#ff4444',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Times New Roman', 'serif'],
      },
    },
  },
  plugins: [],
};
