/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/renovate-pro",
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "niladityasen.me",
        pathname: "/**",
      },
    ],
  },
  rewrites: async () => {
    return [
      {
        source: "/vr/:path*",
        destination: "/html/:path*",
      },
    ];
  },
};

export default nextConfig;
