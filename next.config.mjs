/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains: ['lh3.googleusercontent.com']
    },
    experimental:{
        serverComponentsExternalPackages:['cloudinary','graphql-request']
    }
};

export default nextConfig;
