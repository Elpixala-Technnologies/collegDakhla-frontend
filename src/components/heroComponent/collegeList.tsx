/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import Button from "../button/button";
import { FaRegStar, FaRegUser } from "react-icons/fa";
import { PiBooksLight } from "react-icons/pi";
import Feature from "../feature/feature";
import { useQuery } from "@apollo/client";
import { getStates } from "@/query/schema";
import { GetDefaultImage, getStrapiMedia } from "@/utils/api-helper";
// import StarRating from "../starRating/starRating";
import { FaImage, FaVideo } from "react-icons/fa6";
import Image from "next/image";
// import { IoShieldCheckmark } from "react-icons/io5";

export default function CollegeList(allColleges: any) {
  //query to get all states
  const {
    loading: statesLoader,
    error: statesError,
    data: statesData,
  } = useQuery(getStates);

  const collegeFee = parseInt(
    allColleges?.colleges?.attributes?.fees
      ? allColleges?.colleges?.attributes?.fees
      : 200000
  ).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {allColleges?.colleges?.length > 0 ? (
        <>
          {allColleges.colleges.map((college: any, index: any) => {
            const logoURL = college?.attributes?.collegeLogo?.data?.attributes
              ?.url
              ? getStrapiMedia(
                  college?.attributes?.collegeLogo?.data?.attributes?.url
                )
              : GetDefaultImage("logo");

            const bannerURL = college?.attributes?.banner?.data[0]
              ? getStrapiMedia(
                  college?.attributes?.banner?.data[0]?.attributes?.url
                )
              : GetDefaultImage("banner");

            return (
              <div key={index}>
                <div className="mb-2 p-2 flex flex-col md:flex-col gap-2 shadow-lg bg-white rounded-lg drop-shadow hover:drop-shadow-xl">
                  <div className="flex flex-1 flex-row">
                    <div className=" flex flex-1 flex-col gap-3">
                      <Link href={`/colleges/${college.id}`}>
                        <div className="flex flex-row">
                          <div className="flex flex-row items-center justify-center w-full">
                            <Image
                              src={bannerURL!}
                              alt="logo"
                              width={100}
                              height={100}
                              className="rounded-lg w-20 h-20 m-2 mb-4"
                            />

                            <h2 className="w-1/3 sm:text-2xl text-base  font-semibold">
                              {college?.attributes?.collegeName}
                            </h2>
                            <span className="text-3xl">{"-  "}</span>
                            <div className="w-full sm:text-xl text-base">
                              {" "}
                              {
                                college?.attributes?.city?.data?.attributes
                                  ?.name
                              }
                              ,
                              {
                                college?.attributes?.state?.data?.attributes
                                  ?.name
                              }{" "}
                            </div>
                          </div>
                        </div>
                      </Link>

                      {/* <div className="flex gap-3 items-center">
                        <div className="text-3xl text-primary">
                          <IoShieldCheckmark />
                        </div>
                        <div className="flex items-center gap-3 text-sm overflow-x-auto">
                          <div className="text-secondary-text text-nowrap">
                            <span className="text-primary font-semibold">
                              #11
                            </span>{" "}
                            out of <span className="font-medium">NIRF</span>
                          </div>
                          <div className="text-secondary-text text-nowrap">
                            <span className="text-primary font-semibold">
                              #11
                            </span>{" "}
                            out of <span className="font-medium">NIRF</span>
                          </div>
                          <div className="text-secondary-text text-nowrap">
                            <span className="text-primary font-semibold">
                              #11
                            </span>{" "}
                            out of <span className="font-medium">NIRF</span>
                          </div>
                          <div className="text-secondary-text text-nowrap">
                            <span className="text-primary font-semibold">
                              #11
                            </span>{" "}
                            out of <span className="font-medium">NIRF</span>
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <div className=" p-4 shadow-lg bg-white">
          <p className="text-2xl text-center text-gray-500">
            No data available
          </p>
        </div>
      )}
    </>
  );
}
