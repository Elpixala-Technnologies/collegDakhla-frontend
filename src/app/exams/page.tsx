"use client";
import { useEffect, useState } from "react";
import { MdEmail, MdOutlineSort } from "react-icons/md";
import { RiSearchLine } from "react-icons/ri";
import { getFeaturedExams, searchExams } from "@/query/schema";
import { useQuery } from "@apollo/client";
import ExamCard from "@/components/card/examCard";
import ExamListItem from "@/components/examListItem/examListItem";
import Carousel from "@/components/carousel/carousel";
import ExamFilters from "@/components/filters/examFilters/examFilter";

import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaTwitter,
} from "react-icons/fa";
import Link from "next/link";

export default function ExamList() {
  const [Search, setSearch] = useState("");
  const [MobileFilter, setMobileFilter] = useState(false);
  const [LevelFilter, setLevelFilter] = useState<string>("");
  const [ModeFilter, setModeFilter] = useState<string>("");

  // get exams on search
  const {
    loading: examsLoader,
    error: examsError,
    data: examsData,
  } = useQuery(searchExams, {
    variables: {
      Search,
      LevelFilter,
      ModeFilter,
    },
  });

  // get featured exams
  const {
    loading: featuredLoader,
    error: featuredError,
    data: featuredExams,
  } = useQuery(getFeaturedExams);

  const handleSearch = (event: any) => {
    const value = event.target.value.trim();
    setSearchValue(value);
  };

  const handleMobileFilter = () => {
    setMobileFilter(!MobileFilter);
    if (MobileFilter) {
      document.body.style.overflow = "hidden";
    }
  };

  const [showReadMore, setShowReadMore] = useState(true);
  const [showFullContent, setShowFullContent] = useState(false);

  const handleReadMoreClick = () => {
    setShowFullContent(true);
    setShowReadMore(false);
  };

  const handleReadLessClick = () => {
    setShowFullContent(false);
    setShowReadMore(true);
  };


  const [filteredData, setFilteredData] = useState([]);
  const [displayCount, setDisplayCount] = useState(5);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (searchValue.trim() === "") {
      setFilteredData(examsData?.exams?.data.slice(0, displayCount));
	}
    else {
      const filtered = examsData?.exams?.data.filter((exam: any) =>
        exam.attributes.name
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchValue, examsData, displayCount]);

   const handleLoadMore = () => {
    setDisplayCount((prevCount) => prevCount + 10);
  };

  return (
    <>
      <div className="max-w-screen-xl mx-auto">
        <section className="w-full items-center justify-center inline-flex flex-nowrap overflow-hidden sm:[mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-unlimited m-2">
            <div className="flex flex-row items-center justify-between lg:gap-80 md:gap-48 ">
              <div className="flex items-center flex-row gap-8">
                <div className="gap-1 flex items-center">
                  <FaPhone />
                  <span className="ml-2">+919899880100</span>
                </div>
                <div className="gap-1 flex items-center">
                  <MdEmail />
                  <span className="ml-2">director@collegedakhla.com</span>
                </div>
              </div>
              <div className=" items-center flex-row gap-2 sm:flex hidden">
                <span className="md:flex hidden">
                  We're on your favourite social media!
                </span>
                <span>
                  <Link href="/">
                    <FaInstagram />
                  </Link>
                </span>
                <span>
                  <Link href="/">
                    <FaFacebook />
                  </Link>
                </span>
                <span>
                  <Link href="/">
                    <FaTwitter />
                  </Link>
                </span>
                <span>
                  <Link href="/">
                    <FaLinkedin />
                  </Link>
                </span>
              </div>
            </div>
          </ul>
        </section>
        <section className="heroSection">
          <div className="m-4 px-8 pt-8 bg-white flex flex-col rounded-sm">
            <h1 className="text-xl font-bold mb-3 text-center text-primary">
              All Exams 2023-2024, Dates, Application Forms & Alerts
            </h1>
            <p
              className={`${
                showFullContent ? "text-justify" : " text-center"
              } text-base mb-3`}
            >
              In the upcoming academic year of 2024-2025, numerous exams are
              scheduled across various educational levels and disciplines. These
              exams play a pivotal role in shaping academic and professional
              trajectories, making it imperative for candidates to stay updated
              on crucial dates, application procedures, and alerts. Whether it's
              standardized tests like SAT, GRE, or professional certification
              exams, such as those in medicine, law, or engineering, each exam
              demands meticulous preparation and timely submission of
              application forms.
            </p>
            {showFullContent && (
              <div>
                <p>
                  Aspirants must remain vigilant and proactive in tracking exam
                  announcements, registration deadlines, and any changes in exam
                  formats or syllabi. Utilizing official websites, educational
                  portals, and reputable sources for information dissemination
                  can aid in staying abreast of developments. Additionally,
                  subscribing to exam alerts and newsletters can serve as
                  invaluable tools in receiving timely notifications and
                  reminders. By adopting a structured approach to exam
                  preparation and maintaining a keen awareness of exam-related
                  updates, candidates can enhance their chances of success and
                  navigate the academic landscape with confidence.
                </p>
              </div>
            )}

            <div className="py-2 text-primary text-sm text-right">
              {showReadMore && !showFullContent && (
                <div className="readMore">
                  <span
                    onClick={handleReadMoreClick}
                    className="hover:underline cursor-pointer"
                  >
                    Show more
                  </span>
                </div>
              )}
              {showFullContent && (
                <div className="cursor-n-resize">
                  <span
                    onClick={handleReadLessClick}
                    className="hover:underline"
                  >
                    Show less
                  </span>
                </div>
              )}
            </div>
          </div>
        </section>
        <section className="topExams">
          <div className="m-4 bg-white py-6 px-4">
            <Carousel
              slidesDesktop={4}
              slidesTablet={3}
              title="Featured Exams"
              showPagination={false}
              slides={featuredExams?.exams?.data?.map(
                (exam: any, index: number) => {
                  return <ExamCard key={index} featuredExams={exam} />;
                }
              )}
            />
          </div>
        </section>
        <section className="collegeList">
          <div className="flex flex-col md:flex-row gap-4 px-4">
            <div className="flex-none w-56 drop-shadow-md hover:drop-shadow-xl">
              <ExamFilters
                LevelFilter={LevelFilter}
                setLevelFilter={setLevelFilter}
                ModeFilter={ModeFilter}
                setModeFilter={setModeFilter}
                isMobile={MobileFilter}
                handleMobileFilter={handleMobileFilter}
                totalExams={examsData?.exams?.meta?.pagination?.total}
              />
            </div>
            <div className="flex-1 w-full overflow-hidden">
              <div className="mb-4 flex gap-4 items-stretch relative max-md:flex-col">
                <div className="bg-white h-10 flex border-2 border-extra-light-text rounded-md flex-1 items-center text-primary-text px-2 focus-within:border-secondary-text">
                  <RiSearchLine />
                  <input
                    className="w-full flex-1 text-sm px-2 py-1 outline-none"
                    placeholder={`Search Exam Name`}
                    onChange={handleSearch}
                  />
                </div>
                <div className="flex gap-4">
                  <div className="flex border-2 items-center px-2 border-extra-light-text gap-2 rounded-md cursor-pointer">
                    <span>Sort</span> <MdOutlineSort />
                  </div>
                  <div className="max-md:block hidden">
                    <div className="flex border-2 items-center px-2 border-extra-light-text gap-2 rounded-md cursor-pointer">
                      <span onClick={handleMobileFilter}>Filter</span>
                      <MdOutlineSort />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex sm:flex-col flex-row overflow-x-scroll">
                <ExamListItem exams={filteredData} />

                {filteredData?.length >= 5 &&
                  filteredData?.length < examsData?.exams?.data.length && (
                    <button
                      className="group relative h-12 w-48 overflow-hidden rounded-lg bg-white text-lg shadow m-6"
                      onClick={handleLoadMore}
                    >
                      <div className="absolute inset-0 w-3 bg-amber-400 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                      <span className="relative text-black group-hover:text-white">
                        Load More
                      </span>
                    </button>
                  )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
