import User from "@/models/User";
import { connectDB } from "@/utils/mongoose";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

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
                await connectDB();
                const userFound = await User.findOne({
                    email: credentials?.email,
                }).select("+password");

                if (!userFound) throw new Error("Invalid credentials");

                const passwordMatch = await bcrypt.compare(
                    credentials!.password,
                    userFound.password
                );

                if (!passwordMatch) throw new Error("Invalid credentials");

                console.log(userFound);

                return userFound;
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) token.user = user;
            return token;
        },
        async session({ session, token }) {
            session.user = token.user as any;
            return session;
        },
    },
    pages: {
        signIn: '/auth/login',
        newUser: '/auth/signup',
    }
})

export { handler as GET, handler as POST }