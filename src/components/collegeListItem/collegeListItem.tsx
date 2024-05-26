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
import { FaImage, FaVideo } from "react-icons/fa6";
import Image from "next/image";
import Separator from "../separator/separator";
import {
  AvgPackage,
  Exams,
  FlagIcon,
  LocationCity,
  Reviews,
  RupeeBaves,
} from "@/Asset";
import ApplyNowModal from "../consultingModule/ApplyNowModal/ApplyNowModal";
import { useState } from "react";
import userFrom from "@/hooks/userFrom";

export default function CollegeListItem(allColleges: any) {
  const { CollegeApplicatonListData } = userFrom();

  // query to get all states
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
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId , setSelectedId] =useState<any>('');

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
      {allColleges?.colleges?.length > 0 ? (
        <>
          {allColleges?.colleges.map((college: any, index: any) => {
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
                  <div className="flex flex-row">
                    <div className="relative rounded-lg">
                      <div className="p-2">
                        <Image
                          width={700}
                          height={700}
                          src={logoURL!}
                          alt={college?.collegeName}
                          className="w-full sm:w-36 object-fill rounded-lg max-w-44"
                        />
                      </div>
 
                    </div>
                    <div className="flex flex-col gap-1">
                      {/* line 1  */}
                      <div className="flex flex-row gap-8 p-1">
                        
                        <div className="  border-extra-light-text">
                          <p className="text-[#0F4988] flex gap-1 items-center text-sm">
                            <Image
                              src={LocationCity}
                              width={20}
                              height={20}
                              alt={"approvedBy"}
                            />
                            {college?.attributes?.city?.data?.attributes?.name}{college?.attributes?.city?.data?.attributes?.name &&", "}
                            {college?.attributes?.state?.data?.attributes?.name}{" "}
                          </p>
                        </div>
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
                      <Link href={`/colleges/${college.id}`}>
                        <h2 className="text-xl text-[#202020]  font-semibold">
                          {college?.attributes?.collegeName}
                        </h2>
                      </Link>
                      {/* line 3  */}
                      <div className="flex items-stretch">
                        <div className="pr-6 mr-6">
                          <div className="text-primary flex gap-1 items-center font-semibold text-sm lg:text-lg">
                            <Image
                              src={RupeeBaves}
                              width={25}
                              height={25}
                              alt={"approvedBy"}
                            />
                            {collegeFee}
                          </div>
                          <p className="text-xs text-secondary-text ml-7">
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
                      <div className="flex gap-x-6 flex-wrap mt-2">
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
                  <div className="w-full flex items-center justify-evenly p-4 border-t border-gray-300">
                    <div className="xl:flex flex-wrap items-stretch  px-2 text-primary w-3/4 hidden">
                      <div className="pr-2 mr-2 border-r border-[#565959]">
                        <p className="text-base font-light">Info</p>
                      </div>
                      <div className="pr-2 mr-2 border-r border-[#565959]">
                        <p className="text-base font-light">Courses</p>
                      </div>
                      <div className="pr-2 mr-2 border-r border-[#565959]">
                        <p className="text-base font-light">Scholarship</p>
                      </div>

                      <div className="pr-2 mr-2 border-r border-[#565959]">
                        <p className="text-base font-light">Review</p>
                      </div>
                      <div className="pr-2 mr-2">
                        <p className="text-base font-light">Placement</p>
                      </div>
                    </div>

                    <div className="">
                      <div className="flex flex-row gap-4 text-primary college-btn">
                        <Button
                          // href={`/college/${college.id}`}
                          onClick={()=>handleOpenModal(college?.id)}
                          text="Apply Now"
                          filled
                          fontSize="text-sm"
                          width="w-40"
                          align="text-center"
                          bgColor="bg-primary"
                        />
                        <Button
                        onClick={handleDownload}
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