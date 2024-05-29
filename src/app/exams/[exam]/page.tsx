"use client";

import { useEffect, useState } from "react";
import { FaRegClock, FaRegHeart, FaRegThumbsUp } from "react-icons/fa";
import ExamTab from "./@examTab/examTab";
import Tag from "@/components/tag/tags";
import Button from "@/components/button/button";
import { useQuery } from "@apollo/client";
import { getExam } from "@/query/schema";
import Image from "next/image";
import { BiHeart } from "react-icons/bi";
import { BsQuestionCircle } from "react-icons/bs";
import { GetDefaultImage, getStrapiMedia } from "../../../utils/api-helper";
import { Rating } from "@mui/material";
import userFrom from "@/hooks/userFrom";
import { FiDownload } from "react-icons/fi";
import NavbarSlider from "@/components/carousel/navbar-carousal";
import { formatDate } from "@/utils/formatDate";
import ApplyNowModal from "@/components/consultingModule/ApplyNowModal/ApplyNowModal";
import { FaBuildingColumns } from "react-icons/fa6";

type Props = {
  params: {
    exam: String;
  };
};
export default function ExamDetail({ params }: Props) {
  const [currentTab, setCurrentTab] = useState<string>("");
  const [selectedTab, setSelectedTab] = useState(null);
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
  console.log("Dataaexam12", examData)
  const exam = examData?.exam?.data?.attributes;
  const logoUrl = exam?.collegeLogo?.data?.attributes?.url
    ? getStrapiMedia(exam?.collegeLogo?.data?.attributes?.url)
    : GetDefaultImage("logo");
  const bannerUrl = exam?.banner?.data[0]
    ? getStrapiMedia(exam?.banner?.data[0]?.attributes?.url)
    : GetDefaultImage("banner");
  const navbar = exam?.navbars?.data;

  const tabData = exam?.pageData;

  const handleTab = (value: string, tabName: any) => {
    setCurrentTab(value);
    const filteredData = tabData?.filter(
      (item: any) => item?.navbar?.data?.attributes?.name === value
    );
    setTabData(filteredData);
    setSelectedTab(tabName);
  };

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

  useEffect(() => {
    if (loading) {
    }
    if (!loading && currentTab === "") {
      handleTab("Info", "Info");
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
            width={1200}
            height={1200}
            className="w-full h-80  object-fill"
          />

          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="absolute inset-0 text-white flex gap-4 mx-auto my-6 w-10/12">
            <div className="collegeLogo">
              <Image
                src={logoUrl!}
                width={100}
                height={100}
                alt={exam?.name}
                className="rounded-sm h-28 object-center objext-contain"
              />
            </div>

            <div className="flex flex-col md:flex-row flex-1">
              <div className="flex-1 flex flex-col relative">
                <div className="flex items-center">
                  <h1 className="text-3xl font-bold">
                    {exam?.name!}
                  </h1>
                </div>
                <p className="text-lg flex items-center gap-2">
                  <span>ExamLevel:</span>{""}
                  <span>
                    {exam?.examLevel?.data[0]?.attributes?.name}{" "}
                  </span>
                </p>
                <p className="text-lg flex items-center gap-2">
                  <span>Exam Mode: </span>{""}
                  <span>
                    {exam?.examMode?.data?.attributes?.mode} {" "}
                  </span>
                </p>
                <p className="text-lg flex items-center gap-2">
                  <span>User Review</span>{" "}
                  <span><Rating name="half-rating" defaultValue={2.5} precision={0.5} readOnly /></span>
                  {exam?.rating ? exam?.rating : "8.6"}/10 (324 Reviews)

                </p>
                {/* <div className="flex items-center gap-4 flex-wrap">

                  <Tag
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
                  />
                  <p>
                    Application Date : {exam?.examDate?.data[0]?.attributes?.startDate},{" "}
                  </p>
                  <Tag text={approvedBy ? approvedBy : "UGC"} href={""} />

                </div> */}

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
                <div className="sm:max-w-screen-xl lg:mx-auto px-1 py-1 w-full justify-center shadow-md shadow-gray-600 rounded-lg mt-5">
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
            <FaRegClock className="text-2xl" />
            <span>Updated at </span>
            {formatDate(exam?.updatedAt!)}
          </p>
          <ExamTab data={TabData} />
        </div>
      </section>
    </>
  );
}
