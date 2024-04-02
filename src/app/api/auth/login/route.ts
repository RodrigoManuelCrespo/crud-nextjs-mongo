import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "@/models/User";
import { connectDB } from "@/utils/mongoose";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
    try {
        await connectDB();
        const { email, password } = await request.json();
        const user = await User.findOne({ email }).select('+password');;

        if (!user) {
            return NextResponse.json(
                {
                    message: "User not found",
                },
                {
                    status: 404,
                }
            );
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return NextResponse.json(
                {
                    message: "Invalid password",
                },
                {
                    status: 401,
                }
            );
        }

        const env = process.env.NEXTAUTH_SECRET || '';
        const token = jwt.sign({ userId: user._id }, env);

        return NextResponse.json(
            {
                token,
                username: user.username,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.error();
    }
}
