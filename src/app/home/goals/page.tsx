'use client'

import GoalsComponent from "@/components/GoalsComponent";
import HeaderComponent from "@/components/HeaderComponent";
import TaskModal from "@/components/TaskModal";
import TasksComponent from "@/components/TasksComponent";
import { TaskModel } from "@/models/Task";
import { getTasks, postTask } from "@/services/tasksService";
import { useAppDispatch } from "@/store/hook";
import { setTasks } from "@/store/slices/taskSlice";
import { Button, useDisclosure } from "@nextui-org/react";

export default function TaskScreen() {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const dispatch = useAppDispatch();

    const handlePostRequest = async ({ title, description, priority }: TaskModel) => {
        await postTask({ title, description, priority })
        const tasks = await getTasks();
        dispatch(setTasks(tasks));
        onClose()
    }

    const headerContent = () => {
        return (
            <>
                <h1 className="font-bold text-xl mb-2">Metas</h1>
                <h1 className="text-l mb-8 text-default-500">
                    ¿Sabías que al definir metas, aumentas significativamente tus posibilidades de éxito? Empecemos ahora mismo y hagamos que cada día cuente hacia tus metas
                </h1>
                <Button color="primary" onPress={onOpen}>
                    <p>Agregar Meta</p>
                </Button>
                <TaskModal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    handlePostRequest={handlePostRequest}
                    titleModal="Crear Tarea"
                    type="create"
                />
            </>
        )
    }

    return (
        <div className="max-w-[600px] m-auto">
            <HeaderComponent content={headerContent()} />
            <GoalsComponent />
        </div>
    )
}
