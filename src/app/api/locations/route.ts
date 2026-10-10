import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");

    if (!query || query.trim().length < 2) {
        return NextResponse.json([]);
    }

    const apiKey = process.env.WEATHER_API_KEY;

    if (!apiKey) {
        return NextResponse.json(
            { error: "Weather API key is not configured." },
            { status: 500 }
        );
    }

    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${encodeURIComponent(query.trim())}`
        );

        if (!response.ok) {
            return NextResponse.json(
                { error: "Unable to retrieve location suggestions." },
                { status: 502 }
            );
        }

        const locations = await response.json();

        return NextResponse.json(locations);
    } catch {
        return NextResponse.json(
            { error: "Unable to retrieve location suggestions." },
            { status: 500 }
        );
    }
}