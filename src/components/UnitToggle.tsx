"use client"

import styles from "./UnitToggle.module.css";
import { TemperatureUnit } from "@/types/weather";

interface UnitToggleProps {
    unit: TemperatureUnit;
    onChange: (unit: TemperatureUnit) => void;
}

const UNITS: TemperatureUnit[] = ["F", "C"];

export default function UnitToggle({ unit, onChange }: UnitToggleProps) {
    return (
        <div className={styles.toggle} role="group" aria-label="Temperature unit">
            {UNITS.map((option) => (
                <button
                    key={option}
                    type="button"
                    className={`${styles.option} ${unit === option ? styles.active : ""}`}
                    aria-pressed={unit === option}
                    onClick={() => onChange(option)}
                >
                    °{option}
                </button>
            ))}
        </div>
    );
}
