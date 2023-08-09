interface WeatherResponseCore {
    success: string;
    result: {
        resource_id: string;
        fields: {
            id: string;
            type: "String" | "Timestamp";
        }[];
    };
    records: {
        datasetDescription: string;
        location: Record<string, any>[];
    };
}

export interface SunTimeInfo {
    sunrise: string;
    sunset: string;
    solar_noon: string;
    day_length: number;
    civil_twilight_begin: string;
    civil_twilight_end: string;
    nautical_twilight_begin: string;
    nautical_twilight_end: string;
    astronomical_twilight_begin: string;
    astronomical_twilight_end: string;
}

export interface SunTimeResponse {
    results: SunTimeInfo;
    status: string;
}

export type LocationWeatherResponse = WeatherResponseCore
export type WeatherForecastResponse = WeatherResponseCore