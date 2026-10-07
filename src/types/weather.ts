export type WeatherData = {
    location: {
        city: string;
        state: string;
    }
    current: {
        temperatureF: number;
        temperatureC: number;
        condition: string;
        icon: string;
    }
}