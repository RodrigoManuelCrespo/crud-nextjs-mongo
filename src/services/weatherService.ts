
export const getWeather = async () => {
    const res = await fetch('http://localhost:3000/api/weather', { cache: 'no-store' })
    const weather = await res.json()
    console.log(weather);

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return weather
}