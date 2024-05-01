"use client";
import Image from "next/image";
import Link from "next/link";
import TopCollectionCard from "@/components/card/topCollectionCard";
import HeroSection from "@/components/heroComponent/heroComponent";
import NotificationCard from "@/components/card/notificationCar";
import CarouselSideBtn from "@/components/carousel/carousel-side-button";
import { FaAngleRight, FaCity } from "react-icons/fa6";
import { useQuery } from "@apollo/client";
import { IconQuote } from "@tabler/icons-react";
import { motion } from "framer-motion";
import {
  getAllNews,
  getCourses,
  getStates,
  getStreams,
  getTestimonials,
  topColleges,
  getFeaturedCourses,
  getFeaturedExams,
} from "@/query/schema";
import { GetDefaultImage, getStrapiMedia } from "../utils/api-helper";
import { useEffect, useState } from "react";
import Button from "@/components/button/button";
import TestimonyCard from "@/components/card/testimonyCard";
import CourseCard from "@/components/card/courseCard";
import Accordian from "@/components/accordian/accordian";
import formatFees from "@/utils/formatFees";
import { getDate } from "@/utils/formatDate";
import CourseListItem from "@/components/courseListItem/courseListItem";
import Dropdown from "@/components/dropdown/dropdown";
import CourseMiniList from "@/components/courseListItem/courseMiniList";
import Carousel from "@/components/carousel/carousel";
import ExamCard from "@/components/card/examCard";
import Faq from "@/components/Faq-HomePage/faq";
import { Snowman, Study } from "@/Asset";
import { slideInFromLeft, slideInFromRight } from "@/components/Motion/motion";
import WavyText from "@/components/Motion/Wave";

export default function Home() {
  const [Stream, setStream] = useState<string>("");
  const [Limit, setLimit] = useState<number>(10);
  const [filterCollegeData, setFilterCollegeData] = useState<any[]>([]);
  const [filterCourseData, setFilterCourseData] = useState<any[]>([]);
  const [replay, setReplay] = useState(true);
  //get all states
  const {
    loading: statesLoader,
    error: statesError,
    data: statesData,
  } = useQuery(getStates);

  //get all streams data
  const {
    loading: streamLoader,
    error: streamsError,
    data: streamsData,
  } = useQuery(getStreams);

  //get all colleges data
  const {
    loading: topCollegesLoader,
    error: topCollegesError,
    data: topCollegesData,
  } = useQuery(topColleges, {
    variables: { Limit },
  });
  let topCollegesLength = topCollegesData?.colleges?.data?.length;

  // get all courses
  const {
    loading: coursesLoader,
    error: coursesError,
    data: coursesData,
  } = useQuery(getCourses);
  const {
    loading: featuredExamLoader,
    error: featuredExamError,
    data: featuredExams,
  } = useQuery(getFeaturedExams);

  //get all news in descending order
  const {
    loading: newsLoader,
    error: newsError,
    data: newsData,
  } = useQuery(getAllNews);
  const {
    loading: featuredLoader,
    error: featuredError,
    data: featuredCourses,
  } = useQuery(getFeaturedCourses);

  // get all testimonials
  const {
    loading: testimonialsLoader,
    error: testimonialsError,
    data: testimonialsData,
  } = useQuery(getTestimonials);

  function handleStream(stream: string) {
    setStream(stream);
  }

  const [activeTrendingCollege, setActiveTrendingCollege] =
    useState<any>("Stream");

  const handleTrendingCollegeTabClick = (tab: any) => {
    setActiveTrendingCollege(tab);
  };

  const testimonialData = [
    {
      text: "I had an amazing experience with the institute. The faculty is highly knowledgeable and supportive, always ready to clarify doubts. The course curriculum is well-structured and covers all essential topics. The practical sessions were particularly helpful in understanding complex concepts. Overall, I highly recommend this institute to anyone looking to enhance their skills.",
      img: "/user_img_1.jpg",
      name: "Arun Kumar",
      location: "Chennai, Tamil Nadu, India",
    },
    {
      text: "The institute exceeded my expectations in every aspect. The teaching staff is top-notch, providing personalized attention to each student. The facilities are excellent, creating a conducive learning environment. I am grateful for the opportunities provided by the institute, which have helped me grow both personally and professionally.",
      img: "/user_img_2.jpg",
      name: "Priya Patel",
      location: "Mumbai, Maharashtra, India",
    },
    {
      text: "I am immensely satisfied with my decision to join this institute. The faculty members are experts in their fields and deliver lectures with great clarity. The institute's focus on practical learning has equipped me with valuable skills that are directly applicable in the industry. I am confident that the knowledge gained here will serve me well in my career.",
      img: "/user_img_3.jpg",
      name: "Rajesh Singh",
      location: "Delhi, India",
    },
    {
      text: "This institute provides an exceptional learning experience. The faculty members go above and beyond to ensure that students understand the concepts thoroughly. The hands-on approach to learning has boosted my confidence in applying theoretical knowledge to real-world scenarios. I am grateful for the support and guidance I received throughout my journey.",
      img: "/user_img_4.jpg",
      name: "Neha Sharma",
      location: "Kolkata, West Bengal, India",
    },
    {
      text: "Enrolling in this institute was one of the best decisions I've made. The course content is comprehensive, covering all relevant topics in depth. The faculty members are approachable and encourage interactive learning. The institute's emphasis on practical skills development has prepared me well for the challenges of the industry. I would highly recommend this institute to anyone seeking quality education.",
      img: "/user_img_5.jpg",
      name: "Vikram Singh",
      location: "Bangalore, Karnataka, India",
    },
    // Add more testimonials as needed
  ];
  const duplicatedTestimonialData = [...testimonialData, ...testimonialData];

  return (
    <>
      <div className="mx-auto overflow-x-hidden bg-white">
        <section>
          <HeroSection />
        </section>
        <motion.section
          className="my-5 sm:mt-20 mt-5 mx-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { opacity: 1, scale: 1 },
            hidden: { opacity: 0, scale: 0 },
          }}
        >
          <div className="max-w-screen-xl  mx-auto py-5 border border-gray-300 rounded-3xl px-5">
            <motion.div
              className="flex lg:flex-row flex-col items-center justify-between"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInFromLeft(0.5)}
            >
              <div className="text-3xl">
                Top collection of{" "}
                <b className="text-primary">
                  {activeTrendingCollege === "Stream" ? "Colleges" : "Exams"}
                </b>
              </div>
              <div className="flex items-center mt-2 gap-4 md:gap-2">
                <div
                  className={`p-2 px-6 rounded-lg cursor-pointer ${
                    activeTrendingCollege === "Stream"
                      ? "bg-primary text-white shadow-md shadow-black drop-shadow-md"
                      : "border border-gray-400 text-black"
                  }`}
                  onClick={() => handleTrendingCollegeTabClick("Stream")}
                >
                  College
                </div>

                <div
                  className={`p-2 rounded-lg px-6 cursor-pointer ${
                    activeTrendingCollege === "Exams"
                      ? "bg-primary text-white shadow-md shadow-black drop-shadow-md"
                      : "border border-gray-400 text-black"
                  }`}
                  onClick={() => handleTrendingCollegeTabClick("Exams")}
                >
                  Exams
                </div>
              </div>
            </motion.div>
            <div className="flex flex-row items-center justify-between my-6">
              <div className="flex md:flex-row flex-col gap-10 md:items-center"></div>
              <div>
                <Link
                  href={
                    activeTrendingCollege === "Stream" ? "/colleges" : "/exams"
                  }
                  className="flex text-lg text-nowrap gap-1 md:gap-2 text-[#1268F5] items-center"
                >
                  <span>View All</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height={25}
                    width={25}
                    viewBox="0 0 25 25"
                    fill="none"
                  >
                    <path
                      d="M17.6453 19.0736L24.2188 12.5002L17.6453 5.92676L16.5404 7.03164L21.2278 11.719H0.818556V13.2815H21.2277L16.5404 17.9688L17.6453 19.0736Z"
                      fill="#1268F5"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="flex gap-4 my-5 overflow-x-auto  ">
              {activeTrendingCollege === "Stream" && (
                <div className=" sm:grid flex flex-row hide-scrollbar overflow-x-scroll grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4 py-4 w-full ">
                  {topCollegesData?.colleges?.data
                    ?.slice(0, 8)
                    .map((college: any, index: number) => {
                      return (
                        // <Link
                        //   href={`/colleges/${college?.id}`}
                        // >
                        <TopCollectionCard
                          college={college?.attributes}
                          key={index}
                          href={`/colleges/${college?.id}`}
                        />
                        // </Link>
                      );
                    })}
                </div>
              )}

              {activeTrendingCollege === "Exams" && (
                <>
                  <section className="topExams w-full">
                    <div className="py-6 px-4 w-full">
                      <Carousel
                        slidesDesktop={4}
                        slidesTablet={3}
                        title=""
                        showPagination={false}
                        slides={featuredExams?.exams?.data?.map(
                          (exam: any, index: number) => {
                            return (
                              <ExamCard key={index} featuredExams={exam} />
                            );
                          }
                        )}
                      />
                    </div>
                  </section>
                </>
              )}
            </div>
          </div>
        </motion.section>
        <section className="Banner-1 mt-4 pt-8 mx-4">
          <div className="max-w-screen-xl  mx-auto py-10 relative">
            <div className="h-36 flex flex-row items-center justify-between w-full bg-amber-200 rounded-3xl">
              <div className=" flex sm:gap-8 gap-4 px-4 items-baseline md:flex-row flex-col">
                <span className="sm:text-2xl text-sm">
                  Want to {""}
                  <b className="text-primary font-semibold sm:text-3xl text-base">
                    EXPLORE MORE{" "}
                  </b>
                  about US?
                </span>

                <button
                  type="button"
                  className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl
				   focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium 
				   rounded-lg text-sm px-6 py-4 text-center me-2 mb-2 "
                >
                  <Link href="/more">
                    <span className="sm:text-2xl text-sm">Explore More </span>
                  </Link>
                </button>
              </div>
              <Image
                src={Snowman}
                alt="hero"
                width={200} // Adjust the width as needed
                height={200} // Adjust the height as needed
                className="absolute right-0 -bottom-1/4 transform md:-translate-y-1/2 -translate-y-1/5  md:w-[300px] w-[100px] "
              />
            </div>
          </div>
        </section>

        <section className="explore-course-section pt-16 mx-4">
          <div className="px-4  max-w-screen-xl mx-auto border border-gray-300 rounded-3xl p-6">
            <motion.h2
              className="text-3xl font-semibold"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInFromLeft(0.5)}
            >
              Explore Courses
            </motion.h2>
            <div className="flex gap-4 my-2 hide-scrollbar overflow-x-auto py-2 md:py-0">
              {streamsData?.streams?.data?.map((stream: any, index: any) => {
                return (
                  <Link
                    key={index}
                    href={{
                      pathname: `/streams/${stream.attributes.streamName.toLowerCase()}`,
                    }}
                  >
                    <div className="border border-primary-light rounded-full py-2 px-4 bg-white text-nowrap">
                      {stream?.attributes?.streamName}
                    </div>
                  </Link>
                );
              })}
            </div>
            <div>
              <CarouselSideBtn
                showPagination={false}
                slidesDesktop={5}
                slidesTablet={4}
                slidesMobile={3}
                bgColor="bg-amber-200"
                slides={coursesData?.courses?.data?.map(
                  (course: any, index: number, college: any) => {
                    const logoUrl = college?.collegeLogo?.data?.attributes?.url
                      ? getStrapiMedia(
                          college?.collegeLogo?.data?.attributes?.url
                        )
                      : GetDefaultImage("logo");
                    return (
                      <div key={course?.id}>
                        <Link href={`/courses/${course?.id}`}>
                          <div className="border border-extra-light-text rounded-md bg-white flex flex-col gap-2 min-w-48 p-4 shadow-md">
                            <div className="flex flex-col gap-2 items-start justify-between">
                              <Image
                                src={logoUrl!}
                                alt={college?.collegeName}
                                className="object-center w-full object-contain h-20"
                                height={500}
                                width={500}
                              />
                              <div className="bg-slate-200 px-4 py-1 w-max text-sm text-secondary-text">
                                {
                                  course?.attributes?.courseType?.data
                                    ?.attributes?.type
                                }
                              </div>
                            </div>
                            <div className="font-semibold text-base line-clamp-1 text-primary">
                              {course?.attributes?.name}
                            </div>
                            <div className="flex flex-col gap-1">
                              <div className="flex justify-between w-52">
                                <div className="text-black">Duration</div>
                                <div>
                                  <b className="text-gray-500 font-light">
                                    {course?.attributes?.duration} Years
                                  </b>
                                </div>
                              </div>
                              <div className="flex justify-between w-52">
                                <div className="text-black">Total Avg. Fee</div>
                                <div>
                                  <b className="text-gray-500 font-light">
                                    {formatFees(course?.attributes?.fees)}
                                  </b>
                                </div>
                              </div>
                              <div className="flex justify-between w-52 ">
                                <div className="text-black">Colleges</div>
                                <div>
                                  <b className="text-gray-500 font-light">
                                    {course?.attributes?.colleges?.data?.length}
                                  </b>
                                </div>
                              </div>
                            </div>

                            <div className="border-t border-extra-light-text flex justify-between items-center py-1">
                              <span className="text-gray-800 font-semibold">
                                Course Overview
                              </span>{" "}
                              <FaAngleRight />
                            </div>
                          </div>
                        </Link>
                      </div>
                    );
                  }
                )}
              />
            </div>
          </div>
        </section>
        <section className="max-w-screen-xl mx-auto px-4 my-10 py-4 rounded-3xl">
          <div className="max-w-screen-xl mx-auto">
            <h2 className="text-4xl font-semibold">Upcoming Event</h2>
            <Image src="/tempImage.jpeg" alt="logo" height={1280} width={1920}
              className="w-full object-contain p-4 m-2"/>
          </div>
        </section>

        {/* <section className="Banner-2 mt-4 pt-8 mx-4">
          <div className="max-w-screen-xl  mx-auto py-10">
            <div className="h-36 flex flex-row items-center justify-end w-full bg-amber-200 rounded-3xl relative">
              <div className=" flex gap-8 px-4 items-baseline">
                <span className="text-2xl">
                  Want to know more{" "}
                  <b className="text-primary font-semibold text-3xl">
                    ABOUT US{" "}
                  </b>
                </span>

                <motion.button
                  type="button"
                  className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl
				   focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium 
				   rounded-lg text-sm px-6 py-4 text-center me-2 mb-2"
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true }}
           variants={slideInFromRight(0.5)}>
                  <Link href="/">
                    <span className="text-2xl">About-Us</span>
                  </Link>
                </motion.button>
              </div>
              <Image
                src={Study}
                alt="hero"
                width={400} // Adjust the width as needed
                height={300} // Adjust the height as needed
                className="absolute sm:-left-40 md:-left-4 left-0 top-1/2 transform -translate-y-1/2 sm:w-[400px] w-[100px] sm:h-[200px] h-[200px] "
              />
            </div>
          </div>
        </section> */}
        <section className="testimonials-section px-2 py-8 lg:py-24 text-black flex items-center justify-center mx-auto w-full">
          <div className="Container w-full">
            <div className="testimonials-content flex flex-col w-full rounded-lg">
              <div className="testimonials-content__title flex flex-col text-center mb-12 max-w-[700px] mx-auto">
                <h4 className="text-lg lg:text-2xl -tracking-wide font-medium font-rubik">
                  Reviewed by Students
                </h4>
                <h2 className="text-2xl lg:text-[2.5rem] lg:leading-[3.25rem] tracking-wide font-bold mb-3.5">
                  Students's Testimonials
                </h2>
                <span className="text-sm sm:text-base font-rubik text-gray-500 leading-snug">
                  Our students have experienced our service and results,
                  <br className="sm:hidden" />
                  and they're eager to share their positive experiences with
                  you.
                </span>
              </div>

              <div className="flex flex-wrap gap-3 my-10 justify-around">
                <div className="w-full inline-flex flex-nowrap overflow-hidden sm:[mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
                  <ul className="flex items-center gap-x-6 justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll m-2">
                    {testimonialData.map((testimonial, index) => (
                      <div
                        key={index}
                        className="all-testimonials__box flex flex-col justify-between bg-white shadow-xl w-full lg:min-w-[34rem] lg:py-14 lg:px-14 relative px-7 py-7 rounded-md lg:rounded-none gap-5 min-w-[20rem]"
                      >
                        <span className="quotes-icon absolute hidden md:block text-6xl bottom-14 right-16 text-orange-500">
                          <IconQuote width={60} height={60} />
                        </span>
                        <p className="text-sm md:text-xl font-medium md:leading-[2rem] text-gray-500 line-clamp-6">
                          {testimonial.text}
                        </p>
                        <div className="all-testimonials__box__name__profile flex items-center gap-5">
                          <Image
                            src={testimonial.img}
                            alt={`user_img_${index}`}
                            className="w-16 h-16 rounded-full"
                            width={500}
                            height={500}
                          />
                          <div className="flex flex-col">
                            <h4 className="text-lg font-bold">
                              {testimonial.name}
                            </h4>
                            <p className="text-gray-800 text-base font-rubik font-normal">
                              {testimonial.location}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </ul>
                  <ul className="flex items-center gap-x-6 justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll m-2">
                    {testimonialData.map((testimonial, index) => (
                      <div
                        key={index}
                        className="all-testimonials__box flex flex-col justify-between bg-white shadow-xl w-full lg:min-w-[34rem] lg:py-14 lg:px-14 relative px-7 py-7 rounded-md lg:rounded-none gap-5 min-w-[20rem]"
                      >
                        <span className="quotes-icon absolute hidden md:block text-6xl bottom-14 right-16 text-orange-500">
                          <IconQuote width={60} height={60} />
                        </span>
                        <p className="text-sm md:text-xl font-medium md:leading-[2rem] text-gray-500 line-clamp-6">
                          {testimonial.text}
                        </p>
                        <div className="all-testimonials__box__name__profile flex items-center gap-5">
                          <Image
                            src={testimonial.img}
                            alt={`user_img_${index}`}
                            className="w-16 h-16 rounded-full"
                            width={500}
                            height={500}
                          />
                          <div className="flex flex-col">
                            <h4 className="text-lg font-bold">
                              {testimonial.name}
                            </h4>
                            <p className="text-gray-800 text-base font-rubik font-normal">
                              {testimonial.location}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="px-4 bg-white">
          <div className="max-w-screen-xl mx-auto px-4 my-20 flex flex-wrap text-primary-text gap-16">
            <div className="flex-1">
              <div className="relative flex w-max">
                <h3 className="text-2xl md:text-[35px] font-semibold">
                  We have Got you Covered!
                </h3>
                <div className="absolute right-0 -bottom-2 md:-bottom-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="124"
                    height="17"
                    viewBox="0 0 124 17"
                    fill="none"
                  >
                    <path
                      d="M1.79297 15.0321C11.5534 15.0321 21.2131 8.73606 30.6637 6.88702C39.2675 5.20366 48.0384 3.32012 56.8329 2.73382C78.5395 1.28671 100.483 1.9677 122.276 1.9677"
                      stroke="#428BC1"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              <p className="mt-4">
                Receive comprehensive support throughout your study abroad //
                eslint-disable-next-line react/no-unescaped-entities adventure,
                from program selection to visa requirements. We are here for
                your success.
              </p>
              <motion.div
                className="flex flex-wrap gap-x-4 gap-y-1"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideInFromLeft(0.5)}
              >
                <Image
                  src={"/study.svg"}
                  alt=""
                  width={100}
                  height={100}
                  className="w-full"
                />
              </motion.div>
            </div>
            <div className="flex-1 min-w-[300px]">
              <div className="flex flex-col rounded-md overflow-hidden border-[0.5px] border-primary-text-light shadow-xl">
                <div className="bg-black text-white p-4 flex gap-4 items-center justify-center">
                  <Image
                    src={"/collegeLogo.png"}
                    alt=""
                    width={50}
                    height={50}
                  />
                  <p className="font-semibold text-xl">
                    Let Us Help Find Your College
                  </p>
                </div>
                <div className="p-6 text-primary-text flex flex-col gap-8">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-primary"></div>
                    <div className="flex-1 border-t-[0.5px] border-primary-text opacity-10"></div>
                    <div className="w-4 h-4 rounded-full bg-primary-text opacity-10"></div>
                    <div className="flex-1 border-t-[0.5px] border-primary-text opacity-10"></div>
                    <div className="w-4 h-4 rounded-full bg-primary-text opacity-10"></div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <p>What Degree do you plan to pursue? *</p>
                    <div className="flex gap-4 flex-wrap">
                      <Button
                        outline
                        fontColor="text-white"
                        outlineColor="border-primary-text-light"
                        paddingX="px-4"
                        paddingY="py-2"
                        text={"Bacholer's"}
                      />
                      <Button
                        outline
                        fontColor="text-white"
                        outlineColor="border-primary-text-light"
                        paddingX="px-4"
                        paddingY="py-2"
                        text={"Master's"}
                      />
                      <Button
                        outline
                        fontColor="text-white"
                        outlineColor="border-primary-text-light"
                        paddingX="px-4"
                        paddingY="py-2"
                        text={"MBA"}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <p>What Degree do you plan to pursue? *</p>
                    <input
                      className="rounded-md border-[0.5px] border-primary-extra-light-text w-full bg-white p-2 shadow"
                      placeholder="Select Country"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <p>What are you planning to study? *</p>
                    <input
                      className="rounded-md border-[0.5px] border-primary-extra-light-text w-full bg-white p-2 shadow"
                      placeholder="Select Major"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <p>What is your highest level of education? *</p>
                    <div className="flex gap-4 flex-wrap">
                      <Button
                        outline
                        fontColor="text-white"
                        outlineColor="border-primary-text-light"
                        paddingX="px-4"
                        paddingY="py-2"
                        text={"Grade 9"}
                      />
                      <Button
                        outline
                        fontColor="text-white"
                        outlineColor="border-primary-text-light"
                        paddingX="px-4"
                        paddingY="py-2"
                        text={"Grade 10"}
                      />
                      <Button
                        outline
                        fontColor="text-white"
                        outlineColor="border-primary-text-light"
                        paddingX="px-4"
                        paddingY="py-2"
                        text={"Grade 11"}
                      />
                      <Button
                        outline
                        fontColor="text-white"
                        outlineColor="border-primary-text-light"
                        paddingX="px-4"
                        paddingY="py-2"
                        text={"Grade 12"}
                      />
                    </div>
                  </div>
                  <div>
                    <button className="bg-primary text-white p-[10px] w-full rounded-md">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-8">
          <div className=" max-w-screen-xl mx-auto px-4">
            <Faq />
          </div>
        </section>
        <section className="max-w-screen-xl mx-auto px-4 my-10 py-4 rounded-3xl">
          <motion.div
            className="max-w-screen-xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { opacity: 1, scale: 1 },
              hidden: { opacity: 0, scale: 0 },
            }}
          >
            <motion.h2
              className="text-3xl font-semibold"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInFromLeft(0.5)}
            >
              Latest News & Stories
            </motion.h2>
            <div className="flex gap-4 my-2 px-6 overflow-x-auto py-2 md:py-0">
              <CarouselSideBtn
                showPagination={false}
                slidesDesktop={5}
                slidesTablet={4}
                slidesMobile={3}
                gap="gap-6"
                slides={newsData?.news?.data?.map(
                  (news: any, index: number) => {
                    const featuredImageUrl = news?.attributes?.featuredImage
                      ?.data[0]
                      ? getStrapiMedia(
                          news?.attributes?.featuredImage?.data[0]?.attributes
                            ?.url
                        )
                      : GetDefaultImage("banner");
                    return (
                      <div
                        key={index}
                        className="flex flex-col gap-6  md:min-w-72 lg:min-w-80 min-w-40 p-2 border border-gray-200 rounded-xl"
                      >
                        <Image
                          src={featuredImageUrl!}
                          alt=""
                          width={500}
                          height={500}
                          className="w-full sm:min-w-28 min-w-20 sm:h-36 h-20 rounded-lg object-cover object-center shadow-md shadow-gray-500"
                        />
                        <Link
                          href={`/news/${news?.id}`}
                          className="cursor-pointer sm:text-2xl text-base font-semibold text-primary-text line-clamp-1"
                        >
                          {news?.attributes?.title}
                        </Link>

                        <p className="line-clamp-4">
                          {news?.attributes?.excerpt}
                        </p>
                        <div className="flex justify-between text-primary-text-light text-base pr-4">
                          <p>{getDate(news?.attributes?.publishedAt)}</p>
                          <h4>{news?.attributes?.author}</h4>
                        </div>
                      </div>
                    );
                  }
                )}
              />
            </div>
          </motion.div>
        </section>
        <section className="bg-[#F2F6F7]">
          <div className="max-w-screen-xl m-auto py-24 px-4 flex flex-col gap-12 items-center text-primary-text">
            <div className="text-3xl font-semibold w-80 text-center">
              Get in Touch with our Expert Counsellors
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <input
                className="rounded-md border-[0.5px] border-primary-extra-light-text w-full bg-white p-2 shadow"
                placeholder="Name"
              />
              <input
                className="rounded-md border-[0.5px] border-primary-extra-light-text w-full bg-white p-2 shadow"
                placeholder="Email"
              />
              <input
                className="rounded-md border-[0.5px] border-primary-extra-light-text w-full bg-white p-2 shadow"
                placeholder="Phone"
              />
              <input
                className="rounded-md border-[0.5px] border-primary-extra-light-text w-full bg-white p-2 shadow"
                placeholder="Your Stream"
              />
            </div>
            <div className="flex flex-col items-center gap-4">
              <div>
                <button className="bg-primary text-white p-[10px] w-52 rounded-md">
                  Get in Touch
                </button>
              </div>
              <div>
                <p className=" w-full md:w-96 text-center text-sm">
                  By proceeding ahead you expressly agree to the College Dakhla
                  Education terms of use and privacy policy
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* <section className="states-section py-16 px-4 bg-white">
          <div className="flex flex-col gap-8 max-w-screen-xl mx-auto">
            <h2 className="text-3xl font-semibold">Browse by State</h2>
            <div className="flex flex-wrap gap-8">
              {statesData?.states?.data?.map((state: any, index: any) => {
                return (
                  <Link href={"/"} key={index}>
                    <div className=" w-32 h-32 p-8 bg-primary-light flex flex-col items-center justify-center gap-2 hover:bg-primary hover:text-white group">
                      <div className="state-image transform scale-100 group-hover:scale-110">
                        <FaCity size={36} />
                      </div>
                      <div className="state-name">
                        {state?.attributes?.name}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
        <div className="bg-white py-16">
          <div className="border border-extra-light-text w-full opacity-20"></div>
        </div> */}
      </div>
    </>
  );
}
