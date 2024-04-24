/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                // coincidir con todas las rutas de la API
                source: "/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "https://www.mokuteki.pro" }, // reemplaza esto con tu origen real
                    { key: "Access-Control-Allow-Methods", value: "GET, DELETE, PATCH, POST, PUT" },
                    { key: "Access-Control-Allow-Headers", value: "authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                ]
            }
        ]
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/home',
                permanent: true,
            },
        ]
    },
};

export default nextConfig;
