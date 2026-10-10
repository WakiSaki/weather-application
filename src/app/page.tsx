"use client"

import styles from "./page.module.css";
import SearchBar from "@/components/SearchBar";
import WeatherCard from "@/components/WeatherCard";
import ForecastCard from "@/components/ForecastCard";
import HourlyForecast from "@/components/HourlyForecast";
import AlertMessage from "@/components/AlertMessage";
import { WeatherData } from "@/types/weather";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null); // Store weather data from API
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

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

      await new Promise((resolve) => setTimeout(resolve, 200));

      // Check again if a new request has been made
      if(currentRequestId !== requestId.current) {
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
        <SearchBar onSearch={handleSearch} errorMessage={setError} />
        <div className={`${styles.weather} ${isVisible ? styles.visible : styles.hidden}`}>
          {weather && (
            <>
              <WeatherCard data={weather} />
              <span className={styles.forecast}>
                <ForecastCard forecast={weather.forecast[1]}/>
                <ForecastCard forecast={weather.forecast[2]}/>
                <ForecastCard forecast={weather.forecast[3]}/>
                <ForecastCard forecast={weather.forecast[4]}/>
                <ForecastCard forecast={weather.forecast[5]}/>
                <ForecastCard forecast={weather.forecast[6]}/>
              </span>
              <div className={styles.hourly}>
                <h2 className={styles.hourlyTitle}>Hourly Breakdown</h2>
                {nextSixHours.map((hour) => (
                  <HourlyForecast key={hour.time} hour={hour} />
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
