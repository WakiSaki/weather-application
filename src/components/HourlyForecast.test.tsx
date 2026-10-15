import { render, screen, cleanup } from "@testing-library/react";
import { describe, expect, it, afterEach } from "vitest";
import HourlyForecast from "./HourlyForecast";
import { mockWeather } from "@/test/mocks/weatherMocks";

afterEach(() => {
    cleanup();
});

const mockHour = mockWeather.hourlyForecast[0];

describe("HourlyForecast", () => {
    it("renders the formatted time", () => {
        render(<HourlyForecast hour={mockHour} unit="F" />);

        expect(screen.getByText("12:00 AM")).toBeInTheDocument();
    });

    it("renders the temperature with the Fahrenheit symbol", () => {
        render(<HourlyForecast hour={mockHour} unit="F" />);

        expect(screen.getByText("54.7°F")).toBeInTheDocument();
    });

    it("renders the temperature with the Celsius symbol", () => {
        render(<HourlyForecast hour={mockHour} unit="C" />);

        expect(screen.getByText("12.6°C")).toBeInTheDocument();
    });

    it("renders the weather condition", () => {
        render(<HourlyForecast hour={mockHour} unit="F" />);

        expect(screen.getByText("Clear")).toBeInTheDocument();
    });

    it("renders the weather icon with the correct source", () => {
        render(<HourlyForecast hour={mockHour} unit="F" />);

        const icon = screen.getByRole("img");

        expect(icon).toHaveAttribute(
            "src",
            `https:${mockHour.icon}`
        );
    });
});