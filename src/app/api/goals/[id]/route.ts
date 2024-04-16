import Goal from "@/models/Goal";
import { connectDB } from "@/utils/mongoose";
import { NextResponse } from "next/server";

export async function GET(request: any, response: any) {
    try {
        connectDB()
        const goalFound = await Goal.findById(response.params.id)

        if (!goalFound) return NextResponse.json({
            message: `Goal not found ${response.params.id}...`
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
        const goalUpdated = await Goal.findByIdAndUpdate(response.params.id, body, {
            new: true,
        });

        if (!goalUpdated)
            return NextResponse.json(
                {
                    message: "Goal not found",
                },
                {
                    status: 404,
                }
            );

        return NextResponse.json(goalUpdated);
    } catch (error: any) {
        return NextResponse.json(error.message, {
            status: 400,
        });
    }
}

export async function DELETE(request: any, response: any) {
    connectDB()

    try {
        const goalDeleted = await Goal.findByIdAndDelete(response.params.id);

        if (!goalDeleted)
            return NextResponse.json(
                {
                    message: "Goal not found",
                },
                {
                    status: 404,
                }
            );

        return NextResponse.json(goalDeleted);
    } catch (error: any) {
        return NextResponse.json(error.message, {
            status: 400,
        });
    }
}