import { cleanup, render, screen } from "@testing-library/react";
import { describe, expect, it, afterEach } from "vitest";
import WeatherCard from "./WeatherCard";
import { mockWeather } from "@/test/mocks/weatherMocks";

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