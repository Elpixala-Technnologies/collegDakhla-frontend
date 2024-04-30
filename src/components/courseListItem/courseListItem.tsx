import Link from "next/link";
import Image from "next/image";
import Tag from "../tag/tags";
import Button from "../button/button";
import { getStrapiMedia, GetDefaultImage } from "@/utils/api-helper";
import Carousel from "@/components/carousel/carousel";
import formatFees from "@/utils/formatFees";
import CourseCard from "../card/courseCard";

export default function CourseListItem({ courses, featuredCourses }: any) {
  return (
    <>
      {courses?.data?.length > 0 ? (
        <>
          {courses?.data.map((course: any, index: number) => {
            const logoURL = course?.attributes?.logo?.data?.attributes?.url
              ? getStrapiMedia(course?.attributes?.logo?.data?.attributes?.url)
              : GetDefaultImage("logo");

            return (
              <div className="py-4 border-b-2 border-[#DDDDDD]" key={index}>
                <div className="px-4 py-4 md:py-0 flex md:items-center gap-4 bg-white shadow-sm rounded border flex-col md:flex-row">
                  <div className="flex items-center">
                    <Image src={logoURL!} width={150} height={150} alt={""} />
                  </div>
                  <div className="my-4 flex flex-1 flex-col gap-4 border-r border-r-primary-light ">
                    <Link href={`/courses/${course.id}`}>
                      <div>
                        <h2 className="text-xl font-semibold text-primary">
                          {course?.attributes?.name}
                        </h2>
                      </div>
                    </Link>
                    <div className="flex flex-col gap-3 items-stretch">
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
                      <p className="text-secondary-text font-light">
                        <span className="text-[#B12704] text-2xl font-medium">
                          {formatFees(course?.attributes?.fees)}
                        </span>{" "}
                        - Total Fees
                      </p>
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
                      bgColor="bg-white"
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
                {(index + 1) % 4 === 0 ? (
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
                )}
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
