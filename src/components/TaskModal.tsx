'use client'

import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, } from "@nextui-org/react";
import { TaskModel } from "@/models/Task";
import { Select, SelectItem } from "@nextui-org/react";

interface Props {
    isOpen: boolean | undefined;
    onOpenChange: () => void;
    handlePostRequest: (task: TaskModel) => void;
    task?: TaskModel;
    titleModal: string;
    type: 'create' | 'update'
}

const priorityData: Array<string> = ["Alta", "Media", "Baja",]

export default function TaskModal({ isOpen, onOpenChange, handlePostRequest, task, titleModal, type }: Props) {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [priority, setPriority] = useState<string>('');

    useEffect(() => {
        if (task && isOpen) {
            setTitle(task.title);
            setDescription(task.description);
            setPriority(task.priority);
        }

        if (!isOpen) {
            setTitle('');
            setDescription('');
            setPriority('')
        }
    }, [task, isOpen]);

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            backdrop="blur"
            className="mb-[85px]"
        >
            <ModalContent>
                {() => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">{titleModal}</ModalHeader>
                        <ModalBody>
                            <Input
                                autoFocus
                                label="Titulo"
                                placeholder="Ingresar titulo"
                                variant="bordered"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <Input
                                autoFocus
                                label="Descripcion"
                                placeholder="Ingresar descripcion"
                                variant="bordered"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <Select
                                label="Prioridad"
                                variant="bordered"
                                fullWidth={true}
                                value={priority}
                                onChange={(e) => {
                                    console.log(e);
                                    setPriority(e.target.value)
                                }}
                            >
                                {priorityData.map((item: string) => (
                                    <SelectItem key={item} value={item}>
                                        {item}
                                    </SelectItem>
                                ))}
                            </Select>
                        </ModalBody>
                        <ModalFooter>
                            {type == 'create' && <Button color="primary" fullWidth={true} onPress={() => handlePostRequest({ title, description, priority })}>
                                Agregar
                            </Button>}
                            {type == 'update' && <Button color="primary" fullWidth={true} onPress={() => handlePostRequest({ title, description, priority, _id: task?._id })}>
                                Editar
                            </Button>}
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
