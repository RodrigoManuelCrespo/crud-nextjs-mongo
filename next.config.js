const nextConfig = {
    async headers() {
        return [
            {
                source: "/api/tasks",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "https://crud-nextjs-mongo-gm7rfe9gd-rodrigos-projects-0d6b391d.vercel.app/" }, // Replace with actual origin
                    { key: "Access-Control-Allow-Methods", value: "GET, POST" },
                    { key: "Access-Control-Allow-Headers", value: "Content-Type" },
                ]
            },
            {
                source: "/api/weather",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "https://crud-nextjs-mongo-gm7rfe9gd-rodrigos-projects-0d6b391d.vercel.app/" }, // Replace with actual origin
                    { key: "Access-Control-Allow-Methods", value: "GET" },
                    { key: "Access-Control-Allow-Headers", value: "Content-Type" },
                ]
            }
        ];
    }
};

module.exports = nextConfig;
