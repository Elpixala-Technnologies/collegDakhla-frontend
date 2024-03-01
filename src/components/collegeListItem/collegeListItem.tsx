import Link from "next/link";
import Button from "../button/button";
import { FaRegStar, FaRegUser } from "react-icons/fa";
import { PiBooksLight } from "react-icons/pi";
import Feature from "../feature/feature";
import { useQuery } from "@apollo/client";
import { getStates } from "@/query/schema";
import { GetDefaultImage, getStrapiMedia } from "@/utils/api-helper";
import StarRating from "../starRating/starRating";
import { FaImage, FaVideo } from "react-icons/fa6";
import { IoShieldCheckmark } from "react-icons/io5";

export default function CollegeListItem(allColleges: any) {
  //query to get all states
  const {
    loading: statesLoader,
    error: statesError,
    data: statesData,
  } = useQuery(getStates);

  const collegeFee = parseInt(
    allColleges?.colleges?.attributes?.fees
      ? allColleges?.colleges?.attributes?.fees
      : 200000
  ).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <>
      {allColleges?.colleges?.length > 0 ? (
        <>
          {allColleges.colleges.map((college: any, index: any) => {
            const logoURL = college?.attributes?.collegeLogo?.data?.attributes
              ?.url
              ? getStrapiMedia(
                  college?.attributes?.collegeLogo?.data?.attributes?.url
                )
              : GetDefaultImage("logo");

            const bannerURL = college?.attributes?.banner?.data[0]
              ? getStrapiMedia(
                  college?.attributes?.banner?.data[0]?.attributes?.url
                )
              : GetDefaultImage("banner");

            return (
              <div key={index}>
                <div className="mb-4 p-4 flex flex-col sm:flex-row gap-4 shadow-lg bg-white">
                  <div className="relative h-44">
                    <img
                      src={bannerURL!}
                      alt={college?.collegeName}
                      className="w-full sm:w-48 h-44 object-fill rounded-sm max-w-44"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-sm"></div>
                    <div className="absolute inset-0 text-white  mx-auto my-2 w-10/12">
                      <div className="flex justify-between">
                        <div className="flex gap-3 items-start">
                          <div className="flex gap-2 items-center text-sm">
                            <FaImage /> 7
                          </div>

                          <div className="flex gap-2 items-center text-sm">
                            <FaVideo /> 7
                          </div>
                        </div>
                        <div>
                          <div className="text-xs">Our Rating</div>
                          <div className="text-end">
                            {college?.attributes?.rating
                              ? college?.attributes?.rating
                              : 8.6}
                            /10
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pb-4 flex flex-1 flex-col gap-3">
                    <Link href={`/college/${college.id}`}>
                      <div className="flex flex-row gap-2">
                        <div>
                          <img src={college.logo} alt="" />
                        </div>
                        <div className="flex flex-col">
                          <h2 className="text-xl font-bold">
                            {college?.attributes?.collegeName}
                          </h2>
                          <div className="text-xs">
                            {college?.attributes?.city?.data?.attributes?.name},
                            {college?.attributes?.state?.data?.attributes?.name}{" "}
                            |{" "}
                            {college?.attributes?.rankedBy?.data[0]?.attributes
                              ?.name
                              ? college?.attributes?.rankedBy?.data[0]
                                  ?.attributes?.name
                              : "UGC"}{" "}
                            |{" "}
                            {college?.attributes?.college_type?.data?.attributes
                              ?.type
                              ? college?.attributes?.college_type?.data
                                  ?.attributes?.type
                              : "Private"}{" "}
                            | {"Rank 6"}
                          </div>
                        </div>
                      </div>
                    </Link>
                    <div className="flex items-stretch">
                      <div className="pr-4 mr-4 border-r border-extra-light-text">
                        <p className="text-primary font-semibold text-lg">
                          {collegeFee}
                        </p>
                        <p className="text-xs text-secondary-text font-light">
                          BE/B.Tech First year fees
                        </p>
                      </div>
                      <div className="pr-4 mr-4 border-r border-extra-light-text">
                        <p className="text-primary font-semibold text-lg">
                          JEE Advance
                        </p>
                        <p className="text-xs text-secondary-text font-light">
                          Exam Accepting
                        </p>
                      </div>
                      <div className="pr-4 mr-4">
                        <p className="text-primary font-semibold text-lg">
                          {college?.attributes?.rating
                            ? college?.attributes?.rating
                            : 8.6}
                          /10
                        </p>
                        <p className="text-xs text-secondary-text font-light">
                          Based on user review
                        </p>
                      </div>
                    </div>
                    {/* <div className="flex gap-2">
                      <div>User Reviews:</div>
                      <StarRating rating={3} />
                    </div> */}
                    <div className="flex gap-2">
                      <Button
                        href={`/college/${college.id}`}
                        text="Admission 2024"
                        icon={<FaRegUser />}
                        fontSize="text-xxs"
                        outline
                        color="text-primary"
                        rounded
                        fontColor="text-primary-text"
                      />
                      <Button
                        href={`/college/${college.id}`}
                        text="Review"
                        icon={<FaRegStar />}
                        outline
                        rounded
                        fontSize="text-xxs"
                        fontColor="text-primary-text"
                      />
                      <Button
                        href={`/college/${college.id}`}
                        text="Course & Fees"
                        icon={<PiBooksLight />}
                        outline
                        rounded
                        fontSize="text-xxs"
                        fontColor="text-primary-text"
                      />
                    </div>
                    <div>
                      <div className="flex items-stretch text-primary">
                        <div className="pr-4 mr-4 border-r border-primary">
                          <p className="text-sm t font-light">Date</p>
                        </div>
                        <div className="pr-4 mr-4 border-r border-primary">
                          <p className="text-sm  font-light">News</p>
                        </div>
                        <div className="pr-4 mr-4 border-r border-primary">
                          <p className="text-sm  font-light">Admission</p>
                        </div>
                        <div className="pr-4 mr-4 border-r border-primary">
                          <p className="text-sm  font-light">Broshure</p>
                        </div>
                        <div className="pr-4 mr-4 border-r border-primary">
                          <p className="text-sm  font-light">Placement</p>
                        </div>
                        <div className="pr-4 mr-4">
                          <p className="text-sm  font-light">Course</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3 items-center">
                      <div className="text-3xl text-primary">
                        <IoShieldCheckmark />
                      </div>
                      <div className="flex items-center gap-3 text-sm overflow-x-auto">
                        <div className="text-secondary-text text-nowrap">
                          <span className="text-primary font-semibold">
                            #11
                          </span>{" "}
                          out of <span className="font-medium">NIRF</span>
                        </div>
                        <div className="text-secondary-text text-nowrap">
                          <span className="text-primary font-semibold">
                            #11
                          </span>{" "}
                          out of <span className="font-medium">NIRF</span>
                        </div>
                        <div className="text-secondary-text text-nowrap">
                          <span className="text-primary font-semibold">
                            #11
                          </span>{" "}
                          out of <span className="font-medium">NIRF</span>
                        </div>
                        <div className="text-secondary-text text-nowrap">
                          <span className="text-primary font-semibold">
                            #11
                          </span>{" "}
                          out of <span className="font-medium">NIRF</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row gap-1 flex-wrap justify-center md:flex-col md:gap-4 md:my-4 items-center border-l border-l-extra-light-text px-4">
                    <Button
                      href={`/college/${college.id}`}
                      text="Apply Now"
                      filled
                      fontSize="text-sm"
                      width="w-40"
                      align="text-center"
                      bgColor="bg-primary"
                    />
                    <Button
                      href={`/college/${college.id}`}
                      text="Download Brochure"
                      fontSize="text-sm"
                      outline
                      width="w-40"
                      align="text-center"
                      bgColor="bg-white"
                      fontColor="text-primary-text"
                    />
                    <Button
                      href={`/college/${college.id}`}
                      text="Compare"
                      outline
                      fontSize="text-sm"
                      width="w-40"
                      fontColor="text-primary-text"
                      align="text-center"
                    />
                  </div>
                </div>
                {(index + 1) % 4 == 0 ? (
                  <div>
                    <Feature
                      title="Filter By State"
                      tags={statesData?.states?.data}
                    />
                  </div>
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
