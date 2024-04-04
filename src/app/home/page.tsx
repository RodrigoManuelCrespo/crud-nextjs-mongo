'use client'

import { saveTokenToLocalStorage } from "@/services/apiService";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";
import { es } from 'date-fns/locale/es';
import HeaderComponent from "@/components/HeaderComponent";

export default function Home() {
  const { data } = useSession()

  useEffect(() => {
    if (data) {
      saveTokenToLocalStorage(data);
    }
  }, [data]);

  const headerContent = () => {
    const date = new Date();
    const today = format(date, "EEEE d 'de' MMMM", { locale: es });

    return (
      <>
        <h1 className="font-bold text-xl mb-2">Bienvenido</h1>
        <h4 className="text-l text-default-500 capitalize">{today}</h4>
      </>
    )
  }

  return (
    <main className="max-w-[600px] m-auto">
      <HeaderComponent content={headerContent()} />
      <div className="px-4">
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
      </div>
    </main>
  )
}
