const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  mode: 'jit',
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',

          /* Firefox */
          'scrollbar-width': 'none',

          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        },
        '.tooltip .tooltip-text': {
          'visibility': 'hidden',
          'text-align': 'center',
          'padding': '2px 6px',
          'position': 'absolute',
          'z-index': 100,
        },
        '.tooltip:hover .tooltip-text': {
          'visibility': 'visible',
        }
      }
      )
    })
  ],
}
