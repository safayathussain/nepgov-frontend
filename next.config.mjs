/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "i.ibb.co",
      "i.ibb.co.com",
      "localhost",
      "nepgov-backend-production.up.railway.app",
      "res.cloudinary.com"
    ],
  },
  transpilePackages: ["@mui/x-date-pickers"],
};

export default nextConfig;
