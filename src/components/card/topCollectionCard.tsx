import { GetDefaultImage, getStrapiMedia } from "@/utils/api-helper";
import Image from "next/image";
import { useQuery } from "@apollo/client";
import { getStates } from "@/query/schema";
import Link from "next/link";

export default function TopCollectionCard({ college,href }: any) {
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
        className="min-w-48 border border-gray-300 bg-amber-100 rounded-lg drop-shadow hover:drop-shadow-2xl flex flex-col justify-between"
        onClick={college?.collegeLink}
      >
        {/* <div className="flex gap-1 items-center w-full h-16 p-2"> */}
        <Image
          src={logoUrl!}
          alt={college?.collegeName}
          className="object-center w-full object-cover h-20"
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
            <Link
            href={href}>
            <button>
              know more
            </button></Link>
          </div>
        </div>
      </div>
    </>
  );
}
