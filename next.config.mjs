/** @type {import('next').NextConfig} */
const nextConfig = {
  // permission for using domain assets
  images: {
    domains: ["images.pexels.com", "img.clerk.com"],
  },
  experimental: {
    urlImports: [
      "https://checkout.razorpay.com/v1/",
      "https://api.razorpay.com/v2/",
    ],
  },
};

export default nextConfig;
