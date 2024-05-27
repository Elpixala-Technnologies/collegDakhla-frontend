"use client";

import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import ExamTab from "./@examTab/examTab";
import Tag from "@/components/tag/tags";
import Button from "@/components/button/button";
import { useQuery } from "@apollo/client";
import { getExam } from "@/query/schema";
import Image from "next/image";
import { GetDefaultImage, getStrapiMedia } from "../../../utils/api-helper";

type Props = {
  params: {
    exam: String;
  };
};
export default function ExamDetail({ params }: Props) {
  const [currentTab, setCurrentTab] = useState<string>("");
  const [TabData, setTabData] = useState([]);
  let examId = params.exam;

  // get exam data
  const {
    loading,
    error,
    data: examData,
  } = useQuery(getExam, {
    variables: { examId },
  });
  const exam = examData?.exam?.data?.attributes;
  const logoUrl = exam?.collegeLogo?.data?.attributes?.url
    ? getStrapiMedia(exam?.collegeLogo?.data?.attributes?.url)
    : GetDefaultImage("logo");
  const bannerUrl = exam?.banner?.data[0]
    ? getStrapiMedia(exam?.banner?.data[0]?.attributes?.url)
    : GetDefaultImage("banner");
  const navbar = exam?.navbars?.data;

  const tabData = exam?.pageData;

  const handleTab = (value: string) => {
    setCurrentTab(value);
    const filteredData = tabData?.filter(
      (item: any) => item?.navbar?.data?.attributes?.name === value
    );

    setTabData(filteredData);
  };

  useEffect(() => {
    if (loading) {
      console.log("loading ", loading);
    }
    if (!loading && currentTab === "") {
      handleTab("Info");
      setCurrentTab("Info");
    }
  }, [loading]);

  // ======

  return (
    <>
      {/* section for banner of the individual exam page */}
      <section className="heroSection">
        <div className="relative">
          <Image
            src={bannerUrl!}
            alt={exam?.name}
            width={100}
            height={100}
            className="w-full h-36 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="absolute inset-0 text-white flex gap-4 mx-auto my-6 w-10/12">
            <div className="collegeLogo">
              <Image
                src={logoUrl!}
                width={100}
                height={100}
                alt={exam?.name}
                className="rounded-sm"
              />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex gap-4 items-start">
                <h1 className="text-lg font-bold">
                  {exam?.name!}, Registration, Eligibility, Syllabus PDF,
                  Pattern, Question Paper, Cutoff
                </h1>
                <div className="border-white border rounded-full p-1 text-sm cursor-pointer text-white">
                  <FaRegHeart />
                </div>
              </div>
              {/* <p className="text-xs">
								{exam?.city?.data?.attributes?.name},{" "}
								{exam?.state?.data?.attributes?.name} |{" "}
								{exam?.rating ? exam?.rating : "8.6"}/10 (324 Reviews)
							</p> */}
              <div className="flex gap-1">
                {/* <Tag
									text={
										" University"
									}
									href={"/"}
								/>
								<Tag
									text={
										"ESTD " +
										(exam?.establishmentYear
											? exam?.establishmentYear
											: "2000")
									}
									href={"/"}
								/> */}
                {/* <Tag text={approvedBy ? approvedBy : "UGC"} href={""} /> */}
              </div>
            </div>
            <div>
              <div>
                <div className="flex flex-col gap-2">
                  {/* <Button
										href={"/"}
										text="Apply Now"
										filled
										fontSize="text-sm"
										fontWeight="font-bold"
										width="w-36"
										align="text-center"
									/>
									<Button
										href={"/"}
										text="Download Brochure"
										outline
										fontSize="text-sm"
										width="w-36"
										align="text-center"
									/> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="infoOption bg-white flex">
          <ul className="flex gap-8 items-stretch max-w-screen-xl mx-auto w-full px-4 h-10">
            {navbar?.map((tab: any) => {
              return (
                <li
                  key={tab?.attributes?.name}
                  onClick={() => handleTab(tab?.attributes?.name)}
                  className="hover:text-orange-400 hover:border-b-2 hover:border-orange-400 text-sm mt-2"
                >
                  {tab?.attributes?.name}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <section className="mainSection">
        <div className="flex justify-center  max-w-screen-xl m-auto">
          <ExamTab tabData={TabData} />
        </div>
      </section>
    </>
  );
}
