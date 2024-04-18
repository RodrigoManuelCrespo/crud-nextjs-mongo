'use client'

import { saveTokenToLocalStorage } from "@/services/apiService";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { es } from 'date-fns/locale/es';
import HeaderComponent from "@/components/HeaderComponent";
import { Card, CardBody, CardFooter, CardHeader, Divider, Image, Spinner, Tab, Tabs } from "@nextui-org/react";
import { getTasks } from "@/services/tasksService";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setTasks } from "@/store/slices/taskSlice";
import { getWeather } from "@/services/weatherService";
import { setWeather } from "@/store/slices/weatherSlice";
import { TaskModel } from "@/models/Task";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getGoals } from "@/services/goalsService";
import { setGoals } from "@/store/slices/goalsSlice";
import { GoalModel } from "@/models/Goal";

export default function Home() {
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(state => state.tasks.tasks);
  const goals = useAppSelector(state => state.goals.goals);
  const weather: any = useAppSelector(state => state.weather.weather);
  const { data } = useSession()

  const settings = {
    centerMode: true,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true)
      if (data) {
        saveTokenToLocalStorage(data);
        const tasks = await getTasks();
        dispatch(setTasks(tasks));
        const goals = await getGoals();
        dispatch(setGoals(goals));
        const weather = await getWeather();
        dispatch(setWeather(weather));
      }
      setLoading(false)
    }

    init()
  }, [data, dispatch]);

  return (
    <main className="max-w-[600px] m-auto">
      {loading ?
        <div className="flex justify-center items-center my-20">
          <Spinner size="lg" />
        </div> :
        <div className="px-4">

          {/* Tasks */}
          {tasks.length > 1 &&
            <div className="w-full mt-5 mb-10">
              <Link href={"/home/tasks"} className="flex justify-between items-center mb-2">
                <h1 className="text-left text-lg font-bold mb-2">Tareas</h1>
                <p className="text-sm">Ver mas</p>
              </Link>
              <Slider {...settings}>
                {tasks.map((item: TaskModel) => {
                  return (
                    <div key={item._id}>
                      <Card className="flex mr-2">
                        <CardBody>
                          <h2 className="font-semibold py-2">{item.title}</h2>
                          <h2 className="text-default-500 py-2 truncate">{item.description}</h2>
                        </CardBody>
                      </Card>
                    </div>
                  )
                })
                }
              </Slider>
            </div>
          }

          {/* Goals */}
          {goals.length > 1 &&
            <div className="w-full mt-5 mb-10">
              <Link href={"/home/goals"} className="flex justify-between items-center mb-2">
                <h1 className="text-left text-lg font-bold mb-2">Metas</h1>
                <p className="text-sm">Ver mas</p>
              </Link>
              <Slider {...settings}>
                {goals.length > 1 && goals.map((item: GoalModel) => {
                  return (
                    <div key={item._id}>
                      <Card className="flex mr-2">
                        <CardBody>
                          <h2 className="font-semibold py-2">{item.title}</h2>
                          <h2 className="text-default-500 py-2 truncate">{item.description}</h2>
                        </CardBody>
                      </Card>
                    </div>
                  )
                })}
              </Slider>
            </div>
          }

          {/* Weather */}
          <div className="w-full mb-10">
            <Link href={"/home/weather"} className="flex justify-between items-center mb-2">
              <h1 className="text-left text-lg font-bold mb-2">Clima</h1>
              <p className="text-sm">Ver mas</p>
            </Link>
            {weather &&
              <div key={weather?._id}>
                <Card>
                  <CardHeader className="flex gap-3">
                    <Image
                      alt="nextui logo"
                      height={80}
                      radius="sm"
                      src={weather.current?.is_day ? "/sunny.jpeg" : "/night.jpeg"}
                      width={80}
                    />
                    <div className="flex flex-col">
                      <h4 className="text-md">{`${weather.location?.name}, ${weather.location?.country}`}</h4>
                      <h4 className="text-small my-1 text-default-500">{weather?.current?.condition?.text}</h4>
                      <h4 className="text-small text-default-500">{weather?.current?.temp_c}° C</h4>
                    </div>
                  </CardHeader>
                </Card>
              </div>
            }
          </div>
        </div>
      }
    </main>
  )
}
