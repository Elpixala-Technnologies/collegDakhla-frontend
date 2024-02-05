module.exports = {
	images: {
		remotePatterns: [
			//remove when going live
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '1337',
				pathname: '/uploads/**',
			},
			{
				protocol: 'https',
				hostname: 'college-dakhla-backend-qtpvh.ondigitalocean.app',
				port: '',
				pathname: '/uploads/**',
			},
		],
	},
}