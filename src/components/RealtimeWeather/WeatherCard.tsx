import styled from "@emotion/styled"
import dayjs from "dayjs"
import { ReactComponent as AirFlowIcon } from "@/assets/images/airFlow.svg"
import { ReactComponent as RainIcon } from "@/assets/images/rain.svg"
import { ReactComponent as RefreshIcon } from "@/assets/images/refresh.svg"
import { ReactComponent as LoadingIcon } from "@/assets/images/loading.svg"
import { IWeatherElement } from "@/pages/RealtimeWeather"
import {
    AirFlow, Cog, Celsius, CurrentWeather, Description, Location, Rain, Refresh, Temperature, WeatherIcon
} from "@/components/RealtimeWeather/"

interface IWeatherCardProps {
    weatherElement: IWeatherElement, 
    fetchData: () => void, 
    setCurrentPage: React.Dispatch<React.SetStateAction<string>>
}

const WeatherCardStyle = styled.div`
    position: relative;
    min-width: 360px;
    box-shadow: ${({ theme }) => theme.boxShadow};
    background-color: ${({ theme }) => theme.foregroundColor};
    box-sizing: border-box;
    padding: 30px 15px;
`

const WeatherCard = ({weatherElement,fetchData, setCurrentPage}:IWeatherCardProps) => {
    const {
        locationNameForecast,
        weatherCode,
        description,
        windSpeed,
        temperature,
        rainPossibility,
        observationTime,
        comfortability,
        isLoading,
        moment
    } = weatherElement
  
    return (
        <WeatherCardStyle>
            <Cog onClick={() => setCurrentPage("WeatherSetting")} />
            <Location>{locationNameForecast}</Location>
            <Description>{description}{comfortability}</Description>
            <CurrentWeather>
                <Temperature>
                    {Math.round(temperature)} <Celsius>°C</Celsius>
                </Temperature>
                <WeatherIcon
                    weatherCode={weatherCode}
                    moment={moment} 
                />
            </CurrentWeather>
            <AirFlow>
                <AirFlowIcon /> {windSpeed} m/h
            </AirFlow>
            <Rain>
                <RainIcon /> {rainPossibility}%
            </Rain>
            <Refresh
                onClick={() => fetchData()}
                isLoading={isLoading}>
                最後觀測時間： {new Intl.DateTimeFormat("zh-tw", {
                    hour: "numeric",
                    minute: "numeric",
                }).format(dayjs(observationTime).toDate())}
                {isLoading ? <LoadingIcon /> : <RefreshIcon />}
            </Refresh>
        </WeatherCardStyle>
    )
}

export default WeatherCard