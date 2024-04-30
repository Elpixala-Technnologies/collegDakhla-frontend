/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
// import Button from "../button/button";
// import { FaRegStar, FaRegUser } from "react-icons/fa";
// import { PiBooksLight } from "react-icons/pi";
// import Feature from "../feature/feature";
// import { useQuery } from "@apollo/client";
// import { getStates } from "@/query/schema";
import { GetDefaultImage, getStrapiMedia } from "@/utils/api-helper";
// import StarRating from "../starRating/starRating";
// import { FaImage, FaVideo } from "react-icons/fa6";
import Image from "next/image";
// import { IoShieldCheckmark } from "react-icons/io5";

export default function CollegeList(allColleges: any) {
  //query to get all states
  // const {
  //   loading: statesLoader,
  //   error: statesError,
  //   data: statesData,
  // } = useQuery(getStates);

  // const collegeFee = parseInt(
  //   allColleges?.colleges?.attributes?.fees
  //     ? allColleges?.colleges?.attributes?.fees
  //     : 200000
  // ).toLocaleString("en-IN", {
  //   style: "currency",
  //   currency: "INR",
  //   minimumFractionDigits: 0,
  //   maximumFractionDigits: 0,
  // });

  // const handleClick = () => {
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // };

  return (
    <div className=" overflow-y-auto max-h-60 hide-scrollbar">
      {allColleges?.colleges?.length > 0 ? (
        <>
          {allColleges.colleges.map((college: any, index: any) => {
            // const logoURL = college?.attributes?.collegeLogo?.data?.attributes
            //   ?.url
            //   ? getStrapiMedia(
            //       college?.attributes?.collegeLogo?.data?.attributes?.url
            //     )
            //   : GetDefaultImage("logo");

            const bannerURL = college?.attributes?.banner?.data[0]
              ? getStrapiMedia(
                  college?.attributes?.banner?.data[0]?.attributes?.url
                )
              : GetDefaultImage("banner");

            return (
              <div key={index}>
                <div className="flex flex-col md:flex-col bg-white">
                  <div className="flex flex-1 flex-row">
                    <div className=" flex flex-1 flex-col gap-3">
                      <Link href={`/colleges/${college.id}`}>
                        <div className="flex flex-row">
                          <div className="flex flex-row items-center w-full">
                            <Image
                              src={bannerURL!}
                              alt="logo"
                              width={100}
                              height={100}
                              className="rounded-lg w-5 h-5 m-2 mb-4"
                            />

                            <h2 className="sm:text-lg text-base font-semibold">
                              {college?.attributes?.collegeName}
                            </h2>
                            <span className="text-3xl">{"-"}</span>
                            <div className="sm:text-xl text-base">
                              {" "}
                              {college?.attributes?.city?.data?.attributes
                                ?.name && (
                                <span>
                                  {
                                    college?.attributes?.city?.data?.attributes
                                      ?.name
                                  }
                                  ,
                                </span>
                              )}
                              {
                                college?.attributes?.state?.data?.attributes
                                  ?.name
                              }{" "}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      ) : (
          <p className="text-2xl text-center text-gray-500 my-5">
            No data available
          </p>
      )}
    </div>
  );
}
