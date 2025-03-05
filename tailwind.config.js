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
        playfair: ["var(--font-playfair)", "cursive"],
        sacramento: ["var(--font-sacramento)", "cursive"],
      },
      colors: {
        secondary: "var(--secondary-colour)",
        third: "var(--third-colour)",
        primary: "var(--primary-colour)",
      },
    },
  },
};
