'use client'

import { deleteTask, getTasks, postTask, updateTask } from "@/services/tasksService";
import { TaskModel } from "@/models/Task";
import { Card, CardHeader, CardFooter, Divider, Button, useDisclosure } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setTasks } from "@/store/slice";
import TaskModal from "./TaskModal";

export default function Tasks() {
    const dispatch = useAppDispatch();
    const tasks = useAppSelector(state => state.tasks.tasks);
    const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();
    const [newTask, setNewTask] = useState<TaskModel>({ title: '', description: '', priority: '', _id: '' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tasks = await getTasks();
                dispatch(setTasks(tasks));
            } catch (error) {
                console.error("Error al obtener datos:", error);
            }
        };

        fetchData();
    }, [dispatch]);

    const handleDeleteRequest = async (id: string | any) => {
        await deleteTask(id);
        const tasks = await getTasks();
        dispatch(setTasks(tasks));
    };

    const handleUpdateRequest = async (task: TaskModel) => {
        await updateTask(task);
        const tasks = await getTasks();
        dispatch(setTasks(tasks));
        onClose()
    };

    const handleOpenModal = (task: TaskModel) => {
        setNewTask(task)
        onOpen()
    }

    return (
        <div>
            <h1 className="font-semibold text-xl mb-5">Mis Tareas</h1>
            {tasks.map((task: TaskModel) => {
                return (
                    <Card className="border-none bg-[#FFB996] w-full mb-4"
                        key={task._id}>
                        <CardHeader className="flex gap-3 py-5">
                            <div className="flex flex-col">
                                <p className="text-gray-800	 text-lg font-bold">{task.title}</p>
                                <p className="text-gray-800	">{task.description}</p>
                                <p className="text-gray-800	">{task.priority}</p>
                            </div>
                        </CardHeader>
                        <Divider />
                        <CardFooter className="justify-center gap-5">
                            <Button isIconOnly variant="bordered">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                </svg>
                            </Button>
                            <Button isIconOnly onPress={() => handleOpenModal(task)} variant="bordered">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                </svg>
                            </Button>
                            <Button isIconOnly onPress={() => handleDeleteRequest(task._id)} variant="bordered">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </Button>
                        </CardFooter>
                    </Card>
                )
            })}
            <TaskModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                handlePostRequest={handleUpdateRequest}
                task={newTask}
                type={'update'}
                titleModal={"Editar"}
            />
        </div>
    )
}