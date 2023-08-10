import dayjs from "dayjs"
import { useState, useEffect, useCallback } from "react"
import { IWeatherElement } from "@/pages/RealtimeWeather"
import { fetchLocationWeather, fetchWeatherForecast, fetchSunriseSunset } from "@/api/weather"
import { LocationWeatherResponse, WeatherForecastResponse, SunTimeResponse } from "@/types/weather"
import { Moment } from "@/enum"

interface IUseWeatherAPIProps {
    locationName: string, 
    locationNameForecast: string, 
    latitude: string, 
    longitude: string
}

const parseLocationWeather = (rawData: LocationWeatherResponse | undefined):Partial<IWeatherElement | undefined> =>{
    if(!rawData?.records.location[0]) return undefined

    const { locationName, time, weatherElement }  = rawData.records.location[0]
    const weatherElements = weatherElement.reduce((acc:Record<string, any>, cur: Record<string, any>)=>{
        if(["WDSD", "TEMP"].includes(cur.elementName)){
            acc[cur.elementName] = cur.elementValue
        }
        return acc
    }, {})

    return {
        locationName,
        windSpeed: weatherElements.WDSD,
        temperature: weatherElements.TEMP,
        observationTime: time.obsTime
    }
}

const parseSunriseSunsetRes = (rawData: SunTimeResponse | undefined):Partial<IWeatherElement | undefined>  =>{
    if(!rawData?.results) return undefined

    return {
        sunrise: dayjs(rawData.results.sunrise).toDate(),
        sunset: dayjs(rawData.results.sunset).toDate(),
        moment: dayjs().isAfter(dayjs(rawData.results.sunrise)) && dayjs().isBefore(dayjs(rawData.results.sunset)) ? Moment.DAY : Moment.NIGHT
    }
}

const parseWeatherForecast = (rawData: WeatherForecastResponse | undefined):Partial<IWeatherElement | undefined> =>{
    if(!rawData?.records.location[0]) return undefined

    const { weatherElement } = rawData.records.location[0]
    const weatherElements = weatherElement.reduce((acc: Record<string, any>, cur: Record<string, any>)=>{
        if(["Wx", "PoP", "CI"].includes(cur.elementName)){
            acc[cur.elementName] = cur.time[0].parameter
        }
        return acc
    }, {})

    return {
        description: weatherElements.Wx.parameterName,
        weatherCode: weatherElements.Wx.parameterValue,
        rainPossibility: weatherElements.PoP.parameterName,
        comfortability: weatherElements.CI.parameterName,
    }
}

const useWeatherAPI = ({locationName, locationNameForecast, latitude, longitude}:IUseWeatherAPIProps):[IWeatherElement, () => Promise<void>] => {
    const [ weatherElement, setWeatherElement ] = useState<IWeatherElement>({
        locationName: "",
        locationNameForecast: "",
        latitude: "",
        longitude: "",
        moment: Moment.DAY,
        sunrise: new Date(),
        sunset: new Date(),
        description: "",
        windSpeed: 0,
        temperature: 0,
        rainPossibility: 0,
        observationTime: "2000-01-01 00:00:00",
        comfortability: "",
        weatherCode: "",
        isLoading: false
    })

    const fetchData = useCallback(async()=>{
        try{
            setWeatherElement(prevState =>({
                ...prevState,
                isLoading: true
            }))
    
            const [ locationWeatherRes, weatherForecastRes, sunriseSunsetRes ] = await Promise.all([
                fetchLocationWeather(locationName),
                fetchWeatherForecast(locationNameForecast),
                fetchSunriseSunset(latitude, longitude)
            ])
    
            const locationWeather = parseLocationWeather(locationWeatherRes)
            const weatherForecast = parseWeatherForecast(weatherForecastRes)
            const sunriseSunset = parseSunriseSunsetRes(sunriseSunsetRes)
    
            setWeatherElement(prevState =>({
                ...prevState,
                ... {
                    locationName,
                    locationNameForecast,
                    windSpeed: locationWeather?.windSpeed || 0,
                    temperature: locationWeather?.temperature || 0,
                    observationTime: locationWeather?.observationTime || "",
                    description: weatherForecast?.description || "",
                    rainPossibility: weatherForecast?.rainPossibility || 0,
                    weatherCode: weatherForecast?.weatherCode || "",
                    comfortability: weatherForecast?.comfortability || "",
                    sunrise: sunriseSunset?.sunrise || new Date(),
                    sunset: sunriseSunset?.sunset || new Date(),
                    moment: sunriseSunset?.moment || Moment.DAY,
                }
            }))
        }catch(err){
            console.log(err)
        }finally{
            setWeatherElement(prevState =>({
                ...prevState,
                isLoading: false
            }))
        }
    }, [locationName, locationNameForecast, latitude, longitude])

    useEffect(()=>{ fetchData()},[ fetchData ])

    return [ weatherElement, fetchData ]
}

export default useWeatherAPI