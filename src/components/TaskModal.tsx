'use client'

import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, } from "@nextui-org/react";
import { TaskModel } from "@/models/Task";

interface Props {
    isOpen: boolean | undefined;
    onOpenChange: () => void;
    handlePostRequest: (task: TaskModel) => void;
    task?: TaskModel;
    titleModal: string;
    type: 'create' | 'update'
}

export default function TaskModal({ isOpen, onOpenChange, handlePostRequest, task, titleModal, type }: Props) {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
        }
    }, [task]);

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
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
                        </ModalBody>
                        <ModalFooter>
                            {type == 'create' && <Button fullWidth={true} color="primary" variant="flat" onPress={() => handlePostRequest({ title, description })}>
                                Crear
                            </Button>}
                            {type == 'update' && <Button fullWidth={true} color="primary" variant="flat" onPress={() => handlePostRequest({ title, description, _id: task?._id })}>
                                Editar
                            </Button>}
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
