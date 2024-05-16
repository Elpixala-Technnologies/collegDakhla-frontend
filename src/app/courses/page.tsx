"use client";
import { useEffect, useState } from "react";
import { MdOutlineSort } from "react-icons/md";
import { RiSearchLine } from "react-icons/ri";
import { getFeaturedCourses, searchCourses } from "@/query/schema";
import { useQuery } from "@apollo/client";
import CourseListItem from "@/components/courseListItem/courseListItem";
import Carousel from "@/components/carousel/carousel";
import CourseCard from "@/components/card/courseCard";
import CourseFilters from "@/components/filters/courseFilters/courseFilters";
import SortButton from "@/components/sortButton/SortButton";
import userFrom from "@/hooks/userFrom";
import ApplyNowModal from "@/components/consultingModule/ApplyNowModal/ApplyNowModal";

export default function CourseList() {
  const [Search, setSearch] = useState<string>("");
  const [MobileFilter, setMobileFilter] = useState(false);
  const [DurationFilter, setDurationFilter] = useState<string>("");
  const [SpecializationFilter, setSpecializationFilter] = useState<string>("");
  const [showReadMore, setShowReadMore] = useState(true);
  const [showFullContent, setShowFullContent] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [displayCount, setDisplayCount] = useState(5);
  const [searchValue, setSearchValue] = useState("");

  //query to get and search all courses
  const {
    loading: coursesLoader,
    error: coursesError,
    data: coursesData,
  } = useQuery(searchCourses, {
    variables: {
      Search,
      DurationFilter,
      SpecializationFilter,
    },
  });

  //query to get featured courses
  const {
    loading: featuredLoader,
    error: featuredError,
    data: featuredCourses,
  } = useQuery(getFeaturedCourses);

  const handleSearch = (event: any) => {
    setSearch(event.target.value);
  };

  const handleMobileFilter = () => {
    setMobileFilter(!MobileFilter);
    if (MobileFilter) {
      document.body.style.overflow = "hidden";
    }
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
    setDisplayCount((prevCount) => prevCount + 5);
  };

  const handleFilterOptionClick = (option: any) => {
    if (option === "a-z") {
      const sortedData: any = [...coursesData?.courses?.data].sort(
        (a: any, b: any) => {
          return a?.attributes?.name.localeCompare(b?.attributes?.name);
        }
      );
      setFilteredData(sortedData.slice(0, displayCount));
    } else if (option === "reset") {
      const resetArray: any = [...coursesData?.courses?.data].slice(
        0,
        displayCount
      );
      setFilteredData(resetArray);
    }
  };

  useEffect(() => {
    if (searchValue.trim() === "") {
      setFilteredData(coursesData?.courses?.data.slice(0, displayCount));
    } else {
      const filtered = coursesData?.courses?.data.filter((exam: any) =>
        exam.attributes.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchValue, coursesData, displayCount]);

  const { CollegeApplicatonListData } = userFrom();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [slectedId, setSelectedId] = useState<any>(null)
  const handleOpenModal = (id: any) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const FromStep: any = CollegeApplicatonListData?.form_stape;

 

  return (
    <>
      <div className="max-w-screen-xl mx-auto">
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
              At <span className="text-primary">College Dakhla</span>, we're
              dedicated to helping students discover and pursue the best courses
              India has to offer. With a myriad of options available, selecting
              the right course can be overwhelming. Our expertise lies in
              simplifying this process.From engineering and medicine to
              management and humanities, we provide personalized guidance
              tailored to your interests and career goals.
            </p>
            {showFullContent && (
              <div>
                <p>
                  Aspirants must remain vigilant and proactive in tracking exam
                  Our team assists you in exploring top institutions,
                  understanding curriculum structures, and navigating admission
                  procedures, ensuring a smooth transition into your chosen
                  field of study. With{" "}
                  <span className="text-primary">College Dakhla</span>, embark
                  on your educational journey confidently, knowing you've chosen
                  the perfect course to unlock your full potential and pave the
                  way for a successful future.
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
        <section className="topCourses">
          <div className="m-4 bg-white py-4 px-4">
            <Carousel
              slidesDesktop={4}
              slidesTablet={3}
              title="Featured Courses"
              showPagination={false}
              slides={featuredCourses?.courses?.data?.map(
                (course: any, index: number) => {
                  return <CourseCard onApplyNow={() => handleOpenModal(course?.id)} key={index} featuredCourse={course} />;
                }
              )}
            />
          </div>
        </section>
        <section className="collegeList">
          <div className="flex flex-col md:flex-row gap-4 px-4">
            <div className="flex-none w-56">
              <CourseFilters
                DurationFilter={DurationFilter}
                setDurationFilter={setDurationFilter}
                SpecializationFilter={SpecializationFilter}
                setSpecializationFilter={setSpecializationFilter}
                isMobile={MobileFilter}
                handleMobileFilter={handleMobileFilter}
                totalCourses={coursesData?.courses?.meta?.pagination?.total}
              />
            </div>
            <div className="flex-1 w-full overflow-hidden">
              <div className="mb-4 flex gap-4 items-stretch relative max-md:flex-col">
                <div className="bg-white h-10 flex border-2 border-extra-light-text rounded-md flex-1 items-center text-primary-text px-2 focus-within:border-secondary-text">
                  <RiSearchLine />
                  <input
                    className="w-full flex-1 text-sm px-2 py-1 outline-none"
                    placeholder={`Search Course Name`}
                    onChange={handleSearch}
                  />
                </div>
                <div className="flex gap-4">
                  {/* sort button  */}
                  <SortButton
                    handleFilterOptionClick={handleFilterOptionClick}
                  />
                  <div className="max-md:block hidden">
                    <div className="flex border-2 items-center px-2 border-extra-light-text gap-2 rounded-md cursor-pointer">
                      <span onClick={handleMobileFilter}>Filter</span>
                      <MdOutlineSort />
                    </div>
                  </div>
                </div>
              </div>
              <CourseListItem courses={filteredData} />
              {filteredData?.length >= 5 &&
                filteredData?.length < coursesData?.courses?.data.length && (
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
        </section>
      </div>

      {isModalOpen && (
        <ApplyNowModal

          id={slectedId}
          FromStep={FromStep}
          isSectionCheck={"Course"}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
