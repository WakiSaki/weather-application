import { cleanup, render, screen } from "@testing-library/react";
import { describe, expect, it, afterEach } from "vitest";
import WeatherSkeleton from "./WeatherSkeleton";

afterEach(() => {
    cleanup();
});

describe("WeatherSkeleton", () => {
    it("announces that weather is loading", () => {
        render(<WeatherSkeleton />);

        expect(screen.getByRole("status")).toHaveTextContent("Loading weather…");
    });

    it("hides the placeholder blocks from screen readers", () => {
        render(<WeatherSkeleton />);

        const blocks = screen.getAllByTestId("skeleton");

        expect(blocks.length).toBeGreaterThan(0);
        blocks.forEach((block) => {
            expect(block).toHaveAttribute("aria-hidden", "true");
        });
    });

    it("renders placeholders for the current card, 6 forecast days and 6 hours", () => {
        render(<WeatherSkeleton />);

        // Current card: 4 text bars + icon, forecast: 5 each, title: 1, hourly: 4 each
        expect(screen.getAllByTestId("skeleton")).toHaveLength(5 + 6 * 5 + 1 + 6 * 4);
    });
});
