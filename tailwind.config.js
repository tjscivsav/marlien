/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `./src/pages/**/*.{js,jsx,ts,tsx}`,
    `./src/components/**/*.{js,jsx,ts,tsx}`,
  ],
  theme: {
    extend: {
      colors: {
        primary: "#009243",
        secondary: "#003192",
        secondaryDark: "#076194",
      },

      maxWidth: {
        container: 800,
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
