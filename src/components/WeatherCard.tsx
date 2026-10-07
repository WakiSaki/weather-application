"use client"

import styles from "./WeatherCard.module.css";
import { WeatherData } from "@/types/weather";

export default function WeatherCard({ data }: { data: WeatherData }) {
    return (
        <div className={styles.container}>
            <section className={styles.current}>
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