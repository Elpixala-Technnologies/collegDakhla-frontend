import { useState } from "react"
import Filter from "./filter/filter"
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { MdClose } from "react-icons/md";

export default function CollegeFilters(){
    const [SelectedFilter,setSelectedFilter] = useState<string[]>([]);
    const streams = [
        {name:"Management",count:7430},
        {name:"Science",count:6235},
        {name:"Engineering",count:0},
        {name:"Arts",count:100},
        {name:"Commerce",count:10},
        {name:"Computer Applications",count:3344},
        {name:"Education",count:653},
        {name:"Medical",count:233},
        {name:"Pharmacy",count:4566},
        {name:"Paramedical",count:1234},
        {name:"Mass Communication",count:193},
    ]
    const states=[
        {name:"Maharashtra",count:3444},
        {name:"Haryana",count:12},
        {name:"Uttar Pradesh",count:45},
        {name:"Tamil Nadu",count:554},
        {name:"Karnataka",count:1232},
        {name:"Delhi NCR",count:55},
        {name:"Kerala",count:66},
        {name:"Delhi",count:76},
        {name:"Gujarat",count:33},
    ]

    const [open, setOpen] = useState(true);
    const handleOpen = () => setOpen(open ? false:true);

    const handleSelectFilter =(name:string)=>{
        if(SelectedFilter.includes(name)){
            handleUnselectFilter(name);
        }else{
            let filter = [...SelectedFilter,name];
            setSelectedFilter(filter);
            console.log(SelectedFilter);
        }
        
    }

    const handleUnselectFilter=(name:string)=>{
        let filter = SelectedFilter.filter(item => item !== name);
        setSelectedFilter(filter);
    }

    return (
        <>
            <div className="bg-white">
                <h3 className="uppercase text-xxs px-2 py-2">Found <b>123</b> collages</h3>
                {
                    SelectedFilter.length>0?(<>
                        <div className="bg-gray-200 px-2 py-2 flex items-center justify-between" onClick={handleOpen}><span>Selected Filters</span> <span>{open?<FaAngleDown/>:<FaAngleUp/>}</span></div>
                        <div className="flex py-2 px-4 flex-wrap gap-2">
                            {SelectedFilter.map(filter=>{
                                return <div key={filter} className="px-2 py-1 border border-orange-500 rounded-full text-xs flex gap-1 items-center">
                                    <span>{filter}</span><span onClick={()=>handleUnselectFilter(filter)}><MdClose/></span></div>
                            })}
                        </div>
                    </>):(<></>)
                }
                <Filter name="Stream" filters={streams} handleSelectFilter={handleSelectFilter}/>
                <Filter name="State" filters={states} handleSelectFilter={handleSelectFilter}/>
            </div>
        </>

    )
}