import Link from "next/link";

import Image from "next/image";
import Tag from "../tag/tags";
import Button from "../button/button";
import { GetDefaultImage, getStrapiMedia } from "@/utils/api-helper";
import { formatDate } from "@/utils/formatDate";
import Carousel from "../carousel/carousel";
import CourseCard from "../card/courseCard";
import ExamCard from "../card/examCard";

export default function ExamListItem({ exams}: any) {

	return (
		<>
			{exams?.length > 0 ? (
				<>
					{exams?.map((exam: any, index: number) => {
						const logoURL = exam?.attributes?.logo?.data?.attributes?.url
							? getStrapiMedia(exam?.attributes?.logo?.data?.attributes?.url)
							: GetDefaultImage("logo");

						return (
							<div className="py-4 " key={index}>
								<div className="px-4 py-4 md:py-0 flex item-center gap-4 bg-white drop-shadow-sm hover:drop-shadow-xl rounded-xl border flex-col md:flex-row ">
									<div className="flex items-center">
										<Image src={logoURL!} width={150} height={150} alt={""} />
									</div>
									<div className="my-4 flex flex-1 flex-col gap-4 border-r border-r-primary-light ">
										<Link href={`/exams/${exam.id}`}>
											<div>
												<h2 className="text-xl font-semibold text-primary">
													{exam?.attributes?.name}
												</h2>
											</div>
										</Link>
										<div className="flex flex-col gap-1 items-stretch">
											<p className="text-secondary-text font-light">
												Application Date:{" "}
												<span className="text-primary-text font-medium">
													{formatDate(
														exam?.attributes?.applicationDate?.startDate
													)}{" "}
													{exam?.attributes?.applicationDate?.endDate &&
														`- ${formatDate(
															exam?.attributes?.applicationDate?.endDate
														)}`}
												</span>
											</p>
											<p className="text-secondary-text font-light">
												Exam Date:{" "}
												<span className="text-primary-text font-medium">
													{formatDate(exam?.attributes?.examDate?.startDate)}{" "}
													{exam?.attributes?.examDate?.endDate &&
														`- ${formatDate(
															exam?.attributes?.examDate?.endDate
														)}`}
												</span>
											</p>
											<p className="text-secondary-text font-light">
												Result Date:{" "}
												<span className="text-primary-text font-medium">
													{formatDate(exam?.attributes?.resultDate?.startDate)}{" "}
													{exam?.attributes?.resultDate?.endDate &&
														`- ${formatDate(
															exam?.attributes?.resultDate?.endDate
														)}`}
												</span>
											</p>

											<p className="text-secondary-text font-light">
												Level:{" "}
												<span className="text-primary-text font-medium">
													{exam?.attributes?.examLevel?.data?.map(
														(level: any, index: number) => {
															return (
																<span key={index}>
																	{" " + `${level?.attributes?.name}`}
																</span>
															);
														}
													)}
												</span>
											</p>
											<div className="flex gap-2 flex-wrap my-2 items-center">
												<Tag
													text="Overview"
													outlineColor="border-primary"
													bgcolor="bg-white"
												/>
												<Tag
													text="Eligibility"
													outlineColor="border-primary"
													bgcolor="bg-white"
												/>
												<Tag
													text="Exam Pattern & Sylabus"
													outlineColor="border-primary"
													bgcolor="bg-white"
												/>
												<Tag
													text="Application"
													outlineColor="border-primary"
													bgcolor="bg-white"
												/>
												<Tag
													text="Process"
													outlineColor="border-primary"
													bgcolor="bg-white"
												/>
												<Tag
													text="Preparation Materials"
													outlineColor="border-primary"
													bgcolor="bg-white"
												/>
												<Tag
													text="Sample Paers"
													outlineColor="border-primary"
													bgcolor="bg-white"
												/>
												<Tag
													text="Discussion"
													outlineColor="border-primary"
													bgcolor="bg-white"
												/>
												<Tag
													text="Forum"
													outlineColor="border-primary"
													bgcolor="bg-white"
												/>
												<Tag
													text="Cut-off"
													outlineColor="border-primary"
													bgcolor="bg-white"
												/>
												<Tag
													text="College Predictor"
													outlineColor="border-primary"
													bgcolor="bg-white"
												/>
												<Tag
													text="Accepting Colleges"
													outlineColor="border-primary"
													bgcolor="bg-white"
												/>
											</div>
										</div>
									</div>

									<div className="flex flex-row gap-1 flex-wrap md:justify-center md:flex-col md:gap-4 md:my-4 items-center">
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
											bgColor="bg-amber-400"
											fontColor="text-primary-text"
										/>
										<Button
											href={`/college`}
											text="Get Updates"
											outline
											fontSize="text-sm"
											width="w-40"
											fontColor="text-black"
											align="text-center"
											bgColor="bg-white"
										/>
									</div>
								</div>
								{/* {index % 4 === 0 ? (
									<>
										<div className="my-4 bg-white py-4 px-4">
											<Carousel
												slidesDesktop={4}
												slidesTablet={3}
												title="Featured Exams"
												showPagination={false}
												slides={featuredExams?.data?.map(
													(exam: any, index: number) => {
														return (
															<ExamCard key={index} featuredExams={exam} />
														);
													}
												)}
											/>
										</div>
									</>
								) : (
									<></>
								)} */}
							</div>
						);
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
	);
}
