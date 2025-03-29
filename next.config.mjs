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
            },
            {
            hostname:"localhost"
            }

        ]

    }
};

export default nextConfig;
