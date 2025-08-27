import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['res.cloudinary.com'] // Forma antigua de hacerlo
  //remotePatters: {                // Forma nueva
  //  {
  //    protocol: 'https',
  //    hostname: 'res.cloudinary.com'
  //  }
  //}
  }
};

export default nextConfig;
