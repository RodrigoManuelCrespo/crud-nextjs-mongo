'use client'

import { deleteTask, getTasks, postTask, updateTask } from "@/services/tasksService";
import { TaskModel } from "@/models/Task";
import { Card, CardHeader, CardFooter, Divider, Button, useDisclosure, Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import TaskModal from "./TaskModal";
import { Chip } from "@nextui-org/react";
import { setTasks } from "@/store/slices/taskSlice";

export default function TasksComponent() {
    const dispatch = useAppDispatch();
    const tasks = useAppSelector(state => state.tasks.tasks);
    const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();
    const [newTask, setNewTask] = useState<TaskModel>({ title: '', description: '', priority: '', _id: '' });
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const tasks = await getTasks();
                dispatch(setTasks(tasks));
            } catch (error) {
                console.error("Error al obtener datos:", error);
            }
            setLoading(false)
        }

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
        loading ?
            <div className="flex justify-center items-center">
                <Spinner size="lg" />
            </div> :
            <div className="px-4">
                {tasks.length > 0 &&
                    <>
                        <h1 className="font-semibold text-xl mb-5">Mis Tareas</h1>
                        {tasks.map((task: TaskModel) => {
                            return (
                                <Card className="border-none w-full mb-4"
                                    key={task._id}>
                                    <CardHeader className="flex gap-3 py-5 w-full">
                                        <div className="flex flex-col w-full">
                                            <div className="flex justify-between items-center mb-4">
                                                <p className="text-md font-semibold">{task.title}</p>
                                                <Chip
                                                    classNames={{
                                                        base: `${task.priority == 'Baja' && 'bg-red-400'} ${task.priority == 'Media' && 'bg-red-600'} ${task.priority == 'Alta' && 'bg-red-800'}`,
                                                        content: "drop-shadow shadow-black text-white",
                                                    }}
                                                >
                                                    <p className="font-semibold text-[10px]">{task.priority}</p>
                                                </Chip>
                                            </div>
                                            <p className="text-sm text-default-500 mb-2">{task.description}</p>
                                        </div>
                                    </CardHeader>
                                    <Divider />
                                    <CardFooter className="justify-center gap-5">
                                        <Button isIconOnly onPress={() => handleDeleteRequest(task._id)} className="bg-gradient-to-tr from-primary to-secondary">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                            </svg>
                                        </Button>
                                        <Button isIconOnly onPress={() => handleOpenModal(task)} className="bg-gradient-to-tr from-primary to-secondary">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
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
                    </>
                }
            </div>
    )
}