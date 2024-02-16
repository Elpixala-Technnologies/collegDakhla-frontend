"use client";
import Image from "next/image";
import Link from "next/link";
import TopCollectionCard from "@/components/card/topCollectionCard";
import HeroSection from "@/components/heroComponent/heroComponent";
import { MdOutlineEngineering } from "react-icons/md";
import NotificationCard from "@/components/card/notificationCar";
import CarouselSideBtn from "@/components/carousel/carousel-side-button";
import { FaAngleRight } from "react-icons/fa6";
export default function Home() {
  let streams = [
    {
      name: "Delhi",
      img: <MdOutlineEngineering size={36} />,
    },
    {
      name: "Mumbai",
      img: <MdOutlineEngineering size={36} />,
    },
    {
      name: "Jaipur",
      img: <MdOutlineEngineering size={36} />,
    },
    {
      name: "Chennai",
      img: <MdOutlineEngineering size={36} />,
    },
    {
      name: "Kashmir",
      img: <MdOutlineEngineering size={36} />,
    },
    {
      name: "Kanpur",
      img: <MdOutlineEngineering size={36} />,
    },
    {
      name: "Varansi",
      img: <MdOutlineEngineering size={36} />,
    },
    {
      name: "Noida",
      img: <MdOutlineEngineering size={36} />,
    },
    {
      name: "Varansi",
      img: <MdOutlineEngineering size={36} />,
    },
    {
      name: "Noida",
      img: <MdOutlineEngineering size={36} />,
    },
    {
      name: "Jaipur",
      img: <MdOutlineEngineering size={36} />,
    },
    {
      name: "Chennai",
      img: <MdOutlineEngineering size={36} />,
    },
    {
      name: "Kashmir",
      img: <MdOutlineEngineering size={36} />,
    },
    {
      name: "Kanpur",
      img: <MdOutlineEngineering size={36} />,
    },
    {
      name: "Varansi",
      img: <MdOutlineEngineering size={36} />,
    },
    {
      name: "Noida",
      img: <MdOutlineEngineering size={36} />,
    },
    {
      name: "Varansi",
      img: <MdOutlineEngineering size={36} />,
    },
    {
      name: "Noida",
      img: <MdOutlineEngineering size={36} />,
    },
  ];
  return (
    <>
      <div className="">
        <section>
          <HeroSection />
        </section>
        <section className="my-12 max-w-screen-xl mx-auto max-w-screen-2xl mx-auto">
          <div className="flex items-center justify-center w-4/5 mx-auto mb-4">
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
        </section>
        <section className="my-8 px-4 max-w-screen-xl mx-auto">
          <div className="flex flex-col gap-8 max-w-screen-xl mx-auto">
            <h2 className="text-3xl font-semibold">Browse by Streams</h2>
            <div className="flex flex-wrap gap-8">
              {streams.map((stream, index) => {
                return (
                  <div
                    key={index}
                    className=" w-32 h-32 p-8 bg-primary-light flex flex-col items-center justify-center gap-2 hover:bg-primary hover:text-white"
                  >
                    <div>{stream.img}</div>
                    <div>{stream.name}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <section className="max-w-screen-xl mx-auto">
          <div className="p-4">
            <h2 className="text-3xl font-semibold">Explore Course</h2>
            <div className="flex gap-4 my-2">
              <div className="border border-primary-light rounded-full py-2 px-4 bg-white">
                MBA
              </div>
              <div className="border border-primary-light rounded-full py-2 px-4 bg-white">
                BBA
              </div>
              <div className="border border-primary-light rounded-full py-2 px-4 bg-white">
                B.Tech
              </div>
              <div className="border border-primary-light rounded-full py-2 px-4 bg-white">
                B.Sc
              </div>
            </div>
            <div>
              <CarouselSideBtn
                showPagination={false}
                slidesDesktop={5}
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
        <section className="max-w-screen-xl mx-auto">
          <div className="p-4">
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
          </div>
        </section>
        <section className="max-w-screen-xl mx-auto">
          <div className="flex flex-col gap-2 mx-auto px-4">
            <h2 className="text-3xl font-semibold overflow-hidden">
              Latest Notification
            </h2>
            <div>
              <CarouselSideBtn
                showPagination={false}
                slidesDesktop={4}
                slides={[1, 2, 3, 4, 5, 6, 7].map((item) => {
                  return (
                    <div key={item} className="flex w-max">
                      <NotificationCard />
                    </div>
                  );
                })}
              />
            </div>
          </div>
        </section>
        <section className="max-w-screen-xl p-4 mx-auto">
          <div className="p-4 my-4">
            <h2 className="text-3xl font-semibold  my-2">
              Top Colleges/University
            </h2>
            <div>
              <CarouselSideBtn
                showPagination={false}
                slidesDesktop={4}
                slides={[1, 2, 3, 4, 5, 6, 7, 8].map((item) => {
                  return (
                    <div key={item}>
                      <div className="flex flex-col items-stretch w-80 bg-white rounded-lg shadow-lg">
                        <div className="relative rounded-t-lg">
                          <Image
                            height={100}
                            width={100}
                            src={
                              "https://images.collegedunia.com/public/college_data/images/appImage/1509430807cover.jpg?h=300&w=250&mode=stretch"
                            }
                            alt={""}
                            className="w-full h-36 object-cover rounded-t-lg"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-t-lg"></div>
                          <div className="absolute inset-0 p-2 flex justify-end max-h-max items-center">
                            <div className="bg-slate-300 rounded-full py-[2px] px-1 text-sm cursor-pointer">
                              {/* <FaRegHeart /> */}
                              9/10
                            </div>
                          </div>
                          <div className="absolute left-4 bottom-7">
                            <div className="flex gap-2">
                              <Image
                                src={
                                  "https://images.shiksha.com/mediadata/images/1605086820phpSFQlAR_s.jpg"
                                }
                                className="shadow-md rounded-sm h-14 w-14"
                                width={100}
                                height={100}
                                alt=""
                              />
                              <div>
                                <div className="text-white text-lg font-semibold">
                                  IIT Madras - Indian Institute of Technologu
                                </div>
                                <div className="text-sm text-slate-50">
                                  Chennai, Tamil Nadu, AICTE
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="relative flex flex-col p-4">
                          <div className="flex-1 pb-2">
                            <div className="flex justify-between font-semibold">
                              <span className="">B.Tech/BE</span>
                              <span className="">8.6/10</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span>2Lac First year fees</span>
                              <span>288 review</span>
                            </div>
                          </div>
                          <div className="border-t border-t-secondary-text">
                            <Link href={"/"}>
                              <div className="flex justify-between font-semibold text-sm py-[6px] text-secondary-text items-center">
                                <div>View All Courses and fees</div>
                                <div>
                                  <FaAngleRight />
                                </div>
                              </div>
                            </Link>
                          </div>
                          <div className="border-t border-t-secondary-text">
                            <Link href={"/"}>
                              <div className="flex justify-between font-semibold text-sm py-[6px] text-secondary-text items-center">
                                <div>Download Brochure</div>
                                <div>
                                  <FaAngleRight />
                                </div>
                              </div>
                            </Link>
                          </div>
                          <div className="border-t border-t-secondary-text">
                            <Link href={"/"}>
                              <div className="flex justify-between font-semibold text-sm py-[6px] text-secondary-text items-center">
                                <div>Compare</div>
                                <div>
                                  <FaAngleRight />
                                </div>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              />
            </div>
            <div>
              <CarouselSideBtn
                showPagination={false}
                slidesDesktop={4}
                slides={[1, 2, 3, 4, 5, 6, 7, 8].map((item) => {
                  return (
                    <div key={item}>
                      <div className="flex flex-col items-stretch w-80 bg-white rounded-lg shadow-lg">
                        <div className="relative rounded-t-lg">
                          <Image
                            height={100}
                            width={100}
                            src={
                              "https://images.collegedunia.com/public/college_data/images/appImage/1509430807cover.jpg?h=300&w=250&mode=stretch"
                            }
                            alt={""}
                            className="w-full h-36 object-cover rounded-t-lg"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-t-lg"></div>
                          <div className="absolute inset-0 p-2 flex justify-end max-h-max items-center">
                            <div className="bg-slate-300 rounded-full py-[2px] px-1 text-sm cursor-pointer">
                              {/* <FaRegHeart /> */}
                              9/10
                            </div>
                          </div>
                          <div className="absolute left-4 bottom-7">
                            <div className="flex gap-2">
                              <Image
                                src={
                                  "https://images.shiksha.com/mediadata/images/1605086820phpSFQlAR_s.jpg"
                                }
                                className="shadow-md rounded-sm h-14 w-14"
                                width={100}
                                height={100}
                                alt=""
                              />
                              <div>
                                <div className="text-white text-lg font-semibold">
                                  IIT Madras - Indian Institute of Technologu
                                </div>
                                <div className="text-sm text-slate-50">
                                  Chennai, Tamil Nadu, AICTE
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="relative flex flex-col p-4">
                          <div className="flex-1 pb-2">
                            <div className="flex justify-between font-semibold">
                              <span className="">B.Tech/BE</span>
                              <span className="">8.6/10</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span>2Lac First year fees</span>
                              <span>288 review</span>
                            </div>
                          </div>
                          <div className="border-t border-t-secondary-text">
                            <Link href={"/"}>
                              <div className="flex justify-between font-semibold text-sm py-[6px] text-secondary-text items-center">
                                <div>View All Courses and fees</div>
                                <div>
                                  <FaAngleRight />
                                </div>
                              </div>
                            </Link>
                          </div>
                          <div className="border-t border-t-secondary-text">
                            <Link href={"/"}>
                              <div className="flex justify-between font-semibold text-sm py-[6px] text-secondary-text items-center">
                                <div>Download Brochure</div>
                                <div>
                                  <FaAngleRight />
                                </div>
                              </div>
                            </Link>
                          </div>
                          <div className="border-t border-t-secondary-text">
                            <Link href={"/"}>
                              <div className="flex justify-between font-semibold text-sm py-[6px] text-secondary-text items-center">
                                <div>Compare</div>
                                <div>
                                  <FaAngleRight />
                                </div>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              />
            </div>
          </div>
        </section>
        <section className="max-w-screen-xl mx-auto">
          <div className="p-4 my-4">
            <h2 className="text-lg font-bold my-2">Top 100 Colleges</h2>
            <div className="flex gap-4 my-2">
              <div className="border border-primary-light rounded-full py-2 px-4 bg-white">
                MBA
              </div>
              <div className="border border-primary-light rounded-full py-2 px-4 bg-white">
                BBA
              </div>
              <div className="border border-primary-light rounded-full py-2 px-4 bg-white">
                B.Tech
              </div>
              <div className="border border-primary-light rounded-full py-2 px-4 bg-white">
                B.Sc
              </div>
              <div className="border border-primary-light rounded-full py-2 px-4 bg-white">
                BA
              </div>
              <div className="border border-primary-light rounded-full py-2 px-4 bg-white">
                MBA
              </div>
              <div className="border border-primary-light rounded-full py-2 px-4 bg-white">
                BBA
              </div>
              <div className="border border-primary-light rounded-full py-2 px-4 bg-white">
                B.Tech
              </div>
              <div className="border border-primary-light rounded-full py-2 px-4 bg-white">
                B.Sc
              </div>
              <div className="border border-primary-light rounded-full py-2 px-4 bg-white">
                BA
              </div>
            </div>
            <div className="">
              <table className="min-w-full bg-white border border-gray-300 shadow-sm rounded-md overflow-hidden">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">
                      Rank
                    </th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">
                      College
                    </th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">
                      Ranking
                    </th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">
                      Cutoff
                    </th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">
                      Application Deadline
                    </th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">
                      Fees
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="px-6 py-4 whitespace-nowrap">1</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-4">
                        <div>
                          <Image
                            src={"/Gate_Logo.webp"}
                            alt=""
                            width={60}
                            height={60}
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="max-w-56 text-wrap font-semibold">
                            IIT Madras - Indian Institute of Technology - [IITM]
                          </div>
                          <div className="flex gap-2 items-center">
                            <div className="text-sm">Chennai, Tamil Nadu</div>
                            <div className="border-l border-l-primary-text h-4/5"></div>
                            <div className="">9/10</div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <Image
                          src={"/nirh-logo.png"}
                          alt=""
                          width={20}
                          height={20}
                        />
                        <div>
                          <span className="font-bold text-lg">#1</span> out of
                          312 in India 2023
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      CAT 2023 Cut off 85
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">29-June</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-semibold">$10,000</div>
                      <div className="text-sm">Total fees</div>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-6 py-4 whitespace-nowrap">1</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-4">
                        <div>
                          <Image
                            src={"/Gate_Logo.webp"}
                            alt=""
                            width={60}
                            height={60}
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="max-w-56 text-wrap font-semibold">
                            IIT Madras - Indian Institute of Technology - [IITM]
                          </div>
                          <div className="flex gap-2 items-center">
                            <div className="text-sm">Chennai, Tamil Nadu</div>
                            <div className="border-l border-l-primary-text h-4/5"></div>
                            <div className="">9/10</div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <Image
                          src={"/nirh-logo.png"}
                          alt=""
                          width={20}
                          height={20}
                        />
                        <div>
                          <span className="font-bold text-lg">#1</span> out of
                          312 in India 2023
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      CAT 2023 Cut off 85
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">29-June</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-semibold">$10,000</div>
                      <div className="text-sm">Total fees</div>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-6 py-4 whitespace-nowrap">1</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-4">
                        <div>
                          <Image
                            src={"/Gate_Logo.webp"}
                            alt=""
                            width={60}
                            height={60}
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="max-w-56 text-wrap font-semibold">
                            IIT Madras - Indian Institute of Technology - [IITM]
                          </div>
                          <div className="flex gap-2 items-center">
                            <div className="text-sm">Chennai, Tamil Nadu</div>
                            <div className="border-l border-l-primary-text h-4/5"></div>
                            <div className="">9/10</div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <Image
                          src={"/nirh-logo.png"}
                          alt=""
                          width={20}
                          height={20}
                        />
                        <div>
                          <span className="font-bold text-lg">#1</span> out of
                          312 in India 2023
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      CAT 2023 Cut off 85
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">29-June</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-semibold">$10,000</div>
                      <div className="text-sm">Total fees</div>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-6 py-4 whitespace-nowrap">1</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-4">
                        <div>
                          <Image
                            src={"/Gate_Logo.webp"}
                            alt=""
                            width={60}
                            height={60}
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="max-w-56 text-wrap font-semibold">
                            IIT Madras - Indian Institute of Technology - [IITM]
                          </div>
                          <div className="flex gap-2 items-center">
                            <div className="text-sm">Chennai, Tamil Nadu</div>
                            <div className="border-l border-l-primary-text h-4/5"></div>
                            <div className="">9/10</div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <Image
                          src={"/nirh-logo.png"}
                          alt=""
                          width={20}
                          height={20}
                        />
                        <div>
                          <span className="font-bold text-lg">#1</span> out of
                          312 in India 2023
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      CAT 2023 Cut off 85
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">29-June</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-semibold">$10,000</div>
                      <div className="text-sm">Total fees</div>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-6 py-4 whitespace-nowrap">1</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-4">
                        <div>
                          <Image
                            src={"/Gate_Logo.webp"}
                            alt=""
                            width={60}
                            height={60}
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="max-w-56 text-wrap font-semibold">
                            IIT Madras - Indian Institute of Technology - [IITM]
                          </div>
                          <div className="flex gap-2 items-center">
                            <div className="text-sm">Chennai, Tamil Nadu</div>
                            <div className="border-l border-l-primary-text h-4/5"></div>
                            <div className="">9/10</div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <Image
                          src={"/nirh-logo.png"}
                          alt=""
                          width={20}
                          height={20}
                        />
                        <div>
                          <span className="font-bold text-lg">#1</span> out of
                          312 in India 2023
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      CAT 2023 Cut off 85
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">29-June</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-semibold">$10,000</div>
                      <div className="text-sm">Total fees</div>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-6 py-4 whitespace-nowrap">1</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-4">
                        <div>
                          <Image
                            src={"/Gate_Logo.webp"}
                            alt=""
                            width={60}
                            height={60}
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="max-w-56 text-wrap font-semibold">
                            IIT Madras - Indian Institute of Technology - [IITM]
                          </div>
                          <div className="flex gap-2 items-center">
                            <div className="text-sm">Chennai, Tamil Nadu</div>
                            <div className="border-l border-l-primary-text h-4/5"></div>
                            <div className="">9/10</div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <Image
                          src={"/nirh-logo.png"}
                          alt=""
                          width={20}
                          height={20}
                        />
                        <div>
                          <span className="font-bold text-lg">#1</span> out of
                          312 in India 2023
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      CAT 2023 Cut off 85
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">29-June</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-semibold">$10,000</div>
                      <div className="text-sm">Total fees</div>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-6 py-4 whitespace-nowrap">1</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-4">
                        <div>
                          <Image
                            src={"/Gate_Logo.webp"}
                            alt=""
                            width={60}
                            height={60}
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="max-w-56 text-wrap font-semibold">
                            IIT Madras - Indian Institute of Technology - [IITM]
                          </div>
                          <div className="flex gap-2 items-center">
                            <div className="text-sm">Chennai, Tamil Nadu</div>
                            <div className="border-l border-l-primary-text h-4/5"></div>
                            <div className="">9/10</div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <Image
                          src={"/nirh-logo.png"}
                          alt=""
                          width={20}
                          height={20}
                        />
                        <div>
                          <span className="font-bold text-lg">#1</span> out of
                          312 in India 2023
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      CAT 2023 Cut off 85
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">29-June</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-semibold">$10,000</div>
                      <div className="text-sm">Total fees</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
