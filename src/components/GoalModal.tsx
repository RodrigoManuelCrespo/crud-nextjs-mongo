'use client'

import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { GoalModel } from "@/models/Goal";

interface Props {
    isOpen: boolean | undefined;
    onOpenChange: () => void;
    handlePostRequest: (task: GoalModel) => void;
    task?: GoalModel;
    titleModal: string;
    type: 'create' | 'update'
}


export default function GoalsModal({ isOpen, onOpenChange, handlePostRequest, task, titleModal, type }: Props) {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [priority, setPriority] = useState<string>('');

    useEffect(() => {
        if (task && isOpen) {
            setTitle(task.title);
            setDescription(task.description);
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
                        </ModalBody>
                        {/* <ModalFooter>
                            {type == 'create' && <Button color="primary" fullWidth={true} onPress={() => handlePostRequest({ title, description })}>
                                Agregar
                            </Button>}
                            {type == 'update' && <Button color="primary" fullWidth={true} onPress={() => handlePostRequest({ title, description, _id: task?._id })}>
                                Editar
                            </Button>}
                        </ModalFooter> */}
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}