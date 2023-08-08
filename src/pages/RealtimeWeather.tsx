import { useState, useEffect, useCallback } from "react"
import styled from "@emotion/styled"
import {
    AirFlow, Celsius, CurrentWeather, Description, Location, Rain, Refresh, Temperature
} from "@/components/RealtimeWeather/"
import { ReactComponent as DayCloudyIcon } from "@/assets/images/day-cloudy.svg"
import { ReactComponent as AirFlowIcon } from "@/assets/images/airFlow.svg"
import { ReactComponent as RainIcon } from "@/assets/images/rain.svg"
import { ReactComponent as RefreshIcon } from "@/assets/images/refresh.svg"
import { ThemeProvider } from "@emotion/react"
import { ThemeMode, ThemeModeType } from "@/enum"
import dayjs from "dayjs"
import { fetchCurrentLocationWeather } from "@/api/weather"

interface SwitchModeBtnProps {
    currentTheme: ThemeModeType;
    setCurrentTheme: (value: ThemeModeType) => void;
}

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

const DayCloudy = styled(DayCloudyIcon)`
    flex-basis: 30%;
`

const StyledSwitchModeBtn = styled.button`
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
`

const SwitchModeBtn = ({currentTheme, setCurrentTheme}: SwitchModeBtnProps) => {
    return (
        <StyledSwitchModeBtn onClick={()=> setCurrentTheme(currentTheme === ThemeMode.DARK ? ThemeMode.LIGHT : ThemeMode.DARK)}>切換模式</StyledSwitchModeBtn>
    )
}

const RealtimeWeather = () => {
    const [ currentTheme, setCurrentTheme ] = useState(ThemeMode.LIGHT)
    const [ currentWeather, setCurrentWeather ] = useState({
        locationName: "",
        description: "多雲時晴",
        windSpeed: 0,
        temperature: 0,
        rainPossibility: 48.6,
        observationTime: "2000-01-01 00:00:00",
    })

    const fetchData = useCallback(async(locationName: string)=>{
        try{
            const res = await fetchCurrentLocationWeather(locationName)

            if(res?.success === "true"){
                const {locationName, time, weatherElement } = res.records.location[0]
                const weatherElements = weatherElement.reduce((acc:Record<string, any>, cur: Record<string, any>)=>{
                    if(["WDSD", "TEMP"].includes(cur.elementName)){
                        acc[cur.elementName] = cur.elementValue
                    }
                    return acc
                }, {})

                setCurrentWeather(preWeather =>({
                    ...preWeather,
                    locationName,
                    windSpeed: weatherElements.WDSD,
                    temperature: weatherElements.TEMP,
                    observationTime: time.obsTime,
                }))
            }
        }catch(err){
            console.log(err)
        }
    }, [])

    useEffect(()=>{
        fetchData("臺北")
    },[ fetchData ])

    return (
        <ThemeProvider theme={theme[currentTheme]}>
            <SwitchModeBtn currentTheme={currentTheme} setCurrentTheme={setCurrentTheme} />
            <Container>
                <WeatherCard>
                    <Location>{currentWeather.locationName}</Location>
                    <Description>{currentWeather.description}</Description>
                    <CurrentWeather>
                        <Temperature>
                            { Math.round(currentWeather.temperature)} <Celsius>°C</Celsius>
                        </Temperature>
                        <DayCloudy/>
                    </CurrentWeather>
                    <AirFlow> 
                        <AirFlowIcon /> { currentWeather.temperature } m/h 
                    </AirFlow>
                    <Rain> 
                        <RainIcon /> {currentWeather.rainPossibility}% 
                    </Rain>
                    <Refresh onClick={() => fetchData(currentWeather.locationName)}> 
                        最後觀測時間： { new Intl.DateTimeFormat("zh-tw",{
                            hour: "numeric",
                            minute: "numeric",
                        }).format(dayjs(currentWeather.observationTime).toDate())} <RefreshIcon />
                    </Refresh>
                </WeatherCard>
            </Container>
        </ThemeProvider>
    )
}

export default RealtimeWeather