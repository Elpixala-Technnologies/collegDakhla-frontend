import { GetDefaultImage, getStrapiMedia } from "@/utils/api-helper";
import Image from "next/image";
import { useQuery } from "@apollo/client";
import { getStates } from "@/query/schema";
import Link from "next/link";

export default function TopCollectionCard({ college, href }: any) {
  const logoUrl = college?.collegeLogo?.data?.attributes?.url
    ? getStrapiMedia(college?.collegeLogo?.data?.attributes?.url)
    : GetDefaultImage("banner");

  const {
    loading: statesLoader,
    error: statesError,
    data: statesData,
  } = useQuery(getStates);

  return (
    <>
      <div
        className="min-w-48 h-96 border border-gray-300 bg-gray-50 rounded-lg drop-shadow hover:drop-shadow-2xl flex flex-col justify-start gap-4"
        onClick={college?.collegeLink}
      >
        {/* <div className="flex gap-1 items-center w-full h-16 p-2"> */}
        <Image
          src={logoUrl!}
          alt={college?.collegeName}
          className="object-center w-full object-cover h-40 p-1 rounded-lg"
          height={500}
          width={500}
        />
        {/* </div> */}
        <div className="p-2">
          <div className="font-bold sm:text-base text-xs line-clamp-1">
            {college?.collegeName}
          </div>
          <div>
            <ul className="list-disc flex flex-col  items-start justify-start flex-wrap gap-x-4 text-xs lg:text-sm px-4 lg:leading-tight ">
              <li className="opacity-50">Excellent</li>
              <li className=" opacity-50">2.3k reviews</li>
              <li className="opacity-50">5.8 km from nearest dorm</li>
            </ul>
            <h3 className="text-sm sm:text-md">
              City Name: <b>{college?.city?.data?.attributes?.name} </b>
            </h3>
            <h3 className="text-sm sm:text-md">
              University type:{" "}
              <b>{college?.college_type?.data?.attributes?.type} </b>
            </h3>
          </div>
        </div>
        <Link href={href}>
          <div className="">
            <span className="relative px-5 py-3 overflow-hidden font-medium text-gray-600 bg-gray-100 border border-gray-100 rounded-lg shadow-inner drop-shadow-lg drop-shadow-slate-100 group m-2 ">
              <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
              <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
              <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
              <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
              <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
              <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">
                View Details
              </span>
            </span>
          </div>
        </Link>
      </div>
    </>
  );
}
