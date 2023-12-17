/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "dark-purple":"#072a4d",
        'light-white': 'rgba(255,255,255,0.18)',
        customBlue: '#0b2239ff',
        customGreen: '#24945e',
        customLightGreen: '#8be68b',
        customLighGreen:"#9bd4b8",
        customWatsapp: '#d9fdd3ff',
        customBlue1: '#3366cc',   
      }
    },
  },
  plugins: [],
}

