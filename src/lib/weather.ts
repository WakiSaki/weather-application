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
            icon: data.current.condition.icon,
            code: data.current.condition.code
        },
        forecast: data.forecast.forecastday.map((day: any) => ({
            date: day.date,
            highF: day.day.maxtemp_f,
            lowF: day.day.mintemp_f,
            condition: day.day.condition.text,
            icon: day.day.condition.icon
        })),
        hourlyForecast: data.forecast.forecastday[0].hour.map((hour: any) => ({
            time: hour.time,
            temperature: hour.temp_f,
            condition: hour.condition.text,
            icon: hour.condition.icon
        }))
    };
}