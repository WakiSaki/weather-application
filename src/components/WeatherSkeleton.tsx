import Skeleton from "@/components/Skeleton";
import styles from "./WeatherSkeleton.module.css";
import pageStyles from "@/app/page.module.css";
import weatherCardStyles from "./WeatherCard.module.css";
import forecastCardStyles from "./ForecastCard.module.css";
import hourlyStyles from "./HourlyForecast.module.css";

// Each placeholder reuses the real card's container class so the layout doesn't shift when data arrives

export function WeatherCardSkeleton() {
    return (
        <div className={`${weatherCardStyles.container} ${weatherCardStyles.default}`}>
            <section className={`${weatherCardStyles.current} ${styles.stack}`}>
                <Skeleton width="8rem" height="1rem" />
                <Skeleton width="14rem" height="2rem" />
                <Skeleton width="16rem" height="3rem" />
                <Skeleton width="8rem" height="1.5rem" />
            </section>
            <Skeleton width="150px" height="150px" radius="50%" />
        </div>
    );
}

export function ForecastCardSkeleton() {
    return (
        <div className={`${forecastCardStyles.container} ${styles.stack}`}>
            <Skeleton width="80%" height="1.5rem" />
            <Skeleton width="100px" height="100px" radius="50%" />
            <Skeleton width="70%" height="1.25rem" />
            <Skeleton width="60%" height="1rem" />
            <Skeleton width="60%" height="1rem" />
        </div>
    );
}

export function HourlyForecastSkeleton() {
    return (
        <div className={hourlyStyles.container}>
            <Skeleton width="5rem" height="1.25rem" className={`${hourlyStyles.time} ${styles.centered}`} />
            <Skeleton width="3.5rem" height="1.25rem" className={styles.centered} />
            <Skeleton width="6rem" height="1.25rem" className={styles.centered} />
            <Skeleton width="100px" height="100px" radius="50%" className={`${hourlyStyles.img} ${styles.centered}`} />
        </div>
    );
}

export default function WeatherSkeleton() {
    return (
        <>
            <span role="status" className="visually-hidden">Loading weather…</span>
            <WeatherCardSkeleton />
            <span className={pageStyles.forecast}>
                {Array.from({ length: 6 }, (_, i) => (
                    <ForecastCardSkeleton key={i} />
                ))}
            </span>
            <div className={pageStyles.hourly}>
                <Skeleton width="12rem" height="1.75rem" className={pageStyles.hourlyTitle} />
                {Array.from({ length: 6 }, (_, i) => (
                    <HourlyForecastSkeleton key={i} />
                ))}
            </div>
        </>
    );
}
