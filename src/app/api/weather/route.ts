import { NextResponse } from "next/server"; // Next.js utility tool to send response back to whoever called the API route
import { transformWeather } from "@/lib/weather";

// GET endpoint to retrieve weather data based on location
export async function GET(request: Request) {
    // Break down the URL to retrieve search data (location)
    const { searchParams } = new URL(request.url);
    const location = searchParams.get("location");

    // Return an error message if there is location
    if(!location) {
        return NextResponse.json(
            { error: "Location is required" },
            { status: 400}
        );
    }

    // Weather API goes here...
    const apiKey = process.env.WEATHER_API_KEY;

    if(!apiKey) {
        return NextResponse.json(
            { error: "Weather API key is missing" },
            { status: 500 }
        );
    }

    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(location)}&days=8`
        );

        if(!response.ok) {
            return NextResponse.json(
                { error: "Unable to fetch weather data"},
                {status: 400}
            );
        }

        const data = await response.json();

        const weatherData = transformWeather(data);

        return NextResponse.json(weatherData);
    } catch(error) {
        console.error(error);

        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}