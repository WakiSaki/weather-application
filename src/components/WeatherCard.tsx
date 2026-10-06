"use client"

type WeatherData = {
    city: string;
    state: string;
    temperature: number;
}

export default function WeatherCard({ data }: { data: WeatherData }) {
    return (
        <div>
            <p>Location: {data.city}, {data.state}</p>
            <p>Temperature: {data.temperature}°</p>
        </div>
    )
}