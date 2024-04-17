'use client'

import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { GoalModel } from "@/models/Goal";

interface Props {
    isOpen: boolean | undefined;
    onOpenChange: () => void;
    handlePostRequest: (goal: GoalModel) => void;
    goal?: GoalModel;
    titleModal: string;
    type: 'create' | 'update'
}


export default function GoalsModal({ isOpen, onOpenChange, handlePostRequest, goal, titleModal, type }: Props) {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    useEffect(() => {
        if (goal && isOpen) {
            setTitle(goal.title);
            setDescription(goal.description);
        }

        if (!isOpen) {
            setTitle('');
            setDescription('');
        }
    }, [goal, isOpen]);

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
                        <ModalFooter>
                            {type == 'create' && <Button color="primary" fullWidth={true} onPress={() => handlePostRequest({ title, description, completed: false })}>
                                Agregar
                            </Button>}
                            {type == 'update' && <Button color="primary" fullWidth={true} onPress={() => handlePostRequest({ title, description, _id: goal?._id, completed: false })}>
                                Editar
                            </Button>}
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
