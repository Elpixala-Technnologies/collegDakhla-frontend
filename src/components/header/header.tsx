"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import { FaAngleDown, FaAngleUp, FaRegQuestionCircle } from "react-icons/fa";
import Tooltip from "../tooltip/tooltip";
import { RiSearchLine } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { getStreams } from "@/query/schema";
import { useQuery } from "@apollo/client";
import { TfiAngleDown } from "react-icons/tfi";
import { FaRegCircleUser } from "react-icons/fa6";
import Accordion from "../accordian/accordian";

export default function Header() {
  const [Path, setPath] = useState("");
  const currentPath = usePathname();
  const [ShowSearch, setShowSearch] = useState(false);
  const [ShowOptions, setShowOptions] = useState(false);
  const [Options, setOptions] = useState<ReactNode>(CollegeOption);
  const [CurrentOpenOption, setCurrentOpenOption] = useState("");

  const handleSearch = () => {
    setShowSearch(!ShowSearch);
  };

  const handleShowOptions = (option: string) => {
    if (CurrentOpenOption === option) {
      setShowOptions(false);
      setCurrentOpenOption("");
      return false;
    }
    setShowOptions(true);
    setCurrentOpenOption(option);
    switch (option) {
      case "college":
        setOptions(CollegeOption);
        break;
      case "exam":
        setOptions(ExamOption);
        break;
      case "hamburger":
        setOptions(MobileOption);
    }
  };

  useEffect(() => {
    setPath(currentPath.split("/")[1]);
  }, [currentPath]);

  useEffect(() => {
    if (ShowOptions) {
      setTimeout(() => {
        setShowOptions(false);
        setCurrentOpenOption("");
      }, 8000);
    }
  }, [ShowOptions]);
  useEffect(() => {}, []);

  return (
    <nav className=" relative z-50  bg-gradient-to-b from-[#000]  to-[#1a1a1a]">
      <div className="relative h-24 flex gap-4 items-center mx-auto px-4 max-w-screen-xl justify-between">
        <div className="logo flex-none w-24">
          <Link href="/">
            <Image src="/logo.png" alt="" width={100} height={100} />
          </Link>
        </div>
        <div className="flex gap-8 flex-1 items-center"></div>
        <div className="flex gap-8 items-center text-white">
          <div className="hidden sm:block">
            <div className="flex gap-2 md:gap-8">
              <div
                className="flex gap-1 items-center"
                // onClick={() => {
                //   handleShowOptions("college");
                // }}
              >
                <div>
                  <Link href={"/colleges"}>College</Link>
                </div>
                <TfiAngleDown />
              </div>

              <div
                className="flex gap-1 items-center"
                // onClick={() => handleShowOptions("exam")}
              >
                <Link href={"/exams"}>Exams</Link>
                <TfiAngleDown />
              </div>

              <div className="flex gap-1 items-center">
                <Link href={"/courses"}>Courses</Link>
                <TfiAngleDown />
              </div>

              {/* <div className="flex gap-1 items-center">
                Career
                <TfiAngleDown />
              </div> */}

              <div className="flex gap-1 items-center">
                <Link href={"/news"}>News</Link>
              </div>

              <div className="flex gap-1 items-center">
                More
                <TfiAngleDown />
              </div>
            </div>
          </div>
          <LoginQASection />
        </div>
        <div className="hidden max-sm:block text-white">
          <div className="flex gap-4 ">
            <div className="" onClick={handleSearch}>
              <RiSearchLine />
            </div>
            <div>
              <GiHamburgerMenu onClick={() => handleShowOptions("hamburger")} />
            </div>
          </div>
        </div>
        {ShowOptions ? (
          <>
            {/* <NavOption></NavOption>
          <LoginQASection /> */}
            <div className="absolute top-24 -left-1 md:left-0 w-full h-max bg-white mx-auto p-4 rounded-md shadow-lg z-50">
              {Options}
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
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

const MobileOption = () => {
  return (
    <div>
      <Accordion title="College" showBorder={false}>
        <CollegeOption />
      </Accordion>
      <Accordion title="Exam" showBorder={false}>
        <ExamOption />
      </Accordion>
      {/* <Accordion title="Courses"> </Accordion>
      <Accordion title="Career"> </Accordion>
      <Accordion title="News"> </Accordion>
      <Accordion title="More"> </Accordion> */}
      <div className="flex flex-col gap-4 my-4 px-2">
        <Link href={"/career"}>Careers</Link>
        <Link href={"/courses"}>Courses</Link>
        <Link href={"/news"}>News</Link>
        <Link href={"/more"}>More</Link>
      </div>
    </div>
  );
};

const CollegeOption = () => {
  return (
    <div>
      <div>
        <Link href={"/colleges"}>All Colleges</Link>
      </div>
      <div>Top College from Delhi</div>
      <div>Top College from Varansi</div>
      <div>Top College from Pune</div>
      <div>Top College from Jaipur</div>
      <div>Top College from Chennai</div>
      <div>Top College from Haryana</div>
    </div>
  );
};

const ExamOption = () => {
  return (
    <div>
      <div>Top International Exam</div>
      <div>Top National Entrance Exam</div>
      <div>Top College from Pune</div>
      <div>Top College from Jaipur</div>
      <div>Top College from Chennai</div>
      <div>Top College from Haryana</div>
    </div>
  );
};
