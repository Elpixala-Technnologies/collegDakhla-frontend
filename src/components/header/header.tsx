"use client"
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

export  default function Header(){
    const [Path,setPath] = useState("");
    const currentPath = usePathname();
    const [OpenOption,setOpenOption] = useState(false);
    
    const handleOption =()=>{
        setOpenOption(!OpenOption);
    } 
    useEffect(() => {
        setPath(currentPath.split("/")[1])
    }, [currentPath])
    

    useEffect(()=>{
        
    },[])

    return (
        <nav className="bg-white relative">
            <div className="h-12 flex items-center mx-auto px-4 max-w-screen-2xl max-sm:justify-between">
                <div className="logo flex-none w-24">
                    <Link href="/">
                        <Image src={"/college-dakhla-logo.png"} alt="" width={64} height={64} />
                    </Link>
                </div>
                <div className="links flex flex-1 text-base items-center font-medium max-sm:hidden max-md:text-sm">
                    <NavOption Path={Path}/>
                </div>
                <div className="hidden max-sm:block">
                    <GiHamburgerMenu onClick={handleOption}/>
                    {OpenOption?
                    <div className="absolute top-12 right-3 bg-white z-50">
                        <NavOption Path={Path}/>
                    </div>
                    :null}
                </div>
                
            </div>
        </nav>
    )
}

const  NavOption=({Path}:{Path:string})=>{
    return (
        <>
            <ul className="h-12 pt-3 flex flex-col md:flex-row md:flex-stretch items-stretch">
                <li className={`${Path==="college-listing"?'border-b-2 border-b-primary':""}`}>
                    <Link className={`${Path==="college-listing"?'text-lg text-primary':""} px-2`} href="/college-listing">Colleges</Link>
                </li>
                <li className={`${Path==="study-abroad"?'border-b-2 border-b-primary':""} px-2`}>
                    <Link className={`${Path==="study-abroad"?'text-lg text-primary':""}`} href="/study-abroad">Study Abroad</Link>
                </li>
                <li className={`${Path==="exam"?'border-b-2 border-b-primary':""} px-2`}>
                    <Link className={`${Path==="exam"?'text-lg text-primary':""}`} href="/exam">Exam</Link>
                </li>
                <li className={`${Path==="courses"?'border-b-2 border-b-primary':""} px-2`}>
                    <Link className={`${Path==="courses"?'text-lg text-primary':""}`} href="/courses">Courses</Link>
                </li>
                <li className={`${Path==="careers"?'border-b-2 border-b-primary':""} px-2`}>
                    <Link className={`${Path==="careers"?'text-lg text-primary':""}`} href="/careers">Careers</Link>
                </li>
                <li className={`${Path==="blogs"?'border-b-2 border-b-primary':""} px-2`}>
                    <Link className={`${Path==="blogs"?'text-lg text-primary':""}`} href="/blogs">Blogs</Link>
                </li>
                <li className={`${Path==="news"?'border-b-2 border-b-primary':""} px-2`}>
                    <Link className={`${Path==="news"?'text-lg text-primary':""}`} href="/news">News</Link>
                </li>
                <li className={`${Path==="more"?'border-b-2 border-b-primary':""} px-2`}>
                    <Link className={`${Path==="more"?'text-lg text-primary':""}`} href="/more">More</Link>
                </li>
            </ul>
        </>
    )
}