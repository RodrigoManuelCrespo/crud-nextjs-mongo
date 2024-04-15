import { TaskModel } from "@/models/Task";
import { getHeader } from "./apiService";
import { toast } from "sonner";

export const postTask = async ({ title, description, priority }: TaskModel) => {
    try {
        const url = process.env.NEXT_PUBLIC_API_URL
        const headers = await getHeader()

        const response = await fetch(`${url}tasks`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                title,
                description,
                priority
            }),
        });

        if (response.ok) {
            console.log('Post successful!');
            toast.success("Tarea creada")
        } else {
            toast.error("Hubo un error, intente nuevamente en unos minutos")
            console.error('Error al realizar la solicitud:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error inesperado:', error);
    }
};

export const getTasks = async () => {
    const url = process.env.NEXT_PUBLIC_API_URL
    const headers = await getHeader()
    const res = await fetch(`${url}tasks`, { headers, cache: 'no-store' })
    const tasks = await res.json()

    if (!res.ok) {
        toast.error("Hubo un error, intente nuevamente en unos minutos")
        throw new Error('Failed to fetch data')
    }

    return tasks
}

export const deleteTask = async (id: string) => {
    try {
        const url = process.env.NEXT_PUBLIC_API_URL
        const headers = await getHeader()
        const response = await fetch(`${url}tasks/${id}`, {
            method: 'DELETE',
            headers,
        });

        if (response.ok) {
            toast.success("Tarea completada")
            console.log('Delete successful!');
        } else {
            console.error('Error al realizar la solicitud:', response.status, response.statusText);
        }
    } catch (error) {
        toast.error("Hubo un error, intente nuevamente en unos minutos")
        console.error('Error inesperado:', error);
    }
};

export const updateTask = async ({ title, description, priority, _id }: TaskModel) => {
    try {
        const url = process.env.NEXT_PUBLIC_API_URL
        const headers = await getHeader()
        const response = await fetch(`${url}tasks/${_id}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify({
                title,
                description,
                priority
            }),
        });

        if (response.ok) {
            toast.success("Tarea actualizada")
        } else {
            toast.error("Hubo un error, intente nuevamente en unos minutos")
            console.error('Error al realizar la solicitud:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error inesperado:', error);
    }
};