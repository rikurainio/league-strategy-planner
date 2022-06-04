module.exports = {
  darkMode: 'class',
  content: [],
  theme: {
    typography: (theme) => ({}),
    extend: {
      colors: {
        'sgray': '#111317',
      },
      spacing: {
        '128': '32rem',
      },
      contrast: {
        25: '.25',
        105: '1.05',
      },
      brightness: {
        110: '1.1',
      }
    },
  },
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  plugins: [require('@tailwindcss/typography')],
}
