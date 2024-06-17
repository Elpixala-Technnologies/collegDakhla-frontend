import { useState, useEffect } from "react";
import Loader from "../Loader/loader";
import Accordion from "../accordian/accordian";
import PageData from "../tabData/tabData";
import YoutubeVideo from "../youtubeVideo/youtubeVideo";
import Image from "next/image";

export default function TabDetails({ tabData, page, currentTab, loading }: any) {
	const [ShowTableOfContent, setShowTableOfContent] = useState(true);
	const [RatingsBanner, setRatingsBanner] = useState(false);
	const [ShowSidebar, setShowSidebar] = useState(true);
	const [scrollPosition, setScrollPosition] = useState(0);
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [selectedImage, setSelectedImage] = useState(null);
	const [activeSection, setActiveSection] = useState("videos");

	const images = tabData?.data?.flatMap(
		(item: { pageGallery: { data: any } }) => item.pageGallery?.data || []
	);

	const scrollToSection = (index: number, offset: number) => {
		const section = document.getElementById(`section-${index}`);

		if (section) {
			setTimeout(() => {
				const topPos = section.offsetTop;
				window.scrollTo({ top: topPos - offset + 40, behavior: "smooth" });
			}, 1);
		}
	};

	const handleSectionChange = (section: string) => {
		setActiveSection(section);
	};

	const handleImageClick = (imgItem: any) => {
		setSelectedImage(imgItem);
		setIsPopupOpen(true);
	};

	const handleClosePopup = () => {
		setIsPopupOpen(false);
		setSelectedImage(null);
	};

	const handleScroll = () => {
		setScrollPosition(window.scrollY);
	};

	useEffect(() => {
		setRatingsBanner(false);
		setShowTableOfContent(true);
		setShowSidebar(true);

		if (currentTab === "Ratings and Reviews") {
			setShowTableOfContent(false);
			setRatingsBanner(true);
		} else if (currentTab === "News") {
			setShowTableOfContent(false);
			setShowSidebar(false);
		} else if (currentTab === "Discussion Forum") {
			setShowTableOfContent(false);
			setShowSidebar(false);
		} else if (currentTab === "College Compare") {
			setShowTableOfContent(false);
			setShowSidebar(false);
		}
	}, [currentTab]);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	if (loading) {
		return (
			<div className="flex justify-center mt-4">
				<Loader />
			</div>
		);
	}

	return (
		<>
			<div className="container h-full my-10">
				<div className="main-wrapper flex gap-4">
					<div className="left-wrapper md:basis-3/4 w-full md:w-9/12 flex flex-col gap-5">
						<div className="bg-primary-extra-light flex flex-col gap-4">
							{ShowTableOfContent ? (
								<Accordion title="Table of Content" titlePrimary opened>
									<div className="bg-primary-extra-light p-5 flex flex-col gap-4">
										{tabData?.map((table: any, index: any) => {
											let label;
											switch (table?.__typename) {
												case "ComponentRecommendedColleges":
													label = "Recommended Colleges";
													break;
												case "ComponentRecommendedCourses":
													label = "Recommended Courses";
													break;
												case "ComponentRecommendedRecommendedExams":
													label = "Recommended Exams";
													break;
												case "ComponentRecommendedRecommendedCareers":
													label = "Recommended Careers";
													break;
												case "ComponentRecommendedRecommendedScholarships":
													label = "Recommended Scholarships";
													break;
												case "ComponentRecommendedRecommendedCountries":
													label = "Recommended Countries";
													break;
												default:
													label = table?.heading;
											}

											return (
												<div key={index}>
													<div className="flex gap-4">
														<div>
															<Image
																src={""}
																width={20}
																height={20}
																alt=""
															/>
														</div>
														<div className="font-medium text-primary cursor-pointer">
															<a
																href={`#section-${index}`}
																onClick={() => scrollToSection(index, 200)}
															>
																{label}
															</a>
														</div>
													</div>
												</div>
											);
										})}
									</div>
								</Accordion>
							) : (
								<></>
							)}
							{tabData?.map((item: any, index: number) => (
								<section id={`section-${index}`} key={index} >
									<PageData data={item} />
								</section>
							))}
						</div>
					</div>

					<div className="right-wrapper basis-1/4 rounded min-w-72 hidden md:block">
						<div className="md:flex md:flex-col md:gap-4 h-max border border-zinc-300 rounded-md">
							{/* Navbar */}
							<div className="navbar border-b border-zinc-300 flex">
								<button
									onClick={() => handleSectionChange("videos")}
									className={`p-2 ${activeSection === "videos" ? "font-bold" : ""}`}
								>
									Videos
								</button>
								<button
									onClick={() => handleSectionChange("gallery")}
									className={`p-2 ${activeSection === "gallery" ? "font-bold" : ""}`}
								>
									Gallery
								</button>
							</div>
							{/* Videos */}
							{activeSection === "videos" && (
								<div className="college-videos bg-gray-50 p-3">
									<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-4 p-4">
										<YoutubeVideo
											videoId={"4-YEBaUXUGo"}
											width={"100%"}
											height={"168"}
										/>
										<YoutubeVideo
											videoId={"4-YEBaUXUGo"}
											width={"100%"}
											height={"168"}
										/>
									</div>
								</div>
							)}
							{/* Gallery */}
							{activeSection === "gallery" && images?.length > 0 && (
								<div className="gallery-container">
									<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
										{images?.map((imgItem: any) => (
											<div
												key={imgItem?.id}
												className="gallery-item hover:p-2 hover:border border-primary"
											>
												<Image
													width={700}
													height={500}
													src={imgItem?.attributes?.url || ""}
													alt={`Gallery Image ${imgItem?.id}`}
													className="w-full h-full object-contain cursor-pointer"
													onClick={() => handleImageClick(imgItem?.attributes?.url)}
												/>
											</div>
										))}
									</div>
								</div>
							)}
							{/* Image Pop-up Modal */}
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
											height={500}
											alt="Selected Gallery Image"
											className="w-full h-auto object-contain"
										/>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</>)
}