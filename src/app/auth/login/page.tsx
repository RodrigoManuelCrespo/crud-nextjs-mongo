'use client'

import { Image, Spinner } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Login() {
    const [loading, setLoading] = useState(false)
    const router = useRouter();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        try {
            setLoading(true)
            event.preventDefault();
            const formData = new FormData(event.currentTarget);

            const resAuth = await signIn("credentials", {
                email: formData.get("email"),
                password: formData.get("password"),
                redirect: false,
            });

            if (resAuth?.ok) {
                return router.push(('/'))
            }
            setLoading(false)
        } catch (error) {
            console.error("Error al iniciar sesion", error)
            setLoading(false)
        }
    }


    return (
        <>
            {loading ?
                <div className="flex justify-center items-center h-[100vh]">
                    <Spinner size="lg" />
                </div> :
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm my-10">
                        <div className="flex justify-center">
                            <Image
                                width={250}
                                src="/mokuteki-logo.png"
                                alt="Your Company"
                                radius="none"
                            />
                        </div>
                    </div>
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6">
                                    Email
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="block px-2 w-full rounded-md border-none outline-none py-1.5 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6">
                                        Contraseña
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="block px-2 w-full rounded-md border-none outline-none py-1.5 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                                >
                                    Log in
                                </button>
                            </div>
                        </form>

                        <p className="mt-10 text-center text-sm text-default-500">
                            ¿No eres miembro?{' '}
                            <a href="/auth/signup" className="font-semibold leading-6 text-primary hover:text-primary">
                                Registrate
                            </a>
                        </p>
                    </div>
                </div>}
        </>
    )
}
