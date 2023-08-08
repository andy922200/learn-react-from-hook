export interface CurrentLocationWeatherResponse {
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
        location: any[];
    };
}