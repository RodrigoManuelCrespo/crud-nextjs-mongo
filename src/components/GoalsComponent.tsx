'use client'

import { Card, CardHeader, CardFooter, Divider, Button, useDisclosure, Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { deleteGoals, getGoals, updateGoals } from "@/services/goalsService";
import { GoalModel } from "@/models/Goal";
import { setGoals } from "@/store/slices/goalsSlice";
import GoalsModal from "./GoalModal";

export default function GoalsComponent() {
    const dispatch = useAppDispatch();
    const goals = useAppSelector(state => state.goals.goals);
    const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();
    const [newGoals, setNewGoals] = useState<GoalModel>({ title: '', description: '', completed: false, _id: '' });
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const goals = await getGoals();
                console.log(goals);
                dispatch(setGoals(goals));
            } catch (error) {
                console.error("Error al obtener datos:", error);
            }
            setLoading(false)
        }

        fetchData();
    }, [dispatch]);

    const handleDeleteRequest = async (id: string | any) => {
        await deleteGoals(id);
        const goal = await getGoals();
        dispatch(setGoals(goal));
    };

    const handleUpdateRequest = async (goal: GoalModel) => {
        await updateGoals(goal);
        const response = await getGoals();
        dispatch(setGoals(response));
        onClose()
    };

    const handleOpenModal = (goal: GoalModel) => {
        setNewGoals(goal)
        onOpen()
    }

    return (
        loading ?
            <div className="flex justify-center items-center">
                <Spinner size="lg" />
            </div> :
            <div className="px-4">
                {goals.length > 0 &&
                    <>
                        <h1 className="font-semibold text-xl mb-5">Mis Tareas</h1>
                        {goals.map((task: GoalModel) => {
                            return (
                                <Card className="border-none w-full mb-4"
                                    key={task._id}>
                                    <CardHeader className="flex gap-3 py-5 w-full">
                                        <div className="flex flex-col w-full">
                                            <div className="flex justify-between items-center mb-4">
                                                <p className="text-md font-semibold">{task.title}</p>
                                            </div>
                                            <p className="text-sm text-default-500 mb-2">{task.description}</p>
                                        </div>
                                    </CardHeader>
                                    <Divider />
                                    <CardFooter className="justify-center gap-5">
                                        <Button isIconOnly onPress={() => handleDeleteRequest(task._id)} color="primary">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                            </svg>
                                        </Button>
                                        <Button isIconOnly onPress={() => handleOpenModal(task)} color="primary">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                            </svg>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            )
                        })}
                        <GoalsModal
                            isOpen={isOpen}
                            onOpenChange={onOpenChange}
                            handlePostRequest={handleUpdateRequest}
                            goal={newGoals}
                            type={'update'}
                            titleModal={"Editar"}
                        />
                    </>
                }
            </div>
    )
}