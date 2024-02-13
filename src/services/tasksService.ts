import { TaskModel } from "@/models/Task";

export const postTask = async ({ title, description, priority }: TaskModel) => {
    try {
        const response = await fetch('http://localhost:3000/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                description,
                priority
            }),
        });

        if (response.ok) {
            console.log('Post successful!');
            // Puedes manejar cualquier acción después de una solicitud exitosa aquí
        } else {
            console.error('Error al realizar la solicitud:', response.status, response.statusText);
            // Puedes manejar cualquier acción en caso de error aquí
        }
    } catch (error) {
        console.error('Error inesperado:', error);
        // Puedes manejar cualquier error inesperado aquí
    }
};

export const getTasks = async () => {
    const res = await fetch('http://localhost:3000/api/tasks', { cache: 'no-store' })
    const tasks = await res.json()

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return tasks
}

export const deleteTask = async (id: string) => {
    try {
        const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });


        if (response.ok) {
            console.log('Delete successful!');
            // Puedes manejar cualquier acción después de una solicitud exitosa aquí
        } else {
            console.error('Error al realizar la solicitud:', response.status, response.statusText);
            // Puedes manejar cualquier acción en caso de error aquí
        }
    } catch (error) {
        console.error('Error inesperado:', error);
        // Puedes manejar cualquier error inesperado aquí
    }
};

export const updateTask = async ({ title, description, priority, _id }: TaskModel) => {
    try {
        const response = await fetch(`http://localhost:3000/api/tasks/${_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                description,
                priority
            }),
        });

        if (response.ok) {
            console.log('Edit successful!');
            // Puedes manejar cualquier acción después de una solicitud exitosa aquí
        } else {
            console.error('Error al realizar la solicitud:', response.status, response.statusText);
            // Puedes manejar cualquier acción en caso de error aquí
        }
    } catch (error) {
        console.error('Error inesperado:', error);
        // Puedes manejar cualquier error inesperado aquí
    }
};