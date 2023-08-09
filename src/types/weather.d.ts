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

export type LocationWeatherResponse = WeatherResponseCore
export type WeatherForecastResponse = WeatherResponseCore