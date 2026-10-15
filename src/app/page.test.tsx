import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, afterEach, vi } from "vitest";
import Home from "./page";
import { mockWeather } from "@/test/mocks/weatherMocks";
import { WeatherData } from "@/types/weather";

// Replace the real search bar with a button that triggers a search directly
vi.mock("@/components/SearchBar", () => ({
    default: ({ onSearch }: { onSearch: (location: string) => Promise<void> }) => (
        <button onClick={() => onSearch("Minneapolis")}>Search</button>
    ),
}));

function weatherWithDays(days: number): WeatherData {
    return {
        ...mockWeather,
        forecast: Array.from({ length: days }, (_, i) => ({
            ...mockWeather.forecast[0],
            date: `2026-10-${String(9 + i).padStart(2, "0")}`,
        })),
    };
}

const weeklyWeather = weatherWithDays(7);

function deferredFetch() {
    let resolve!: (value: unknown) => void;
    const promise = new Promise((r) => { resolve = r; });
    vi.stubGlobal("fetch", vi.fn().mockReturnValue(promise));
    return resolve;
}

afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
    localStorage.clear();
});

describe("Home loading state", () => {
    it("shows the skeleton while weather is loading", async () => {
        deferredFetch();
        render(<Home />);

        await userEvent.click(screen.getByRole("button", { name: "Search" }));

        expect(screen.getByRole("status")).toHaveTextContent("Loading weather…");
        expect(screen.queryByText("Minneapolis, Minnesota")).not.toBeInTheDocument();
    });

    it("replaces the skeleton with weather data once loaded", async () => {
        const resolve = deferredFetch();
        render(<Home />);

        await userEvent.click(screen.getByRole("button", { name: "Search" }));

        await act(async () => {
            resolve({ ok: true, json: async () => weeklyWeather });
        });

        await waitFor(() => {
            expect(screen.queryByRole("status")).not.toBeInTheDocument();
        });
        expect(screen.getByText("Minneapolis, Minnesota")).toBeInTheDocument();
    });

    it("renders only the forecast days the API returns", async () => {
        const resolve = deferredFetch();
        render(<Home />);

        await userEvent.click(screen.getByRole("button", { name: "Search" }));

        // Free WeatherAPI plans return 3 days: today plus 2 upcoming
        await act(async () => {
            resolve({ ok: true, json: async () => weatherWithDays(3) });
        });

        await waitFor(() => {
            expect(screen.getByText("Minneapolis, Minnesota")).toBeInTheDocument();
        });
        expect(screen.getAllByText(/^High:/)).toHaveLength(2);
    });

    it("removes the skeleton and shows an alert when the request fails", async () => {
        const resolve = deferredFetch();
        render(<Home />);

        await userEvent.click(screen.getByRole("button", { name: "Search" }));

        await act(async () => {
            resolve({ ok: false, json: async () => ({ error: "Location not found" }) });
        });

        await waitFor(() => {
            expect(screen.queryByRole("status")).not.toBeInTheDocument();
        });
        expect(screen.getByText("Location not found")).toBeInTheDocument();
    });
});

describe("Home unit toggle", () => {
    async function renderWithWeather() {
        const resolve = deferredFetch();
        render(<Home />);

        await userEvent.click(screen.getByRole("button", { name: "Search" }));

        await act(async () => {
            resolve({ ok: true, json: async () => weeklyWeather });
        });

        await waitFor(() => {
            expect(screen.getByText("Minneapolis, Minnesota")).toBeInTheDocument();
        });
    }

    it("shows Fahrenheit by default", async () => {
        await renderWithWeather();

        expect(screen.getByRole("button", { name: "°F" })).toHaveAttribute("aria-pressed", "true");
        expect(screen.getByText("65°F")).toBeInTheDocument();
        expect(screen.getAllByText("High: 68°F").length).toBeGreaterThan(0);
    });

    it("switches every temperature to Celsius without refetching", async () => {
        await renderWithWeather();

        await userEvent.click(screen.getByRole("button", { name: "°C" }));

        expect(screen.getByRole("button", { name: "°C" })).toHaveAttribute("aria-pressed", "true");
        expect(screen.getByText("18.3°C")).toBeInTheDocument();
        expect(screen.getAllByText("High: 20°C").length).toBeGreaterThan(0);
        expect(screen.queryByText("65°F")).not.toBeInTheDocument();
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    it("remembers the selected unit", async () => {
        localStorage.setItem("unit", "C");

        await renderWithWeather();

        expect(screen.getByRole("button", { name: "°C" })).toHaveAttribute("aria-pressed", "true");
        expect(screen.getByText("18.3°C")).toBeInTheDocument();
    });
});
