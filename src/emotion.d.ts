import "@emotion/react";

declare module "@emotion/react" {
    interface BaseTheme {
        backgroundColor: string;
        foregroundColor: string;
        boxShadow: string;
        titleColor: string;
        temperatureColor: string;
        textColor: string;
    }

    export type Theme = BaseTheme & {
        mode: "light" | "dark";
    };
}
