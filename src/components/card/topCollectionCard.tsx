import { GetDefaultImage, getStrapiMedia } from "@/utils/api-helper";
import Image from "next/image";

export default function TopCollectionCard({ college }: any) {
  const logoUrl = college?.collegeLogo?.data?.attributes?.url
    ? getStrapiMedia(college?.collegeLogo?.data?.attributes?.url)
    : GetDefaultImage("logo");
  return (
    <>
      <div className="min-w-48 border border-gray-300 rounded-lg drop-shadow hover:drop-shadow-2xl flex flex-col justify-between">
        <div className="flex gap-1 items-center w-full h-16 p-2">
          <Image
            src={logoUrl!}
            alt={college?.collegeName}
            className="object-center"
            height={80}
            width={60}
          />
        </div>
        <div className="p-2">
          <div className="font-bold sm:text-base text-xs">{college?.collegeName}</div>
          <div>
            <ul className="list-disc flex flex-col  items-start justify-start flex-wrap gap-x-4 text-xs lg:text-sm px-4 lg:leading-tight ">
              <li className="opacity-50">Excellent</li>
              <li className=" opacity-50">2.3k reviews</li>
              <li className="opacity-50">5.8 km from nearest dorm</li>
            </ul>
            <h3 className="text-sm lg:text-md ">
              Annual fees: <b>&#8377;</b>
            </h3>
            <h3 className="text-sm sm:text-md">
              University type: <b> </b>
            </h3>
          </div>
        </div>
      </div>
    </>
  );
}
