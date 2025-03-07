/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
        raleway: ["var(--font-raleway)", "cursive"],
        sacramento: ["var(--font-sacramento)", "cursive"],
      },
      colors: {
        primary: "var(--primary-colour)",
        secondary: "var(--secondary-colour)",
        third: "var(--third-colour)",
      },
    },
  },
};
