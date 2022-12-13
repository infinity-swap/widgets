/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

const typography = require("./src/theme/typography");

module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    // tailwindChildren,
    plugin(({ addUtilities }) => {
      // Defines theme
      const newUtilities = {
        ...typography,
      };

      addUtilities(newUtilities);
    }),
  ],
};
