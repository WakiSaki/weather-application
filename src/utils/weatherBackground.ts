export type WeatherBackground =
    | "sunny"
    | "cloudy"
    | "rainy"
    | "snow"
    | "stormy"
    | "foggy"
    | "wintry"
    | "dusty"
    | "default";

const weatherBackgrounds: Record<number, WeatherBackground> = {
    // Sunny / clear
    1000: "sunny",

    // Cloudy
    1003: "cloudy",
    1006: "cloudy",
    1009: "cloudy",

    // Dust, haze, smoke, smog, mist, and fog
    1012: "foggy",
    1015: "dusty",
    1018: "dusty",
    1021: "dusty",
    1024: "dusty",
    1027: "dusty",
    1030: "foggy",
    1033: "foggy",
    1036: "foggy",
    1039: "foggy",
    1042: "foggy",
    1045: "dusty",
    1048: "dusty",
    1135: "foggy",
    1147: "foggy",

    // Possible rain
    1063: "rainy",

    // Possible snow, sleet, or freezing drizzle
    1066: "snow",
    1069: "wintry",
    1072: "wintry",

    // Possible thunderstorms
    1087: "stormy",

    // Blowing snow and blizzards
    1114: "snow",
    1117: "snow",

    // Drizzle
    1150: "rainy",
    1153: "rainy",
    1168: "wintry",
    1171: "wintry",

    // Rain
    1180: "rainy",
    1183: "rainy",
    1186: "rainy",
    1189: "rainy",
    1192: "rainy",
    1195: "rainy",

    // Freezing rain
    1198: "wintry",
    1201: "wintry",

    // Sleet
    1204: "wintry",
    1207: "wintry",

    // Snow
    1210: "snow",
    1213: "snow",
    1216: "snow",
    1219: "snow",
    1222: "snow",
    1225: "snow",

    // Ice pellets
    1237: "wintry",

    // Rain showers
    1240: "rainy",
    1243: "rainy",
    1246: "rainy",

    // Sleet showers
    1249: "wintry",
    1252: "wintry",

    // Snow showers
    1255: "snow",
    1258: "snow",

    // Ice pellet showers
    1261: "wintry",
    1264: "wintry",

    // Thunderstorms with rain or snow
    1273: "stormy",
    1276: "stormy",
    1279: "stormy",
    1282: "stormy",
};

export function getWeatherBackground(
    code: number
): WeatherBackground {
    return weatherBackgrounds[code] ?? "default";
}