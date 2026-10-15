"use client"

import { HourlyForecast as HourlyForecastType, TemperatureUnit } from "@/types/weather";
import styles from "@/components/HourlyForecast.module.css";

export default function HourlyForecast({ hour, unit }: { hour: HourlyForecastType; unit: TemperatureUnit }) {
    const formattedTime = new Date(hour.time.replace(" ", "T")).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });

    const temperature = unit === "F" ? hour.temperatureF : hour.temperatureC;

    return (
        <div className={styles.container}>
            <p className={styles.time}>{formattedTime}</p>
            <p>{temperature}°{unit}</p>
            <p className={styles.condition}>{hour.condition}</p>
            <img 
                className={styles.img} 
                src={`https:${hour.icon.replace("/64x64/", "/128x128/")}`} 
                alt={hour.condition}
            />
        </div>
    );
}