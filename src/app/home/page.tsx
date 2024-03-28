'use client'

import Link from "next/link";

export default function Home() {
  return (

    <main className="max-w-[600px] m-auto p-5">
      <div className="w-full mb-10">
        <h1 className="text-left text-xl font-bold mb-2">Bienvenido Rodrigo!</h1>
        <h4 className="text-left">Viernes 26 de Agosto.</h4>
      </div>
      <div className="w-full mb-10">
        <Link href={"/home/tasks"} className="flex justify-between items-center">
          <h1 className="text-left text-lg font-bold mb-2">Tareas</h1>
          <p className="text-sm">Ver mas</p>
        </Link>
        <h4 className="text-left">Aun no tienes tareas creadas.</h4>
      </div>
      <div className="w-full mb-10">
        <Link href={"/home/weather"} className="flex justify-between items-center">
          <h1 className="text-left text-lg font-bold mb-2">Clima</h1>
          <p className="text-sm">Ver mas</p>
        </Link>
        <h4 className="text-left">Agregar localidad para ver su clima.</h4>
      </div>
    </main>
  )
}
