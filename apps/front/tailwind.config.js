module.exports = {
  purge: {
    content: ['./src/**/*.ts', './src/**/*.tsx'],
    options: {
      safelist: [/^text-/, /^bg-/],
    },
  },
  darkMode: false,
  variants: {
    extend: {
      backgroundColor: ['active'],
      borderColor: ['active'],
      borderWidth: ['first'],
    },
  },
  plugins: [],
};
