// import { Button } from "@mui/material";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import Button from "../button/button";
import { FaRegStar, FaRegUser } from "react-icons/fa";
import { PiBooksLight } from "react-icons/pi";

type Props = {
    college:{
        id:string,
        name:string,
        location:string,
        state:string,
        affiliate:string,
        fee:string,
        rating:string,
        image:string,
        logo:string,

    }
}
export default function CollegeListItem({ college }:Props) {

    

    const collegeFee = parseInt(college.fee).toLocaleString('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });

    
    return (
      <div className="mb-4 p-4 flex flex-col sm:flex-row gap-4 shadow-lg
      bg-white
      ">
        <div className="relative h-40">
            <img src={college.image} alt={college.name} className="w-full sm:w-48 h-40 object-fill rounded-sm" />
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-sm"></div>
            <div className="absolute inset-0 text-white flex gap-4 justify-end mx-auto my-2 w-10/12">
                <div>
                    <div className="text-xs">
                        Our Rating
                    </div>
                    <div className="text-end">
                        {college.rating}/10
                    </div>
                </div>
            </div>
        </div>
        <div className="py-4 flex flex-1 flex-col gap-2">
            <Link href={{pathname:`/college/${college.id}`, query:{tab:"info"}}} >
                <div className="flex flex-row gap-2">
                    <div><img src={college.logo}/></div>
                    <div className="flex flex-col">
                        <h2 className="text-sm font-bold">{college.name}</h2>
                        <div className="text-xxs">
                            {college.location},{college.state} | {college.affiliate}
                        </div>
                    </div>
                </div>
            </Link>
            <div className="flex items-stretch">
                <div className="pr-4 mr-4 border-r border-extra-light-text">
                    <p className="text-primary font-semibold text-lg">{collegeFee}</p>
                    <p className="text-xxs text-secondary-text font-light">BE/B.Tech First year fees</p>
                </div>
                <div className="pr-4 mr-4 border-r border-extra-light-text">
                    <p className="text-primary font-semibold text-lg">{collegeFee}</p>
                    <p className="text-xxs text-secondary-text font-light">loerm fees</p>
                </div>
                <div className="pr-4 mr-4">
                    <p className="text-primary font-semibold text-lg">{college.rating}/10</p>
                    <p className="text-xxs text-secondary-text font-light">Based on user review</p>
                </div>
            </div>

            <div className="flex gap-2">
                <Button href={`/college/${college.id}`} text="Admission 2024" icon={<FaRegUser />} fontSize="text-xxs" outline rounded/>
                <Button href={`/college/${college.id}`} text ="Review" icon={<FaRegStar/>} outline rounded fontSize="text-xxs"/>
                <Button href={`/college/${college.id}`} text ="Course & Fees" icon={<PiBooksLight/>} outline rounded fontSize="text-xxs"/>
            </div>
        </div>
        <div className="flex flex-row gap-1 flex-wrap justify-center md:flex-col md:gap-4 md:my-4 items-center">
            <Button href={`/college/${college.id}`} text="Apply Now"  filled fontSize="text-sm"  fontWeight="font-bold" width="w-36" align="text-center"/>
            <Button href={`/college/${college.id}`} text="Download Brochure" outline fontSize="text-sm" width="w-36" align="text-center"/>
            <Button href={`/college/${college.id}`} text="Compare" outline fontSize="text-sm" width="w-36" align="text-center"/>
        </div>
      </div>
    );
  }