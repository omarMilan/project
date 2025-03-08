/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        CustomYellow: '#FFD700',
        CustomBlack: '#121212',
        CustomYellowShadeOne: '#FFD700',
        CustomYellowShadeTwo: '#C39B00',
        CustomRed: '#FF7373',
      },
    },
  },
  plugins: [],
};
