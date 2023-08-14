import { lazy } from "react"
import { createHashRouter, Navigate } from "react-router-dom"

const Home = lazy(()=>import("@/pages/Home"))
const Button = lazy(()=>import("@/pages/Button"))
const NetworkUnitConverter = lazy(()=>import("@/pages/NetworkUnitConverter"))
const RealtimeWeather = lazy(() => import("@/pages/RealtimeWeather"))

export default createHashRouter([
    {
        path: "/",
        element: 
        <Navigate
            replace
            to="/index"
        />
    },
    {
        path: "/index",
        element: <Home />
    },
    {
        path: "/button",
        element: <Button />
    },
    {
        path: "/network-unit-converter",
        element: <NetworkUnitConverter />
    },
    {
        path: "/realtime-weather",
        element: <RealtimeWeather />
    }
])