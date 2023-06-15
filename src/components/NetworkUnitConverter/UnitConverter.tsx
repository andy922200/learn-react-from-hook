import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
interface UnitConverterProps {
    inputValue: number,
    onChangeInput: (e: React.ChangeEvent<HTMLInputElement>)=>void
}

const UnitConverter = (props: UnitConverterProps)=>{
    const {inputValue, onChangeInput} = props

    return (
        <div className="flex items-center justify-between">
            <div className="flex-1">
                <div className="text-[#6886c5] font-[bold] mb-3 text-left">Set</div>
                <input 
                    type="number" 
                    className="text-[32px] max-w-[170px] flex-1 inline-block text-[#0a97b0] font-[bold] border-[none] bg-transparent outline-none" 
                    min="0" 
                    value={inputValue}
                    onChange={onChangeInput}
                />
            </div>
            <span className="text-[#6886c5] fa-2x" style={{marginTop: 30}}>
                <FontAwesomeIcon icon="angle-right" className="fa-stack" />
            </span>
            <div className="text-right flex-1">
                <div className="text-[#6886c5] font-[bold] mb-3">Show</div>
                <input 
                    type="text" 
                    className="text-[32px] max-w-[170px] flex-1 inline-block text-[#0a97b0] font-[bold] border-[none] bg-transparent outline-none text-right" 
                    disabled 
                    value={inputValue/8} 
                />
            </div>
        </div>
    )
}

export default UnitConverter