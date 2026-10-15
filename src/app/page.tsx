"use client"

import styles from "./page.module.css";
import SearchBar from "@/components/SearchBar";
import WeatherCard from "@/components/WeatherCard";
import ForecastCard from "@/components/ForecastCard";
import HourlyForecast from "@/components/HourlyForecast";
import AlertMessage from "@/components/AlertMessage";
import WeatherSkeleton from "@/components/WeatherSkeleton";
import UnitToggle from "@/components/UnitToggle";
import { useTemperatureUnit } from "@/hooks/useTemperatureUnit";
import { WeatherData } from "@/types/weather";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null); // Store weather data from API
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Show skeleton while waiting for the API
  const [unit, setUnit] = useTemperatureUnit(); // Saved in localStorage between visits

  const requestId = useRef(0);
  const abortController = useRef<AbortController | null>(null);

  useEffect(() => {
    if(!error) return;

    const timer = setTimeout(() => {
      setError(null);
    }, 5000)

    return () => clearTimeout(timer);
  }, [error])

  async function handleSearch(location: string) {
    setError(null);
    setIsVisible(false);
    setIsLoading(true);

    // Cancel the previous request if it is still running
    abortController.current?.abort();

    // Create a controller for this request
    const controller = new AbortController();
    abortController.current = controller;

    const currentRequestId = ++requestId.current;

    try {
      const response = await fetch(`/api/weather?location=${encodeURIComponent(location)}`,
        { signal: controller.signal });

      const data = await response.json();

      // Ignore this request if a newer search has started
      if(currentRequestId !== requestId.current) {
        return;
      }

      if (!response.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      setWeather(data);
      setIsVisible(true);
    } catch (error) {
      // Ignore errors from outdated searches
      if (currentRequestId !== requestId.current) {
        return;
      }

      if (error instanceof Error && error.name === "AbortError") {
        return;
      }

      console.error(error);
      setError("Unable to retrieve weather data, please try again.")
    } finally {
      // Only the latest search can hide the skeleton
      if (currentRequestId === requestId.current) {
        setIsLoading(false);
      }
    }
  };

  const currentTime = new Date();

  const nextSixHours = weather?.hourlyForecast
    .filter((hour) => new Date(hour.time) >= currentTime)
    .slice(0, 6) ?? [];

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {error && (
          <AlertMessage message={error} />
        )}
        <div className={styles.unitToggleRow}>
          <UnitToggle unit={unit} onChange={setUnit} />
        </div>
        <SearchBar onSearch={handleSearch} errorMessage={setError} />
        <div
          className={`${styles.weather} ${isLoading || isVisible ? styles.visible : styles.hidden}`}
          aria-busy={isLoading}
        >
          {isLoading ? (
            <WeatherSkeleton />
          ) : weather && (
            <>
              <WeatherCard data={weather} unit={unit} />
              <span className={styles.forecast}>
                {/* Skip today and show up to 6 upcoming days; the API may return fewer */}
                {weather.forecast.slice(1, 7).map((day) => (
                  <ForecastCard key={day.date} forecast={day} unit={unit} />
                ))}
              </span>
              <div className={styles.hourly}>
                <h2 className={styles.hourlyTitle}>Hourly Breakdown</h2>
                {nextSixHours.map((hour) => (
                  <HourlyForecast key={hour.time} hour={hour} unit={unit} />
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
