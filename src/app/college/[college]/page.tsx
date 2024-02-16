"use client"

import { useEffect, useState } from "react"
import CollegeCourseFee from "@/app/college/[college]/@collegeCourseFee/collegeCourseFee";
import CollegeHostel from "@/app/college/[college]/@collegeHostel/collegeHostel";
import CollegeInfo from "@/app/college/[college]/@collegeInfo/collegeInfo";
import CollegePlacement from "@/app/college/[college]/@collegePlacement/collegePlacement";
import CollegeQA from "@/app/college/[college]/@collegeQA/collegeQA";
import CollegeReview from "@/app/college/[college]/@collegeReviews/collegeReviews";
import CollegeScholership from "@/app/college/[college]/@collegeScholarship/collegeScholarship";
import { useSearchParams } from "next/navigation";
import { FaRegHeart } from "react-icons/fa";
import Tag from "@/components/tag/tags";
import Button from "@/components/button/button";
import { useQuery } from "@apollo/client";
import { getCollege } from "@/query/schema";
import Image from 'next/image'
import { getStrapiMedia, getDefaultImage } from "../utils/api-helper"

type Props = {
	params: {
		college: String
	}
}
export default function CollegeDetail({ params }: Props) {
	const [currentTab, setCurrentTab] = useState("info");
	const queryParam = useSearchParams()
	const tab = queryParam.get('tab')
	let collegeId = params.college

	// get college data
	const { loading, error, data } = useQuery(getCollege, {
		variables: { collegeId },
	});


	const college = data?.college?.data?.attributes
	const approvedBy = college?.approvedBy?.data?.attributes?.name
	const collegeType = college?.college_type?.data?.attributes?.type
	const logoUrl = college?.collegeLogo?.data?.attributes?.url ? getStrapiMedia(college?.collegeLogo?.data?.attributes?.url) : getDefaultImage("logo")
	const defaultImageUrl = getStrapiMedia("/uploads/default_college_logo_23dfd1f540.png");
	let bannerURL = college?.banner?.data?.attributes?.url ? getStrapiMedia(college?.banner?.data?.attributes?.url) : getDefaultImage("banner")

	const tabs = [
		{ name: "Info", value: "info" },
		{ name: "Course & Fees", value: "courseFees" },
		{ name: "Reviews", value: "reviews" },
		{ name: "Placement", value: "placement" },
		{ name: "Scholarship", value: "scholarship" },
		{ name: "Hostel", value: "hostel" },
		{ name: "Q&A", value: "qa" }
	]

	const handleTab = (value: string) => {
		setCurrentTab(value);
	}
	const getTabData = () => {
		switch (currentTab) {
			case "info":
				return <CollegeInfo info={college} />;
			case "courseFees":
				return <CollegeCourseFee />
			case "reviews":
				return <CollegeReview />
			case "placement":
				return <CollegePlacement />
			case "scholership":
				return <CollegeScholership />
			case "hostel":
				return <CollegeHostel />
			case "qa":
				return <CollegeQA />
			default:
				break;
		}
	}

	useEffect(() => {
		if (tab) {
			setCurrentTab(tab);
		}
	}, [tab])
	return (
		<>
			{/* section for banner of the individual college page */}
			<section className="heroSection">
				<div className="relative">
					{/* <Image src={bannerURL!} alt={college?.collegeName} width={100} height={36} ></Image> */}
					<img src={bannerURL!} alt={college?.collegeName} className="w-full h-36 object-cover" />
					<div className="absolute inset-0 bg-black bg-opacity-50"></div>
					<div className="absolute inset-0 text-white flex gap-4 mx-auto my-6 w-10/12">
						<div className="collegeLogo">
							<Image src={logoUrl!} width={100} height={100} alt={college?.collegeName} className="rounded-sm" />
						</div>
						<div className="flex-1 flex flex-col gap-2">
							<div className="flex gap-4 items-center">
								<h1 className="text-lg font-bold">{college?.collegeName ? college?.collegeName : "IIT Madras - Indian Institute of Technology - [IITM] Chennai"}</h1>
								<div className="border-white border rounded-full p-1 text-sm cursor-pointer text-white"><FaRegHeart /></div>
							</div>
							<p className="text-xs">{college?.city?.data?.attributes?.name}, {college?.state?.data?.attributes?.name} | {college?.rating ? college?.rating : "8.6"}/10  (324 Reviews)</p>
							<div className="flex gap-1">
								<Tag text={(collegeType ? collegeType : "Autonomous") + " University"} href={"/"} />
								<Tag text={"ESTD " + (college?.establishmentYear ? college?.establishmentYear : "2000")} href={"/"} />
								<Tag text={approvedBy ? approvedBy : "UGC"} href={""} />
							</div>
						</div>
						<div>
							<div>
								<div className="flex flex-col gap-2">
									<Button href={"/"} text="Apply Now" filled fontSize="text-sm" fontWeight="font-bold" width="w-36" align="text-center" />
									<Button href={"/"} text="Download Brochure" outline fontSize="text-sm" width="w-36" align="text-center" />
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="infoOption bg-white flex">
					<ul className="flex gap-8 items-stretch ml-32 h-10">
						{tabs.map(tab => {
							return (<li
								key={tab.name}
								onClick={() => handleTab(tab.value)}
								className="hover:text-orange-400 hover:border-b-2 hover:border-orange-400 text-sm mt-2">{tab.name}</li>);
						})}
					</ul>
				</div>
			</section>
			<section className="mainSection">
				<div className="flex justify-center">
					{
						getTabData()
					}
				</div>
			</section>

		</>
	)
}