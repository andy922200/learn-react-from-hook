import { lazy } from "react"
import { createHashRouter, Navigate } from "react-router-dom"

const Home = lazy(()=>import("@/pages/Home"))
const Button = lazy(()=>import("@/pages/Button"))

export default createHashRouter([
    {
        path: "/",
        element: <Navigate replace to="/index" />
    },
    {
        path: "/index",
        element: <Home />
    },
    {
        path: "/button",
        element: <Button />
    }
])