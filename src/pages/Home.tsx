// eslint-disable-next-line import/no-unresolved
import viteLogo from "/vite.svg"
import reactLogo from "../assets/react.svg"
import { useNavigate } from "react-router-dom"

const Home = ()=>{
    const router = useNavigate()

    function toButton(){
        router("/button")
    }

    return (
        <>
            <div className="grid place-content-center h-screen text-center text-lg">
                <div className="flex mx-auto items-center gap-8">
                    <a href="https://vitejs.dev" target="_blank" rel="noreferrer noopenner">
                        <img src={viteLogo} className="logo" alt="Vite logo" />
                    </a>
                    <a href="https://reactjs.org" target="_blank" rel="noreferrer">
                        <img
                            src={reactLogo}
                            className="w-32 animate-spin [animation-duration:10s]"
                            alt="React logo"
                        />
                    </a>
                </div>
                <h1 className="my-20 font-semibold text-6xl">Vite + React</h1>
                <p className="opacity-40">
                    Click on the Vite and React logos to learn more
                </p>
                <button onClick={toButton} className="bg-blue-400 p-4 text-lg my-2 rounded-md text-white">Redirect to Button</button>
            </div>
        </>
    )
}

export default Home