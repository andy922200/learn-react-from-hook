import { useMemo } from "react"
import styled from "@emotion/styled"
import { ReactComponent as DayThunderStorm } from "@/assets/images/day-thunderstorm.svg"
import { ReactComponent as DayClear } from "@/assets/images/day-clear.svg"
import { ReactComponent as DayCloudFog } from "@/assets/images/day-cloudy-fog.svg"
import { ReactComponent as DayCloudy } from "@/assets/images/day-cloudy.svg"
import { ReactComponent as DayFog } from "@/assets/images/day-fog.svg"
import { ReactComponent as DayPartiallyClearWithRain } from "@/assets/images/day-partially-clear-with-rain.svg"
import { ReactComponent as DaySnowing } from "@/assets/images/day-snowing.svg"
import { ReactComponent as NightThunderStorm } from "@/assets/images/night-thunderstorm.svg"
import { ReactComponent as NightClear } from "@/assets/images/night-clear.svg"
import { ReactComponent as NightCloudFog } from "@/assets/images/night-cloudy-fog.svg"
import { ReactComponent as NightCloudy } from "@/assets/images/night-cloudy.svg"
import { ReactComponent as NightFog } from "@/assets/images/night-fog.svg"
import { ReactComponent as NightPartiallyClearWithRain } from "@/assets/images/night-partially-clear-with-rain.svg"
import { ReactComponent as NightSnowing } from "@/assets/images/night-snowing.svg"
import { MomentType } from "@/enum"

const IconContainer = styled.div`
    flex-basis: 30%;

    svg{
        max-height: 110px;
    }
`

const weatherTypes = {
    isThunderstorm: {
        codes: [15,16,17,18,21,22,33,34,35,36,41],
        icon: {
            day: <DayThunderStorm />,
            night: <NightThunderStorm />
        } 
    },
    isClear: {
        codes: [1],
        icon: {
            day: <DayClear />,
            night: <NightClear />
        }
    },
    isCloudyFog: {
        codes: [25,26,27,28],
        icon: {
            day: <DayCloudFog />,
            night: <NightCloudFog />
        }
    },
    isCloudy: {
        codes: [2,3,4,5,6,7],
        icon: {
            day: <DayCloudy />,
            night: <NightCloudy />
        }
    },
    isFog: {
        codes: [24],
        icon: {
            day: <DayFog />,
            night: <NightFog />
        }
    },
    isPartiallyClearWithRain: {
        codes: [8,9,10,11,12,13,14,19,20,29,30,31,32,38,39],
        icon: {
            day: <DayPartiallyClearWithRain />,
            night: <NightPartiallyClearWithRain />
        }
    },
    isSnowing: {
        codes: [23,37,42],
        icon: {
            day: <DaySnowing />,
            night: <NightSnowing />
        }
    }
}

const WeatherIcon = ({weatherCode, moment}: { weatherCode: string, moment: MomentType}) => {
    const weatherIcon = useMemo(()=>{
        let foundIcon = undefined

        Object.entries(weatherTypes).forEach(([, weatherTypeItem]) => {
            const found = weatherTypeItem.codes.find((code)=> code === Number(weatherCode))
    
            if(found){
                foundIcon = weatherTypeItem.icon[moment]
            }
        })

        return foundIcon
    }, [weatherCode, moment])

    return (
        <IconContainer>
            { weatherIcon }
        </IconContainer>
    )
}

export default WeatherIcon