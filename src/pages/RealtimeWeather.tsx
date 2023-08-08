import { useState } from "react"
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
    const [ currentTheme, setCurrentTheme] = useState(ThemeMode.LIGHT)
    
    return (
        <ThemeProvider theme={theme[currentTheme]}>
            <SwitchModeBtn currentTheme={currentTheme} setCurrentTheme={setCurrentTheme} />
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
        </ThemeProvider>
    )
}

export default RealtimeWeather