import Task, { TaskModel } from "@/models/Task";
import { connectDB } from "@/utils/mongoose";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/User";

export async function GET(request: NextRequest, response: any) {
    try {
        connectDB();

        const authorizationHeader = request.headers.get('Authorization');

        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
            return NextResponse.json('Unauthorized', { status: 400 });
        }

        const token = authorizationHeader.split(' ')[1];
        const decodedToken: any = jwt.verify(token, process.env.NEXTAUTH_SECRET || '');
        const userId = decodedToken.userId
        const user = await User.findById(userId);

        if (!user) {
            return NextResponse.json('User not found', { status: 400 });
        }

        const tasks = await Task.find({ createdBy: userId });
        return NextResponse.json(tasks);
    } catch (error) {
        return NextResponse.json('Invalid token', { status: 400 });
    }
}
export async function POST(request: NextRequest, response: any) {
    try {
        connectDB();

        const authorizationHeader = request.headers.get('Authorization');

        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
            return NextResponse.json('Unauthorized', { status: 400 });
        }

        const token = authorizationHeader.split(' ')[1];
        const decodedToken: any = jwt.verify(token, process.env.NEXTAUTH_SECRET || '');
        const userId = decodedToken.userId

        const data: any = await request.json();
        const newTask = new Task({ ...data, createdBy: userId });
        const savedTask: TaskModel = await newTask.save();

        return NextResponse.json(savedTask);
    } catch (error: any) {
        return NextResponse.json(error.message, { status: 400 });
    }
}
