/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3001',
                pathname: '/**',
            },
            {
                protocol: "https",
                hostname: "uat.renoswift.waysdatalabs.com",
                pathname: "/**"
            }
        ],
    },
};

export default nextConfig;
