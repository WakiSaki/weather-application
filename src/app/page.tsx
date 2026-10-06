"use client"

import styles from "./page.module.css";
import SearchBar from "@/components/SearchBar";
import WeatherCard from "@/components/WeatherCard";
import { useState } from "react";

export default function Home() {
  type Weather = {
    city: string;
    state: string;
    temperature: number;
  }

  const [weather, setWeather] = useState<Weather | null>(null); // Store weather data from API

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
            <WeatherCard data={weather} />
          )
        }
      </main>
    </div>
  );
}
