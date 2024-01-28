import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
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
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      fontSize: {
        xxs: "0.7rem",
      },
    },
  },
  plugins: [],
};
export default config;
