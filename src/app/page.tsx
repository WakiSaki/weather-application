"use client"

import styles from "./page.module.css";
import SearchBar from "@/components/SearchBar";
import WeatherCard from "@/components/WeatherCard";
import ForecastCard from "@/components/ForecastCard";
import { WeatherData } from "@/types/weather";
import { useState } from "react";

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null); // Store weather data from API

  async function handleSearch(location: string) {
    try {
      const response = await fetch(`/api/weather?location=${encodeURIComponent(location)}`);

      if (!response.ok) {
        const errorData = await response.json();

        console.error("API error:", errorData);

        throw new Error(errorData.error || "Failed to fetch weather data");
      }

      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <SearchBar onSearch={ handleSearch }/>
        {
          weather && (
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
            </div>
          )
        }
      </main>
    </div>
  );
}
