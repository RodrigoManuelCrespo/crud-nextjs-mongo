import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "@/models/User";
import { connectDB } from "@/utils/mongoose";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
    try {
        await connectDB();

        const { username, email, password } = await request.json();

        const userFound = await User.findOne({ email });

        if (userFound)
            return NextResponse.json(
                {
                    message: "Email already exists",
                },
                {
                    status: 409,
                }
            );

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User({
            username,
            email,
            password: hashedPassword,
        });

        const savedUser = await user.save();
        const env = process.env.NEXTAUTH_SECRET || ''
        const token = jwt.sign({ userId: savedUser._id }, env);

        return NextResponse.json(
            {
                token,
                username,
                email,
                createdAt: savedUser.createdAt,
                updatedAt: savedUser.updatedAt,
            },
            { status: 201 }
        );
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return NextResponse.json(
                {
                    message: error.message,
                },
                {
                    status: 400,
                }
            );
        }
        return NextResponse.error();
    }
}