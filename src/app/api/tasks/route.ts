import Task, { TaskModel } from "@/models/Task";
import { connectDB } from "@/utils/mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, response: any) {
    connectDB();
    const tasks: Array<TaskModel> = await Task.find();
    return NextResponse.json(tasks);
}

export async function POST(request: NextRequest, response: any) {
    try {
        connectDB();
        const data: any = await request.json();
        const newTask = new Task(data);
        const savedTask: TaskModel = await newTask.save();

        return NextResponse.json(savedTask);
    } catch (error: any) {
        return NextResponse.json(error.message, { status: 400 });
    }
}
