"use client";
import Button from "@/components/button/button";
import Image from "next/image";
import YoutubeVideo from "@/components/youtubeVideo/youtubeVideo";
import PageData from "@/components/pageData/pageData";
import Accordion from "@/components/accordian/accordian";
import { useState } from "react";

export default function CourseTab({ tabData }: any) {

  const images = tabData?.data?.flatMap(
    (item: { pageGallery: { data: any } }) => item.pageGallery?.data || []
  );

  const [activeSection, setActiveSection] = useState("videos"); 

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
              {tabData?.map((item: any, index: number) => (
                <Accordion
                  title={item?.heading}
                  titlePrimary
                  opened
                  key={index}
                >
                  <div
                    className="content bg-gray-50 rounded-xl px-5 pt-5 mb-5"
                    key={index}
                  >
                    <PageData data={item} />
                  </div>
                </Accordion>
              ))}
            </div>
          </div>

          <div className="right-wrapper basis-1/4 rounded min-w-72 hidden md:block">
            <div className="md:flex md:flex-col md:gap-4 h-max border border-zinc-300 rounded-md">
              {/* Navbar */}
              <div className="navbar border-b border-zinc-300 flex">
                <button
                  onClick={() => handleSectionChange("videos")}
                  className={`p-2 ${activeSection === "videos" ? "font-bold" : ""}`}
                >
                  Videos
                </button>
                <button
                  onClick={() => handleSectionChange("gallery")}
                  className={`p-2 ${activeSection === "gallery" ? "font-bold" : ""}`}
                >
                  Gallery
                </button>
              </div>
              {/* Videos */}
              {activeSection === "videos" && (
                <div className="college-videos bg-gray-50 p-3">
                  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-4 p-4">
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
              )}
              {/* Gallery */}
              {activeSection === "gallery" && images?.length > 0 && (
                <div className="gallery-container">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
                    {images?.map((imgItem: any) => (
                      <div
                        key={imgItem?.id}
                        className="gallery-item hover:p-2 hover:border border-primary"
                      >
                        <Image
                          width={700}
                          height={500}
                          src={imgItem?.attributes?.url || ""}
                          alt={`Gallery Image ${imgItem?.id}`}
                          className="w-full h-full object-contain cursor-pointer"
                          onClick={() => handleImageClick(imgItem?.attributes?.url)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* Image Pop-up Modal */}
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
                      width={700}
                      height={500}
                      alt="Selected Gallery Image"
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
