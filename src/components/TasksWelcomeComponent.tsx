'use client'

import React from "react";
import { Card, Button, useDisclosure } from "@nextui-org/react";
import { getTasks, postTask } from "@/services/tasksService";
import { TaskModel } from "@/models/Task";
import { setTasks } from "@/store/slice";
import { useAppDispatch } from "@/store/hook";
import TaskModal from "./TaskModal";

export default function TasksWelcomeComponent() {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const dispatch = useAppDispatch();

    const handlePostRequest = async ({ title, description, priority }: TaskModel) => {
        await postTask({ title, description, priority })
        const tasks = await getTasks();
        dispatch(setTasks(tasks));
        onClose()
    }

    return (
        <>
            <Card className="rounded-t-none rounded-b-3xl	p-5 bg-zinc-800 mb-4">
                <h1 className="font-bold text-xl mb-2">Tareas</h1>
                <h1 className="text-l mb-8"> Organiza tu día con eficacia, empecemos a trabajar en tus tareas.</h1>
                <Button className="bg-gradient-to-tr from-purple-500 to-blue-500 text-white shadow-lg" onPress={onOpen}>
                    <p className="font-semibold">Agregar Tarea</p>
                </Button>
                <TaskModal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    handlePostRequest={handlePostRequest}
                    titleModal="Crear Tarea"
                    type="create"
                />
            </Card>
        </>
    );
}
