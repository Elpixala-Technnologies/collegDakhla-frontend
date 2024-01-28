"use client";
import { useEffect, useState } from "react"
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

export default function Filter(props:any){
    const [open, setOpen] = useState(true);
    const [Search, setSearch] = useState("");
    const [MatchingFilter, setMatchingFilter] = useState([])
    const handleOpen = () => setOpen(open ? false:true);
 
    const handleFilter=(event:any)=>{
        console.log(event.target.value);
        setMatchingFilter(props.filters.filter((filter:any) => filter.name.includes(event.target.value)));

        console.log(MatchingFilter);
        
    }

    useEffect(()=>{},[MatchingFilter])
    return (
        <>
        <div className="bg-gray-200 px-2 py-2 flex items-center justify-between border-l border-primary" onClick={handleOpen}><span>{props.name}</span> <span>{open?<FaAngleDown/>:<FaAngleUp/>}</span></div>
        {open?<>
            <div className="px-2 py-1">
            <div>
                <input className="w-full border-2 border-gray-100 text-xs px-2 py-1" placeholder={`FILTER ${props.name}`} onChange={handleFilter}/>
            </div>
            <div className="h-full max-h-48 overflow-x-auto">
                {Search.trim.length===0 && props.filters.map((filter:any)=>{
                    return (
                            <div key={filter.name} className="flex gap-1 items-center my-2 cursor-pointer">
                                <input type="checkbox" name="" id="" className="" onClick={()=>props.handleSelectFilter(filter.name)} />
                                <span className="text-xxs font-semibold text-secondary-text hover:text-primary">{filter.name}-[{filter.count}]</span>
                            </div>
                    )
                })}
                {/* {Search.length>0 && MatchingFilter.map((filter:any)=>{
                    <div className="flex gap-1" key={filter.name}>
                        <input type="checkbox" name="" id="" className="" onClick={()=>props.handleSelectFilter(filter.name)} />
                        <span className="text-xs">{filter.name}-[{filter.count}]</span>
                    </div>
                })} */}
            </div>
        </div>
        </>:
        <></>}
        
        </>
    )
}