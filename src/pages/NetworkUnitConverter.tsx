import { useState } from "react"
import { UnitControl, UnitConverter, CardFooter } from "@/components/NetworkUnitConverter"

const NetworkUnitConverter = ()=>{
    const [inputValue, setInputValue] = useState(0)
    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const {value} = e.target
        setInputValue(Number(value))
    }

    return (
        <div className="flex flex-col shadow-[1px_1px_10px_1px_#134c76] min-w-[440px] min-h-[320px] rounded-[7px] bg-white">
            <div className="flex items-center justify-center min-h-[50px] bg-[#0a97b0] text-[white] text-xl rounded-t-md">Network Speed Converter</div>
            <div className="flex-1 p-[30px]">
                <UnitControl />

                <UnitConverter 
                    inputValue={inputValue}
                    onChangeInput={onChangeInput}
                />
            </div>
            <CardFooter inputValue={inputValue}/>
        </div>
    )
}

export default NetworkUnitConverter