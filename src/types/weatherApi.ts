// Shape of the WeatherAPI.com forecast response, limited to the fields the app reads

export type WeatherApiCondition = {
    text: string;
    icon: string;
    code: number;
};

export type WeatherApiHour = {
    time: string;
    temp_f: number;
    temp_c: number;
    condition: WeatherApiCondition;
};

export type WeatherApiForecastDay = {
    date: string;
    day: {
        maxtemp_f: number;
        mintemp_f: number;
        maxtemp_c: number;
        mintemp_c: number;
        condition: WeatherApiCondition;
    };
    hour: WeatherApiHour[];
};

export type WeatherApiResponse = {
    location: {
        name: string;
        region: string;
    };
    current: {
        temp_f: number;
        temp_c: number;
        condition: WeatherApiCondition;
    };
    forecast: {
        forecastday: WeatherApiForecastDay[];
    };
};
