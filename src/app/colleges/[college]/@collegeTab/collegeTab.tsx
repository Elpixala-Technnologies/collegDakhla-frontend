/* eslint-disable @next/next/no-img-element */
"use client";
import { Key, useEffect, useRef, useState } from "react";
import PageData from "@/components/pageData/pageData";
import Accordion from "@/components/accordian/accordian";
import { useQuery } from "@apollo/client";
import { getFeaturedCourses } from "@/query/schema";
import CourseCard from "@/components/card/courseCard";
import Image from "next/image";

export default function CollegeTab(props: any) {
	const {
		loading: featuredLoader,
		error: featuredError,
		data: featuredCourses,
	} = useQuery(getFeaturedCourses);

	const accordionRefs = useRef<(HTMLDivElement | null)[]>([]);
	const handleScrollToAccordion = (index: number) => {
		const element = accordionRefs.current[index];
		if (element) {
			const offset = 90; // Adjust this value to set the desired offset
			const elementPosition =
				element.getBoundingClientRect().top + window.pageYOffset;
			const offsetPosition = elementPosition - offset;

			window.scrollTo({
				top: offsetPosition,
				behavior: "smooth",
			});
		}
	};

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (featuredCourses?.courses?.data) {
			setIsLoading(false);
		}
	}, [featuredCourses]);

	const getTopCourses = () => {
		return featuredCourses?.courses?.data?.slice(0, 3);
	};

	const images = props?.data?.flatMap(
		(item: { pageGallery: { data: any } }) => item.pageGallery?.data || []
	);

	const [activeSection, setActiveSection] = useState("gallery"); // Default to 'gallery' section

	const handleSectionChange = (section: string) => {
		setActiveSection(section);
	};

	// POP IMAGE IN MODAL
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [selectedImage, setSelectedImage] = useState(null);

	const handleImageClick = (imgItem: any) => {
		setSelectedImage(imgItem);
		setIsPopupOpen(true);
	};

	const handleClosePopup = () => {
		setIsPopupOpen(false);
		setSelectedImage(null);
	};

	return (
		<>
			<div className="container h-full my-5">
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
													className="content rounded-xl"
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
							<Accordion title="Recommended Courses" opened titlePrimary>
								<section className="topCourses">
									<div className="m-4 bg-white py-4 px-4">
										{isLoading ? (
											<div className="flex justify-center items-center h-full">
												<p>Loading...</p>
											</div>
										) : (
											<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
												{getTopCourses().map((course: any, index: number) => (
													<CourseCard key={index} featuredCourse={course} />
												))}
											</div>
										)}
									</div>
								</section>
							</Accordion>
						</div>
					</div>

					<div className="right-wrapper basis-1/4 rounded-md min-w-72 hidden md:block">
						<div className="md:flex md:flex-col md:gap-4 h-max border border-zinc-300 rounded-md">
							{/* navbar  */}
							<div className="navbar border-b border-zinc-300">
								<button
									onClick={() => handleSectionChange("gallery")}
									className={`p-2 ${activeSection === "gallery" ? "font-bold" : ""
										}`}
								>
									Gallery Items
								</button>
								<button
									onClick={() => handleSectionChange("related")}
									className={`p-2 ${activeSection === "related" ? "font-bold" : ""
										}`}
								>
									Related Content
								</button>
							</div>
							{/* Gallery  */}
							{activeSection === "gallery" && images?.length > 0 && (
								<div className="gallery-container">
									<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
										{images?.map((imgItem: any) => (
											<div
												key={imgItem?.id}
												className="gallery-item hover:p-2  hover:border border-primary"
											>
												<Image
													width={700}
													src={imgItem?.attributes?.url}
													alt={`Gallery Image ${imgItem?.id}`}
													className="w-full h-full object-contain cursor-pointer"
													onClick={() =>
														handleImageClick(imgItem?.attributes?.url)
													}
												/>
											</div>
										))}
									</div>
								</div>
							)}
							{/* IMAGE POP MODULE  */}
							{isPopupOpen && selectedImage && (
								<div
									className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
									onClick={handleClosePopup}
								>
									<div
										className="relative bg-white p-4 rounded shadow-lg"
										onClick={(e) => e.stopPropagation()}
									>
										<button
											className="absolute top-2 right-2 text-black text-2xl"
											onClick={handleClosePopup}
										>
											&times;
										</button>
										<Image
											src={selectedImage}
											width={700}
											alt={`Gallery Image`}
											className="w-full h-auto object-contain"
										/>
									</div>
								</div>
							)}
							{/* Related Content */}
							{activeSection === "related" && (
								<div className="college-videos  p-3 sticky top-2 h-fit">
									<ul className="flex flex-col gap-2 list-disc pl-5">
										{props?.data?.map((item: any, index: any) => (
											<li
												key={index}
												className="hover:underline hover:text-primary cursor-pointer"
												onClick={() => handleScrollToAccordion(index)}
											>
												{item?.heading}
											</li>
										))}
									</ul>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
