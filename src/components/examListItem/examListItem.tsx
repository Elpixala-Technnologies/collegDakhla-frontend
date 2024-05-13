import Link from "next/link";

import Image from "next/image";
import Tag from "../tag/tags";
import Button from "../button/button";
import { GetDefaultImage, getStrapiMedia } from "@/utils/api-helper";
import { formatDate } from "@/utils/formatDate";
import { CiCalendarDate, CiLocationOn } from "react-icons/ci";
import { BsCalendarDate } from "react-icons/bs";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { Rating } from "@mui/material";
import { RiFlagLine } from "react-icons/ri";

export default function ExamListItem({ exams }: any) {
  console.log(exams, "exams");
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
                <div className=" py-4 md:py-0 flex item-center gap-4 bg-white drop-shadow-sm hover:drop-shadow-xl rounded-xl border flex-col md:flex-row ">
                  <div className="flex flex-col gap-4 w-full">
                    <div className=" flex flex-1 flex-row gap-4 p-2">
                      <div className="flex items-center">
                        <Image
                          src={logoURL!}
                          width={150}
                          height={150}
                          alt={""}
                          className="w-full h-32 max-w-40 rounded-lg"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-row gap-4">
                          <Rating
                            name="half-rating"
                            defaultValue={2.5}
                            precision={0.5}
                            size="small"
                          />
                          <div className="flex flex-row items-center gap-1">
                            <CiLocationOn className="text-lg text-gray-400" />
                            <span className="text-blue-800 text-sm">Chennai, Tamil Nadu</span>
                          </div>
                          <div className="flex flex-row gap-1 items-center">
                            <RiFlagLine className="text-lg text-gray-400" />
                            <h6 className="text-sm">
                              {
                                exam?.attributes?.examLevel?.data?.[0]
                                  .attributes?.name
                              }
                            </h6>
                          </div>
                          <div className="flex flex-row">
                            <span className="text-secondary-text">#</span>
                            <span className="text-primary pr-1">{exam?.id}</span>
                            <span className="text-blue-800 font-bold">NIRF</span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 mt-1">
                        <Link href={`/exams/${exam.id}`}>
                          <div>
                            <h2 className="text-xl font-semibold">
                              {exam?.attributes?.name}
                            </h2>
                          </div>
                        </Link>
                        <div className="flex flex-row gap-2 items-stretch">
                          <div className="text-secondary-text font-light flex flex-row p-1 items-start gap-2">
                            <CiCalendarDate className="text-4xl text-primary" />
                            <div className="flex flex-col">
                              <span className="text-primary-text font-medium">
                                Application Date
                              </span>
                              <span className="text-gray-400 font-medium text-sm">
                                {exam?.attributes?.applicationDate?.startDate
                                  ? `${formatDate(
                                      exam.attributes.applicationDate.startDate
                                    )} ${
                                      exam?.attributes?.applicationDate?.endDate
                                        ? `- ${formatDate(
                                            exam.attributes.applicationDate
                                              .endDate
                                          )}`
                                        : ""
                                    }`
                                  : "NULL"}
                              </span>
                            </div>
                          </div>
                          <div className="text-secondary-text font-light flex flex-row p-1 items-start gap-2">
                            <BsCalendarDate className="text-3xl text-primary" />
                            <div className="flex flex-col">
                              <span className="text-primary-text font-medium">
                                Exam Date
                              </span>
                              <span className="text-gray-400  font-medium text-sm">
                                {exam?.attributes?.examDate?.startDate
                                  ? `${formatDate(
                                      exam.attributes.examDate.startDate
                                    )} ${
                                      exam?.attributes?.examDate?.endDate
                                        ? `- ${formatDate(
                                            exam.attributes.examDate.endDate
                                          )}`
                                        : ""
                                    }`
                                  : "NULL"}
                              </span>
                            </div>
                          </div>
                          <div className="text-secondary-text font-light flex flex-row p-1 items-start gap-2">
                            <MdOutlineTipsAndUpdates className="text-3xl text-primary" />
                            <div className="flex flex-col">
                              <span className="text-primary-text font-medium">
                                Result Date
                              </span>
                              <span className="text-gray-400  font-medium text-sm">
                                {exam?.attributes?.resultDate?.startDate
                                  ? `${formatDate(
                                      exam.attributes.resultDate.startDate
                                    )} ${
                                      exam?.attributes?.resultDate?.endDate
                                        ? `- ${formatDate(
                                            exam.attributes.resultDate.endDate
                                          )}`
                                        : ""
                                    }`
                                  : "NULL"}
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* <div className="w-3/4 pt-2">
                          <span className="text-gray-600 text-sm line-clamp-2">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                          </span>
                        </div> */}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row gap-2 items-center justify-between w-full border-t border-black px-2 py-4">
                      <div className="flex gap-2">
                        <span className="lg:text-base text-sm border-r border-gray-300 p-2 text-primary cursor-pointer">
                          Overview
                        </span>
                        <span className="lg:text-base text-sm border-r border-gray-300 p-2 text-primary cursor-pointer">
                          Eligibility
                        </span>
                        <span className="lg:text-base text-sm border-r  border-gray-300 p-2 text-primary cursor-pointer">
                          Exam Pattern
                        </span>
                        <span className="lg:text-base text-sm  p-2 text-primary cursor-pointer lg:flex hidden">
                          Application
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          href={`/`}
                          text="Apply Now"
                          filled
                          fontSize="text-sm"
                          width="w-40"
                          align="text-center"
                          bgColor="bg-primary"
                          paddingY="py-3"
                        />
                        <Button
                          href={`/`}
                          text="Download Brochure"
                          fontSize="text-sm"
                          outline
                          width="w-40"
                          align="text-center"
                          bgColor="bg-white"
                          fontColor="text-primary"
                          paddingY="py-3"
                        />
                      </div>
                    </div>
                  </div>

                  {/* <div className="flex flex-row gap-1 flex-wrap md:justify-center md:flex-col md:gap-4 md:my-4 items-center">
                    <Button
                      href={`/`}
                      text="Register Now"
                      filled
                      fontSize="text-sm"
                      width="w-40"
                      align="text-center"
                      bgColor="bg-primary"
                    />
                    <Button
                      href={`/`}
                      text="Download Brochure"
                      fontSize="text-sm"
                      outline
                      width="w-40"
                      align="text-center"
                      bgColor="bg-gray-400"
                      fontColor="text-primary-text"
                    />
                    <Button
                      href={`/`}
                      text="Get Updates"
                      outline
                      fontSize="text-sm"
                      width="w-40"
                      fontColor="text-black"
                      align="text-center"
                      bgColor="bg-white"
                    />
                  </div> */}
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
