"use client"

import styles from "./WeatherCard.module.css";
import { WeatherData } from "@/types/weather";
import { getWeatherBackground } from "@/utils/weatherBackground";

export default function WeatherCard({ data }: { data: WeatherData }) {
    const formattedDate = new Date(`${data.forecast[0].date}T00:00:00`).toLocaleDateString(
        "en-US",
        {
            month: "long",
            day: "numeric",
        }
    );

    const background = getWeatherBackground(data.current.code);

    const backgroundClass = styles[background];

    return (
        <div className={`${styles.container} ${backgroundClass}`}>
            <section className={styles.current}>
                <p>{formattedDate}</p>
                <p className={styles.location}>{data.location.city}, {data.location.state}</p>
                <p className={styles.temperature}>{data.current.temperatureF}°F | {data.current.temperatureC}°C</p>
                <p className={styles.condition}>{data.current.condition}</p>
            </section>
            <img 
                className={styles.icon}
                src={`https:${data.current.icon}`}
            />
        </div>
    )
}