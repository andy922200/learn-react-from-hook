import { Suspense } from "react"
import { RouterProvider } from "react-router-dom";
import router from "./router"

import "./App.css"

function App() {
    return (
        <Suspense fallback={<p>Fallback 404 Error</p>}>
            <RouterProvider router={router}></RouterProvider>
        </Suspense>
    )
}

export default App
