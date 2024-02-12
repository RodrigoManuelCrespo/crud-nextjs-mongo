import { Card, CardFooter, CardHeader, Image } from "@nextui-org/react";

export default function WeatherCard({ weather }: any) {
    return (
        <Card isFooterBlurred className="w-full h-[250px] col-span-12 sm:col-span-5 my-6">
            <CardHeader className="absolute z-10 top-1 flex justify-start items-start flex-col">
                <h4 className="text-sm text-white/90 uppercase inline bg-black/60 mb-1 px-1 rounded-md font-bold">Rosario, Argentina.</h4>
                <h4 className="text-sm text-white/90 uppercase inline bg-black/60 mb-1 px-1 rounded-md font-semibold">{weather?.current?.condition?.text}</h4>
                <h4 className="text-sm text-white/90 uppercase inline bg-black/60 mb-1 px-1 rounded-md font-semibold">{weather?.current?.temp_c}° C</h4>
            </CardHeader>
            <Image
                alt="Card example background"
                className="z-0 w-full h-full scale-120 object-cover"
                src="/sunny.jpeg"
            />
            <CardFooter className="absolute bg-black/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                <div className="flex w-full flex justify-between">
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
            </CardFooter>
        </Card>
    )
}