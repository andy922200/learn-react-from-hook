import { useState, useEffect, useCallback } from "react"
import styled from "@emotion/styled"
import dayjs from "dayjs"
import { WeatherCard, SwitchModeBtn } from "@/components/RealtimeWeather/"
import { ThemeProvider } from "@emotion/react"
import { ThemeMode, Moment, MomentType } from "@/enum"
import { fetchLocationWeather, fetchWeatherForecast, fetchSunriseSunset } from "@/api/weather"
import { LocationWeatherResponse, WeatherForecastResponse, SunTimeResponse } from "@/types/weather"

const theme = {
    light: {
        backgroundColor: "#ededed",
        foregroundColor: "#f9f9f9",
        boxShadow: "0 1px 3px 0 #999999",
        titleColor: "#212121",
        temperatureColor: "#757575",
        textColor: "#828282",
    },
    dark: {
        backgroundColor: "#1F2022",
        foregroundColor: "#121416",
        boxShadow:
            "0 1px 4px 0 rgba(12, 12, 13, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.15)",
        titleColor: "#f9f9fa",
        temperatureColor: "#dddddd",
        textColor: "#cccccc",
    },
};

const Container = styled.div`
    background-color:${({ theme }) => theme.backgroundColor };
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

export interface IWeatherElement {
    locationName: string,
    locationNameForecast: string,
    latitude: string,
    longitude: string,
    moment: MomentType,
    sunrise: Date,
    sunset: Date,
    description: string,
    windSpeed: number,
    temperature: number,
    rainPossibility: number,
    observationTime: string,
    comfortability: string,
    weatherCode: string,
    isLoading: boolean
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

const RealtimeWeather = () => {
    const [ currentTheme, setCurrentTheme ] = useState(ThemeMode.LIGHT)
    const [ weatherElement, setWeatherElement ] = useState({
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

    const fetchData = useCallback(async({locationName, locationNameForecast, latitude, longitude}:{locationName: string, locationNameForecast: string, latitude: string, longitude: string})=>{
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
    }, [])

    useEffect(()=>{
        fetchData({
            locationName: "臺北", 
            locationNameForecast: "臺北市", 
            latitude: "25.09108", 
            longitude:  "121.5598"
        })
    },[ fetchData ])

    return (
        <ThemeProvider theme={theme[currentTheme]}>
            <SwitchModeBtn currentTheme={currentTheme} setCurrentTheme={setCurrentTheme} />
            <Container>
                <WeatherCard weatherElement={weatherElement} fetchData={fetchData} />
            </Container>
        </ThemeProvider>
    )
}

export default RealtimeWeather