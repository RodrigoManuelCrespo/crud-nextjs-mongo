import { Card, CardFooter, CardHeader, Image } from "@nextui-org/react";

export default function WeatherCard({ weather }: any) {
    return (
        <Card isFooterBlurred className="w-full h-[350px] col-span-12 sm:col-span-5 my-6 relative">
            <CardHeader className="absolute flex justify-start items-center flex-col">
                <div className="flex justify-between bg-black/60 px-4 py-2 rounded-3xl">
                    <div className="w-full">
                        <div className="flex gap-4 justify-center w-full">
                            <div>
                                <h2 className="text-center">{weather?.current?.feelslike_c}°</h2>
                                <Image
                                    alt="Card example background"
                                    className="w-6"
                                    src="/temperature.svg"
                                />
                            </div>
                            <div>
                                <h2 className="text-center">{weather?.current?.cloud}%</h2>
                                <Image
                                    alt="Card example background"
                                    className="w-6"
                                    src="/cloudy.svg"
                                />
                            </div>
                            <div>
                                <h2 className="text-center">{weather?.current?.humidity}%</h2>
                                <Image
                                    alt="Card example background"
                                    className="w-6"
                                    src="/water.svg"
                                />
                            </div>
                            <div>
                                <h2 className="text-center">{weather?.current?.precip_mm}</h2>
                                <Image
                                    alt="Card example background"
                                    className="w-6"
                                    src="/rain.svg"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <Image
                alt="Card example background"
                className="z-0 w-full h-full scale-100 object-cover"
                src="/night.jpeg"
            />
            <CardFooter className="absolute bg-black/40 bottom-0 border-t-1 border-zinc-100/50 z-10 flex flex-col item-start justify-start">
                <h4 className="text-left w-full">Rosario, Argentina.</h4>
                <h4 className="text-left w-full">{weather?.current?.condition?.text}</h4>
                <h4 className="text-left w-full">{weather?.current?.temp_c}° C</h4>
            </CardFooter>
        </Card>
    )
}