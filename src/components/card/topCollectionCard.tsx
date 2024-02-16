import { Card } from "@mui/material";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import Image from "next/image";

export default function TopCollectionCard() {
  let college = {
    id: "1",
    name: "IIT Madras",
    location: "Chennai",
    state: "Tamil Nadu",
    affiliate: "AICTE",
    fee: "200000",
    rating: "8.6",
    image:
      "https://images.collegedunia.com/public/college_data/images/appImage/1509430807cover.jpg?h=300&w=250&mode=stretch",
    logo: "https://images.shiksha.com/mediadata/images/1605086820phpSFQlAR_s.jpg",
    type: "Public",
  };
  return (
    <>
      <div className="min-w-48">
        <div className="relative rounded-lg">
          <Image
            src={college.image}
            alt={college.name}
            className="w-full h-36 object-cover rounded-lg"
            width={100}
            height={200}
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-t-lg"></div>
          <div className="absolute inset-0 p-2 h-36 flex flex-col justify-end max-h-max  text-white">
            <div>Best College in India</div>
            <div className="flex gap-[0] items-center relative">
              <div className="shadow">
                <Image
                  src={college.logo}
                  alt={college.name}
                  className="rounded-full"
                  height={30}
                  width={30}
                />
              </div>
              <div className="absolute left-4 shadow">
                <Image
                  src={college.logo}
                  alt={college.name}
                  className="rounded-full"
                  height={30}
                  width={30}
                />
              </div>
              <div className="absolute left-8 shadow">
                <Image
                  src={college.logo}
                  alt={college.name}
                  className="rounded-full"
                  height={30}
                  width={30}
                />
              </div>
              200+ colleges
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
