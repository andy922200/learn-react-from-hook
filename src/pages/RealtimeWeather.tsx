import { useState, useMemo } from "react"
import styled from "@emotion/styled"
import { WeatherCard, WeatherSetting, SwitchModeBtn } from "@/components/RealtimeWeather/"
import { ThemeProvider } from "@emotion/react"
import { ThemeMode, MomentType } from "@/enum"
import { data } from "@/utils/location-latitude-longitude.json";
import { findLocation } from "@/utils/mixin"
import useWeatherAPI from "@/hooks/useWeatherAPI"

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

const RealtimeWeather = () => {
    const [ currentPage, setCurrentPage ] = useState("WeatherCard")
    const [ currentTheme, setCurrentTheme ] = useState(ThemeMode.LIGHT)
    const [ currentLocation, setCurrentLocation ] = useState(localStorage.getItem("cityName") || "臺北市")

    const foundedLocation = useMemo(()=>{
        return findLocation(currentLocation, data)
    }, [currentLocation])
    
    const [ weatherElement, fetchData ] = useWeatherAPI({
        locationName: foundedLocation?.locationName,
        locationNameForecast: foundedLocation?.locationNameForecast,
        latitude: foundedLocation?.latitude,
        longitude: foundedLocation?.longitude,
    })

    return (
        <ThemeProvider theme={theme[currentTheme]}>
            <SwitchModeBtn
                currentTheme={currentTheme}
                setCurrentTheme={setCurrentTheme}
            />
            <Container>
                { 
                    currentPage === "WeatherCard" && 
                    <WeatherCard 
                        weatherElement={weatherElement} 
                        fetchData={fetchData} 
                        setCurrentPage={setCurrentPage}
                    />
                }
                {   currentPage === "WeatherSetting" && 
                    <WeatherSetting 
                        locationNameForecast={foundedLocation?.locationNameForecast}
                        setCurrentLocation={setCurrentLocation}
                        setCurrentPage={setCurrentPage}
                    />
                }
            </Container>
        </ThemeProvider>
    )
}

export default RealtimeWeather