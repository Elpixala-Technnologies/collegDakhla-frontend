"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";
import { FaAngleDown, FaAngleUp, FaRegQuestionCircle } from "react-icons/fa";
import Tooltip from "../tooltip/tooltip";
import { RiSearchLine } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoLogOutOutline } from "react-icons/io5";
import { getStreams } from "@/query/schema";
import { useQuery } from "@apollo/client";
import { FaRegCircleUser } from "react-icons/fa6";
import Accordion from "../accordian/accordian";

import { SignUpModule } from "./SignUpModule";

import { useAppDispatch, useAppSelector } from "@/store";
import { clearAuthState } from "@/store/authSlice";
import { MdOutlinePerson } from "react-icons/md";

export default function Header() {
  const [Path, setPath] = useState("");
  const currentPath = usePathname();
  const [ShowSearch, setShowSearch] = useState(false);
  const [ShowOptions, setShowOptions] = useState(false);
  const [Options, setOptions] = useState<ReactNode>(CollegeOption);
  const [CurrentOpenOption, setCurrentOpenOption] = useState("");
  const [activeTab, setActiveTab] = useState(null);

  const handleMouseEnter = (index: any) => {
    setActiveTab(index);
  };

  const handleMouseLeave = () => {
    setActiveTab(null);
  };

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
              {[
                { href: "/colleges", label: "College" },
                { href: "/exams", label: "Exams" },
                { href: "/courses", label: "Courses" },
                { href: "/news", label: "News" },
                { href: "/more", label: "More" },
              ].map((tab, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-1 items-center"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link href={tab.href}>{tab.label}</Link>
                  <div
                    className={`bg-amber-500 h-[2px] w-0 ${
                      activeTab === index ? "w-full" : ""
                    } transition-all duration-500`}
                  ></div>
                </div>
              ))}
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
  const isUserloggedIn = useAppSelector((state) => state.auth.authState);
  const dispatch = useAppDispatch();
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const openLoginPopup = () => {
    setShowLoginPopup(true);
  };

  const closeLoginPopup = () => {
    setShowLoginPopup(false);
  };

  const handleLogout = () => {
    dispatch(clearAuthState());
  };

  return (
    <>
      <div className="flex items-center gap-4 max-sm:hidden">
        {!isUserloggedIn ? (
          <div className="relative group">
              <FaRegCircleUser className="text-2xl hover:text-primary cursor-pointer group" />
            <div className="absolute z-10 top-6 right-0 hidden group-hover:block bg-white border text-zinc-600 text-sm border-gray-200 rounded-md py-1 w-max">
              <Link href={"/profile"}  className="flex item-center gap-x-2 px-3 py-1 hover:bg-gray-100 cursor-pointer">
              <MdOutlinePerson className="mt-0.5" /> Profile
              </Link>
              <div className="flex item-center gap-x-2 px-3 py-1 hover:bg-gray-100 cursor-pointer" onClick={handleLogout}>
              <IoLogOutOutline className="mt-0.5" /> Logout
              </div>
            </div>
          </div>
        ) : (
          <div
            onClick={openLoginPopup}
            className="overflow-hidden rounded relative inline-flex group items-center justify-center px-3.5 py-2 m-[10px] cursor-pointer active:border-orange-600 active:shadow-none shadow-lg bg-gradient-to-tr from-orange-500 to-orange-500 border-orange-700 text-white"
          >
            <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-24 opacity-10"></span>
            <span className="relative whitespace-nowrap">Login/ SignUp</span>
          </div>
        )}

        <Link href={"/"}>
          <FaRegQuestionCircle className="text-2xl hover:text-primary" />
        </Link>
      </div>

      {/* Pop-up Module */}
      {showLoginPopup && <SignUpModule closeLoginPopup={closeLoginPopup} />}
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
