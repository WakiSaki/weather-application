import { WeatherData } from "@/types/weather";

export function transformWeather(data: any): WeatherData {
    return {
        location: {
            city: data.location.name,
            state: data.location.region
        },
        current: {
            temperatureF: data.current.temp_f,
            temperatureC: data.current.temp_c,
            condition: data.current.condition.text,
            icon: data.current.condition.icon
        }
    };
}