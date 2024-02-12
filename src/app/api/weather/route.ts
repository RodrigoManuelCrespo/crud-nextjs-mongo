import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, response: any) {
    const res = await fetch('http://api.weatherapi.com/v1/current.json?key=bb80ecabff0840aba32224104232501&q=rosario', { cache: 'no-store' })
    const weather = await res.json()

    return NextResponse.json(weather);
}