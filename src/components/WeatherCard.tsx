"use client"

import styles from "./WeatherCard.module.css";

type WeatherData = {
    city: string;
    state: string;
    temperatureF: number;
    temperatureC: number;
    condition: string;
    icon: string;
}

export default function WeatherCard({ data }: { data: WeatherData }) {
    return (
        <div className={styles.container}>
            <section className={styles.current}>
                <p className={styles.location}>{data.city}, {data.state}</p>
                <p className={styles.temperature}>{data.temperatureF}°F | {data.temperatureC}°C</p>
                <p className={styles.condition}>{data.condition}</p>
            </section>
            <img 
                className={styles.icon}
                src={`https:${data.icon}`}
            />
        </div>
    )
}