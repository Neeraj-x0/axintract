/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'res.cloudinary.com',
            },
            {
                hostname: "cdn.builder.io"
            },
            { 
            hostname: "api.axintract.com" 
            }
        ]

    }
};

export default nextConfig;
