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
        primary: "#042f1f",
        secondary: "#e8ebea",
        third: "#fbbf24",
        gradient: "#fbbf24",
      },
      backgroundImage: {
        "gradient-primary":
          "linear-gradient(to bottom, hsl(145,64%,9%,0.95), hsl(152,80%,12%,0.9))",
      },
    },
  },
};
