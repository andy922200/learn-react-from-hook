interface CardFooterProps {
    inputValue: number
}

const CardFooter = ({inputValue}:CardFooterProps)=>{
    let criteria: Record<string, any> = {}

    if(!inputValue){
        criteria = {
            title: "---",
            backgroundColor: "#d3d8e2"
        }
    }else if(inputValue < 15){
        criteria = {
            title: "SLOW",
            backgroundColor: "#ee362d"
        }
    }else if(inputValue < 40){
        criteria = {
            title: "GOOD",
            backgroundColor: "#1b82f1"
        }
    }else{
        criteria = {
            title: "FAST",
            backgroundColor: "#13d569"
        }
    }

    return (
        <div 
            className={`min-h-[40px] flex items-center justify-center text-[white] m-[5px] rounded-br-md rounded-bl-md`}
            style={{backgroundColor: criteria.backgroundColor}}
        >
            {criteria.title}
        </div>
    )
}

export default CardFooter