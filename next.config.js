module.exports = {
  images: {
    domains: ["images.collegedunia.com", "images.shiksha.com"],
    remotePatterns: [
      //remove when going live
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "college-dakhla-backend-qtpvh.ondigitalocean.app",
        port: "",
        pathname: "/uploads/**",
      },
    ],
  },
};
