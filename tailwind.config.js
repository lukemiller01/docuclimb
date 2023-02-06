/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'brand-green': '#058c42',
      'brand-green-tint': '#047035',
      'grey': '#9A9A9A',
      'light-grey': '#f0f0f0',

      'white': '#ffffff',
      'black': '#000000',

      'climb-red': '#ff0000',
      'climb-orange': '#ffa500',
      'climb-yellow': '#ffff00',
      'climb-green': '#008000',
      'climb-blue': '#0000ff',
      'climb-purple': '#4b0082',
      'climb-pink': '#ee82ee',
    },
    extend: {
      opacity: {
        '25': '.25',
      }
    }
  },
}


