'use client'

import { getWeather } from "@/services/weatherService";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, CardFooter, Image, Button, Input } from "@nextui-org/react";
import WeatherCard from "@/components/WeatherCard";

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
    <div className="max-w-[600px] m-auto p-6">
      <h1 className="font-semibold text-xl mb-5">Clima</h1>
      <div className="mb-4">
        <Input
          label="Buscar"
          isClearable
          radius="lg"
          classNames={{
            label: "text-black/50 dark:text-white/90",
            input: [
              "bg-transparent my",
              "text-black/90 dark:text-white/90",
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
      </div>
      <WeatherCard weather={weather} />
    </div>
  )
}
