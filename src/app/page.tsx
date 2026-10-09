"use client"

import styles from "./page.module.css";
import SearchBar from "@/components/SearchBar";
import WeatherCard from "@/components/WeatherCard";
import ForecastCard from "@/components/ForecastCard";
import HourlyForecast from "@/components/HourlyForecast";
import AlertMessage from "@/components/AlertMessage";
import { WeatherData } from "@/types/weather";
import { useState, useEffect } from "react";

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null); // Store weather data from API
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if(!error) return;

    const timer = setTimeout(() => {
      setError(null);
    }, 5000)

    return () => clearTimeout(timer);
  }, [error])

  async function handleSearch(location: string) {
    setError(null);
    setWeather(null);

    try {
      const response = await fetch(`/api/weather?location=${encodeURIComponent(location)}`);

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      setWeather(data);
    } catch (error) {
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
        {weather && (
          <div className={styles.weather}>
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
          </div>
        )}
      </main>
    </div>
  );
}
