import { ForecastDay } from "@/types/weather";
import styles from "@/components/ForecastCard.module.css";

export default function ForecastCard({ forecast }: { forecast: ForecastDay }) {
    return (
        <div className={styles.container}>
            <h2>{forecast.date}</h2>
            <img 
                src={`https://${forecast.icon}`}
            />
            <p className={styles.condition}>{forecast.condition}</p>
            <p className={styles.temperature}>High: {forecast.highF}°F</p>
            <p className={styles.temperature}>Low: {forecast.lowF}°F</p>
        </div>
    );
}