import { ForecastDay, TemperatureUnit } from "@/types/weather";
import styles from "@/components/ForecastCard.module.css";

export default function ForecastCard({ forecast, unit }: { forecast: ForecastDay; unit: TemperatureUnit }) {
    const formattedDate = new Date(`${forecast.date}T00:00:00`).toLocaleDateString(
        "en-US",
        {
            month: "long",
            day: "numeric",
        }
    );

    const high = unit === "F" ? forecast.highF : forecast.highC;
    const low = unit === "F" ? forecast.lowF : forecast.lowC;

    return (
        <div className={styles.container}>
            <h2 className={styles.date}>{formattedDate}</h2>
            <img 
                className={styles.icon}
                src={`https:${forecast.icon.replace("/64x64/", "/128x128/")}`}
            />
            <p className={styles.condition}>{forecast.condition}</p>
            <p className={styles.temperature}>High: {high}°{unit}</p>
            <p className={styles.temperature}>Low: {low}°{unit}</p>
        </div>
    );
}