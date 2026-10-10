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
        render(<HourlyForecast hour={mockHour} />);

        expect(screen.getByText("12:00 AM")).toBeInTheDocument();
    });

    it("renders the temperature with the Fahrenheit symbol", () => {
        render(<HourlyForecast hour={mockHour} />);

        expect(screen.getByText("54.7°F")).toBeInTheDocument();
    });

    it("renders the weather condition", () => {
        render(<HourlyForecast hour={mockHour} />);

        expect(screen.getByText("Clear")).toBeInTheDocument();
    });

    it("renders the weather icon with the correct source", () => {
        render(<HourlyForecast hour={mockHour} />);

        const icon = screen.getByRole("img");

        expect(icon).toHaveAttribute(
            "src",
            `http:${mockHour.icon}`
        );
    });
});