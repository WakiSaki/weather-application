"use client";

import { useState } from "react";
import styles from "./SearchBar.module.css";

export default function SearchBar() {
    const [location, setLocation] = useState("");

    function handleSearch() {
        if(!location){  // Handle empty searches
            console.log("Please enter a location");
            return;
        }
        console.log("Searching for " + location);
    }

    return(
        <div className={styles.container}>
            <label htmlFor="location">What city would you like to see the weather for?</label>
            <section className={styles.search}>
                <input type="text" placeholder="Search for a city..."
                       className={styles.input}
                       value={location} onChange={((event) => setLocation(event.target.value))}
                />
                <button
                    onClick={handleSearch}
                    className={styles.button}
                >
                    Search
                </button>
            </section>
        </div>
    );
}