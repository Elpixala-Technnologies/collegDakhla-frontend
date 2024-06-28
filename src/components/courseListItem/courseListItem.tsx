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
import {
  formatNumber,
  getRandomRatingValue,
  getRandomReviews,
} from "@/utils/randomValues";

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
    <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-2">
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
              <div
                key={index}
                className="col-span-1 flex flex-wrap md:flex-row border border-zinc-300 bg-white rounded-lg hover:drop-shadow-lg"
              >
                <div className="w-full p-4">
                  {/* Image  */}
                  <div className="relative rounded-lg flex justify-center w-full">
                    <Image
                      src={logoURL!}
                      width={700}
                      height={700}
                      alt={""}
                      className="sm:h-40 w-full object-contain rounded-md max-md:mx-auto"
                    />
                  </div>
                  {/* Right Side  */}
                  <div className="flex flex-col gap-1">
                    <Link href={`/courses/${course.id}`}>
                      <h2 className="text-2xl font-semibold text-black ml-1">
                        {course?.attributes?.name}
                      </h2>
                    </Link>
                    <div className="flex flex-col gap-1">
                      <div className="text-secondary-text font-light flex flex-col gap-2">
                        <div className="flex gap-2 text-primary font-semibold text-sm lg:text-lg">
                          <Image
                            src={RupeeBaves}
                            width={35}
                            height={35}
                            alt={"approvedBy"}
                          />
                          <div>
                            <p>{formatFees(course?.attributes?.fees)}</p>
                            <p className="text-sm text-zinc-500">Total Fees</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-secondary-text font-semibold flex items-center gap-2">
                        <Image
                          src={Duration}
                          width={35}
                          height={35}
                          alt={"approvedBy"}
                        />
                        <div>
                          <p className="text-primary-text">
                            {course?.attributes?.duration} Years
                          </p>
                          <p className="text-sm text-zinc-500">Avg. Duration</p>
                        </div>
                      </div>
                      <div className="font-normal flex flex-wrap items-center gap-2">
                        <FaBabyCarriage className="text-2xl ml-2 text-gray-700" />
                        <div>
                          <p className="text-secondary-text font-semibold flex items-center gap-2">
                            {course?.attributes?.colleges?.data.map(
                              (college: any, index: number) => {
                                return (
                                  <React.Fragment key={index}>
                                    {college?.attributes?.collegeName}
                                    {index <
                                      course?.attributes?.colleges?.data
                                        .length -
                                        1 && " | "}
                                  </React.Fragment>
                                );
                              }
                            )}
                          </p>
                          <p className="text-sm text-zinc-500">Offered by</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full flex flex-col gap-y-2  p-4 py-2 border-t text-semibold border-zinc-300">
                  <ul className="flex flex-wrap gap-x-2 text-primary capitalize text-sm">
                    {[
                      "Info",
                      "Courses",
                      "Scholarship",
                      "Review",
                      "Placement",
                    ].map((item, index) => (
                      <React.Fragment key={index}>
                        <Link href={`/courses/${course.id}`}>
                          <li className="cursor-pointer hover:underline">
                            {item}
                          </li>
                        </Link>
                        {index !== 4 && <li>|</li>}
                      </React.Fragment>
                    ))}
                  </ul>
                  <div className="flex gap-1 flex-col">
                    <button disabled={isApplied}>
                      <Button
                        onClick={() => handleOpenModal(course?.attributes?.id)}
                        text={isApplied ? "Applied" : "Apply Now"}
                        outline
                        outlineColor="border-primary"
                        fontSize="text-sm"
                        width="w-full"
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
                      width="w-full"
                      outlineColor="border-primary"
                      fontColor="text-primary hover:text-white"
                      align="text-center"
                      bgColor="bg-white hover:bg-primary"
                    />
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
    </div>
  );
}
