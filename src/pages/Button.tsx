import { useState } from "react"

const Button = ()=>{
    const [count, setCount] = useState(0)

    return (
        <div className="button-wrapper">
            <button onClick={() => setCount((count) => count + 1)}>
                count is {count}
            </button>
            <p style={{
                visibility: count >= 9 ? "visible" : "hidden"
            }}>
                Edit Button and save to test HMR
            </p>
        </div>
    )
}

export default Button