"use client";
import Link from "next/link";
import Image from "next/image";
import Tag from "../tag/tags";
import Button from "../button/button";
import { getStrapiMedia, GetDefaultImage } from "@/utils/api-helper";
import Carousel from "@/components/carousel/carousel";
import formatFees from "@/utils/formatFees";
import CourseCard from "../card/courseCard";
import { Rating } from "@mui/material";
import { RiFlagLine } from "react-icons/ri";
import { CiLocationOn } from "react-icons/ci";
import { Duration, RupeeBaves } from "@/Asset";
import { FaBabyCarriage } from "react-icons/fa";
import React, { useState } from "react";
import ApplyNowModal from "../consultingModule/ApplyNowModal/ApplyNowModal";
import userFrom from "@/hooks/userFrom";
import useSignup from "@/query/hooks/useSignup";
import { ID } from "@/types/global";
import { useAppSelector } from "@/store";
import useUserMetaData from "@/query/hooks/useUserMetaData";
import { formatNumber, getRandomRatingValue, getRandomReviews } from "@/utils/randomValues";

export default function CourseListItem({ courses, featuredCourses }: any) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { CollegeApplicatonListData } = userFrom();

	const [selectedId, setSelectedId] = useState(null);

	const handleOpenModal = (id: any) => {
		setIsModalOpen(true);
		setSelectedId(id);
		document.body.classList.add("overflow-hidden");
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		document.body.classList.remove("overflow-hidden");
	};

	const FromStep: any = CollegeApplicatonListData?.form_stape;

	const { GetUserMetaData } = useUserMetaData();

	const { userID } = useAppSelector((store: any) => store.auth);
	let isLogin = useAppSelector((state) => state.auth.authState);

	const { GetUserDataMetaId } = useSignup();

	const userMetaId: ID = GetUserDataMetaId(userID);

	const userData = GetUserMetaData(userMetaId);

	const AppliedData: any = userData?.userAllMetaData?.appliedCourses;

	return (
		<>
			{courses?.length > 0 && (
				<>
					{courses?.map((course: any, index: number) => {
						const logoURL = course?.attributes?.logo?.data?.attributes?.url
							? getStrapiMedia(course?.attributes?.logo?.data?.attributes?.url)
							: GetDefaultImage("logo");

						const isApplied =
							Array.isArray(AppliedData) &&
							AppliedData?.some(
								(applied: any) => applied?.courses?.data?.id === course?.id
							);

						return (
							<div key={index}>
								<div className="mb-5 flex flex-wrap md:flex-row border border-zinc-300 bg-white rounded-lg  hover:drop-shadow-lg">
									<div className="grid grid-cols-1 md:grid-cols-10 gap-5 p-4">
										{/* Image  */}
										<div className="relative rounded-lg md:col-span-2">
											<Image
												src={logoURL!}
												width={700}
												height={700}
												alt={""}
												className="sm:h-44 sm:w-44 w-full max-w-44 object-contain rounded-md max-md:mx-auto"
											/>
										</div>
										{/* Right Side  */}
										<div className="flex flex-col gap-1 md:col-span-8">
											{/* line1  */}
											<div className="flex max-sm:flex-col gap-4">
												<p className="text-[#0F4988] flex gap-1 items-center text-sm">
													<Rating
														name="half-rating"
														defaultValue={getRandomRatingValue()}
														precision={0.5}
														readOnly
													/>
													<span>({formatNumber(getRandomReviews())} reviews)</span>
												</p>
												<p className="text-[#0F4988] flex gap-1 items-center text-sm">
													<CiLocationOn className="text-2xl text-gray-400" />
													<span className="text-blue-800">
														Chennai, Tamil Nadu
													</span>
												</p>
												<p className="text-[#0F4988] flex gap-1 items-center text-sm">
													<RiFlagLine className="text-2xl text-gray-400" />
													<span>
														{
															course?.attributes?.examLevel?.data?.[0]
																.attributes?.name
														}
													</span>
												</p>
												<div className="flex flex-row">
													<span className="text-secondary-text">#</span>
													<span className="text-primary pr-1">
														{course?.id}
													</span>
													<span className="text-blue-800 font-bold">NIRF</span>
												</div>
											</div>
											<div className="flex flex-col gap-2 mt-1">
												<Link href={`/courses/${course?.attributes?.url}`}>
													<div>
														<h2 className="text-xl font-semibold text-black">
															{course?.attributes?.name}
														</h2>
													</div>
												</Link>
												<div className="text-secondary-text font-light flex items-center gap-2">
													<Image
														src={RupeeBaves}
														width={25}
														height={25}
														alt={"approvedBy"}
													/>
													<span className="text-primary font-semibold text-sm lg:text-lg">
														{formatFees(course?.attributes?.fees)}
													</span>{" "}
													- Total Fees
												</div>
												<p className="text-secondary-text font-light flex items-center gap-2">
													<Image
														src={Duration}
														width={25}
														height={25}
														alt={"approvedBy"}
													/>
													<span className="text-primary-text font-medium">
														{course?.attributes?.duration} Years
													</span>
													- Average Duration:{" "}
												</p>
												<div className="font-normal flex flex-wrap items-center gap-2 mr-5">
													<FaBabyCarriage className="text-xl ml-1 text-gray-700" />
													Offered by:{" "}
													{course?.attributes?.colleges?.data.map(
														(college: any, index: number) => {
															return (
																<div
																	className="text-sm hover:text-primary cursor-pointer font-medium text-secondary-text"
																	key={index}
																>
																	{college?.attributes?.collegeName}
																	{index <
																		course?.attributes?.colleges?.data.length -
																		1 && " | "}
																</div>
															);
														}
													)}
												</div>
												{/* <div className="mr-5">
                          Lorem ipsum dolor, sit amet consectetur adipisicing
                          elit , perferendis aspernatur! Lorem ipsum dolor, sit
                          amet consectetur adipisicing elit , perferendis
                          aspernatur!
                        </div> */}
												{/* <p className="text-secondary-text font-light">
                        <span className="text-[#B12704] text-2xl font-medium">
                          {formatFees(course?.attributes?.fees)}
                        </span>{" "}
                        - Total Fees
                      </p> */}
											</div>
										</div>
									</div>

									<div className="w-full flex max-sm:flex-col gap-y-2 sm:items-center justify-between px-4 pr-2 py-2 border-t text-semibold border-zinc-300">
										<ul className="flex flex-wrap gap-x-3 text-primary sm:w-3/4 capitalize max-sm:text-sm">
											{[
												"Info",
												"Courses",
												"Scholarship",
												"Review",
												"Placement",
											].map((item, index) => (
												<React.Fragment key={index}>
													<Link href={`/courses/${course?.attributes?.url}`}>
														<li className="cursor-pointer hover:underline">
															{item}
														</li>
													</Link>
													{index !== 4 && <li>|</li>}
												</React.Fragment>
											))}
										</ul>
										<div className="flex gap-2 max-sm:flex-col">
											<button disabled={isApplied}>
												<Button
													onClick={() =>
														handleOpenModal(course?.attributes?.id)
													}
													text={isApplied ? "Applied" : "Apply Now"}
													outline
													outlineColor="border-primary"
													fontSize="text-sm"
													width="w-40 max-sm:w-full"
													align="text-center"
													bgColor="bg-primary hover:bg-white"
													fontColor="text-white hover:text-primary"
												/>
											</button>
											<Button
												href={`/`}
												text="Download Brochure"
												fontSize="text-sm"
												outline
												width="w-40 max-sm:w-full"
												outlineColor="border-primary"
												fontColor="text-primary hover:text-white"
												align="text-center"
												bgColor="bg-white hover:bg-primary"
											/>
										</div>
									</div>
								</div>
								{/* {(index + 1) % 4 === 0 ? (
                  <>
                    <div className="my-4 bg-white py-4 px-4">
                      <Carousel
                        slidesDesktop={4}
                        slidesTablet={3}
                        title="Featured Courses"
                        showPagination={false}
                        slides={featuredCourses?.data?.map(
                          (course: any, index: number) => {
                            return (
                              <CourseCard key={index} featuredCourse={course} />
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
			)}

			{isModalOpen && (
				<ApplyNowModal
					id={selectedId}
					FromStep={FromStep}
					isSectionCheck={"Course"}
					onClose={handleCloseModal}
				/>
			)}
		</>
	);
}
