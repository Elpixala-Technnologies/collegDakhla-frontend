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
import { useState } from "react";
import ApplyNowModal from "../consultingModule/ApplyNowModal/ApplyNowModal";
import userFrom from "@/hooks/userFrom";
import useSignup from "@/query/hooks/useSignup";
import { ID } from "@/types/global";
import { useAppSelector } from "@/store";
import useUserMetaData from "@/query/hooks/useUserMetaData";


export default function CourseListItem({ courses, featuredCourses }: any) {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { CollegeApplicatonListData } = userFrom();

  const [selectedId , setSelectedId]= useState(null);


  const handleOpenModal = (id:any) => {
    setIsModalOpen(true);
    setSelectedId(id)
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

              const isApplied =Array.isArray(AppliedData) &&  AppliedData?.some(
                (applied: any) => applied?.courses?.data?.id === course?.id
              );

            return (
              <div className="py-4" key={index}>
                <div className=" py-4 md:py-0 flex item-center gap-4 bg-white drop-shadow-sm hover:drop-shadow-xl rounded-xl border flex-col md:flex-row ">
                  <div className="flex flex-col gap-4 w-full">
                    {/* <div className="flex items-center">
                      <Image src={logoURL!} width={150} height={150} alt={""} />
                    </div> */}
                    <div className="flex flex-1 flex-row gap-4 p-2 border-r-primary-light ">
                      <div className="flex items-center">
                        <Image
                          src={logoURL!}
                          width={150}
                          height={150}
                          alt={""}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-row gap-1">
                          <Rating
                            name="half-rating"
                            defaultValue={2.5}
                            precision={0.5}
                            size="small"
                          />
                          <div className="flex flex-row gap-1 items-center">
                            <CiLocationOn className="text-lg text-gray-400" />
                            <span className="text-blue-800 text-sm">
                              Chennai, Tamil Nadu
                            </span>
                          </div>
                          <div className="flex flex-row gap-2">
                            <RiFlagLine className="text-2xl text-gray-400" />
                            <span>
                              {
                                course?.attributes?.examLevel?.data?.[0]
                                  .attributes?.name
                              }
                            </span>
                          </div>
                          <div className="flex flex-row">
                            <span className="text-secondary-text">#</span>
                            <span className="text-primary pr-1">
                              {course?.id}
                            </span>
                            <span className="text-blue-800 font-bold">
                              NIRF
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 mt-1">
                          <Link href={`/courses/${course.id}`}>
                            <div>
                              <h2 className="text-xl font-semibold text-black">
                                {course?.attributes?.name}
                              </h2>
                            </div>
                          </Link>
                          <p className="text-secondary-text font-light flex items-center gap-2">
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
                          </p>
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
                                  <div className="text-sm hover:text-primary cursor-pointer font-medium text-secondary-text" key={index}>
                                    {college?.attributes?.collegeName}
                                    {index <
                                      course?.attributes?.colleges?.data
                                        .length -
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
                        <button disabled={isApplied}>
                        <Button
                          onClick={()=>handleOpenModal(course?.attributes?.id)}
                          text={isApplied ? "Applied" : "Apply Now"}
                          filled
                          fontSize="text-sm"
                          width="w-40"
                          align="text-center"
                          bgColor="bg-primary"
                          paddingY="py-3"
                        />
                        </button>
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
