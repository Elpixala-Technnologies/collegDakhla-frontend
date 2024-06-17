import Link from "next/link";
import Image from "next/image";
import Tag from "../tag/tags";
import Button from "../button/button";
import { getStrapiMedia, GetDefaultImage } from "@/utils/api-helper";
import formatFees from "@/utils/formatFees";
import CarouselSideBtn from "../carousel/carousel-side-button";

export default function CourseMiniList({ courses }: any) {
	return (
		<>
			{courses?.data?.length > 0 ? (
				<div className="px-6  max-w-screen-xl mx-auto">
					<CarouselSideBtn
						showPagination={false}
						slidesDesktop={5}
						slidesTablet={4}
						slidesMobile={3}
						slides={courses?.data.map((course: any, index: number) => {
							const logoURL = course?.attributes?.logo?.data?.attributes?.url
								? getStrapiMedia(
									course?.attributes?.logo?.data?.attributes?.url
								)
								: GetDefaultImage("logo");

							return (
								<div className="py-4 border-b-2 border-[#DDDDDD]" key={index}>
									<div className="px-4 py-4 md:py-0 flex md:items-center gap-4 bg-white shadow-sm rounded border flex-col md:flex-row h-full">
										<div className="my-4 flex flex-1 flex-col gap-4 border-r border-r-primary-light px-2">
											<Link href={`/courses/${course?.attributes?.url}`}>
												<div>
													<h2 className="text-base font-semibold text-primary">
														{course?.attributes?.name}
													</h2>
												</div>
											</Link>
											<div className="flex flex-col gap-3 items-stretch">
												<p className="text-secondary-text font-light text-sm">
													Average Duration:{" "}
													<span className="text-primary-text font-medium">
														{course?.attributes?.duration} Years
													</span>
												</p>

												<p className="text-secondary-text font-light">
													<span className="text-[#B12704] text-xl font-medium">
														{formatFees(course?.attributes?.fees)}
													</span>{" "}
													- Total Fees
												</p>
											</div>
										</div>

										<div className="flex gap-1 flex-col md:justify-center md:flex-col md:gap-4 md:my-4 items-center">
											<Button
												href={`/courses/${course.id}`}
												text="Register Now"
												filled
												fontSize="text-xs"
												width="w-20"
												align="text-center"
												bgColor="bg-primary"
											/>
											<Button
												href={`/courses/${course.id}`}
												text="Download Brochure"
												fontSize="text-xs"
												outline
												width="w-20"
												align="text-center"
												bgColor="bg-amber-400"
												fontColor="text-primary-text"
											/>
											<Button
												href={`/courses/${course.id}`}
												text="Get Updates"
												outline
												fontSize="text-xs"
												width="w-20"
												fontColor="text-primary-text"
												align="text-center"
												bgColor="bg-white"
											/>
										</div>
									</div>
								</div>
							);
						})}
					/>
				</div>
			) : (
				<div className=" p-4 shadow-lg bg-white">
					<p className="text-2xl text-center text-gray-500">
						No data available
					</p>
				</div>
			)}
		</>
	);
}
