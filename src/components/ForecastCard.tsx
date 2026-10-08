import { ForecastDay } from "@/types/weather";

export default function ForecastCard({ forecast }: { forecast: ForecastDay }) {
    return (
        <span>
            <h2>{forecast.date}</h2>
            <p>{forecast.condition}</p>
            <p>High: {forecast.highF}</p>
            <p>Low: {forecast.lowF}</p>
        </span>
    );
}