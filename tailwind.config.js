/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        CustomYellow: '#F2FFAA',
        CustomGray: '#A2ABCE',
        CustomGrayShadeOne: '#848DB0',
        CustomGrayShadeTwo: '#666F92',
        CustomGrayShadeThree: '#485174',
        CustomRed: '#FF7373',
      },
    },
  },
  plugins: [],
};
