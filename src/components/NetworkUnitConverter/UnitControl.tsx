import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import style from "@/styles/NetworkUnitConverter.module.css"

const UnitControl = ()=>{
    return (
        <div className="flex items-center justify-between mb-[45px]">
            <div className="inline-flex bg-[#0a97b0] items-center justify-center w-[75px] h-[35px] text-[white] rounded-[3px]">Mbps</div>
            <span className={`${style["icon-color"]} fa-fw fa-stack`}>
                <FontAwesomeIcon icon={["fas", "exchange-alt"]} className="fa-stack" />
            </span>
            <div className="inline-flex bg-[#0a97b0] items-center justify-center w-[75px] h-[35px] text-[white] rounded-[3px]">MB/s</div>
        </div>
    )
}

export default UnitControl