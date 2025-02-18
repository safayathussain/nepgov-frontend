/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ["i.ibb.co", "i.ibb.co.com", "localhost"], // Add the correct hostname
    },
    transpilePackages: ['@mui/x-date-pickers']

  };
  
  export default nextConfig;
  