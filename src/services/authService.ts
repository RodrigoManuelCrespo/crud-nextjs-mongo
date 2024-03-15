import { UserModel } from "@/models/User";

export const postSignup = async ({ username, email, password }: UserModel) => {
    try {
        const url = process.env.NEXT_PUBLIC_API_URL
        const response = await fetch(`${url}auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                email,
                password
            }),
        });

        return response

    } catch (error) {
        console.error('Error inesperado:', error);
    }
};