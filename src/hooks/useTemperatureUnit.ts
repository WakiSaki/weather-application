import { useSyncExternalStore } from "react";
import { TemperatureUnit } from "@/types/weather";

const STORAGE_KEY = "unit";
const DEFAULT_UNIT: TemperatureUnit = "F";

const listeners = new Set<() => void>();

// Used when localStorage is unavailable (e.g. private browsing) so the toggle still works
let fallbackUnit: TemperatureUnit = DEFAULT_UNIT;

function subscribe(listener: () => void) {
    listeners.add(listener);
    // Keep other open tabs in sync
    window.addEventListener("storage", listener);

    return () => {
        listeners.delete(listener);
        window.removeEventListener("storage", listener);
    };
}

function getSnapshot(): TemperatureUnit {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved === "F" || saved === "C" ? saved : DEFAULT_UNIT;
    } catch {
        return fallbackUnit;
    }
}

// The server can't read localStorage, so it always renders the default
function getServerSnapshot(): TemperatureUnit {
    return DEFAULT_UNIT;
}

function setUnit(unit: TemperatureUnit) {
    fallbackUnit = unit;
    try {
        localStorage.setItem(STORAGE_KEY, unit);
    } catch {
        // Ignore storage failures; fallbackUnit covers this visit
    }
    listeners.forEach((listener) => listener());
}

export function useTemperatureUnit() {
    const unit = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
    return [unit, setUnit] as const;
}
