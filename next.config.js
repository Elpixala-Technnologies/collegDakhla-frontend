module.exports = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "collegedakhla-backend.onrender.com",
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
