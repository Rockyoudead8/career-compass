/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['randomuser.me', 'images.unsplash.com'],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
