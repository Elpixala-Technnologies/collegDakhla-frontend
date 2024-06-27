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
import SortButton from "@/components/sortButton/SortButton";
import useExmas from "@/hooks/useExmas";
import Spinner from "@/components/Loader/loader";
import { IoIosCloseCircleOutline } from "react-icons/io";

export default function ExamList() {
  const [Search, setSearch] = useState("");
  const [MobileFilter, setMobileFilter] = useState(false);
  const [LevelFilter, setLevelFilter] = useState<string>("");
  const [ModeFilter, setModeFilter] = useState<string>("");
  const [showReadMore, setShowReadMore] = useState(true);
  const [showFullContent, setShowFullContent] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [displayCount, setDisplayCount] = useState(5);
  const [searchValue, setSearchValue] = useState("");
  const [sortOption, setSortOption] = useState<any>([]);

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
  const { AllExamData } = useExmas();
  // sorting
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSort = (option: React.SetStateAction<string>) => {
    setSortOption(option ? [option] : []);
    setIsOpen(false);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  // End

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

  const handleReadMoreClick = () => {
    setShowFullContent(true);
    setShowReadMore(false);
  };

  const handleReadLessClick = () => {
    setShowFullContent(false);
    setShowReadMore(true);
  };

  const handleLoadMore = () => {
    setDisplayCount((prevCount) => prevCount + 10);
  };

  const handleFilterOptionClick = (option: any) => {
    if (option === "a-z") {
      const sortedData: any = [...AllExamData].sort((a: any, b: any) => {
        return a?.attributes?.name.localeCompare(b?.attributes?.name);
      });
      setFilteredData(sortedData.slice(0, displayCount));
    } else if (option === "reset") {
      const resetArray: any = [...AllExamData].slice(0, displayCount);
      setFilteredData(resetArray);
    }
  };

  useEffect(() => {
    if (searchValue.trim() === "") {
      setFilteredData(AllExamData?.slice(0, displayCount));
    } else {
      const filtered = AllExamData?.filter((exam: any) =>
        exam.attributes.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchValue, AllExamData, displayCount]);

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
          <div className="m-4 px-8 pt-8 bg-white flex flex-col rounded-xl">
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
          <div className="m-4 bg-white py-6 px-4 rounded-xl">
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
        {/* Exams Filtering and Listing Section  */}
        <section className="collegeList">
          <div className="flex  md:flex-row gap-3 px-4 my-5">
            {/* aside Filter  */}
            <aside
              className={`min-w-[300px] h-min border border-zinc-300 rounded-md px-3 [flex:2] max-md:bg-black max-md:bg-opacity-80 ${
                MobileFilter
                  ? "fixed left-0 top-0 z-40 h-screen w-full overflow-y-scroll pr-[20%]"
                  : "max-md:hidden"
              }`}
            >
              <button
                className="fixed right-5 top-24 text-3xl text-white md:hidden"
                onClick={() => setMobileFilter(false)}
              >
                <IoIosCloseCircleOutline />
              </button>
              <ExamFilters
                LevelFilter={LevelFilter}
                setLevelFilter={setLevelFilter}
                ModeFilter={ModeFilter}
                setModeFilter={setModeFilter}
                totalExams={examsData?.exams?.meta?.pagination?.total}
              />
            </aside>
            {/* main Exam Search and List Section  */}
            <main className="flex w-full flex-col p-5 pt-0  md:min-w-[550px] md:[flex:8]">
              <div className="mb-4 flex gap-4 items-stretch relative max-md:flex-col">
                <div className="bg-white h-12 flex border border-zinc-300 rounded-md flex-1 items-center text-primary-text px-2 focus-within:border-secondary-text">
                  <RiSearchLine />
                  <input
                    className="w-full flex-1 text-sm px-2 py-1 outline-none  max-md:h-12"
                    placeholder={`Search Exam Name`}
                    onChange={handleSearch}
                  />
                </div>
                <div className="flex gap-4">
                  {/* sort button  */}
                  <SortButton
                    handleFilterOptionClick={handleFilterOptionClick}
                  />
                  {/* Filter Button  */}
                  <div className="max-md:block hidden">
                    <div className="group flex h-12 cursor-pointer items-center gap-2 rounded-md border border-zinc-300 bg-white px-2 text-black">
                      <span onClick={() => setMobileFilter(true)}>Filter</span>
                      <MdOutlineSort />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                {AllExamData ? (
                  <ExamListItem exams={filteredData} />
                ) : (
                  <div className="w-full h-full p-20 item-center flex justify-center">
                    <Spinner />
                  </div>
                )}

                {filteredData?.length >= 5 &&
                  filteredData?.length < AllExamData?.length && (
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
            </main>
          </div>
        </section>
      </div>
    </>
  );
}
