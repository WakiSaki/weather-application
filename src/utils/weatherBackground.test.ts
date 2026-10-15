import { existsSync, readFileSync } from "fs";
import path from "path";
import { describe, expect, it } from "vitest";
import { getWeatherBackground } from "./weatherBackground";

const root = process.cwd();
const css = readFileSync(path.join(root, "src/components/WeatherCard.module.css"), "utf8");

describe("getWeatherBackground", () => {
    it("maps wintry condition codes to the wintry background", () => {
        expect(getWeatherBackground(1069)).toBe("wintry"); // Patchy sleet possible
        expect(getWeatherBackground(1198)).toBe("wintry"); // Light freezing rain
        expect(getWeatherBackground(1237)).toBe("wintry"); // Ice pellets
    });

    it("falls back to the default background for unknown codes", () => {
        expect(getWeatherBackground(9999)).toBe("default");
    });
});

describe("WeatherCard background images", () => {
    // Every url("/weather/...") in the CSS must point to a real file in public/
    const imagePaths = [...css.matchAll(/url\("(\/weather\/[^"]+)"\)/g)].map((match) => match[1]);

    it("finds background images in the CSS", () => {
        expect(imagePaths.length).toBeGreaterThan(0);
    });

    it.each(imagePaths)("%s exists in public/", (imagePath) => {
        expect(existsSync(path.join(root, "public", imagePath))).toBe(true);
    });
});
