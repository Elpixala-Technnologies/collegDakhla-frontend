import { GetDefaultImage, getStrapiMedia } from "@/utils/api-helper";
import Image from "next/image";
import { useQuery } from "@apollo/client";
import { getStates } from "@/query/schema";
import Link from "next/link";

export default function TopCollectionCard({ college, href }: any) {
  const logoUrl = college?.collegeLogo?.data?.attributes?.url
    ? getStrapiMedia(college?.collegeLogo?.data?.attributes?.url)
    : GetDefaultImage("logo");
  const bannerURL = college?.banner?.data[0]
    ? getStrapiMedia(college?.banner?.data[0]?.attributes?.url)
    : GetDefaultImage("banner");
  const {
    loading: statesLoader,
    error: statesError,
    data: statesData,
  } = useQuery(getStates);

  return (
    <>
      <div
        className="min-w-72 h-[360px]  border border-gray-300 rounded-lg drop-shadow bg-gray-50  flex flex-col gap-2 relative"
        onClick={college?.collegeLink}
      >
        {/* <div className="flex gap-1 items-center w-full h-16 p-2"> */}
        <Image
          src={bannerURL!}
          alt={college?.collegeName}
          className="object-center w-full object-fill h-48 min-h-32 rounded-lg drop-shadow-md"
          height={500}
          width={500}
        />
        <Image
          src={logoUrl!}
          alt={college?.collegeName}
          className="object-center w-12 object-cover h-12 p-1 rounded-lg absolute top-2 ml-1 drop-shadow-lg"
          height={100}
          width={100}
        />
        {/* </div> */}
        <div className="flex flex-col justify-between h-full">
          <div className="p-2 ">
            <div className="font-bold sm:text-lg sm:leading-tight text-xs line-clamp-1">
              {college?.collegeName}
            </div>
            <h3 className="text-sm sm:text-md font-medium">
              {college?.city?.data?.attributes?.name}
            </h3>
            <div className="flex flex-col">
              <ul className="list-disc flex flex-row  items-start justify-start flex-wrap gap-x-6 text-xs lg:text-sm px-6 lg:leading-tight my-1">
                <li className="opacity-50">Excellent</li>
                <li className=" opacity-50">2.3k reviews</li>
                <li className="opacity-50">5.8 km from nearest dorm</li>
              </ul>

              <h3 className="text-sm sm:text-md font-normal">
                University type:{" "}
                <span className="text-gray-900 font-medium">
                  {college?.college_type?.data?.attributes?.type}{" "}
                </span>
              </h3>
              <h3 className="text-sm sm:text-md font-normal mt-0.5">
                Approved by:{" "}
                {college?.approvedBy?.data[0]?.attributes?.name && 
                <span className="text-gray-900 font-medium bg-blue-200 px-2 py-1 rounded-full ">
                  {college?.approvedBy?.data[0]?.attributes?.name}{" "}
                </span>
                }
              </h3>
            </div>
          </div>
          <Link href={href}>
            <div className="mb-6 px-3 flex flex-row w-full justify-between">
              <span className="relative px-3.5 py-2 m-[10px] overflow-hidden font-medium text-gray-600 bg-gray-100 border border-gray-100 rounded-lg shadow-inner drop-shadow-lg drop-shadow-slate-100 group">
                <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
                <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
                <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-orange-500 opacity-0 group-hover:opacity-100"></span>
                <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease whitespace-nowrap">
                  View Details
                </span>
              </span>

              <a
                href={href}
                className="rounded relative inline-flex group items-center justify-center px-3.5 py-2 m-[10px] cursor-pointer active:border-orange-600 active:shadow-none shadow-lg bg-gradient-to-tr from-orange-500 to-orange-500 border-orange-700 text-white"
              >
                <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-24 opacity-10"></span>
                <span className="relative whitespace-nowrap">Apply Now</span>
              </a>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
