/** @type {import('tailwindcss').Config} */
module.exports = {
  // Enable class-based dark mode
  darkMode: 'class',
  // Specify where Tailwind should look for class usage
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}