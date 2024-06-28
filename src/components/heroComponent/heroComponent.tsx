import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import Typewriter from "typewriter-effect";
import PopDown from "./popDown";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { getStreams } from "@/query/schema";

const variations = [" 1000+ Colleges ", " 80+ Exams ", " 100+ Courses "];
export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const images = ["/collegeImg.jpeg", "/news.jpg", "/collegeImg3.jpeg"]; // Add your image URLs here
  const {
    loading: streamLoader,
    error: streamsError,
    data: streamsData,
  } = useQuery(getStreams);
  // Define a function to handle stream click
  const handleStreamClick = (streamName: any) => {
    // Redirect to college page with the selected stream name
    window.location.href = `/colleges`;
  };

  // Slice the first 5 items from the data array
  const firstFiveStreams = streamsData?.streams?.data?.slice(0, 5);

  const collegeNames = [
    { name: "Sita Ram College of Commerce, Delhi", totalImages: images.length },
    {
      name: "Ram Manohar College of Commerce, Delhi",
      totalImages: images.length,
    },
    {
      name: "Come back Iron man  College of Commerce, Delhi",
      totalImages: images.length,
    },
  ];

  // Function to handle automatic scrolling
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change the interval as needed (milliseconds)
    return () => clearInterval(interval);
  }, [images.length]);

  // CSS classes for image container and individual images
  const containerClass = "relative w-full overflow-hidden";
  const imageClass = "object-cover object-center w-full h-[50vh]";

  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (!isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  // useEffect(() => {
  //   if (isModalOpen) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "auto";
  //   }
  // }, [isModalOpen]);

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const [recentVisits, setRecentVisits] = useState<string[]>([]);

  // Handle recent searches
  const handleRecentSearch = (search: any) => {
    setRecentVisits((prevVisits) => [search, ...prevVisits.slice(0, 2)]);
  };

  return (
      <div className="relative w-full mx-auto max-w-screen-2xl">
        <div className={containerClass} ref={carouselRef}>
          {images.map((image, index) => (
            <Image
              width={1000}
              height={1000}
              key={index}
              src={image}
              alt={`Image ${index + 1}`}
              className={`${imageClass} ${
                index === currentIndex ? "" : "hidden"
              }`}
            />
          ))}
        </div>
        <div className="absolute inset-0  bg-gradient-to-b from-[#1a1a1a]  to-transparent"></div>
        <div className="max-w-screen-xl mx-auto overflow-hidden hidden sm:block">
          <div className=" absolute top-4  flex flex-wrap gap-3 md:gap-4 text-white px-4 text-xs md:text-sm text-nowrap overflow-hidden z-10">
            <Link
              href={`/colleges`}
              onClick={toggleVisibility}
              className="hover:scale-110 cursor-pointer"
            >
              All Colleges
            </Link>
            {firstFiveStreams?.map((stream: any) => (
              <div
                key={stream.id}
                className="hover:scale-110 cursor-pointer"
                onClick={() => handleStreamClick(stream.attributes.streamName)}
              >
                {stream.attributes.streamName}
              </div>
            ))}
          </div>
        </div>
        <div className="absolute inset-0 p-2 flex flex-col justify-center items-center  max-w-screen-xl mx-auto">
          <h1 className="text-white text-3xl sm:text-4xl py-4 flex flex-row">
            <span>Find</span>
            <span>&nbsp;</span>
            <Typewriter
              options={{
                strings: variations,
                autoStart: true,
                loop: true,
                delay: 100,
              }}
            />
            <span>in India</span>
          </h1>
          <div className="Search flex  items-center rounded-md w-8/12 mx-4 min-w-min">
            <div className=" h-11 flex border-2 bg-white rounded-l-xl gap-2 border-extra-light-text flex-1 items-center text-primary-text px-2">
              <RiSearchLine />
              <input
                className="w-full focus:outline-none"
                type="text"
                placeholder="Search colleges..."
                onClick={toggleModal}
              />
            </div>
            <div className="px-4 py-2 bg-primary text-white font-bold text-base md:text-lg rounded-r-md cursor-pointer">
              Search
            </div>
          </div>

          {/* <div className="flex gap-4 my-4 w-8/12 justify-center md:justify-between items-center text-nowrap flex-wrap">
            <div className="mt-2">
              <p className="text-white font-medium">Recent Searches:</p>
              <ul>
                {recentVisits.map((search: any, index: any) => (
                  <li key={index} className="text-sm text-gray-600">
                    {search}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-primary text-white text-sm font-semibold py-1 px-8 rounded">
              Need Counselling
            </div>
          </div> */}
        </div>
        <div className="w-8/12 mx-auto text-right">
          <div className="absolute bottom-4 right-2 md:right-20 text-white px-4 text-sm justify-end">
            {collegeNames.map(
              (college, index) =>
                index === currentIndex && (
                  <h4 className="" key={index}>
                    {/* {college.name}{" "} */}
                    <span className="bg-black bg-opacity-50 px-4 rounded-md">
                      {currentIndex + 1}/{college.totalImages}
                    </span>
                  </h4>
                )
            )}
          </div>
        </div>
        {isModalOpen && (
          <div className="fixed top-0 mt-5 left-0 w-full h-fit bg-black bg-opacity-50 flex z-50">
            <div className="bg-white p-8 rounded-md w-full">
              <PopDown
                inputValue={inputValue}
                onChange={handleInputChange}
                onRecentSearch={handleRecentSearch}
              />
              <button
                onClick={toggleModal}
                className="ml-4 cursor-pointer mt-10"
              >
                <span className="relative px-5 py-3 overflow-hidden font-medium text-gray-600 bg-gray-100 border border-gray-100 rounded-lg shadow-inner drop-shadow-lg drop-shadow-slate-100 group m-2 ">
                  <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
                  <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
                  <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                  <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                  <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
                  <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">
                    Close
                  </span>
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
  );
}
