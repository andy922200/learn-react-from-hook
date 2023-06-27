import styled from "@emotion/styled"
import {
    AirFlow, Celsius, CurrentWeather, Description, Location, Rain, Refresh, Temperature
} from "@/components/RealtimeWeather/"
import { ReactComponent as DayCloudyIcon } from "@/assets/images/day-cloudy.svg"
import { ReactComponent as AirFlowIcon } from "@/assets/images/airFlow.svg"
import { ReactComponent as RainIcon } from "@/assets/images/rain.svg"
import { ReactComponent as RefreshIcon } from "@/assets/images/refresh.svg"

const Container = styled.div`
    background-color: #ededed;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const WeatherCard = styled.div`
    position: relative;
    min-width: 360px;
    box-shadow: 0 1px 3px 0 #999999;
    background-color: #f9f9f9;
    box-sizing: border-box;
    padding: 30px 15px;
`

const DayCloudy = styled(DayCloudyIcon)`
    flex-basis: 30%;
`

const RealtimeWeather = () => {
    return (
        <Container>
            <WeatherCard>
                <Location>台北市</Location>
                <Description>多雲時晴</Description>
                <CurrentWeather>
                    <Temperature>
                        23 <Celsius>°C</Celsius>
                    </Temperature>
                    <DayCloudy/>
                </CurrentWeather>
                <AirFlow> 
                    <AirFlowIcon /> 23 m/h 
                </AirFlow>
                <Rain> 
                    <RainIcon /> 48% 
                </Rain>
                <Refresh> 
                    最後觀測時間：上午 12:03 <RefreshIcon />
                </Refresh>
            </WeatherCard>
        </Container>
    )
}

export default RealtimeWeather