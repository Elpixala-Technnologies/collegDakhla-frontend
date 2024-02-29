import { GetDefaultImage, getStrapiMedia } from "@/utils/api-helper";
import Link from "next/link";
import Image from "next/image";
import { FaHeart, FaMedal } from "react-icons/fa6";
import Tag from "../tag/tags";
import { BiBadgeCheck } from "react-icons/bi";
import { BsFlag } from "react-icons/bs";
import StarRating from "../starRating/starRating";

export default function ExamCard() {
  return (
    <div className="flex flex-col items-stretch min-w-56 bg-white rounded-lg shadow-xl">
      <div className="relative rounded-t-lg">
        <img
          src={"/exam-banner.png"}
          alt={""}
          className="w-full h-28 object-cover rounded-t-lg"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-t-lg"></div>
        <div className="absolute inset-0 px-2 py-3 flex justify-between max-h-max items-center">
          <div className="bg-white rounded-full px-2 py-1 text-base text-primary flex gap-2 items-center">
            <FaMedal className="h-4 w-4" />
            <div className="text-sm">Featured</div>
          </div>
          <div className="rounded-full p-1 text-sm cursor-pointer text-white">
            <FaHeart />
          </div>
        </div>
      </div>
      <div className="relative flex flex-col">
        <div className="absolute left-2 -top-7 bg-white p-2 rounded">
          <Image
            src={"/exam-logo.png"}
            alt=""
            className="shadow-md rounded-sm "
            width={60}
            height={60}
          />
        </div>
        <div className="p-2 pt-4 flex-1 h-72 shadow flex flex-col gap-2">
          <div className=" flex justify-end">
            <span className="bg-primary-light text-sm px-2 py-1 rounded-full">
              Offline
            </span>
          </div>
          <Link href={`/college/${2}`}>
            <h4 className="text-primary  font-semibold">{"JEE Advance"}</h4>
          </Link>
          <div className="p-2 pt-4 flex-1 flex flex-col gap-2">
            <div>
              <h4 className="text-primary text-xl font-semibold my-2 px-2">
                {"JEE Advance"}
              </h4>
              <div className="flex flex-col text-sm tracking-tighter gap-2 px-2">
                <div className="flex justify-between">
                  <div className="">Participating Colleges</div>
                  <div className="font-semibold">54</div>
                </div>
                <div className="flex justify-between">
                  <div className="">Exam Date</div>
                  <div className="font-semibold">01 Feb, 2024</div>
                </div>
                <div className="flex justify-between">
                  <div className="">Exam Level</div>
                  <div className="font-semibold">National</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Link href="">
          <div className="w-full p-2 bg-primary rounded-b-lg text-center text-white text-sm">
            Application Process & Exam Info
          </div>
        </Link>
      </div>
    </div>
  );
}
