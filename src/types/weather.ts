export type TemperatureUnit = "F" | "C";

export type ForecastDay = {
    date: string;
    highF: number;
    lowF: number;
    highC: number;
    lowC: number;
    condition: string;
    icon: string;
};

export type HourlyForecast = {
    time: string;
    temperatureF: number;
    temperatureC: number;
    condition: string;
    icon: string;
};

export type WeatherData = {
    location: {
        city: string;
        state: string;
    };
    current: {
        temperatureF: number;
        temperatureC: number;
        condition: string;
        icon: string;
        code: number;
    };
    forecast: ForecastDay[];
    hourlyForecast: HourlyForecast[];
};