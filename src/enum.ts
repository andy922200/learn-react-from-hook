export enum ThemeMode {
    LIGHT = "light",
    DARK = "dark",
}

export type ThemeModeType = typeof ThemeMode[keyof typeof ThemeMode];