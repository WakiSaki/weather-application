import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi, afterEach } from "vitest";
import SearchBar from "./SearchBar";

afterEach(() => {
  cleanup();
});

describe("SearchBar", () => {
  it("renders the search input and button", () => {
    render(<SearchBar onSearch={vi.fn()} errorMessage={vi.fn()}/>);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /search/i })
    ).toBeInTheDocument();
  });

  it("calls onSearch with the entered location", async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();
    const errorMessage = vi.fn();

    render(<SearchBar onSearch={onSearch} errorMessage={errorMessage}/>);

    const input = screen.getByRole("textbox");

    await user.type(input, "Minneapolis");
    await user.click(screen.getByRole("button", { name: /search/i }));

    expect(onSearch).toHaveBeenCalledWith("Minneapolis");
  });
});