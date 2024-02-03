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
		},
	},
	plugins: [],
};
export default config;
