import { NextResponse } from "next/server"; // Next.js utility tool to send response back to whoever called the API route
import { transformWeather } from "@/lib/weather";

// GET endpoint to retrieve weather data based on location
export async function GET(request: Request) {
    // Break down the URL to retrieve search data (location)
    const { searchParams } = new URL(request.url);
    const location = searchParams.get("location");

    // Return an error message if there is no location
    if(!location || !location.trim) {
        return NextResponse.json(
            { error: "Location is required" },
            { status: 400}
        );
    }
    
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

        const data = await response.json();

        if(!response.ok) {
            if(data?.error == 1006) {
                return NextResponse.json(
                    { error: "City cannot be found. Please enter a valid city." },
                    { status: 404 }
                );
            }
            return NextResponse.json(
                { error: data.error?.message || "Unable to fetch weather data"},
                {status: response.status}
            );
        }

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