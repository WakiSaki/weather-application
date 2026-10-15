import { WeatherData } from "@/types/weather";
import { WeatherApiResponse } from "@/types/weatherApi";

export function transformWeather(data: WeatherApiResponse): WeatherData {
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
        forecast: data.forecast.forecastday.map((day) => ({
            date: day.date,
            highF: day.day.maxtemp_f,
            lowF: day.day.mintemp_f,
            highC: day.day.maxtemp_c,
            lowC: day.day.mintemp_c,
            condition: day.day.condition.text,
            icon: day.day.condition.icon
        })),
        hourlyForecast: data.forecast.forecastday[0].hour.map((hour) => ({
            time: hour.time,
            temperatureF: hour.temp_f,
            temperatureC: hour.temp_c,
            condition: hour.condition.text,
            icon: hour.condition.icon
        }))
    };
}