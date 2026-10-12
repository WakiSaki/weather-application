import { ForecastDay } from "@/types/weather";
import styles from "@/components/ForecastCard.module.css";

export default function ForecastCard({ forecast }: { forecast: ForecastDay }) {
    const formattedDate = new Date(`${forecast.date}T00:00:00`).toLocaleDateString(
        "en-US",
        {
            month: "long",
            day: "numeric",
        }
    );

    return (
        <div className={styles.container}>
            <h2 className={styles.date}>{formattedDate}</h2>
            <img 
                className={styles.icon}
                src={`https://${forecast.icon.replace("/64x64/", "/128x128/")}`}
            />
            <p className={styles.condition}>{forecast.condition}</p>
            <p className={styles.temperature}>High: {forecast.highF}°F</p>
            <p className={styles.temperature}>Low: {forecast.lowF}°F</p>
        </div>
    );
}