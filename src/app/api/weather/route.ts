import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, response: any) {
    const res = await fetch(`http://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_KEY}&q=rosario`, { cache: 'no-store' })
    const weather = await res.json()

    return NextResponse.json(weather);
}