import { WeatherData } from "@/types/weather";

export const mockWeather: WeatherData = {
  location: {
    city: "Minneapolis",
    state: "Minnesota",
  },
  current: {
    temperatureF: 65,
    temperatureC: 18.3,
    condition: "Sunny",
    icon: "//cdn.weatherapi.com/weather/icon.png",
    code: 1000,
  },
  forecast: [
    {
      date: "2026-10-09",
      highF: 68,
      lowF: 48,
      condition: "Partly cloudy",
      icon: "//cdn.weatherapi.com/weather/icon.png",
    },
  ],
  hourlyForecast: [
    {
      time: "2026-10-10 00:00",
      temperature: 54.7,
      condition: "Clear",
      icon: "//cdn.weatherapi.com/weather/icon.png"
    }
  ]
};