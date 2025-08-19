/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        nata: ['"Nata Sans"', "sans-serif"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
