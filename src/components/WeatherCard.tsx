import { Avatar, Card, CardBody, CardFooter, CardHeader, Chip, Divider, Image, Link } from "@nextui-org/react";

export default function WeatherCard({ weather }: any) {
    const renderChip = (title: string, image: string) => {
        return (
            title && image &&
            <Chip
                startContent={<Image
                    alt="nextui logo"
                    height={14}
                    radius="sm"
                    src={image}
                    width={14}
                />}
                variant="solid"
                color="primary"
                className="pl-2"
            >
                <span className="text-white">{title}</span>
            </Chip>
        )
    }

    return (
        <div>
            <Card>
                <CardHeader className="flex gap-3">
                    <Image
                        alt="nextui logo"
                        height={80}
                        radius="sm"
                        src={weather.current?.is_day ? "/sunny.jpeg" : "/night.jpeg"} width={80}
                    />
                    <div className="flex flex-col">
                        <h4 className="text-md">Rosario, Argentina.</h4>
                        <h4 className="text-small text-default-500">{weather?.current?.condition?.text}</h4>
                        <h4 className="text-small text-default-500">{weather?.current?.temp_c}° C</h4>
                    </div>
                </CardHeader>
                <Divider />
                <CardBody>
                    <div className="flex justify-center gap-2">
                        {renderChip(`${weather?.current?.feelslike_c} °`, '/temperature.svg')}
                        {renderChip(`${weather?.current?.cloud} %`, '/cloudy.svg')}
                        {renderChip(`${weather?.current?.precip_mm} %`, '/rain.svg')}
                        {renderChip(`${weather?.current?.humidity} %`, '/water.svg')}
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}