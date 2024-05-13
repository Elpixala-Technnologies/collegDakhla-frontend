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

export default function CourseListItem({ courses, featuredCourses }: any) {
  return (
    <>
      {courses?.length > 0 ? (
        <>
          {courses?.map((course: any, index: number) => {
            const logoURL = course?.attributes?.logo?.data?.attributes?.url
              ? getStrapiMedia(course?.attributes?.logo?.data?.attributes?.url)
              : GetDefaultImage("logo");

            return (
              <div className="py-4" key={index}>
                <div className=" py-4 md:py-0 flex item-center gap-4 bg-white drop-shadow-sm hover:drop-shadow-xl rounded-xl border flex-col md:flex-row ">
                  <div className="flex flex-col gap-4 w-full">
                    {/* <div className="flex items-center">
                      <Image src={logoURL!} width={150} height={150} alt={""} />
                    </div> */}
                    <div className="flex flex-1 flex-row gap-4 p-2 border-r-primary-light ">
                      <div className="flex items-center">
                        <Image src={logoURL!} width={150} height={150} alt={""} />
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-row gap-4">
                          <Rating
                            name="half-rating"
                            defaultValue={2.5}
                            precision={0.5}
                          />
                          <div className="flex flex-row gap-2">
                            <CiLocationOn className="text-2xl text-gray-400" />
                            <span className="text-blue-800">Chennai, Tamil Nadu</span>
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
                            <span className="text-primary pr-1">{course?.id}</span>
                            <span className="text-blue-800 font-bold">NIRF</span>
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
                          <p className="text-secondary-text font-light">
                            <span className="text-primary font-semibold text-sm lg:text-lg">
                              {formatFees(course?.attributes?.fees)}
                            </span>{" "}
                            - Total Fees
                          </p>
                          <p className="text-secondary-text font-light">
                            Average Duration:{" "}
                            <span className="text-primary-text font-medium">
                              {course?.attributes?.duration} Years
                            </span>
                          </p>
                          <div className="text-secondary-text font-light flex flex-wrap items-center gap-2">
                            Offered by:{" "}
                            {course?.attributes?.colleges?.data.map(
                              (college: any, index: number) => {
                                return (
                                  <Tag
                                    text={college?.attributes?.collegeName}
                                    bgcolor="bg-pink-100"
                                    color="text-pink-500"
                                    rounded
                                    key={index}
                                  />
                                );
                              }
                            )}
                          </div>
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
