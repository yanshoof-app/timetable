const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['"Assistant"', ...fontFamily.sans], // make assistant the default font
    },
    extend: {
      boxShadow: {
        theme: '4px 4px 0 0',
      },
    },
  },
  plugins: [],
}
