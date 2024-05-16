/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { GetDefaultImage, getStrapiMedia } from "@/utils/api-helper";
import Image from "next/image";
export default function CollegeList(allColleges: any) {
  return (
    <div className=" overflow-y-auto max-h-60 hide-scrollbar">
      {allColleges?.colleges?.length > 0 ? (
        <>
          {allColleges.colleges.map((college: any, index: any) => {
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
