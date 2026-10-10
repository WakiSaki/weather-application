import { render, screen, cleanup, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi, afterEach, beforeEach } from "vitest";
import SearchBar from "./SearchBar";
import { LocationSuggestion } from "@/types/location";

afterEach(() => {
  cleanup();
  vi.resetAllMocks();
  vi.useRealTimers();
});

const mockSuggestions: LocationSuggestion[] = [
    {
        id: 1,
        name: "Minneapolis",
        region: "Minnesota",
        country: "United States of America",
        lat: 44.9778,
        lon: -93.265,
        url: "minneapolis-minnesota-united-states-of-america"
    },
    {
        id: 2,
        name: "Minneapolis",
        region: "Kansas",
        country: "United States of America",
        lat: 39.1211,
        lon: -97.7067,
        url: "minneapolis-kansas-united-states-of-america"
    },
];

function mockFetchResponse(data: LocationSuggestion[]) {
    return vi.fn().mockResolvedValue({
        ok: true,
        json: async () => data,
    });
}

describe("SearchBar", () => {
  const onSearch = vi.fn().mockResolvedValue(undefined);
  const errorMessage = vi.fn();

  beforeEach(() => {
        vi.clearAllMocks();
    });

  it("renders the search input and button", () => {
    render(<SearchBar onSearch={onSearch} errorMessage={errorMessage}/>);

    expect(
      screen.getByLabelText("What city would you like to see the weather for?")
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Search for a city...")
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Search" })
    ).toBeInTheDocument();
  });

  it("displays an error when submitting an empty location", async () => {
    const user = userEvent.setup();

    render(
      <SearchBar
          onSearch={onSearch}
          errorMessage={errorMessage}
      />
    );

    await user.click(screen.getByRole("button", { name: "Search" }));

    expect(errorMessage).toHaveBeenCalledWith("Please enter a location.");

    expect(onSearch).not.toHaveBeenCalled();
  });

  it("displays an error when submitting whitespace", async () => {
    const user = userEvent.setup();

    render(
      <SearchBar
          onSearch={onSearch}
          errorMessage={errorMessage}
      />
    );

    await user.type(screen.getByPlaceholderText("Search for a city..."), "   ");

    await user.click(screen.getByRole("button", { name: "Search" }));

    expect(errorMessage).toHaveBeenCalledWith("Please enter a location.");

    expect(onSearch).not.toHaveBeenCalled();
  });

  it("calls onSearch with the trimmed location", async () => {
    const user = userEvent.setup();

    render(
      <SearchBar
        onSearch={onSearch}
        errorMessage={errorMessage}
      />
    );

    const input = screen.getByPlaceholderText("Search for a city...");

    await user.type(input, "  Minneapolis  ");

    await user.click(screen.getByRole("button", { name: "Search" }));

    await waitFor(() => {
      expect(onSearch).toHaveBeenCalledWith("Minneapolis");
    });

    expect(errorMessage).not.toHaveBeenCalled();
  });

it("fetches suggestions after the user enters at least two characters", async () => {
    const fetchMock = mockFetchResponse(mockSuggestions);
    vi.stubGlobal("fetch", fetchMock);

    const user = userEvent.setup();

    render(
      <SearchBar
        onSearch={onSearch}
        errorMessage={errorMessage}
      />
    );

    await user.type(
      screen.getByPlaceholderText("Search for a city..."),
      "Min"
    );

    // Verify that suggestions eventually appear.
    expect(
      await screen.findByRole("button", {
        name: /Minneapolis, Minnesota/,
      })
    ).toBeInTheDocument();

    // Verify the correct API request was made.
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/locations?query=Min",
      expect.objectContaining({
        signal: expect.any(AbortSignal),
      })
    );

    // Verify both suggestions are displayed.
    expect(
      screen.getByRole("button", {
        name: /Minneapolis, Kansas/,
      })
    ).toBeInTheDocument();
  });

  it("does not fetch suggestions when the input contains fewer than two characters", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const user = userEvent.setup();

    render(
      <SearchBar
        onSearch={onSearch}
        errorMessage={errorMessage}
      />
    );

    await user.type(
      screen.getByPlaceholderText("Search for a city..."),
      "M"
    );

    // The component should not request suggestions for one character.
    expect(fetchMock).not.toHaveBeenCalled();

    // No suggestions list should be displayed.
    expect(
      screen.queryByRole("list")
    ).not.toBeInTheDocument();
  });

  it("displays no suggestions when the API returns an empty array", async () => {
    const fetchMock = mockFetchResponse([]);
    vi.stubGlobal("fetch", fetchMock);

    const user = userEvent.setup();

    render(
      <SearchBar
        onSearch={onSearch}
        errorMessage={errorMessage}
      />
    );

    await user.type(
      screen.getByPlaceholderText("Search for a city..."),
      "XYZ"
    );

    // Wait for the debounced API request.
    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        "/api/locations?query=XYZ",
        expect.objectContaining({
          signal: expect.any(AbortSignal),
        })
      );
    });

    // The API returned no suggestions, so none should appear.
    expect(
      screen.queryByRole("list")
    ).not.toBeInTheDocument();
  });

  it("calls onSearch with the selected suggestion's coordinates", async () => {
    const fetchMock = mockFetchResponse(mockSuggestions);
    vi.stubGlobal("fetch", fetchMock);

    const user = userEvent.setup();

    render(
      <SearchBar
        onSearch={onSearch}
        errorMessage={errorMessage}
      />
    );

    // Enter a location to trigger autocomplete.
    await user.type(
      screen.getByPlaceholderText("Search for a city..."),
      "Min"
    );

    // Wait for the debounced API request to complete.
    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        "/api/locations?query=Min",
        expect.objectContaining({
          signal: expect.any(AbortSignal),
        })
      );
    });

    // Wait for the suggestions to appear.
    const suggestion = await screen.findByRole("button", {
      name: /Minneapolis, Minnesota/,
    });

    // Select the suggestion.
    await user.click(suggestion);

    // Verify the correct coordinates were submitted.
    expect(onSearch).toHaveBeenCalledWith("44.9778,-93.265");

    // Verify the input displays the selected city and region.
    expect(
      screen.getByPlaceholderText("Search for a city...")
    ).toHaveValue("Minneapolis, Minnesota");

    // Verify the suggestions have closed.
    expect(
      screen.queryByRole("list")
    ).not.toBeInTheDocument();
  });

  it("handles a network error without displaying suggestions", async () => {
    const fetchMock = vi.fn().mockRejectedValue(
      new Error("Network error")
    );

    vi.stubGlobal("fetch", fetchMock);

    const user = userEvent.setup();

    render(
      <SearchBar
        onSearch={onSearch}
        errorMessage={errorMessage}
      />
    );

    await user.type(
      screen.getByPlaceholderText("Search for a city..."),
      "Min"
    );

    // Wait for the debounced request to complete.
    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        "/api/locations?query=Min",
        expect.objectContaining({
          signal: expect.any(AbortSignal),
        })
      );
    }, { timeout: 2000 });

    // The failed request should not display suggestions.
    expect(
      screen.queryByRole("list")
    ).not.toBeInTheDocument();
  });
});