import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "@/models/User";
import { connectDB } from "@/utils/mongoose";

export async function POST(request: Request) {
    try {
        await connectDB();

        const { fullname, email, password } = await request.json();

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
            fullname,
            email,
            password: hashedPassword,
        });

        const savedUser = await user.save();
        console.log(savedUser);

        return NextResponse.json(
            {
                fullname,
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