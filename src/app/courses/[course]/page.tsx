/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import Tag from "@/components/tag/tags";
import Button from "@/components/button/button";
import { useQuery } from "@apollo/client";
import { getCourse } from "@/query/schema";
import Image from "next/image";
import { GetDefaultImage, getStrapiMedia } from "../../../utils/api-helper";
import CourseTab from "./@courseTab/courseTab";
import { SignUpSignInModule } from "@/components/header/SignUpSignInModule";
import NavbarSlider from "@/components/carousel/navbar-carousal";
import TabDetails from "@/components/tabDetails/tabDetails";

type Props = {
	params: {
		course: String;
	};
};
export default function CourseDetail({ params }: Props) {
	const [currentTab, setCurrentTab] = useState<string>("");
	const [TabData, setTabData] = useState([]);
	const [selectedTab, setSelectedTab] = useState<string>("");
	let courseUrl = params.course;

	// get course data
	const {
		loading,
		error,
		data: courseData,
	} = useQuery(getCourse, {
		variables: { courseUrl },
	});

	const course = courseData?.courses?.data[0]?.attributes;
	console.log("course ", course);

	const logoUrl = course?.collegeLogo?.data?.attributes?.url
		? getStrapiMedia(course?.collegeLogo?.data?.attributes?.url)
		: GetDefaultImage("logo");
	const bannerUrl = course?.banner?.data[0]
		? getStrapiMedia(course?.banner?.data[0]?.attributes?.url)
		: GetDefaultImage("banner");
	const navbar = course?.navbars?.data;

	const tabData = course?.pageData;

	const handleTab = (currentTab: string) => {
		setCurrentTab(currentTab);
		const filteredData = tabData?.filter(
			(item: any) => item?.navbar?.data?.attributes?.name === currentTab
		);
		setTabData(filteredData);
		setSelectedTab(currentTab);
	};

	useEffect(() => {
		if (loading) {
			//console.log("loading ", loading);
		}
		if (!loading && currentTab === "") {
			handleTab(navbar[0]?.attributes?.name)
			setCurrentTab(navbar[0]?.attributes?.name);
		}
	}, [navbar]);

	return (
		<>
			{/* section for banner of the individual course page */}
			<section className="heroSection">
				<div className="relative">
					<Image
						src={bannerUrl!}
						alt={course?.name}
						width={1200}
						height={1200}
						className="w-full h-80 max-sm:h-[28rem] object-center object-cover"
					/>
					<div className="absolute inset-0 bg-black bg-opacity-50"></div>
					<div className="absolute  max-w-screen-xl p-5 md:p-10 inset-0 text-white flex max-md:flex-col md:gap-4 mx-auto">
						<div className="collegeLogo">
							<Image
								src={logoUrl!}
								width={100}
								height={100}
								alt={course?.name}
								className="rounded-sm h-28 object-center object-contain"
							/>
						</div>
						<div className="flex-1 flex flex-col gap-2">
							<div className="flex gap-4 items-start">
								<h1 className="text-base md:text-lg font-bold">
									{course?.name!}, Course, Admission 2024, Subjects, Top
									Colleges, Fees, Exams, Scope
								</h1>
								<div className="border-white border rounded-full p-1 text-sm cursor-pointer text-white">
									<FaRegHeart />
								</div>
							</div>
							{/* <p className="text-xs">
								{course?.city?.data?.attributes?.name},{" "}
								{course?.state?.data?.attributes?.name} |{" "}
								{course?.rating ? course?.rating : "8.6"}/10 (324 Reviews)
							</p> */}
							<div className="flex gap-1">
								{/* <Tag
									text={
										" University"
									}
									href={"/"}
								/>
								<Tag
									text={
										"ESTD " +
										(course?.establishmentYear
											? course?.establishmentYear
											: "2000")
									}
									href={"/"}
								/> */}
								{/* <Tag text={approvedBy ? approvedBy : "UGC"} href={""} /> */}
							</div>
						</div>
						<div>
							<div>
								<div className="flex flex-col gap-2">
									{/* <Button
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
									/> */}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="mainSection">
				<div className="flex justify-center max-w-screen-xl mx-auto flex-col px-5">
					<div className="infoOption flex items-center max-w-screen-xl">
						<div className="sticky-nav-wrapper w-full flex items-center justify-center">
							<div className="bg-white flex border-b border-b-primary-light w-full rounded-lg">
								<div className="sm:max-w-screen-xl lg:mx-auto p-2 w-full justify-center border border-zinc-200 rounded-lg mt-5">
									<NavbarSlider
										buttonBorderColor="hover:border-primary/50"
										buttonTextColor="text-primary hover:text-white"
										showPagination={false}
										slidesDesktop={5}
										slidesTablet={5}
										slidesMobile={3}
										slides={navbar?.map((tab: any, index: number) => (
											<div
												key={tab?.attributes?.name}
												onClick={() =>
													handleTab(
														tab?.attributes?.name
													)
												}
												className={`text-nowrap hover:text-orange-400 hover:border-b-2 hover:border-orange-400 text-sm flex justify-center items-center w-max h-full text-center cursor-pointer font-semibold sm:text-lg ${selectedTab === tab?.attributes?.name
													? "text-primary"
													: ""
													}`}
											>
												{tab?.attributes?.name}
											</div>
										))}
									/>
								</div>
							</div>
						</div>
					</div>
					{/* <CourseTab tabData={TabData} /> */}
					<TabDetails tabData={TabData} page={course} currentTab={currentTab} />
				</div>
			</section>

		</>
	);
}
