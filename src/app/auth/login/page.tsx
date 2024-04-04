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
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <div className="flex justify-center">
                            <Image
                                width={200}
                                src="/mokuteki-logo.png"
                                alt="Your Company"
                            />
                        </div>
                    </div>
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mb-4 text-center text-2xl font-bold leading-9 tracking-tight">
                            Iniciar sesión
                        </h2>
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
                                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6">
                                        Contraseña
                                    </label>
                                    {/* <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        ¿Te olvidaste la contraseña?
                                    </a>
                                </div> */}
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Log in
                                </button>
                            </div>
                        </form>

                        <p className="mt-10 text-center text-sm text-gray-500">
                            ¿No eres miembro?{' '}
                            <a href="/auth/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                Registrate
                            </a>
                        </p>
                    </div>
                </div>}
        </>
    )
}
