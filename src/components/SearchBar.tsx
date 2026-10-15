"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./SearchBar.module.css";
import { LocationSuggestion } from "@/types/location";

interface SearchBarProps {
    onSearch: (location: string) => Promise<void>;
    errorMessage: (message: string) => void;
}

export default function SearchBar({ onSearch, errorMessage }: SearchBarProps) {
    const [location, setLocation] = useState("");
    const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const suggestionSelected = useRef(false);
    const suppressSuggestions = useRef(false);

    useEffect(() => {
        if (suggestionSelected.current) {
            suggestionSelected.current = false;
            return;
        }

        // Short queries are cleared in the input's onChange handler
        if (location.trim().length < 2) {
            return;
        }

        const controller = new AbortController();

        const timeoutId = setTimeout(async () => {
            try {
                const response = await fetch(
                    `/api/locations?query=${encodeURIComponent(location.trim())}`,
                    { signal: controller.signal }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch locations");
                }

                const data: LocationSuggestion[] = await response.json();
                if (
                    !controller.signal.aborted &&
                    !suppressSuggestions.current
                ) {
                    setSuggestions(data);
                    setIsOpen(data.length > 0);
                }
            } catch (error) {
                if (
                    error instanceof Error &&
                    error.name === "AbortError"
                ) {
                    return;
                }

                if (!controller.signal.aborted) {
                    setSuggestions([]);
                    setIsOpen(false);
                }
            }
        }, 300);

        return () => {
            clearTimeout(timeoutId);
            controller.abort();
        };
    }, [location]);

    async function handleSearch() {
        const trimmedLocation = location.trim();

        if (!trimmedLocation) {
            errorMessage("Please enter a location.");
            return;
        }

        suppressSuggestions.current = true;

        setIsOpen(false);
        setSuggestions([]);

        await onSearch(trimmedLocation);
    }

    return(
        <div className={styles.container}>
            <label htmlFor="location">What city would you like to see the weather for?</label>
            <form 
                className={styles.search}
                onSubmit={(event) => {
                    event.preventDefault();
                    handleSearch();
                }}
                autoComplete="off"
            >
                <input type="text" placeholder="Search for a city..."
                    id="location"
                    className={styles.input}
                    value={location} 
                    onChange={(event) => {
                        const value = event.target.value;

                        suppressSuggestions.current = false;
                        setLocation(value);

                        // Clear suggestions here rather than in the effect to avoid an extra render
                        if (value.trim().length < 2) {
                            setSuggestions([]);
                            setIsOpen(false);
                        }
                    }}
                    autoComplete="off"
                />
                {isOpen && suggestions.length > 0 && (
                    <ul className={styles.suggestions}>
                        {suggestions.map((suggestion) => (
                            <li key={suggestion.id}>
                                <button
                                    type="button"
                                    onClick={() => {
                                        suggestionSelected.current = true;

                                        setLocation(`${suggestion.name}, ${suggestion.region}`);
                                        setSuggestions([]);
                                        setIsOpen(false);

                                        onSearch(`${suggestion.lat},${suggestion.lon}`);
                                    }}
                                >
                                    {suggestion.name}, {suggestion.region},{" "}
                                    {suggestion.country}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
                <button
                    type="submit"
                    className={styles.button}
                >
                    Search
                </button>
            </form>
        </div>
    );
}