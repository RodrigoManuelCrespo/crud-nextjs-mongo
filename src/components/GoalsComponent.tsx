'use client'

import { Card, CardHeader, CardFooter, Divider, Button, useDisclosure, Spinner, Chip } from "@nextui-org/react";
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
        const goals = { ...goal, completed: true }
        await updateGoals(goals);
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
                        {goals.map((goal: GoalModel) => {
                            return (
                                <Card className="border-none w-full mb-4"
                                    key={goal._id}>
                                    <CardHeader className="flex gap-3 py-5 w-full">
                                        <div className="flex flex-col w-full">
                                            <div className="flex justify-between items-center mb-4">
                                                <p className="text-md font-semibold">{goal.title}</p>
                                                {goal.completed &&
                                                    <Chip color="success" radius="sm" variant="bordered">
                                                        <p className="font-semibold text-[10px] uppercase">Completado</p>
                                                    </Chip>
                                                }
                                            </div>
                                            <p className="text-sm text-default-500 mb-2">{goal.description}</p>
                                        </div>
                                    </CardHeader>
                                    <Divider />
                                    <CardFooter className="justify-center gap-5">
                                        <Button isIconOnly onPress={() => handleUpdateRequest(goal)} color="primary">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                            </svg>
                                        </Button>
                                        <Button isIconOnly onPress={() => handleDeleteRequest(goal._id)} color="primary">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
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
                            titleModal={"Editar Meta"}
                        />
                    </>
                }
            </div>
    )
}