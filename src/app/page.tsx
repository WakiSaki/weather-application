"use client"

import Image from "next/image";
import styles from "./page.module.css";
import SearchBar from "@/components/SearchBar";
import { useState } from "react";

export default function Home() {
  const [location, setLocation] = useState("");

  function handleSearch(location: string) {
    setLocation(location);
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <SearchBar onSearch={ handleSearch }/>
        <p className={styles.location}>{location}</p>
      </main>
    </div>
  );
}
