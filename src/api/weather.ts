import { CurrentLocationWeatherResponse } from "@/types/weather"

export const fetchCurrentLocationWeather = async (locationName: string):Promise<CurrentLocationWeatherResponse | undefined>=>{
    try{
        if(!import.meta.env.VITE_CWB_TW_TOKEN) throw new Error("No Valid Token")

        const res = await fetch(`https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=${import.meta.env.VITE_CWB_TW_TOKEN}&locationName=${locationName}`)
        const data = await res.json()

        return data
    }catch(err){
        console.log(err)
    }
}