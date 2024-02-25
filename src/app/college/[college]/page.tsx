"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FaRegHeart } from "react-icons/fa";
import CollegeTab from "./@collegeTab/collegeTab";
import Tag from "@/components/tag/tags";
import Button from "@/components/button/button";
import { useQuery } from "@apollo/client";
import { getCollege } from "@/query/schema";
import Image from "next/image";
import { GetDefaultImage, getStrapiMedia } from "../../../utils/api-helper";
import { useRouter } from "next/navigation";

type Props = {
	params: {
		college: String;
	};
};
export default function CollegeDetail({ params }: Props) {
	const [currentTab, setCurrentTab] = useState<string>("");
	const [TabData, setTabData] = useState([])
	let collegeId = params.college;

	// get college data
	const { loading, error, data: collegeData } = useQuery(getCollege, {
		variables: { collegeId },
	});

	const college = collegeData?.college?.data?.attributes;
	const approvedBy = college?.approvedBy?.data?.attributes?.name;
	const collegeType = college?.college_type?.data?.attributes?.type;
	const logoUrl = college?.collegeLogo?.data?.attributes?.url ? getStrapiMedia(college?.collegeLogo?.data?.attributes?.url) : GetDefaultImage("logo")
	const bannerUrl = college?.banner?.data[0] ? getStrapiMedia(college?.banner?.data[0]?.attributes?.url) : GetDefaultImage("banner")
	const navbar = college?.navbars?.data
	const tabData = college?.pageData

	const handleTab = (value: string) => {
		setCurrentTab(value);
		const filteredData = tabData?.filter((item: any) => item?.navbar?.data?.attributes?.name === value);
		setTabData(filteredData)
	};

	useEffect(() => {
		if (!loading) {
			if (!currentTab) {
				handleTab(navbar[0]?.attributes?.name)
				setCurrentTab(navbar[0]?.attributes?.name);
			}
		}
	}, [loading]);


	return (
		<>
			{/* section for banner of the individual college page */}
			<section className="heroSection">
				<div className="relative">
					<Image
						src={bannerUrl!}
						alt={college?.collegeName}
						width={100}
						height={100}
						className="w-full h-36 object-cover" />
					<div className="absolute inset-0 bg-black bg-opacity-50"></div>
					<div className="absolute inset-0 text-white flex gap-4 mx-auto my-6 w-10/12">
						<div className="collegeLogo">
							<Image
								src={logoUrl!}
								width={100}
								height={100}
								alt={college?.collegeName}
								className="rounded-sm"
							/>
						</div>
						<div className="flex-1 flex flex-col gap-2">
							<div className="flex gap-4 items-center">
								<h1 className="text-lg font-bold">
									{college?.collegeName!}
								</h1>
								<div className="border-white border rounded-full p-1 text-sm cursor-pointer text-white">
									<FaRegHeart />
								</div>
							</div>
							<p className="text-xs">
								{college?.city?.data?.attributes?.name},{" "}
								{college?.state?.data?.attributes?.name} |{" "}
								{college?.rating ? college?.rating : "8.6"}/10 (324 Reviews)
							</p>
							<div className="flex gap-1">
								<Tag
									text={
										(collegeType ? collegeType : "Autonomous") + " University"
									}
									href={"/"}
								/>
								<Tag
									text={
										"ESTD " +
										(college?.establishmentYear
											? college?.establishmentYear
											: "2000")
									}
									href={"/"}
								/>
								<Tag text={approvedBy ? approvedBy : "UGC"} href={""} />
							</div>
						</div>
						<div>
							<div>
								<div className="flex flex-col gap-2">
									<Button
										href={"/"}
										text="Apply Now"
										filled
										fontSize="text-sm"
										fontWeight="font-bold"
										width="w-36"
										align="text-center"
									/>
									<Button
										href={"/"}
										text="Download Brochure"
										outline
										fontSize="text-sm"
										width="w-36"
										align="text-center"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="infoOption bg-white flex">
					<ul className="flex gap-8 items-stretch ml-32 h-10">
						{navbar?.map((tab: any) => {
							return (
								<li
									key={tab?.attributes?.name}
									onClick={() => handleTab(tab?.attributes?.name)}
									className="hover:text-orange-400 hover:border-b-2 hover:border-orange-400 text-sm mt-2"
								>
									{tab?.attributes?.name}

								</li>
							);
						})}
					</ul>
				</div>
			</section>
			<section className="mainSection">
				<div className="flex justify-center">
					<CollegeTab data={TabData} />
				</div>
			</section>
		</>
	);
}
