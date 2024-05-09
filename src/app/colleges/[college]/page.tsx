"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FaRegHeart } from "react-icons/fa";
import CollegeTab from "./@collegeTab/collegeTab";
import Tag from "@/components/tag/tags";
import Button from "@/components/button/button";
import { useQuery } from "@apollo/client";
import { getCollege } from "@/query/schema";
import Image from "next/image";
import { GetDefaultImage, getStrapiMedia } from "../../../utils/api-helper";
import { useRouter } from "next/navigation";
import NavbarSlider from "@/components/carousel/navbar-carousal";
import { BiHeart } from "react-icons/bi";
import { BsQuestionCircle } from "react-icons/bs";

type Props = {
  params: {
    college: String;
    data: any;
  };
};
export default function CollegeDetail({ params }: Props) {
  const [currentTab, setCurrentTab] = useState<string>("");
  const [TabData, setTabData] = useState([]);
  let collegeId = params.college;

  // get college data
  const {
    loading,
    error,
    data: collegeData,
  } = useQuery(getCollege, {
    variables: { collegeId },
  });
  const college = collegeData?.college?.data?.attributes;
  const approvedBy = college?.approvedBy?.data?.attributes?.name;
  const collegeType = college?.college_type?.data?.attributes?.type;
  const logoUrl = college?.collegeLogo?.data?.attributes?.url
    ? getStrapiMedia(college?.collegeLogo?.data?.attributes?.url)
    : GetDefaultImage("logo");
  const bannerUrl = college?.banner?.data[0]
    ? getStrapiMedia(college?.banner?.data[0]?.attributes?.url)
    : GetDefaultImage("banner");
  const navbar = college?.navbars?.data;

  const tabData = college?.pageData;

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

  const handleDownload = () => {
    const pdfPath = "@src/Assets/new_document.pdf";
    const link = document.createElement("a");
    link.href = pdfPath;
    link.download = "brochure.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  //to make it scrollable because of hero section modal
  useEffect(() => {
    document.body.style.overflow = "auto";
  });

  return (
    <>
      {/* section for banner of the individual college page */}
      <section className="heroSection">
        <div className="relative">
          <Image
            src={bannerUrl!}
            alt={college?.collegeName}
            width={100}
            height={100}
            className="w-full h-80  object-fill"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="absolute my-6 max-w-screen-xl pt-6 px-4 inset-0 text-white flex gap-4 mx-auto">
            <div className="collegeLogo">
              <Image
                src={logoUrl!}
                width={100}
                height={100}
                alt={college?.collegeName}
                className="rounded-sm h-28 object-center objext-contain"
              />
            </div>
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              <div className="flex-1 flex flex-col gap-2 relative">
                <div className="flex gap-4 items-center">
                  <h1 className="text-3xl font-bold">
                    {college?.collegeName!}
                  </h1>
                </div>
                <p className="text-lg">
                  {college?.city?.data?.attributes?.name},{" "}
                  {college?.state?.data?.attributes?.name} |{" "}
                  {college?.rating ? college?.rating : "8.6"}/10 (324 Reviews)
                </p>
                <p>
                  Ranked by : {college?.rankedBy?.data[0]?.attributes?.name}
                </p>
                <div className="flex items-baseline gap-4 flex-wrap">
                  <Tag
                    text={collegeType ? collegeType : "Autonomous"}
                    href={"/"}
                  />
                  <Tag
                    text={
                      "ESTD " +
                      (college?.establishmentYear
                        ? college?.establishmentYear
                        : "2000")
                    }
                    href={"/"}
                  />
                  <Tag text={approvedBy ? approvedBy : "UGC"} href={""} />
                </div>

                <div>
                  <div>
                    <div className="flex flex-row gap-3 absolute bottom-0 right-0">
                      <div className="flex flex-row items-center gap-1 cursor-pointer">
                        <span className="text-xl">
                          <BiHeart />
                        </span>
                        <span>Save</span>
                      </div>
                      <div className="flex flex-row items-center gap-1 cursor-pointer">
                        <span className="text-xl">
                          <BsQuestionCircle />
                        </span>
                        <span>Ask</span>
                      </div>
                      <Button
                        href={"/"}
                        text="Apply Now"
                        filled
                        fontSize="text-sm"
                        fontWeight="font-bold"
                        width="w-36"
                        align="text-center"
                      />
                      <Button
                        href={""}
                        onClick={handleDownload}
                        text="Download Brochure"
                        outline
                        fontSize="text-sm"
                        width="w-36"
                        align="text-center"
                        bgColor="bg-white"
                        fontColor="text-black"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mainSection">
        <div className="flex justify-center max-w-screen-xl mx-auto flex-col">
          <div className="infoOption flex items-center max-w-screen-xl mr-2">
            <div className="sticky-nav-wrapper w-full flex items-center justify-center">
              <div className=" bg-white flex border-b border-b-primary-light w-full rounded-lg">
                <div className="sm:max-w-screen-xl lg:mx-auto px-1 md:px-4 w-full justify-center">
                  <NavbarSlider
                    buttonBorderColor="border-primary-text"
                    buttonTextColor="text-primary-text"
                    showPagination={false}
                    slidesDesktop={5}
                    slidesTablet={5}
                    slidesMobile={3}
                    slides={navbar?.map((tab: any, index: number) => (
                      <ul
                        className="max-w-screen-xl px-4 mx-auto flex gap-8 w-full items-stretch h-10 overflow-x-auto"
                        key={index}
                      >
                        <li
                          key={tab?.attributes?.name}
                          onClick={() => handleTab(tab?.attributes?.name)}
                          className="text-nowrap hover:text-orange-400 hover:border-b-2 hover:border-orange-400 text-sm mt-2"
                        >
                          {tab?.attributes?.name}
                        </li>
                      </ul>
                    ))}
                  />
                </div>
              </div>
            </div>
          </div>
          <CollegeTab data={TabData} />
        </div>
      </section>
    </>
  );
}
