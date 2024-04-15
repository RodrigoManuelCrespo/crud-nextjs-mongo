import { error } from "console";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "email" },
                password: { label: "Password", type: "password", placeholder: "*****" },
                username: { label: "Username", placeholder: "username" },
            },
            async authorize(credentials, req) {
                const url = process.env.NEXT_PUBLIC_API_URL
                const response = await fetch(`${url}auth/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: credentials?.username,
                        email: credentials?.email,
                        password: credentials?.password
                    }),
                });
                const user = await response.json()

                if (user.message == "User not found") {
                    throw error
                };

                return user
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
        async session({ session, token }) {
            session.user = token as any;
            return session;
        },
    },
    pages: {
        signIn: '/auth/login',
        newUser: '/auth/signup',
    }
})

export { handler as GET, handler as POST }