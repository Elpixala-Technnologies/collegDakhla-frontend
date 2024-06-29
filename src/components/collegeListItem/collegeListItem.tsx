/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import Button from "../button/button";
import { FaRegStar, FaRegUser } from "react-icons/fa";
import { PiBooksLight } from "react-icons/pi";
import Feature from "../feature/feature";
import { useQuery } from "@apollo/client";
import { getStates } from "@/query/schema";
import { GetDefaultImage, getStrapiMedia } from "@/utils/api-helper";
import Image from "next/image";
import {
  AvgPackage,
  Exams,
  FlagIcon,
  LocationCity,
  Reviews,
  RupeeBaves,
} from "@/Asset";
import ApplyNowModal from "../consultingModule/ApplyNowModal/ApplyNowModal";
import React, { useEffect, useState } from "react";
import userFrom from "@/hooks/userFrom";
import { CiLocationOn } from "react-icons/ci";
import { Rating } from "@mui/material";
import {
  formatNumber,
  getRandomRatingValue,
  getRandomReviews,
} from "@/utils/randomValues";

export default function CollegeListItem({ collegeData, AppliedCollege }: any) {
  // useEffect(() => {
  //   console.log(collegeData?.[0], "cccc");
  // }, [collegeData]);

  const { CollegeApplicatonListData } = userFrom();

  // query to get all states
  const {
    loading: statesLoader,
    error: statesError,
    data: statesData,
  } = useQuery(getStates);

  const collegeFee = parseInt(
    collegeData?.attributes?.fees ? collegeData?.attributes?.fees : 200000
  ).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<any>("");

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
      {collegeData?.length > 0 ? (
        <>
          {collegeData?.map((college: any, index: any) => {
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

            const isCollegeApplied =
              Array.isArray(AppliedCollege) &&
              AppliedCollege.some(
                (applied) => applied?.college?.data?.id === college?.id
              );

            return (
              <div key={index}>
                <div className="mb-5 flex flex-wrap md:flex-row border border-zinc-300 bg-white rounded-lg  hover:drop-shadow-lg">
                  <div className="grid grid-cols-1 md:grid-cols-10 gap-5 p-4">
                    {/* image  */}
                    <div className="relative rounded-lg md:col-span-2">
                      <Image
                        width={700}
                        height={700}
                        src={logoURL!}
                        alt={college?.collegeName}
                        className="sm:h-44  w-full max-w-44 object-contain rounded-md max-md:mx-auto"
                      />
                    </div>
                    {/* Right Side  */}
                    <div className="flex flex-col gap-1 md:col-span-8">
                      {/* line 2 - Mobile  */}
                      <Link
                        href={`/colleges/${college.id}`}
                        className="sm:hidden"
                      >
                        <h2 className="text-xl text-[#202020] font-semibold">
                          {college?.attributes?.collegeName}
                        </h2>
                      </Link>
                      {/* line 1  */}
                      <div className="flex max-sm:flex-col gap-2">
                        <p className="text-[#0F4988] flex gap-1 items-center text-sm">
                          <Rating
                            name="half-rating"
                            defaultValue={getRandomRatingValue()}
                            precision={0.5}
                            className="text-sm"
                            readOnly
                          />
                          <span className="text-nowrap">
                            ({formatNumber(getRandomReviews())} reviews)
                          </span>
                        </p>
                        <p className="text-[#0F4988] flex gap-1 items-center text-sm text-nowrap">
                          <CiLocationOn className="text-xl text-gray-400" />
                          {college?.attributes?.city?.data?.attributes?.name}
                          {college?.attributes?.city?.data?.attributes?.name &&
                            ", "}
                          {college?.attributes?.state?.data?.attributes?.name}{" "}
                        </p>
                        {/* UGC  */}
                        <p className="text-[#0F4988] flex gap-1 items-center font-semibold text-sm">
                          <Image
                            src={AvgPackage}
                            width={20}
                            height={20}
                            alt={"approvedBy"}
                          />
                          {college?.attributes?.rankedBy?.data[0]?.attributes
                            ?.name
                            ? college?.attributes?.rankedBy?.data[0]?.attributes
                                ?.name
                            : "UGC"}{" "}
                        </p>
                        {/* college_type  */}
                        <p className="text-[#0F4988] flex gap-1 items-center font-semibold text-sm">
                          <Image
                            src={FlagIcon}
                            width={15}
                            height={15}
                            alt={"approvedBy"}
                          />
                          {college?.attributes?.college_type?.data?.attributes
                            ?.type
                            ? college?.attributes?.college_type?.data
                                ?.attributes?.type
                            : "Private"}{" "}
                          | {"Rank 6"}
                        </p>
                      </div>

                      {/* line 2  */}
                      <Link
                        href={`/colleges/${college.id}`}
                        className="max-sm:hidden"
                      >
                        <h2 className="text-xl text-[#202020] font-semibold">
                          {college?.attributes?.collegeName}
                        </h2>
                      </Link>
                      {/* line 3  */}
                      <div className="flex flex-wrap items-stretch">
                        <div className="pr-6 mr-6">
                          <p className="text-primary flex gap-1 items-center font-semibold text-lg">
                            <Image
                              src={RupeeBaves}
                              width={25}
                              height={25}
                              alt={"approvedBy"}
                            />
                            {collegeFee}
                          </p>
                          <p className="text-xs text-secondary-text ml-7">
                            BE/B.Tech First year fees
                          </p>
                        </div>
                        <div className="pr-6 mr-6  border-zinc-300">
                          <p className="text-primary flex gap-1 items-center font-semibold text-lg">
                            <Image
                              src={Exams}
                              width={25}
                              height={25}
                              alt={"approvedBy"}
                            />
                            JEE Advance
                          </p>
                          <p className="text-xs flex gap-1 items-center text-secondary-text font-light ml-7">
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
                          <p className="text-xs text-secondary-text font-light ml-7">
                            Based on user review
                          </p>
                        </div>
                      </div>
                      {/* line 4  */}
                      <div className="flex gap-2 flex-wrap mt-2">
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
                          fontSize="text-xs"
                          fontColor="text-primary-text"
                        />
                      </div>
                    </div>
                  </div>
                  {/* <Separator /> */}
                  <div className="w-full flex max-sm:flex-col gap-y-2 sm:items-center justify-between px-4 pr-2 py-2 border-t text-semibold border-zinc-300">
                    <ul className="flex flex-wrap gap-x-3 text-primary capitalize max-sm:text-sm">
                      {[
                        "Info",
                        "Courses",
                        "Scholarship",
                        "Review",
                        "Placement",
                      ].map((item, index) => (
                        <React.Fragment key={index}>
                          <Link href={`/colleges/${college.id}`}>
                            <li className="cursor-pointer hover:underline">
                              {item}
                            </li>
                          </Link>
                          {index !== 4 && <li>|</li>}
                        </React.Fragment>
                      ))}
                    </ul>
                    <div className="flex gap-2 max-sm:flex-col">
                      <button disabled={isCollegeApplied}>
                        <Button
                          // href={`/college/${college.id}`}
                          onClick={() => handleOpenModal(college?.id)}
                          text={isCollegeApplied ? "Applied" : "Apply Now"}
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
                        onClick={handleDownload}
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
                {(index + 1) % 4 == 0 ? (
                  <div>
                    <Feature
                      title="Filter By State"
                      tags={statesData?.states?.data}
                    />
                  </div>
                ) : null}
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

      {isModalOpen && (
        <ApplyNowModal
          id={selectedId}
          FromStep={FromStep}
          isSectionCheck={"College"}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
