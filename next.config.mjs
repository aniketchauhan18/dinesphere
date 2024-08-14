/** @type {import('next').NextConfig} */
const nextConfig = {
  // permission for using domain assets
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "", // Optional, leave empty for default
        pathname: "/**", // Allows all paths
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    urlImports: [
      "https://checkout.razorpay.com/v1/",
      "https://api.razorpay.com/v2/",
    ],
  },
};

export default nextConfig;
