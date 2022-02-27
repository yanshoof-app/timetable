const { fontFamily } = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['"Assistant"', ...fontFamily.sans], // make assistant the default font
      hour: ['"roboto"'],
      _404: ['"M PLUS Rounded 1c"'],
    },
    extend: {
      boxShadow: {
        theme: '4px 4px 0 0',
        example: '2px 2px 0 0',
      },
      colors: {
        primary: colors.sky,
        gray: colors.gray,
        event: colors.rose,
        change: colors.amber,
        celebration: colors.lime,
        uiPrimary: colors.zinc,
      },
      keyframes: {
        toastin: {
          '0%': { bottom: '-3.5rem' },
          '50%': { bottom: '0rem' },
          '100%': { bottom: '1rem' },
        },
      },
    },
  },
  plugins: [],
}
