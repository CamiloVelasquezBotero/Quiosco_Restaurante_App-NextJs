import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
  //  domains: ['res.cloudinary.com'] // Forma antigua de hacerlo
  //}
    remotePatterns: [ // Le pasamos un array  de los que permitira
      {                // Forma nueva
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      }
    ]
  }
};

export default nextConfig;
