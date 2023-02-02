/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'green': '#058c42',
      'green-tint': '#047035',
      'white': '#ffffff',
      'black': '#000000',
      'grey': '#9A9A9A',
    },
    extend: {
      opacity: {
        '25': '.25',
      }
    }
  },
}


