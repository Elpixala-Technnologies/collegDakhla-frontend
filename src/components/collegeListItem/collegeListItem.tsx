/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import Button from "../button/button";
import { FaRegStar, FaRegUser } from "react-icons/fa";
import { PiBooksLight } from "react-icons/pi";
import Feature from "../feature/feature";
import { useQuery } from "@apollo/client";
import { getStates } from "@/query/schema";
import { GetDefaultImage, getStrapiMedia } from "@/utils/api-helper";
// import StarRating from "../starRating/starRating";
import { FaImage, FaVideo } from "react-icons/fa6";
import Image from "next/image";
import Separator from "../separator/separator";
import { AvgPackage, Exams, FlagIcon, LocationCity, Reviews, RupeeBaves } from "@/Asset";
// import { IoShieldCheckmark } from "react-icons/io5";

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

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

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
                <div className="mb-4 pt-4 flex flex-wrap md:flex-row gap-4 shadow-lg bg-white rounded-lg drop-shadow hover:drop-shadow-xl">
                  <div className="relative h-44 rounded-lg">
                    <div className="p-2">
                      <Image
                        width={700}
                        height={700}
                        src={logoURL!}
                        alt={college?.collegeName}
                        className="w-full sm:w-48 h-44 object-fill rounded-lg max-w-44"
                      />
                    </div>
                    <div className="absolute bg-black bg-opacity-50 rounded-lg"></div>
                    {/* <div className="absolute inset-0 text-white  mx-auto my-2 w-10/12">
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
                    </div> */}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex flex-1 flex-col gap-3">
                      <Link href={`/colleges/${college.id}`}>
                        <div className="flex items-stretch p-1">
                          <div className="pr-6 mr-6">
                            <p className="text-[#0F4988] flex gap-1 items-center  text-sm lg:text-sm">
                              <Image
                                src={Reviews}
                                width={35}
                                height={35}
                                alt={"approvedBy"}
                              />
                              {college?.attributes?.rating
                                ? college?.attributes?.rating
                                : 4.5}{" "}
                              /10
                              {" "}
                            </p>
                          </div>
                          <div className="pr-6 mr-6  border-extra-light-text">
                            <p className="text-[#0F4988] flex gap-1 items-center text-sm">
                              <Image
                                src={LocationCity}
                                width={20}
                                height={20}
                                alt={"approvedBy"}
                              />
                              {
                                college?.attributes?.city?.data?.attributes
                                  ?.name
                              }
                              ,
                              {
                                college?.attributes?.state?.data?.attributes
                                  ?.name
                              }{" "}
                            </p>
                          </div>
                          <div className="pr-6 mr-4">
                            <p className="text-[#0F4988] flex gap-1 items-center font-semibold text-sm">
                              <Image
                                src={AvgPackage}
                                width={20}
                                height={20}
                                alt={"approvedBy"}
                              />
                              {college?.attributes?.rankedBy?.data[0]
                                ?.attributes?.name
                                ? college?.attributes?.rankedBy?.data[0]
                                  ?.attributes?.name
                                : "UGC"}{" "}
                            </p>
                          </div>
                          <div className="pr-6 mr-4">
                            <p className="text-[#0F4988] flex gap-1 items-center font-semibold text-sm">
                              <Image
                                src={FlagIcon}
                                width={15}
                                height={15}
                                alt={"approvedBy"}
                              />
                              {college?.attributes?.college_type?.data
                                ?.attributes?.type
                                ? college?.attributes?.college_type?.data
                                  ?.attributes?.type
                                : "Private"}{" "}
                              | {"Rank 6"}
                            </p>
                          </div>
                        </div>
                        <h2 className="text-xl text-[#202020]  font-semibold">
                          {college?.attributes?.collegeName}
                        </h2>
                      </Link>
                      <div className="flex items-stretch">
                        <div className="pr-6 mr-6">
                          <p className="text-primary flex gap-1 items-center font-semibold text-sm lg:text-lg">
                            <Image
                              src={RupeeBaves}
                              width={25}
                              height={25}
                              alt={"approvedBy"}
                            />
                            {collegeFee}
                          </p>
                          <p className="text-xs text-secondary-text">
                            BE/B.Tech First year fees
                          </p>
                        </div>
                        <div className="pr-6 mr-6  border-extra-light-text">
                          <p className="text-primary flex gap-1 items-center font-semibold text-lg">
                            <Image
                              src={Exams}
                              width={25}
                              height={25}
                              alt={"approvedBy"}
                            />
                            JEE Advance
                          </p>
                          <p className="text-xs flex gap-1 items-center text-secondary-text font-light">
                            Exam Accepting
                          </p>
                        </div>
                        <div className="pr-6 mr-4">
                          <p className="text-primary flex gap-1 items-center font-semibold text-lg">
                            <Image
                              src={AvgPackage}
                              width={25}
                              height={25}
                              alt={"approvedBy"}
                            />
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
                      <div className="flex gap-6 flex-wrap">
                        <Button
                          href={`/college/${college.id}`}
                          text="Admission 2024"
                          icon={<FaRegUser />}
                          fontSize="text-xxs"
                          outline
                          color="text-primary"
                          rounded
                          textColor="text-primary"
                          bgColor="bg-white"
                          fontColor="text-primary-text"
                        />
                        <Button
                          href={`/college/${college.id}`}
                          text="Review"
                          icon={<FaRegStar />}
                          outline
                          rounded
                          bgColor="bg-white"
                          textColor="text-primary"
                          fontSize="text-xxs"
                          fontColor="text-black"
                        />
                        <Button
                          href={`/college/${college.id}`}
                          text="Course & Fees"
                          icon={<PiBooksLight />}
                          outline
                          rounded
                          bgColor="bg-white"
                          textColor="text-primary"
                          fontSize="text-xxs"
                          fontColor="text-primary-text"
                        />
                      </div>
                      <div>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit , perferendis aspernatur!
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex">
                    <div className="w-5/6">
                      <div className="flex flex-wrap items-stretch p-2 py-4 text-primary gap-y-2">
                        <div className="pr-2 mr-2 border-r border-[#565959]">
                          <p className="text-sm t font-light">Date</p>
                        </div>
                        <div className="pr-2 mr-2 border-r border-[#565959]">
                          <p className="text-sm  font-light">News</p>
                        </div>
                        <div className="pr-2 mr-2 border-r border-[#565959]">
                          <p className="text-sm  font-light">Admission</p>
                        </div>
                        <div className="pr-2 mr-2 border-r border-[#565959]">
                          <p className="text-sm  font-light">Broshure</p>
                        </div>
                        <div className="pr-2 mr-2 border-r border-[#565959]">
                          <p className="text-sm  font-light">Placement</p>
                        </div>
                        <div className="pr-2 mr-2">
                          <p className="text-sm  font-light">Course</p>
                        </div>
                      </div>
                    </div>
                    <div className="w-1/6">
                      <div className="flex flex-row gap-1 text-primary college-btn">
                        <Button
                          onClick={handleClick}
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
                          outlineColor="border-primary"
                          fontColor="text-primary"
                          align="text-center"
                          bgColor="bg-white"
                        />
                      </div>
                    </div>
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