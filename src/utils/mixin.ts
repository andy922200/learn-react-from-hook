export const findLocation = (locationNameForecast: string, data: Record<string, any>[])=>{
    return data.find((i: Record<string, any>)=> i.locationNameForecast === locationNameForecast)
}