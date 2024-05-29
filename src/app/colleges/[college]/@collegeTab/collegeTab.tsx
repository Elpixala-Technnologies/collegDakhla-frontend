/* eslint-disable @next/next/no-img-element */
"use client";
import { Key, useEffect, useRef, useState } from "react";
import Button from "@/components/button/button";
import Image from "next/image";
import YoutubeVideo from "@/components/youtubeVideo/youtubeVideo";
import PageData from "@/components/pageData/pageData";
import Accordion from "@/components/accordian/accordian";
import Accordion from "@/components/accordian/accordian";
import NavbarSlider from "@/components/carousel/navbar-carousal";
import Carousel from "@/components/header/Carousel";
import { useQuery } from "@apollo/client";
import { getFeaturedCourses } from "@/query/schema";
import CourseCard from "@/components/card/courseCard";

export default function CollegeTab(props: any) {
  const {
    loading: featuredLoader,
    error: featuredError,
    data: featuredCourses,
  } = useQuery(getFeaturedCourses);

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
    if (featuredCourses?.courses?.data) {
      setIsLoading(false);
    }
  }, [featuredCourses]);

  const getTopCourses = () => {
    return featuredCourses?.courses?.data?.slice(0, 3);
  };

  const images = props?.data?.flatMap(
    (item: { pageGallery: { data: any } }) => item.pageGallery?.data || []
  );

  return (
    <>
      <div className="container h-full my-10">
        <div className="main-wrapper flex gap-4">
          <div className="left-wrapper md:basis-3/4 w-full md:w-9/12 flex flex-col gap-5">
            <div className="bg-primary-extra-light flex flex-col gap-4">
              {props?.data?.map((item: any, index: number) => {
                return (
                  <>
                    {item?.heading !== "Gallery" && (
                      <Accordion
                        title={item?.heading}
                        titlePrimary
                        opened
                        key={index}
                      >
                        <div
                          className="content rounded-xl px-5 pt-5 mb-5"
                          key={index}
                          ref={(el) => (accordionRefs.current[index] = el)} // Assign ref
                        >
                          <PageData data={item} />
                        </div>
                      </Accordion>
                    )}
                  </>
                );
              })}
              <Accordion title="Recommended Courses" opened titlePrimary>
                <section className="topCourses">
                  <div className="m-4 bg-white py-4 px-4">
                    {isLoading ? (
                      <div className="flex justify-center items-center h-full">
                        <p>Loading...</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {getTopCourses().map((course: any, index: number) => (
                          <CourseCard key={index} featuredCourse={course} />
                        ))}
                      </div>
                    )}
                  </div>
                </section>
              </Accordion>
            </div>
          </div>

          <div className="right-wrapper basis-1/4 rounded-lg min-w-72 hidden md:block">
            <div className="md:flex md:flex-col md:gap-2 h-full">
              {images.length > 0 && (
                <div className="college-videos bg-gray-50 p-3 rounded-3xl">
                  <div className="gallery-container">
                    <h2>Gallery Items</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
                      {images.map(
                        (imgItem: {
                          id: Key | null | undefined;
                          attributes: { url: string | undefined };
                        }) => (
                          <div key={imgItem.id} className="gallery-item">
                            <img
                              src={imgItem?.attributes?.url}
                              alt={`Gallery Image ${imgItem.id}`}
                              className="w-full h-full"
                            />
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              )}
              <div className="college-videos bg-gray-50 p-3 rounded-3xl sticky top-2 h-fit">
                <h2 className="text-base font-bold bg-blue-200 rounded-lg p-2">
                  Related Content
                </h2>
                <ul className="flex flex-col gap-2 list-disc pl-5">
                  {props?.data?.map((item: any, index: number) => {
                    return (
                      <li
                        key={index}
                        className="hover:text-blue-600 cursor-pointer"
                        onClick={() => handleScrollToAccordion(index)}
                      >
                        {item?.heading}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}