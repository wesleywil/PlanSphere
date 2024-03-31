export interface Plan{
    id?:number,
    title:string,
    priority?:Priority,
    note?:string,
    limit_date?:Date
}

export enum Priority{
    No_Priority = "No Priority",
    High = "High",
    Mid = "Mid",
    Low = "Low",
}

export const PriorityColorMap:Record<Priority, string> = {
    [Priority.No_Priority]:"white",
    [Priority.High]:"red",
    [Priority.Mid]:"yellow",
    [Priority.Low]:"green",
}