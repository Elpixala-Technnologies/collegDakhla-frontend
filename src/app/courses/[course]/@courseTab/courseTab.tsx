"use client"
import { Key, useEffect, useRef, useState } from "react";
import PageData from "@/components/pageData/pageData";
import Accordion from "@/components/accordian/accordian";
import { getFeaturedCourses, getFeaturedExams, topColleges } from "@/query/schema";
import { useQuery } from "@apollo/client";
import CollegeCard from "@/components/card/collegeCard";
import CourseCard from "@/components/card/courseCard";
import ExamCard from "@/components/card/examCard";


export default function CourseTab(props: any) {
	const [Limit, setLimit] = useState<number>(3);
	const {
		loading: topCollegesLoader,
		error: topCollegesError,
		data: topCollegesData,
	} = useQuery(topColleges, {
		variables: { Limit },
	});

	// const {
	// 	loading: featuredLoader,
	// 	error: featuredError,
	// 	data: featuredExams,
	//   } = useQuery(getFeaturedExams);

	const accordionRefs = useRef<(HTMLDivElement | null)[]>([]);
	const handleScrollToAccordion = (index: number) => {
		const element = accordionRefs.current[index];
		if (element) {
			const offset = 90; // Adjust this value to set the desired offset
			const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
			const offsetPosition = elementPosition - offset;

			window.scrollTo({
				top: offsetPosition,
				behavior: "smooth"
			});
		}
	};

	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		if (topCollegesData?.colleges?.data) {
			setIsLoading(false);
		}
	}, [topCollegesData]);

	const getTopColleges = () => {
		return topCollegesData?.colleges?.data?.slice(0, 3);
	};

	// useEffect(() => {
    //     if (featuredExams?.exams?.data) {
    //         setIsLoading(false);
    //     }
    // }, [featuredExams]);

    // const getTopExam = () => {
    //     return featuredExams?.exams?.data?.slice(0, 3);
    // };

	const images = props?.data?.flatMap((item: { pageGallery: { data: any; }; }) => item.pageGallery?.data || []);

	return (
		<>
			<div className="container h-full my-10">
				<div className="main-wrapper flex gap-4">
					<div className="left-wrapper md:basis-3/4 w-full md:w-9/12 flex flex-col gap-5">
						<div className="bg-primary-extra-light flex flex-col gap-4">
							{props?.data?.map((item: any, index: number) => {
								return (
									<>
										{item?.heading !== "Gallery" && (
											<Accordion
												title={item?.heading}
												titlePrimary
												opened
												key={index}
											>

												<div
													className="content rounded-xl px-5 pt-5 mb-5"
													key={index}
													ref={(el) => (accordionRefs.current[index] = el)} // Assign ref
												>
													<PageData data={item} />
												</div>
											</Accordion>
										)}
									</>

								);
							})}

							<Accordion
								title="Recommended Colleges"
								opened
								titlePrimary
							>
								<section className="topCourses">
									<div className="m-4 bg-white py-4 px-4">
										{isLoading ? (
											<div className="flex justify-center items-center h-full">
												<p>Loading...</p>
											</div>
										) : (
											<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
												{getTopColleges().map((college: any, index: number) => (
													<CollegeCard key={index} featuredCollege={college} />
												))}
											</div>
										)}
									</div>
								</section>

							</Accordion>

							{/* <Accordion
								title="Recommended Exam"
								opened
								titlePrimary
							>
								<section className="topCourses">
									<div className="m-4 bg-white py-4 px-4">
										{isLoading ? (
											<div className="flex justify-center items-center h-full">
												<p>Loading...</p>
											</div>
										) : (
											<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
												{getTopExam().map((exam: any, index: number) => (
													<ExamCard key={index} featuredExams={exam} />
												))}
											</div>
										)}
									</div>
								</section>

							</Accordion> */}

						</div>
					</div>

					<div className="right-wrapper basis-1/4 rounded-lg min-w-72 hidden md:block">
						<div className="md:flex md:flex-col md:gap-2 h-full">
							{images?.length > 0 && (
								<div className="college-videos bg-gray-50 p-3 rounded-3xl">
									<div className="gallery-container">
										<h2>Gallery Items</h2>
										<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
											{images.map((imgItem: { id: Key | null | undefined; attributes: { url: string | undefined; }; }) => (
												<div key={imgItem.id} className="gallery-item">
													<img
														src={imgItem?.attributes?.url}
														alt={`Gallery Image ${imgItem.id}`}
														className="w-full h-full"
													/>
												</div>
											))}
										</div>
									</div>
								</div>
							)}
							<div className="college-videos bg-gray-50 p-3 rounded-3xl sticky top-2 h-fit">
								<h2 className="text-base font-bold bg-blue-200 rounded-lg p-2">Related Content</h2>
								<ul className="flex flex-col gap-2 list-disc pl-5">
									{props?.data?.map((item: any, index: number) => {
										return (
											<li
												key={index}
												className="hover:text-blue-600 cursor-pointer"
												onClick={() => handleScrollToAccordion(index)}
											>
												{item?.heading}
											</li>
										);
									})}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

