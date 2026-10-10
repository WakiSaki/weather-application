import { cleanup, render, screen } from "@testing-library/react";
import { describe, expect, it, afterEach } from "vitest";
import WeatherCard from "./WeatherCard";
import { WeatherData } from "@/types/weather";

const mockWeather: WeatherData = {
  location: {
    city: "Minneapolis",
    state: "Minnesota",
  },
  current: {
    temperatureF: 65,
    temperatureC: 18.3,
    condition: "Sunny",
    icon: "//cdn.weatherapi.com/weather/icon.png",
    code: 1000,
  },
  forecast: [
    {
      date: "2026-10-09",
      highF: 68,
      lowF: 48,
      condition: "Partly cloudy",
      icon: "//cdn.weatherapi.com/weather/icon.png",
    },
  ],
  hourlyForecast: [
    {
      time: "2026-10-10 00:00",
      temperature: 54.7,
      condition: "Clear",
      icon: "//cdn.weatherapi.com/weather/icon.png"
    }
  ]
};

afterEach(() => {
    cleanup();
});

describe("WeatherCard", () => {
  it("renders the location", () => {
    render(<WeatherCard data={mockWeather} />);

    expect(screen.getByText("Minneapolis, Minnesota")).toBeInTheDocument();
  });

  it("renders the current temperature", () => {
    render(<WeatherCard data={mockWeather} />);

    expect(screen.getByText(/65/)).toBeInTheDocument();
  });

  it("renders the current condition", () => {
    render(<WeatherCard data={mockWeather} />);

    expect(screen.getByText("Sunny")).toBeInTheDocument();
  });
});