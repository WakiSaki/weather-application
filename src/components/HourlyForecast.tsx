"use client"

import { HourlyForecast as HourlyForecastType } from "@/types/weather";
import styles from "@/components/HourlyForecast.module.css";

export default function HourlyForecast({ hour }: { hour: HourlyForecastType }) {
    const formattedTime = new Date(hour.time.replace(" ", "T")).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });

    return (
        <div className={styles.container}>
            <p>{formattedTime}</p>
            <p>{hour.temperature}°F</p>
            <p>{hour.condition}</p>
            <img 
                className={styles.img} 
                src={`http:${hour.icon}`} 
                alt={hour.condition}
            />
        </div>
    );
}