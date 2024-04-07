'use client'

import { saveTokenToLocalStorage } from "@/services/apiService";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { es } from 'date-fns/locale/es';
import HeaderComponent from "@/components/HeaderComponent";
import { Card, CardBody, CardFooter, Divider, Spinner, Tab, Tabs } from "@nextui-org/react";
import { getTasks } from "@/services/tasksService";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setTasks } from "@/store/slices/taskSlice";
import { getWeather } from "@/services/weatherService";
import { setWeather } from "@/store/slices/weatherSlice";
import { TaskModel } from "@/models/Task";

export default function Home() {
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(state => state.tasks.tasks);
  const { data } = useSession()

  useEffect(() => {
    const init = async () => {
      setLoading(true)
      if (data) {
        saveTokenToLocalStorage(data);
        const tasks = await getTasks();
        console.log(tasks);

        dispatch(setTasks(tasks));
        const weather = await getWeather();
        setWeather(weather)
      }
      setLoading(false)
    }

    init()
  }, [data, dispatch]);



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
      {loading ?
        <div className="flex justify-center items-center">
          <Spinner size="lg" />
        </div> :
        <div className="px-4">
          <div className="w-full mb-10">
            <Link href={"/home/tasks"} className="flex justify-between items-center mb-2">
              <h1 className="text-left text-lg font-bold mb-2">Tareas</h1>
              <p className="text-sm">Ver mas</p>
            </Link>
            <div className="flex w-full flex-col">
              <Tabs aria-label="Options" color="primary" variant="bordered">
                {tasks.length > 0 && tasks.map((item: TaskModel) => {
                  return (
                    <Tab key={item._id} title={item.title}>
                      <Card key={item._id} className="mt-2">
                        <CardBody>
                          <h2 className="font-semibold">{item.title}</h2>
                        </CardBody>
                        <Divider />
                        <CardFooter>
                          <h2>{item.description}</h2>
                        </CardFooter>
                      </Card>
                    </Tab>
                  )
                })
                }
              </Tabs>
            </div>
          </div>
        </div>
      }
    </main>
  )
}
