'use client'

import { getWeather } from "@/services/weatherService";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, CardFooter, Image, Button, Input } from "@nextui-org/react";
import WeatherCard from "@/components/WeatherCard";
import NavbarComponent from "@/components/Navbar";

export default function WeatherScreen() {
  const [weather, setWeather] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const weather = await getWeather();
        setWeather(weather)

      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <NavbarComponent />
      <div className="max-w-[600px] m-auto">
        <Card className="rounded-t-none rounded-b-3xl	p-5 bg-zinc-800 mb-4">
          <h1 className="font-bold text-xl mb-2">Clima</h1>
          <h1 className="text-l mb-8"> Obtén la información meteorológica actualizada para planificar tu día con precisión.</h1>
          {/* <div className="mb-4">
          <Input
            label="Buscar"
            isClearable
            radius="lg"
            classNames={{
              label: "text-gray-800	/50 dark:text-white/90",
              input: [
                "bg-transparent my",
                "text-gray-800	/90 dark:text-white/90",
                "placeholder:text-default-700/50 dark:placeholder:text-white/60",
              ],
              innerWrapper: "bg-transparent",
              inputWrapper: [
                "shadow-xl",
                "bg-default-200/50",
                "dark:bg-default/60",
                "backdrop-blur-xl",
                "backdrop-saturate-200",
                "hover:bg-default-200/70",
                "dark:hover:bg-default/70",
                "group-data-[focused=true]:bg-default-200/50",
                "dark:group-data-[focused=true]:bg-default/60",
                "!cursor-text",
              ],
            }}
            placeholder="Buscar ciudad..."
          />
        </div> */}
        </Card>
        <div className="px-6">
          <WeatherCard weather={weather} />
        </div>
      </div>
    </>
  )
}
