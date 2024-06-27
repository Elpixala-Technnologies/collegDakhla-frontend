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
import React, { useState } from "react";
import userFrom from "@/hooks/userFrom";
import ApplyNowModal from "../consultingModule/ApplyNowModal/ApplyNowModal";
import useUserMetaData from "@/query/hooks/useUserMetaData";
import { useAppSelector } from "@/store";
import useSignup from "@/query/hooks/useSignup";
import { ID } from "@/types/global";
import {
  formatNumber,
  getRandomRatingValue,
  getRandomReviews,
} from "@/utils/randomValues";

export default function ExamListItem({ exams }: any) {
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

  const AppliedData: any = userData?.userAllMetaData?.appliedExams;

  const handleDownload = () => {
    const pdfPath = "@src/Assets/new_document.pdf";
    const link = document.createElement("a");
    link.href = pdfPath;
    link.download = "brochure.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {exams?.length > 0 && (
        <>
          {exams?.map((exam: any, index: number) => {
            const logoURL = exam?.attributes?.logo?.data?.attributes?.url
              ? getStrapiMedia(exam?.attributes?.logo?.data?.attributes?.url)
              : GetDefaultImage("logo");

            const isApplied =
              Array.isArray(AppliedData) &&
              AppliedData?.some(
                (applied: any) => applied?.exams?.data?.id === exam?.id
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
                        className="sm:h-40 sm:w-40 w-full max-w-40 object-contain rounded-md max-md:mx-auto"
                      />
                    </div>
                    {/* Right Side  */}
                    <div className="flex flex-col gap-2 md:col-span-8">
                      {/* line1  */}
                      <div className="flex flex-col gap-2 mt-1">
                        <Link href={`/exams/${exam.id}`}>
                          <h2 className="text-2xl font-semibold">
                            {exam?.attributes?.name}
                          </h2>
                        </Link>
                        <div className="flex flex-wrap gap-x-5 gap-y-2">
                          <div className="text-secondary-text font-light flex items-center flex-row gap-2">
                            <CiCalendarDate className="text-5xl text-primary" />
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
                          <div className="text-secondary-text font-light flex flex-row p-1 items-center gap-2">
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
                          <div className="text-secondary-text font-light flex flex-row p-1 items-center gap-2">
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
                          <p className="text-gray-600 text-sm line-clamp-2">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat.
                          </p>
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
                          <Link href={`/exams/${exam.id}`}>
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
                          // href={`/`}
                          onClick={() => handleOpenModal(exam?.attributes?.id)}
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
      )}
      {isModalOpen && (
        <ApplyNowModal
          id={selectedId}
          FromStep={FromStep}
          isSectionCheck={"Exam"}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
