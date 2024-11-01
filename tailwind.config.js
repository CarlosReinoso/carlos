/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        secondary: "var(--secondaryColour)",
        third: "var(--thirdColour)",
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
    },
    variants: {
      extend: {
        borderColor: ["focus"],
        outline: ["focus"],
        ringColor: ["focus"],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".text-shadow": {
          textShadow: "1px 1px 2px rgb(0, 0, 0)",
        },
        ".img-shadow": {
          boxShadow: "rgba(0, 0, 0, 0.2) 0px 4px 8px 0px",
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
