import Task from "@/models/Task";
import { connectDB } from "@/utils/mongoose";
import { NextResponse } from "next/server";

export async function GET(request: any, response: any) {
    try {
        connectDB()
        const taskFound = await Task.findById(response.params.id)

        if (!taskFound) return NextResponse.json({
            message: `Task not found ${response.params.id}...`
        }, { status: 404 })

        return NextResponse.json({
            message: `Obteniendo tareas ${response.params.id}...`
        })
    } catch (error: any) {
        return NextResponse.json({
            message: `${error.message}`
        }, { status: 400 })
    }
}

export async function PUT(request: any, response: any) {
    connectDB()
    const body = await request.json();

    try {
        const taskUpdated = await Task.findByIdAndUpdate(response.params.id, body, {
            new: true,
        });

        if (!taskUpdated)
            return NextResponse.json(
                {
                    message: "Task not found",
                },
                {
                    status: 404,
                }
            );

        return NextResponse.json(taskUpdated);
    } catch (error: any) {
        return NextResponse.json(error.message, {
            status: 400,
        });
    }
}

export async function DELETE(request: any, response: any) {
    connectDB()

    try {
        const taskDeleted = await Task.findByIdAndDelete(response.params.id);

        if (!taskDeleted)
            return NextResponse.json(
                {
                    message: "Task not found",
                },
                {
                    status: 404,
                }
            );

        return NextResponse.json(taskDeleted);
    } catch (error: any) {
        return NextResponse.json(error.message, {
            status: 400,
        });
    }
}