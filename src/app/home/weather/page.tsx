'use client'

import { getWeather } from "@/services/weatherService";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, CardFooter, Image, Button, Input, Spinner } from "@nextui-org/react";
import WeatherCard from "@/components/WeatherCard";
import NavbarComponent from "@/components/Navbar";
import HeaderComponent from "@/components/HeaderComponent";

export default function WeatherScreen() {
  const [weather, setWeather] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const weather = await getWeather();
        setWeather(weather)

      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
      setLoading(false)
    };

    fetchData();
  }, []);

  const headerContent = () => {
    return (
      <>
        <h1 className="font-bold text-xl mb-2">Clima</h1>
        <h1 className="text-l text-default-500"> Obtén la información meteorológica actualizada para planificar tu día con precisión.</h1>
      </>
    )
  }

  return (
    <div className="max-w-[600px] m-auto">
      <HeaderComponent content={headerContent()} />
      {loading ?
        <div className="flex justify-center items-center">
          <Spinner size="lg" />
        </div> :
        <div className="px-4">
          {weather &&
            <WeatherCard weather={weather} />
          }
        </div>
      }
    </div>
  )
}
