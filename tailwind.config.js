/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        raleway: ["Raleway", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        primary: "#8C80F6",
        primaryDark: "#6E65C2",
        primaryDarker: "#4E4A8E",
        primaryLighter: "#CFCAF7",
        primaryLightest: "#DFDCF8",
        primaryDarkest: "#626075",
        DarkPrimary: "#1E1E1E",
        action: "#9747FF",
      },
    },
  },
  plugins: [],
};
