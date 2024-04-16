import { TaskModel } from "@/models/Task";
import { getHeader } from "./apiService";
import { toast } from "sonner";
import { GoalModel } from "@/models/Goal";

export const postGoals = async ({ title, description }: GoalModel) => {
    try {
        const url = process.env.NEXT_PUBLIC_API_URL
        const headers = await getHeader()

        const response = await fetch(`${url}goals`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                title,
                description,
                completed: false,
            }),
        });

        if (response.ok) {
            toast.success("Meta creada")
        } else {
            toast.error("Hubo un error, intente nuevamente en unos minutos")
            console.error('Error al realizar la solicitud:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error inesperado:', error);
    }
};

export const getGoals = async () => {
    const url = process.env.NEXT_PUBLIC_API_URL
    const headers = await getHeader()
    const res = await fetch(`${url}goals`, { headers, cache: 'no-store' })
    const goals = await res.json()

    if (!res.ok) {
        toast.error("Hubo un error, intente nuevamente en unos minutos")
        throw new Error('Failed to fetch data')
    }

    return goals
}

export const deleteGoals = async (id: string) => {
    try {
        const url = process.env.NEXT_PUBLIC_API_URL
        const headers = await getHeader()
        const response = await fetch(`${url}goals/${id}`, {
            method: 'DELETE',
            headers,
        });

        if (response.ok) {
            toast.success("Meta eliminada")
        } else {
            console.error('Error al realizar la solicitud:', response.status, response.statusText);
        }
    } catch (error) {
        toast.error("Hubo un error, intente nuevamente en unos minutos")
        console.error('Error inesperado:', error);
    }
};

export const updateGoals = async ({ title, description, _id }: GoalModel) => {
    try {
        const url = process.env.NEXT_PUBLIC_API_URL
        const headers = await getHeader()
        const response = await fetch(`${url}goals/${_id}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify({
                title,
                description,
            }),
        });

        if (response.ok) {
            toast.success("Meta actualizada")
        } else {
            toast.error("Hubo un error, intente nuevamente en unos minutos")
            console.error('Error al realizar la solicitud:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error inesperado:', error);
    }
};