'use client'

import GoalsModal from "@/components/GoalModal";
import GoalsComponent from "@/components/GoalsComponent";
import HeaderComponent from "@/components/HeaderComponent";
import { GoalModel } from "@/models/Goal";
import { getGoals, postGoals } from "@/services/goalsService";
import { useAppDispatch } from "@/store/hook";
import { setGoals } from "@/store/slices/goalsSlice";
import { Button, useDisclosure } from "@nextui-org/react";

export default function TaskScreen() {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const dispatch = useAppDispatch();

    const handlePostRequest = async ({ title, description }: GoalModel) => {
        await postGoals({ title, description, completed: false })
        const goals = await getGoals();
        dispatch(setGoals(goals));
        onClose()
    }

    const headerContent = () => {
        return (
            <>
                <h1 className="font-bold text-xl mb-2">Metas</h1>
                <h1 className="text-l mb-8 text-default-500">
                    ¿Sabías que al definir metas, aumentas tus posibilidades de éxito? Empecemos ahora mismo y hagamos que cada día cuente hacia tus metas
                </h1>
                <Button color="primary" onPress={onOpen}>
                    <p>Agregar Meta</p>
                </Button>
                <GoalsModal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    handlePostRequest={handlePostRequest}
                    titleModal="Crear Meta"
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
