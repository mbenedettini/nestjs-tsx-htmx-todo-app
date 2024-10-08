/** @type {import('tailwindcss').Config} */
/* eslint-disable import/no-extraneous-dependencies */
const defaultTheme = require("tailwindcss/defaultTheme");
const forms = require("@tailwindcss/forms");

module.exports = {
  content: ["./src/views/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["InterVariable", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        admin: {
          200: "#bfdbfe", // This is the indigo-200 color
          600: "#2563eb", // This is the indigo-600 color
          700: "#1d4ed8", // This is the indigo-700 color
        },
      },
      zIndex: {
        100: "100",
      },
    },
  },
  plugins: [forms],
};
