"use client";

import { useState } from "react";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
    onSearch: (location: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
    const [location, setLocation] = useState("");

    function handleSearch() {
        if(!location){  // Handle empty searches
            console.log("Please enter a location");
            return;
        }
        onSearch(location);
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
                       className={styles.input}
                       value={location} onChange={((event) => setLocation(event.target.value))}
                />
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