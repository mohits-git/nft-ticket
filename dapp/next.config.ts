import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/*/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'amaranth-eldest-moose-420.mypinata.cloud',
        port: '',
        pathname: '/*/**',
        search: '',
      }
    ],
    domains: ['img.clerk.com']
  },
};

export default nextConfig;
