import { cleanup, render, screen } from "@testing-library/react";
import { describe, expect, it, afterEach, vi } from "vitest";
import WeatherCard from "./WeatherCard";
import { mockWeather } from "@/test/mocks/weatherMocks";
import { getWeatherBackground } from "@/utils/weatherBackground";

afterEach(() => {
    cleanup();
    vi.clearAllMocks();
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

  it("renders the formatted date", () => {
    render(<WeatherCard data={mockWeather} />);

    const expectedDate = new Date(
      `${mockWeather.forecast[0].date}T00:00:00`
    ).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });

    expect(screen.getByText(expectedDate)).toBeInTheDocument();
  });

  it("renders the weather icon with the correct source", () => {
    render(<WeatherCard data={mockWeather} />);

    const icon = document.querySelector("img");

    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute(
      "src",
      `https:${mockWeather.current.icon}`
    );
  });

  it("calls getWeatherBackground with the current weather code", async () => {
    const spy = vi.spyOn(
      await import("@/utils/weatherBackground"),
      "getWeatherBackground"
    );

    render(<WeatherCard data={mockWeather} />);

    expect(spy).toHaveBeenCalledWith(mockWeather.current.code);

    spy.mockRestore();
  });
});