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
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);

    const suggestionSelected = useRef(false);
    const suppressSuggestions = useRef(false);

    useEffect(() => {
        if (suggestionSelected.current) {
            suggestionSelected.current = false;
            return;
        }

        if (location.trim().length < 2) {
            setSuggestions([]);
            setIsOpen(false);
            setIsLoading(false);
            return;
        }

        const controller = new AbortController();

        const timeoutId = setTimeout(async () => {
            setIsLoading(true);

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
                    setActiveIndex(-1);
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
            } finally {
                if (!controller.signal.aborted) {
                    setIsLoading(false);
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
        setActiveIndex(-1);
        setIsLoading(false);

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
            >
                <input type="text" placeholder="Search for a city..."
                    id="location"
                    className={styles.input}
                    value={location} 
                    onChange={(event) => {
                        suppressSuggestions.current = false;
                        setLocation(event.target.value);
                    }}
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
                                        setActiveIndex(-1);
                                        setIsLoading(false);

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