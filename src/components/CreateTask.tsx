'use client'

import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";
import { getTasks, postTask } from "@/services/tasksService";
import { TaskModel } from "@/models/Task";
import { setTasks } from "@/store/slice";
import { useAppDispatch } from "@/store/hook";
import TaskModal from "./TaskModal";


export default function CreateTask() {
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
        </>
    );
}
