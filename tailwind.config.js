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
        monoton: ["var(--font-monoton)", "cursive"],
        emblema: ["var(--font-emblema)", "cursive"],
      },
      letterSpacing: {
        monoton: "0.2em", // Custom tracking class
      },
      colors: {
        secondary: "var(--secondary-colour)",
        third: "var(--third-colour)",
        primary: "var(--primary-colour)",
      },
      textColor: {
        black: "#000000",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        "text-shadow": "1px 1px 2px rgb(0, 0, 0)",
        "img-shadow": "rgba(0, 0, 0, 0.2) 0px 4px 8px 0px",
      },
      blur: {
        custom: "60px", // Custom blur size
      },
    },
    variants: {
      extend: {
        borderColor: ["focus"],
        outline: ["focus"],
        ringColor: ["focus"],
      },
    },
  },
};
