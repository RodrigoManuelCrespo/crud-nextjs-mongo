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

    const handlePostRequest = async ({ title, description }: TaskModel) => {
        await postTask({ title, description })
        const tasks = await getTasks();
        dispatch(setTasks(tasks));
        onClose()
    }

    return (
        <>
            <Button onPress={onOpen} className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg my-10" fullWidth={true}>
                Crear Tarea
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
