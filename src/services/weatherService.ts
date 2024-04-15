
export const getWeather = async () => {
    const url = process.env.NEXT_PUBLIC_API_URL
    const res = await fetch(`${url}weather`, { cache: 'no-store' })
    const weather = await res.json()

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return weather
}