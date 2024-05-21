/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FaFileDownload, FaRegClock, FaRegHeart, FaRegThumbsUp } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
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
import userFrom from "@/hooks/userFrom";
import ApplyNowModal from "@/components/consultingModule/ApplyNowModal/ApplyNowModal";
import { FaBuildingColumns } from "react-icons/fa6";
import Spinner from "@/components/Loader/loader";

type Props = {
  params: {
    college: String;
    data: any;
  };
};
export default function CollegeDetail({ params }: Props) {
  const [currentTab, setCurrentTab] = useState<string>("");
  const [TabData, setTabData] = useState([]);
  const [selectedTab, setSelectedTab] = useState(null);
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

  const handleTab = (value: string ,tabName: any) => {
    setCurrentTab(value);
    const filteredData = tabData?.filter(
      (item: any) => item?.navbar?.data?.attributes?.name === value
    );
    setTabData(filteredData);
    setSelectedTab(tabName);
  };

  useEffect(() => {
    if (loading) {
    }
    if (!loading && currentTab === "") {
      handleTab("Info","Info");
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

  const { CollegeApplicatonListData } = userFrom();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    document.body.classList.add("overflow-hidden");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove("overflow-hidden");
  };

  const FromStep: any = CollegeApplicatonListData?.form_stape;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    const dateOptions: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };

    const formattedDate = date.toLocaleDateString(undefined, dateOptions);
    const formattedTime = date.toLocaleTimeString(undefined, timeOptions);

    return `${formattedDate} at ${formattedTime}`;
  };

  console.log(college, "college");

  return (
    
    <>
      {/* section for banner of the individual college page */}
      {college ? (
        <>
<section className="heroSection">
        <div className="relative">
          <Image
            src={bannerUrl!}
            alt={college?.collegeName}
            width={1200}
            height={1200}
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
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="flex items-center gap-1">
                    <FaBuildingColumns />
                    {collegeType ? collegeType : "Autonomous"}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaRegClock />

                    {"ESTD " +
                      (college?.establishmentYear
                        ? college?.establishmentYear
                        : "")}
                  </span>
                  <span className="flex items-center gap-1">
                  <FaRegThumbsUp />
                    {college?.approvedBy?.data[0]?.attributes?.name ? college?.approvedBy?.data[0]?.attributes?.name : ""}
                  </span>
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
                        onClick={handleOpenModal}
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
                        text="Brochure"
                        outline
                        fontSize="text-sm"
                        width="w-36"
                        align="text-center"
                        bgColor="bg-white"
                        fontColor="text-black"
                        icon={<FiDownload />}
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
                <div className="sm:max-w-screen-xl lg:mx-auto px-1 py-1 md:px-4 w-full justify-center shadow-md shadow-gray-600 rounded-lg mt-5">
                  <NavbarSlider
                    buttonBorderColor="border-primary-text"
                    buttonTextColor="text-primary-text"
                    showPagination={false}
                    slidesDesktop={5}
                    slidesTablet={5}
                    slidesMobile={3}
                    slides={navbar?.map((tab: any, index: number) => (
                      <div
                        key={tab?.attributes?.name}
                        onClick={() => handleTab(tab?.attributes?.name, tab?.attributes?.name)}
                        className={`text-nowrap hover:text-orange-400 hover:border-b-2 hover:border-orange-400 text-sm flex justify-center items-center w-max h-full text-center cursor-pointer font-semibold text-lg ${selectedTab === tab?.attributes?.name ? 'text-primary' : ''}`}
                      >
                        {tab?.attributes?.name}
                      </div>
                    ))}
                  />
                </div>
              </div>
            </div>
          </div>
          <p className="text-lg mt-5 flex items-center gap-2">
            <FaRegClock className="text-2xl"/>
            <span>Updated at </span>
            {formatDate(college?.updatedAt!)}
          </p>
          <CollegeTab data={TabData} />
        </div>

        {isModalOpen && (
          <ApplyNowModal
            id={11}
            FromStep={FromStep}
            isSectionCheck={"College"}
            onClose={handleCloseModal}
          />
        )}
      </section>
        
        </>
        
      ):(
        <div className="w-full item-center flex justify-center h-[50vh] mt-48">
                    {/* <Loading
                      type="tail_spin"
                      width={100}
                      height={100}
                      fill="#bdbdbd"
                    /> */}
                    <Spinner />
                  </div>
      )}
      
    </>
  );
}
