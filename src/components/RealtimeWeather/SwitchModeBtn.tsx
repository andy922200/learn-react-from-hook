import styled from "@emotion/styled"
import { ThemeMode, ThemeModeType } from "@/enum"

interface SwitchModeBtnProps {
    currentTheme: ThemeModeType;
    setCurrentTheme: (value: ThemeModeType) => void;
}

const SwitchModeBtn = ({currentTheme, setCurrentTheme}: SwitchModeBtnProps) => {
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

    return (
        <StyledSwitchModeBtn onClick={()=> setCurrentTheme(currentTheme === ThemeMode.DARK ? ThemeMode.LIGHT : ThemeMode.DARK)}>切換模式</StyledSwitchModeBtn>
    )
}

export default SwitchModeBtn