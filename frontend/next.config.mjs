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
        ],
    },
    rewrites: async () => {
        return [
            {
                source: '/vr/:path*',
                destination: '/html/:path*',
            },
        ];
    },
};

export default nextConfig;
