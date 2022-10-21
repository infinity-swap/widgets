/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");
const colors = require("./src/theme/colors");
const gradient = require("./src/theme/gradient");
const typography = require("./src/theme/typography");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors,
      backgroundImage: {
        ...gradient,
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      // Defines theme
      const newUtilities = {
        ...typography,
      };

      addUtilities(newUtilities);
    }),
  ],
};
