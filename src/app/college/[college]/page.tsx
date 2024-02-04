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

export default function CollageDetail({ params }: { params: { college: string } }) {
	// const [college, setCollege]=useState({});
	const [currentTab, setCurrentTab] = useState("info");
	const queryParam = useSearchParams()

	const tab = queryParam.get('tab')
	console.log(tab);

	// const router = useRouter();
	// const receivedData = router.query;
	// console.log(receivedData);

	// get college data
	const { loading, error, data } = useQuery(getCollege);
	const college = data?.college?.data?.attributes
	console.log(college?.collegeName + " " + college?.city);


	let collegetest = {
		id: "1",
		name: "IIT Madras - Indian Institute of Technology - [IITM] Chennai",
		location: "Chennai",
		state: "Tamil Nadu",
		affiliate: "AICTE Aprroved",
		fee: "200000",
		rating: "8.6",
		image: "https://images.collegedunia.com/public/college_data/images/appImage/1509430807cover.jpg?h=300&w=250&mode=stretch",
		logo: "https://images.collegedunia.com/public/college_data/images/logos/16227180851622636032186238785288085292955050866043200736746859n.jpg?h=80&w=80&mode=stretch"
	}

	const tabs = [
		{ name: "Info", value: "info" },
		{ name: "Course & Fees", value: "courseFees" },
		{ name: "Reviews", value: "reviews" },
		{ name: "Placement", value: "placement" },
		{ name: "Scholership", value: "scholership" },
		{ name: "Hostel", value: "hostel" },
		{ name: "Q&A", value: "qa" }
	]

	const handleTab = (value: string) => {
		setCurrentTab(value);
	}
	const getTabData = () => {
		switch (currentTab) {
			case "info":
				return <CollegeInfo />;
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
			<section className="heroSection">
				<div className="relative">
					<img src={collegetest.image} alt={collegetest.name} className="w-full h-36 object-cover" />
					<div className="absolute inset-0 bg-black bg-opacity-50"></div>
					<div className="absolute inset-0 text-white flex gap-4 mx-auto my-6 w-10/12">
						<div className="collegeLogo">
							<Image src={college?.collegeLogo?.data?.attributes?.url} width={100} height={100} alt={college?.collegeLogo?.data?.attributes?.name} className="rounded-sm" />
						</div>
						<div className="flex-1 flex flex-col gap-2">
							<div className="flex gap-4 items-center">
								<h1 className="text-lg font-bold">{college?.collegeName ? college?.collegeName : "IIT Madras - Indian Institute of Technology - [IITM] Chennai"}</h1>
								<div className="border-white border rounded-full p-1 text-sm cursor-pointer text-white"><FaRegHeart /></div>
							</div>
							<p className="text-xs">{college?.city},{college?.state} | {college?.rating ? college?.rating : "8.6"}/10  (324 Reviews)</p>
							<div className="flex gap-1">
								<Tag text={college?.college_type?.data?.attributes?.type + " University"} href={"/"} />
								<Tag text={college?.establishmentYear ? college?.establishmentYear : "2000"} href={"/"} />
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