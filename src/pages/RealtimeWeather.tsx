import { useState, useEffect, useCallback } from "react"
import styled from "@emotion/styled"
import {
    AirFlow, Celsius, CurrentWeather, Description, Location, Rain, Refresh, Temperature, SwitchModeBtn, WeatherIcon
} from "@/components/RealtimeWeather/"
import { ReactComponent as AirFlowIcon } from "@/assets/images/airFlow.svg"
import { ReactComponent as RainIcon } from "@/assets/images/rain.svg"
import { ReactComponent as RefreshIcon } from "@/assets/images/refresh.svg"
import { ReactComponent as LoadingIcon } from "@/assets/images/loading.svg"
import { ThemeProvider } from "@emotion/react"
import { ThemeMode, Moment } from "@/enum"
import dayjs from "dayjs"
import { fetchLocationWeather, fetchWeatherForecast } from "@/api/weather"
import { LocationWeatherResponse, WeatherForecastResponse } from "@/types/weather"

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

const WeatherCard = styled.div`
    position: relative;
    min-width: 360px;
    box-shadow: ${({ theme }) => theme.boxShadow};
    background-color: ${({ theme }) => theme.foregroundColor};
    box-sizing: border-box;
    padding: 30px 15px;
`

interface IWeatherElement {
    locationName: string,
    locationNameForecast: string,
    description: string,
    windSpeed: number,
    temperature: number,
    rainPossibility: number,
    observationTime: string,
    comfortability: string,
    weatherCode: string
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
        description: "",
        windSpeed: 0,
        temperature: 0,
        rainPossibility: 0,
        observationTime: "2000-01-01 00:00:00",
        comfortability: "",
        weatherCode: "",
        isLoading: false
    })

    const { locationName, weatherCode, locationNameForecast, description, windSpeed, temperature, rainPossibility, observationTime, comfortability, isLoading } = weatherElement

    const fetchData = useCallback(async(locationName: string, locationNameForecast: string)=>{
        try{
            setWeatherElement(prevState =>({
                ...prevState,
                isLoading: true
            }))

            const [ locationWeatherRes, weatherForecastRes ] = await Promise.all([
                fetchLocationWeather(locationName),
                fetchWeatherForecast(locationNameForecast)
            ])

            const locationWeather = parseLocationWeather(locationWeatherRes)
            const weatherForecast = parseWeatherForecast(weatherForecastRes)

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
                    comfortability: weatherForecast?.comfortability || ""
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
        fetchData("臺北", "臺北市")
    },[ fetchData ])

    return (
        <ThemeProvider theme={theme[currentTheme]}>
            <SwitchModeBtn currentTheme={currentTheme} setCurrentTheme={setCurrentTheme} />
            <Container>
                <WeatherCard>
                    <Location>{locationName}</Location>
                    <Description>{description}{comfortability}</Description>
                    <CurrentWeather>
                        <Temperature>
                            { Math.round(temperature)} <Celsius>°C</Celsius>
                        </Temperature>
                        <WeatherIcon weatherCode={weatherCode} moment={Moment.DAY}/>
                    </CurrentWeather>
                    <AirFlow> 
                        <AirFlowIcon /> { windSpeed } m/h 
                    </AirFlow>
                    <Rain> 
                        <RainIcon /> {rainPossibility}% 
                    </Rain>
                    <Refresh onClick={() => fetchData(locationName, locationNameForecast)} isLoading={isLoading}> 
                        最後觀測時間： { new Intl.DateTimeFormat("zh-tw",{
                            hour: "numeric",
                            minute: "numeric",
                        }).format(dayjs(observationTime).toDate())} 
                        { isLoading ? <LoadingIcon />: <RefreshIcon />}
                    </Refresh>
                </WeatherCard>
            </Container>
        </ThemeProvider>
    )
}

export default RealtimeWeather