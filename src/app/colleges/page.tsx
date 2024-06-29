"use client";
import CollegeListItem from "@/components/collegeListItem/collegeListItem";
import CollegeFilters from "@/components/filters/collegeFilters/collegeFilters";
import { useEffect, useRef, useState } from "react";
import { MdEmail, MdOutlineSort } from "react-icons/md";
import { RiSearchLine } from "react-icons/ri";
import {
  getAllColleges,
  getCollegesFilter,
  getStreamData,
  searchCollege,
  topColleges,
} from "@/query/schema";
import { useQuery } from "@apollo/client";
import Carousel from "@/components/carousel/carousel";
import CollegeCard from "@/components/card/collegeCard";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaTwitter,
} from "react-icons/fa";
import Link from "next/link";
import SortButton from "@/components/sortButton/SortButton";
import Spinner from "@/components/Loader/loader";
import { ID } from "@/types/global";
import { useAppSelector } from "@/store";
import useSignup from "@/query/hooks/useSignup";
import useUserMetaData from "@/query/hooks/useUserMetaData";
import ApplyNowModal from "@/components/consultingModule/ApplyNowModal/ApplyNowModal";
import userFrom from "@/hooks/userFrom";
import { IoIosCloseCircleOutline } from "react-icons/io";
// import { FaCircleChevronRight } from "react-icons/fa6";
// import Loading from "react-loading-components";

export default function CollegeList() {
  // const [Search, setSearch] = useState("");
  const [MobileFilter, setMobileFilter] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [Stream, setStream] = useState<string>("default");
  const [sortOption, setSortOption] = useState<any>([]);
  // const [TopStream, setTopStream] = useState<string>("")
  const [Limit, setLimit] = useState<number>(10); // set initial limit for top collages
  const [displayCount, setDisplayCount] = useState(10); // Initial display count
  const [searchValue, setSearchValue] = useState("");

  const [showFullContent, setShowFullContent] = useState(false);
  const [showReadMore, setShowReadMore] = useState(true);
  const { CollegeApplicatonListData } = userFrom();
  const handleReadMoreClick = () => {
    setShowFullContent(true);
    setShowReadMore(false);
  };

  const handleReadLessClick = () => {
    setShowFullContent(false);
    setShowReadMore(true);
  };

  // get college data
  const { loading, error, data: initialData } = useQuery(getAllColleges);
  useEffect(() => {
    console.log(initialData, "cccc");
  }, [initialData]);

  const {
    loading: filterLoader,
    error: filterError,
    data: filteredCollege,
  } = useQuery(searchCollege, {
    variables: {
      searchValue,
    },
  });

  //query to get top colleges
  const {
    loading: topCollegesLoader,
    error: topCollegesError,
    data: topCollegesData,
  } = useQuery(topColleges, {
    variables: { Limit },
  });

  // sorting
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSort = (option: React.SetStateAction<string>) => {
    setSortOption(option ? [option] : []);
    setIsOpen(false);
  };

  const FromStep: any = CollegeApplicatonListData?.form_stape;

  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const handleOpenModal = () => {
  //   setIsModalOpen(true);
  // };

  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  // };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleOpenModal = (collegeId: any) => {
    setSelectedId(collegeId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // End

  const {
    loading: streamLoader,
    error: streamError,
    data: streamData,
  } = useQuery(getStreamData, {
    variables: { Stream },
  });
  const aboutStream =
    streamData?.streams?.data[0]?.attributes?.contentForColleges;

  const handleMobileFilter = () => {
    setMobileFilter(!MobileFilter);
    if (MobileFilter) {
      document.body.style.overflow = "hidden";
    }
  };

  const handleSearch = (event: any) => {
    const value = event.target.value.trim();
    setSearchValue(value);
  };

  const handleLoadMore = () => {
    setDisplayCount((prevCount) => prevCount + 10);
  };

  const handleFilterOptionClick = (option: any) => {
    if (option === "a-z") {
      const sortedData: any = [...initialData?.colleges?.data].sort(
        (a: any, b: any) => {
          return a?.attributes?.collegeName.localeCompare(
            b?.attributes?.collegeName
          );
        }
      );
      setFilteredData(sortedData.slice(0, displayCount));
    } else if (option === "reset") {
      const resetArray: any = [...initialData?.colleges?.data].slice(
        0,
        displayCount
      );
      setFilteredData(resetArray);
    }
  };

  useEffect(() => {
    if (initialData && initialData?.colleges?.data) {
      if (searchValue.trim() === "") {
        setFilteredData(initialData?.colleges?.data.slice(0, displayCount));
      } else if (searchValue.trim() !== "") {
        const filtered = initialData?.colleges?.data.filter((college: any) =>
          college.attributes.collegeName
            .toLowerCase()
            .includes(searchValue.toLowerCase())
        );
        setFilteredData(filtered);
      }
    }
  }, [searchValue, initialData, displayCount]);

  const { GetUserMetaData } = useUserMetaData();
  const { userID } = useAppSelector((store: any) => store.auth);

  const { GetUserDataMetaId } = useSignup();

  const userMetaId: ID = GetUserDataMetaId(userID);

  const userData = GetUserMetaData(userMetaId);

  const AppliedCollege = userData?.userAllMetaData?.appliedColleges;

  //  console.log(initialData?.colleges?.data, "ppppp");

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
              Showing Top {filteredCollege?.colleges?.data?.length} Colleges in
              India
            </h1>
            <p
              className={`${
                showFullContent ? "text-justify" : " text-center"
              } text-base mb-3`}
            >
              The list of top engineering colleges in India 2024 includes IT
              Madras, IIT Bombay, IIT Kanpur, IIT Roorkee, IIT Kharagpur, etc.
              Out of the total engineering colleges in India 95 colleges are
              privately owned and 92 colleges are administered by the
              government. The best engineering colleges in India 2024 include a
              total of 23 lITs, 31 NITs and 25 IIITS, JEE Main and Advanced
              being the major entrance exams accepted to these best engineering
              institutes is conducted every year for enrolling students in the
              B.lech courses.
            </p>
            {showFullContent && (
              <div>
                <p>
                  JEE Main 2024 schedule has been released for admission to the
                  top engineering colleges in india. JEE Main 2024 session 2
                  will be held from April 4 to April 15, 2024. In addition to
                  JEE scores, some other entrances accepted by the best
                  engineering colleges in India are EAPCET, MHT CET, SRMJEEE,
                  VITEEE, WBJEE and many more. Let's take a look at the top
                  engineering colleges in India 2024. As per the previous year
                  NIRF Ranking, the top 5 engineering colleges in India include
                  IT Madras, IT Delhi IT Bombay, IT Kanpur and Ill Roorkee.
                  Seeing the previous year's trends, it Is expected that these
                  ITs will once again secure the top positions amongst the top
                  engineering colleges in India in the NIRF Ranking 2024 as
                  well. We have listed the top 10 engineering colleges in India
                  based on the prestigious NIRF Ranking 2023.
                </p>
              </div>
            )}
            <div
              dangerouslySetInnerHTML={{ __html: aboutStream }}
              className="font-poppins text-base text-wrap"
              style={{
                display: showFullContent ? "block" : "none",
              }}
            ></div>
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
        {/* Featured Colleges  */}
        <section className="topCollege">
          <div className="m-4 bg-white py-8 my-4 px-4 rounded-xl">
            <h2 className="text-xl font-bold mb-3"></h2>
            <Carousel
              slidesDesktop={4}
              slidesTablet={3}
              title="Featured Colleges"
              showPagination={false}
              slides={topCollegesData?.colleges?.data?.map(
                (college: any, index: number) => {
                  return (
                    <CollegeCard
                      key={index}
                      AppliedCollege={AppliedCollege}
                      featuredCollege={college}
                      onApplyNow={() => handleOpenModal(college?.id)}
                    />
                  );
                }
              )}
            />
          </div>
        </section>
        {/* Colleges Filtering and Listing Section  */}
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
              <CollegeFilters
                allColleges={initialData}
                setFilteredData={setFilteredData}
                isMobile={MobileFilter}
                handleMobileFilter={handleMobileFilter}
                setStream={setStream}
              />
            </aside>
            {/* College Search and List Section  */}
            <main className="flex w-full flex-col p-5 pt-0  md:min-w-[550px] md:[flex:8]">
              {/* SearchBar and sort  */}
              <div className="mb-4 flex gap-4 items-stretch relative max-md:flex-col">
                <div className="bg-white h-12 flex border border-zinc-300 rounded-md flex-1 items-center text-primary-text px-2 focus-within:border-secondary-text">
                  <RiSearchLine />
                  <input
                    className="w-full flex-1 text-sm px-2 py-1 outline-none  max-md:h-12"
                    type="text"
                    placeholder="Search colleges..."
                    onChange={handleSearch}
                  />
                </div>
                <div className="flex gap-4">
                  {/* sort button  */}
                  <SortButton
                    handleFilterOptionClick={handleFilterOptionClick}
                  />
                  {/* Filter Button  */}
                  <div
                    className="hidden max-md:block"
                    onClick={() => setMobileFilter((prev) => !prev)}
                  >
                    <div className="group flex h-12 cursor-pointer items-center gap-2 rounded-md border border-zinc-300 bg-white px-2 text-black">
                      <span>Filter</span>
                      <MdOutlineSort />
                    </div>
                  </div>
                </div>
              </div>
              {/* CollegeListItem */}
              <div className="flex flex-col">
                {initialData?.colleges?.data ? (
                  <CollegeListItem
                    collegeData={filteredData}
                    AppliedCollege={AppliedCollege}
                  />
                ) : (
                  <div className="w-full h-full p-20 item-center flex justify-center">
                    <Spinner />
                  </div>
                )}

                {filteredData?.length >= 10 &&
                  filteredData?.length < initialData?.colleges?.data.length && (
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

      {isModalOpen && (
        <ApplyNowModal
          id={selectedId}
          FromStep={FromStep}
          isSectionCheck={"College"}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
