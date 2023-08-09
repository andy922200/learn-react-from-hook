export enum ThemeMode {
    LIGHT = "light",
    DARK = "dark",
}

export enum Moment {
    DAY = "day",
    NIGHT = "night",
}

export type MomentType = typeof Moment[keyof typeof Moment];
export type ThemeModeType = typeof ThemeMode[keyof typeof ThemeMode];