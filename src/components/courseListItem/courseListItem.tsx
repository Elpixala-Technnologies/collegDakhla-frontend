import Link from "next/link";
import Image from "next/image";
import Tag from "../tag/tags";
import Button from "../button/button";
import { getStrapiMedia, GetDefaultImage } from "@/utils/api-helper";
import ExamCard from "../card/examCard";
import Carousel from "@/components/carousel/carousel";


export default function CourseListItem(coursesData: any) {

	function fees(fee: any) {
		return (
			parseInt(
				fee ? fee : "200000"
			).toLocaleString("en-IN", {
				style: "currency",
				currency: "INR",
				minimumFractionDigits: 0,
				maximumFractionDigits: 0,
			}))
	}

	return (
		<>
			{coursesData?.courses?.data?.length > 0 ? (
				<>
					{coursesData?.courses?.data.map((course: any, index: number) => {
						const logoURL = course?.attributes?.logo?.data?.attributes
							?.url
							? getStrapiMedia(
								course?.attributes?.logo?.data?.attributes?.url
							)
							: GetDefaultImage("logo");

						const courseFee = parseInt(
							course?.attributes?.fees
								? course?.attributes?.fees
								: 200000
						).toLocaleString("en-IN", {
							style: "currency",
							currency: "INR",
							minimumFractionDigits: 0,
							maximumFractionDigits: 0,
						});
						return (
							<div className="py-4 border-b-2 border-[#DDDDDD]" key={index}>
								<div className="px-4 flex items-center gap-4 bg-white shadow-sm rounded border flex-col md:flex-row">
									<div className="flex items-center">
										<Image src={logoURL!} width={150} height={150} alt={""} />
									</div>
									<div className="my-4 flex flex-1 flex-col gap-4 border-r border-r-primary-light ">
										<Link
											href={`/courses/${course.id}`}
										>
											<div>
												<h2 className="text-xl font-semibold text-primary">
													{course?.attributes?.name}
												</h2>
											</div>
										</Link>
										<div className="flex flex-col gap-3 items-stretch">
											<p className="text-secondary-text font-light">
												Average Duration:{" "}
												<span className="text-primary-text font-medium">{course?.attributes?.duration} Years</span>
											</p>
											<div className="text-secondary-text font-light flex items-center gap-2">
												Offered by:{" "}
												{course?.attributes?.colleges?.data.map((college: any, index: number) => {
													return (
														<Tag
															text={college?.attributes?.collegeName}
															bgcolor="bg-pink-100"
															color="text-pink-500"
															fontSize="text-sm"
															rounded
															key={index}
														/>
													)
												})}
											</div>
											<p className="text-secondary-text font-light">
												<span className="text-[#B12704] text-2xl font-medium">
													{fees(course?.attributes?.fees)}
												</span>{" "}
												- Total Fees
											</p>
										</div>
									</div>

									<div className="flex flex-row gap-1 flex-wrap justify-center md:flex-col md:gap-4 md:my-4 items-center">
										<Button
											href={`/college`}
											text="Register Now"
											filled
											fontSize="text-sm"
											width="w-40"
											align="text-center"
											bgColor="bg-primary"
										/>
										<Button
											href={`/college`}
											text="Download Brochure"
											fontSize="text-sm"
											outline
											width="w-40"
											align="text-center"
											bgColor="bg-white"
											fontColor="text-primary-text"
										/>
										<Button
											href={`/college`}
											text="Get Updates"
											outline
											fontSize="text-sm"
											width="w-40"
											fontColor="text-primary-text"
											align="text-center"
										/>
									</div>
								</div>
								{index / 4 === 0 ? (
									<>
										<div className="my-4 bg-white py-4 px-4">
											<Carousel
												slidesDesktop={4}
												slidesTablet={3}
												title="Featured Exams"
												showPagination={false}
												slides={[1, 2, 3, 4, 5].map((clgData, index) => {
													return <ExamCard key={index} />;
												})}
											/>
										</div>
									</>
								) : (
									<></>
								)}
							</div>
						)
					})}
				</>
			) : (
				<div className=" p-4 shadow-lg bg-white">
					<p className="text-2xl text-center text-gray-500">
						No data available
					</p>
				</div>
			)}
		</>
		// <div className="py-4 border-b-2 border-[#DDDDDD]">
		// 	<div className="px-4 flex items-center gap-4 bg-white shadow-sm rounded border flex-col md:flex-row">
		// 		<div className="flex items-center">
		// 			<Image src={"/btech.png"} width={150} height={150} alt={""} />
		// 		</div>
		// 		<div className="my-4 flex flex-1 flex-col gap-4 border-r border-r-primary-light ">
		// 			<Link
		// 				href={{
		// 					pathname: `/courses/3`,
		// 					query: { tab: "overview" },
		// 				}}
		// 			>
		// 				<div>
		// 					<h2 className="text-xl font-semibold text-primary">
		// 						{"Bachelor of Technology"}
		// 					</h2>
		// 				</div>
		// 			</Link>
		// 			<div className="flex flex-col gap-3 items-stretch">
		// 				<p className="text-secondary-text font-light">
		// 					Average Duration:{" "}
		// 					<span className="text-primary-text font-medium">{"4 Years"}</span>
		// 				</p>
		// 				<p className="text-secondary-text font-light flex items-center gap-2">
		// 					Offered by:{" "}
		// 					<Tag
		// 						text={"IIT Madras"}
		// 						bgcolor="bg-pink-100"
		// 						color="text-pink-500"
		// 						fontSize="text-sm"
		// 						rounded
		// 					/>
		// 					<Tag
		// 						text={"IIT Madras"}
		// 						bgcolor="bg-pink-100"
		// 						color="text-pink-500"
		// 						fontSize="text-sm"
		// 						rounded
		// 					/>
		// 					<Tag
		// 						text={"IIT Madras"}
		// 						bgcolor="bg-pink-100"
		// 						color="text-pink-500"
		// 						fontSize="text-sm"
		// 						rounded
		// 					/>
		// 				</p>
		// 				<p className="text-secondary-text font-light">
		// 					<span className="text-[#B12704] text-2xl font-medium">
		// 						{"₹2,09,999"}
		// 					</span>{" "}
		// 					- Total Fees
		// 				</p>
		// 			</div>
		// 		</div>

		// 		<div className="flex flex-row gap-1 flex-wrap justify-center md:flex-col md:gap-4 md:my-4 items-center">
		// 			<Button
		// 				href={`/college`}
		// 				text="Register Now"
		// 				filled
		// 				fontSize="text-sm"
		// 				width="w-40"
		// 				align="text-center"
		// 				bgColor="bg-primary"
		// 			/>
		// 			<Button
		// 				href={`/college`}
		// 				text="Download Brochure"
		// 				fontSize="text-sm"
		// 				outline
		// 				width="w-40"
		// 				align="text-center"
		// 				bgColor="bg-white"
		// 				fontColor="text-primary-text"
		// 			/>
		// 			<Button
		// 				href={`/college`}
		// 				text="Get Updates"
		// 				outline
		// 				fontSize="text-sm"
		// 				width="w-40"
		// 				fontColor="text-primary-text"
		// 				align="text-center"
		// 			/>
		// 		</div>
		// 	</div>
		// </div>
	);
}
