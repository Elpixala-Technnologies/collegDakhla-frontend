"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaAngleDown, FaAngleUp, FaRegQuestionCircle } from "react-icons/fa";
import Tooltip from "../tooltip/tooltip";
import { RiSearchLine } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { getStreams } from "@/query/schema";
import { useQuery } from "@apollo/client";
import { TfiAngleDown } from "react-icons/tfi";
import { FaRegCircleUser } from "react-icons/fa6";

export default function Header() {
  const [Path, setPath] = useState("");
  const currentPath = usePathname();
  const [ShowSearch, setShowSearch] = useState(false);
  const [ShowOptions, setShowOptions] = useState(false);

  const handleSearch = () => {
    setShowSearch(!ShowSearch);
  };

  const handleShowOptions = () => {
    setShowOptions(!ShowOptions);
  };

  useEffect(() => {
    setPath(currentPath.split("/")[1]);
  }, [currentPath]);

  useEffect(() => {}, []);

  return (
    <nav className=" relative z-50  bg-gradient-to-b from-[#000]  to-[#1a1a1a]">
      <div className="h-24 flex gap-4 items-center mx-auto px-4 max-w-screen-xl justify-between">
        <div className="logo flex-none w-24">
          <Link href="/">
            <Image src="/logo.png" alt="" width={100} height={100} />
          </Link>
        </div>
        <div className="flex gap-8 flex-1 items-center"></div>
        <div className="flex gap-8 items-center text-white">
          <div className="hidden sm:block">
            <div className="flex gap-8">
              <div className="flex gap-1 items-center">
                <Link href={"/colleges"}>College</Link>
                <TfiAngleDown />
              </div>

              <div className="flex gap-1 items-center">
                Exam
                <TfiAngleDown />
              </div>

              <div className="flex gap-1 items-center">
                Courses
                <TfiAngleDown />
              </div>

              <div className="flex gap-1 items-center">
                Career
                <TfiAngleDown />
              </div>

              <div className="flex gap-1 items-center">
                News
                <TfiAngleDown />
              </div>

              <div className="flex gap-1 items-center">
                More
                <TfiAngleDown />
              </div>
            </div>
          </div>
          <LoginQASection />
        </div>
        <div className="hidden max-sm:block">
          <div className="flex gap-4 ">
            <div className="" onClick={handleSearch}>
              <RiSearchLine />
            </div>
            <div onClick={handleShowOptions}>
              <GiHamburgerMenu />
            </div>
          </div>
        </div>
      </div>

      {ShowOptions ? (
        <>
          <NavOption></NavOption>
          <LoginQASection />
        </>
      ) : (
        <></>
      )}
    </nav>
  );
}

const NavOption = () => {
  // get all streams
  const {
    loading,
    error: streamsError,
    data: streamsData,
  } = useQuery(getStreams);

  return (
    <>
      <div className="flex flex-col gap-2 w-full text-primary-text p-4 sm:p-0 sm:w-6/12 sm:min-w-96">
        {streamsData?.streams?.data?.map((stream: any, index: any) => {
          return (
            <div key={index}>
              <Link
                href={{
                  pathname: `/colleges/${stream.attributes.streamName.toLowerCase()}`,
                }}
                className="hover:text-primary"
              >
                Top {stream.attributes.streamName} College
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

const LoginQASection = () => {
  return (
    <>
      <div className="flex gap-4 max-sm:hidden">
        <div>
          <Link href="/" className="text-2xl hover:text-primary">
            <FaRegCircleUser />
          </Link>
        </div>
        <div>
          <Link href={"/"} className="text-2xl hover:text-primary">
            <FaRegQuestionCircle />
          </Link>
        </div>
      </div>
    </>
  );
};
