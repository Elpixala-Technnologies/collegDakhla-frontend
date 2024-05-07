
import { ReactNode } from "react";
import {
  FaBehance,
  FaDribbble,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa6";

import { FaAngleRight } from "react-icons/fa";
import ContainerWithTextBgImg from "../containerWithTextBGImg/containerWithTextBGImg";
import { FoodImage } from "@/Asset";
import Button from "../button/button";


export default function NewsSidebar({NewsData}: any) {
  console.log(NewsData , "NewsData")

  return (
    <div className="flex flex-col gap-6 w-72">
      <div className="w-full">
        <h6 className="text-xl font-semibold">Stay Connected</h6>
        <div className="w-full border-t border-t-primary-text my-4" />
        <div className="grid grid-cols-2 gap-4">
          <SocialButton
            width="w-full"
            backgroundColor="bg-[#4281FF]"
            textColor="text-white"
            fontSize="text-[10px]"
            count={15000}
            type="Followers"
            icon={<FaFacebookF color="white" fontSize="1.5em" />}
          />
          <SocialButton
            width="w-full"
            backgroundColor="bg-[#C23785]"
            textColor="text-white"
            fontSize="text-[10px]"
            count={15000}
            type="Followers"
            icon={<FaInstagram color="white" fontSize="1.5em" />}
          />
          <SocialButton
            width="w-full"
            backgroundColor="bg-[#EF5043]"
            textColor="text-white"
            fontSize="text-[10px]"
            count={15000}
            type="Subscribers"
            icon={<FaYoutube color="white" fontSize="1.5em" />}
          />
          <SocialButton
            width="w-full"
            backgroundColor="bg-[#42C0F5]"
            textColor="text-white"
            fontSize="text-[10px]"
            count={15000}
            type="Followers"
            icon={<FaTwitter color="white" fontSize="1.5em" />}
          />
          <SocialButton
            width="w-full"
            backgroundColor="bg-[#1B7BFD]"
            textColor="text-white"
            fontSize="text-[10px]"
            count={15000}
            type="Followers"
            icon={<FaBehance color="white" fontSize="1.5em" />}
          />
          <SocialButton
            width="w-full"
            backgroundColor="bg-[#F7679D]"
            textColor="text-white"
            fontSize="text-[10px]"
            count={15000}
            type="Followers"
            icon={<FaDribbble color="white" fontSize="1.5em" />}
          />
        </div>
      </div>
      <div className="w-full">
        <ContainerWithTextBgImg rounded="rounded-none" imagePath={FoodImage}>
          <div className="flex justify-center items-center w-full h-full">
            <div className="text-4xl font-semibold text-white">Aa</div>
          </div>
        </ContainerWithTextBgImg>
      </div>
      <div className="p-8 bg-[#DEDADA] flex flex-col justify-center items-center">
        <div className="text-lg font-semibold text-[#2D2D2D] mb-4">
          Get Latest Updates
        </div>
        <div className="w-full flex flex-col gap-2">
          <input
            type="text"
            placeholder="Your email address"
            className="text-center text-xs py-2 w-full"
          />
          <Button
            text="Subscribe"
            filled
            filledColor="bg-[#F65050]"
            rounded={false}
            align="text-center"
            fontSize="text-lg"
            fontWeight="font-bold"
            paddingX="px-4"
            paddingY="py-1"
          />
        </div>
      </div>
      <div className="w-full">
        <h6 className="text-xl font-semibold">Categories</h6>
        <div className="w-full border-t border-t-primary-text my-4" />
        <div className="flex flex-col gap-4">
          {NewsData?.categories?.data?.map((item:any) => {
            return (
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <div>
                    <FaAngleRight />
                  </div>
                  <div className="text-sm">{item?.attributes?.category_name}</div>
                </div>
                <div className="p-1 bg-orange-500 text-white text-xs">{item?.attributes?.news?.data?.length}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const SocialButton = ({
  icon,
  count,
  type = "Followers",
  backgroundColor = "bg-transparent",
  textColor = "text-black",
  fontSize = "text-base",
  fontWeight = "font-medium",
  width = "w-max",
  paddingX = "px-4",
  paddingY = "py-4",
}: {
  icon: ReactNode;
  count?: number;
  type?: string;
  backgroundColor?: string;
  textColor?: string;
  fontSize?: string;
  fontWeight?: string;
  width?: string;
  paddingX?: string;
  paddingY?: string;
}) => {
  return (
    <div
      className={`flex gap-2 ${backgroundColor} items-center p-4 ${textColor} ${width} ${paddingX} ${paddingY}`}
    >
      <div>{icon}</div>
      <div className={`${fontSize} ${fontWeight} flex-1`}>
        <div>{count}</div>
        <div>{type}</div>
      </div>
    </div>
  );
};
