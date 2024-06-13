"use client";
import Button from "@/components/button/button";
import Image from "next/image";
import CollegeData from "@/components/collegeData/collegeData";
import YoutubeVideo from "@/components/youtubeVideo/youtubeVideo";
import PageData from "@/components/pageData/pageData";
import Accordion from "@/components/accordian/accordian";
import { useEffect, useRef, useState } from "react";
import { getFeaturedExams } from "@/query/schema";
import { useQuery } from "@apollo/client";
export default function ExamTab({ tabData }: any) {  const {
    loading: featuredLoader,
    error: featuredError,
    data: featuredExams,
  } = useQuery(getFeaturedExams);

  const accordionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const handleScrollToAccordion = (index: number) => {
    const element = accordionRefs.current[index];
    if (element) {
      const offset = 90; // Adjust this value to set the desired offset
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (featuredExams?.exams?.data) {
      setIsLoading(false);
    }
  }, [featuredExams]);

  const getTopCourses = () => {
    return featuredExams?.exams?.data?.slice(0, 3);
  };

  const images = tabData?.data?.flatMap(
    (item: { pageGallery: { data: any } }) => item.pageGallery?.data || []
  );

  const [activeSection, setActiveSection] = useState("gallery"); // Default to 'gallery' section

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  // POP IMAGE IN MODAL
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (imgItem: any) => {
    setSelectedImage(imgItem);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedImage(null);
  };
  return (
    <>
      <div className="container h-full my-10">
        <div className="main-wrapper flex gap-4">
          <div className="left-wrapper md:basis-3/4 w-full md:w-9/12 flex flex-col gap-5">
            <div className="bg-primary-extra-light flex flex-col gap-4">
              {tabData?.map((item: any, index: number) => {
                return (
                  <Accordion
                    title={item?.heading}
                    titlePrimary
                    opened
                    key={index}
                  >
                    <div
                      className="content bg-gray-50 rounded-xl px-5 pt-5 mb-5"
                      key={index}
					  ref={(el) => (accordionRefs.current[index] = el)} // Assign ref
                    >
                      <PageData data={item} />
                    </div>
                  </Accordion>
                );
              })}
            </div>
          </div>
          <div className="right-wrapper basis-1/4 rounded-md min-w-72 hidden md:block">
            <div className="md:flex md:flex-col md:gap-4 h-max border border-zinc-300 rounded-md">
              {/* navbar  */}
              <div className="navbar border-b border-zinc-300">
                <button
                  onClick={() => handleSectionChange("video")}
                  className={`p-2 ${
                    activeSection === "gallery" ? "font-bold" : ""
                  }`}
                >
                  Gallery Items
                </button>
                <button
                  onClick={() => handleSectionChange("gallery")}
                  className={`p-2 ${
                    activeSection === "related" ? "font-bold" : ""
                  }`}
                >
                  Related Content
                </button>
              </div>
              {/* Video Section  */}
              <div className="college-videos border border-zinc-300 rounded-md p-3">
                <h4 className="text-base font-bold font-poppins border-b-2 pb-2">
                  Videos
                </h4>
                <div className="flex flex-col gap-2">
                  <YoutubeVideo
                    videoId={"4-YEBaUXUGo"}
                    width={"100%"}
                    height={"168"}
                  />
                  <YoutubeVideo
                    videoId={"4-YEBaUXUGo"}
                    width={"100%"}
                    height={"168"}
                  />
                </div>
              </div>
              {/* Gallery Section  */}
              <div className="college-photos gap-2 columns-2">
                <div className="col-6 pb-2">
                  <Image
                    src="/140724328776347_10150270122024944_741327732_n.webp"
                    alt=""
                    width={100}
                    height={80}
                    className="object-cover w-full h-16"
                  ></Image>
                </div>
                <div className="col-6 pb-2">
                  <Image
                    src="/140724328776347_10150270122024944_741327732_n.webp"
                    alt=""
                    width={100}
                    height={80}
                    className="object-cover w-full h-16"
                  ></Image>
                </div>
                <div className="col-6 pb-2">
                  <Image
                    src="/140724328776347_10150270122024944_741327732_n.webp"
                    alt=""
                    width={100}
                    height={80}
                    className="object-cover w-full h-16"
                  ></Image>
                </div>
                <div className="col-6 pb-2">
                  <Image
                    src="/140724328776347_10150270122024944_741327732_n.webp"
                    alt=""
                    width={100}
                    height={80}
                    className="object-cover w-full h-16"
                  ></Image>
                </div>
                <div className="col-6 pb-2">
                  <Image
                    src="/140724328776347_10150270122024944_741327732_n.webp"
                    alt=""
                    width={100}
                    height={80}
                    className="object-cover w-full h-16"
                  ></Image>
                </div>
                <div className="col-6 pb-2">
                  <Image
                    src="/140724328776347_10150270122024944_741327732_n.webp"
                    alt=""
                    width={100}
                    height={80}
                    className="object-cover w-full h-16"
                  ></Image>
                </div>
              </div>
              {/* IMAGE POP MODULE  */}
              {isPopupOpen && selectedImage && (
                <div
                  className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                  onClick={handleClosePopup}
                >
                  <div
                    className="relative bg-white p-4 rounded shadow-lg"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className="absolute top-2 right-2 text-black text-2xl"
                      onClick={handleClosePopup}
                    >
                      &times;
                    </button>
                    <Image
                      src={selectedImage}
                      alt={`Gallery Image`}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
