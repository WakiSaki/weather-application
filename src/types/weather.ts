
export type ForecastDay = {
    date: string;
    highF: number;
    lowF: number;
    condition: string;
    icon: string;
};

export type HourlyForecast = {
    time: string;
    temperature: number;
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
    };
    forecast: ForecastDay[];
    hourlyForecast: HourlyForecast[];
};