import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx,css}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {},
      colors: {
        primary: "#EF5F43",
        "primary-light": "#FBDBD4",
        "primary-text": "#333",
        "secondary-text": "#7b7b7b",
        "extra-light-text": "#AFAFAF",
        year: "#3eae8d",
        degree: "#ffa100",
        campus: "#ff7979",
        silver: "#999",
        link: "#13a2e4",
        success: "#3eae8d",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      fontSize: {
        xxs: "0.7rem",
      },
      animation: {
        "infinite-unlimited": "infinite-scroll 25s linear infinite",
        "infinite-scroll": "infinite-scroll 25s linear infinite",
      },
      keyframes: {
        "infinite-unlimited": {
          "0%": { transform: "translateX(-10%)" }, // Move from left to right
          "50%": { transform: "translateX(10%)" }, // Move from right to left
          "100%": { transform: "translateX(-10%)" }, // Move from left to right again
        },

        "infinite-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
