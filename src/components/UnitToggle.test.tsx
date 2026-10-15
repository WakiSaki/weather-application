import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, afterEach, vi } from "vitest";
import UnitToggle from "./UnitToggle";

afterEach(() => {
    cleanup();
});

describe("UnitToggle", () => {
    it("marks the selected unit as pressed", () => {
        render(<UnitToggle unit="F" onChange={() => {}} />);

        expect(screen.getByRole("button", { name: "°F" })).toHaveAttribute("aria-pressed", "true");
        expect(screen.getByRole("button", { name: "°C" })).toHaveAttribute("aria-pressed", "false");
    });

    it("calls onChange with the clicked unit", async () => {
        const onChange = vi.fn();
        render(<UnitToggle unit="F" onChange={onChange} />);

        await userEvent.click(screen.getByRole("button", { name: "°C" }));

        expect(onChange).toHaveBeenCalledWith("C");
    });
});
