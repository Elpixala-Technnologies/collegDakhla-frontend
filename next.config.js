module.exports = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "college-dakhla-backend-qtpvh.ondigitalocean.app",
				port: "",
				pathname: "/uploads/**",
			},
			{
				protocol: "https",
				hostname: "images.collegedunia.com",
				port: "",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "images.shiksha.com",
				port: "",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "college-dakhla.blr1.cdn.digitaloceanspaces.com",
				port: "",
				pathname: "/**",
			}
		],
	},
};
