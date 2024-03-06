"use client";
import Image from "next/image";
import Link from "next/link";
import TopCollectionCard from "@/components/card/topCollectionCard";
import HeroSection from "@/components/heroComponent/heroComponent";
import NotificationCard from "@/components/card/notificationCar";
import CarouselSideBtn from "@/components/carousel/carousel-side-button";
import { FaAngleRight, FaCity } from "react-icons/fa6";
import { useQuery } from "@apollo/client";
import { getStates, getStreams, topColleges } from "@/query/schema";
import { GetDefaultImage, getStrapiMedia } from "../utils/api-helper";
import { useState } from "react";
import Button from "@/components/button/button";
import TestimonyCard from "@/components/card/testimonyCard";
import CourseCard from "@/components/card/courseCard";
import Accordian from "@/components/accordian/accordian";
export default function Home() {
  const [Stream, setStream] = useState<string>("");
  const [Limit, setLimit] = useState<number>(10);
  const {
    loading: statesLoader,
    error: statesError,
    data: statesData,
  } = useQuery(getStates);
  const {
    loading: streamLoader,
    error: streamsError,
    data: streamsData,
  } = useQuery(getStreams);
  const {
    loading: topCollegesLoader,
    error: topCollegesError,
    data: topCollegesData,
  } = useQuery(topColleges, {
    variables: { Stream, Limit },
  });
  let topCollegesLength = topCollegesData?.colleges?.data?.length;

  function handleStream(stream: string) {
    setStream(stream);
  }

  return (
    <>
      <div className="mx-auto">
        <section>
          <HeroSection />
        </section>
        {/* <section className="py-16 bg-white">
          <div className=" max-w-screen-xl flex items-center justify-center w-4/5 mx-auto mb-4">
            <div className=" flex flex-col items-center ">
              <div className="p-7 border-2 w-max border-primary rounded-full">
                <Image src="/direction.png" width={50} height={50} alt="" />
              </div>
            </div>
            <div className="border-[0.5px] w-32 border-secondary-text"></div>
            <div className="p-7 border-2 border-primary rounded-full">
              <Image src="/comparison.png" width={50} height={50} alt="" />
            </div>
            <div className="border-[0.5px] w-32 border-secondary-text"></div>
            <div className="p-7 border-2 border-primary rounded-full">
              <Image src="/target.png" width={50} height={50} alt="" />
            </div>
            <div className="border-[0.5px] w-32 border-secondary-text"></div>
            <div className="p-7 border-2 border-primary rounded-full">
              <Image src="/apply.png" width={50} height={50} alt="" />
            </div>
          </div>
          <div className="flex w-4/5 mx-auto item-center justify-center px-4">
            <div className="w-1/5 text-center flex flex-col gap-4">
              <h6 className="font-semibold text-2xl">Explore</h6>
              <p className="mx-2">
                You can browse more than 90,000+ collegs from all over the
                world.
              </p>
            </div>
            <div className="w-1/5 text-center flex flex-col gap-4">
              <h6 className="font-semibold text-2xl">Compare</h6>
              <p className="mx-2">
                Make a wishlist of your favourite Collegs and stream, check your
                fit with them, and read what other students are saying.
              </p>
            </div>
            <div className="w-1/5 text-center flex flex-col gap-4">
              <h6 className="font-semibold text-2xl">Decide</h6>
              <p className="mx-2">
                Now that you have your top Collegs shortlisted, you can pick the
                ones that fit you the best.
              </p>
            </div>
            <div className="w-1/5 text-center flex flex-col gap-4">
              <h6 className="font-semibold text-2xl">Apply</h6>
              <p className="mx-2">
                When you feel confident about your college choice, you can
                apply.
              </p>
            </div>
          </div>
        </section> */}
        <section className="top-collection-section max-w-screen-xl mx-auto">
          <div className="px-4 py-16">
            <h2 className="text-3xl font-semibold">Top Collection</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 py-4">
              <TopCollectionCard />
              <TopCollectionCard />
              <TopCollectionCard />
              <TopCollectionCard />
              <TopCollectionCard />
              <TopCollectionCard />
              <TopCollectionCard />
              <TopCollectionCard />
              <TopCollectionCard />
              <TopCollectionCard />
            </div>
            <div className="flex justify-center">
              <Button
                href={""}
                text={"Show More"}
                outline
                outlineColor="border-primary"
                fontColor="text-primary"
                paddingX="px-16"
              />
            </div>
          </div>
        </section>
        <section className="bg-white py-8">
          <div className="flex flex-col gap-8 max-w-screen-xl mx-auto px-4">
            <h2 className="text-3xl font-semibold">What our Student Say</h2>
            <div className="flex justify-center md:justify-between mb-10 gap-4 flex-wrap items-center">
              <TestimonyCard />
              <TestimonyCard />
              <TestimonyCard />
            </div>
          </div>
        </section>
        {/* <section className="bg-white py-8">
          <div className="flex flex-col gap-8 max-w-screen-xl mx-auto">
            <h2 className="text-3xl font-semibold">Popular Courses</h2>
            <div className="flex gap-6 mb-10">
              <CourseCard />
              <CourseCard />
              <CourseCard />
              <CourseCard />
              <CourseCard />
            </div>
          </div>
        </section> */}
        <section className="explore-course-section bg-white">
          <div className="px-4  max-w-screen-xl mx-auto">
            <h2 className="text-3xl font-semibold">Explore Course</h2>
            <div className="flex gap-4 my-2">
              {streamsData?.streams?.data?.map((stream: any, index: any) => {
                return (
                  <Link
                    href={{
                      pathname: `/colleges/${stream.attributes.streamName.toLowerCase()}`,
                    }}
                    key={index}
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
                slides={[1, 2, 3, 4, 5, 6, 7, 8].map((item) => {
                  return (
                    <div key={item}>
                      <div className="border border-extra-light-text rounded-md  flex flex-col gap-2 w-max p-4 bg-slate-50 shadow-md">
                        <div className="bg-slate-200 px-4 py-1 w-max text-sm text-secondary-text">
                          Full Time
                        </div>
                        <div className="font-semibold text-lg">
                          B.Com General
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="flex justify-between w-52">
                            <div className="text-secondary-text">Duration</div>
                            <div>
                              <b>3 years</b>
                            </div>
                          </div>
                          <div className="flex justify-between w-52">
                            <div className="text-secondary-text">
                              Total Avg. Fee
                            </div>
                            <div>
                              <b>30K</b>
                            </div>
                          </div>
                          <div className="flex justify-between w-52">
                            <div className="text-secondary-text">Colleges</div>
                            <div>
                              <b>3002</b>
                            </div>
                          </div>
                        </div>
                        <Link href={"/"}>
                          <div className="border-t border-extra-light-text flex justify-between items-center py-1">
                            <span>Course Overview</span> <FaAngleRight />
                          </div>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              />
            </div>
          </div>
        </section>
        <section className="max-w-screen-xl mx-auto my-10 px-4">
          <div className="flex flex-col gap-6 ">
            <h3 className="text-3xl font-semibold">Exam News</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 grid-flow-row gap-x-7 gap-y-10">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => {
                return (
                  <div key={index} className="flex flex-col gap-4 ">
                    <div>
                      <Image
                        src={"/racing.png"}
                        alt=""
                        width={100}
                        height={100}
                        className="w-full min-w-36 h-44 rounded-lg"
                      />
                    </div>
                    <div className="text-2xl font-semibold text-primary-text">
                      News Title Lorem Ipsum Dolor Sit Amet
                    </div>
                    <div className="flex justify-between text-primary-text-light text-base pr-4">
                      <div>1 Hour Ago</div>
                      <div>CNN Indonesia</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <section>
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
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                <Image
                  src={"/study.svg"}
                  alt=""
                  width={100}
                  height={100}
                  className="w-full"
                />
              </div>
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
                        fontColor="text-primary-text-light"
                        outlineColor="border-primary-text-light"
                        paddingX="px-4"
                        paddingY="py-2"
                        text={"Bacholer's"}
                      />
                      <Button
                        outline
                        fontColor="text-primary-text-light"
                        outlineColor="border-primary-text-light"
                        paddingX="px-4"
                        paddingY="py-2"
                        text={"Master's"}
                      />
                      <Button
                        outline
                        fontColor="text-primary-text-light"
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
                        fontColor="text-primary-text-light"
                        outlineColor="border-primary-text-light"
                        paddingX="px-4"
                        paddingY="py-2"
                        text={"Grade 9"}
                      />
                      <Button
                        outline
                        fontColor="text-primary-text-light"
                        outlineColor="border-primary-text-light"
                        paddingX="px-4"
                        paddingY="py-2"
                        text={"Grade 10"}
                      />
                      <Button
                        outline
                        fontColor="text-primary-text-light"
                        outlineColor="border-primary-text-light"
                        paddingX="px-4"
                        paddingY="py-2"
                        text={"Grade 11"}
                      />
                      <Button
                        outline
                        fontColor="text-primary-text-light"
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
        <section className="bg-white py-8">
          <div className=" max-w-screen-xl mx-auto px-4">
            <h2 className="text-3xl font-semibold">
              Frequently Asked Questions
            </h2>
            <div className="py-6 flex flex-col gap-4 text-sm">
              <Accordian title="Which courses are offered at IIT Madras for the students?">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the standard dummy text ever
                since the 1500s, when an unknown printAccordian galley of type
                and scrambled it to make a type specimen book. It has survived
                not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged.
              </Accordian>
              <Accordian title="Which courses are offered at IIT Madras for the students?">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. It has survived
                not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged.
              </Accordian>
              <Accordian title="Which courses are offered at IIT Madras for the students?">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. It has survived
                not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged.
              </Accordian>
              <Accordian title="Which courses are offered at IIT Madras for the students?">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. It has survived
                not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged.
              </Accordian>
              <Accordian title="Which courses are offered at IIT Madras for the students?">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. It has survived
                not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged.
              </Accordian>
            </div>
          </div>
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
