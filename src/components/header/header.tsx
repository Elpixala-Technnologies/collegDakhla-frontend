"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, {
  ReactElement,
  ReactNode,
  useEffect,
  useId,
  useState,
} from "react";
import { FaAngleDown, FaAngleUp, FaRegQuestionCircle } from "react-icons/fa";
import Tooltip from "../tooltip/tooltip";
import { RiSearchLine } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { getStreams } from "@/query/schema";
import { useQuery } from "@apollo/client";
import { TfiAngleDown } from "react-icons/tfi";
import { FaRegCircleUser } from "react-icons/fa6";
import Accordion from "../accordian/accordian";
import { useForm } from "react-hook-form";

import { SignUp } from "../../Asset";
import { IoMdClose } from "react-icons/io";
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
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const openLoginPopup = () => {
    setShowLoginPopup(true);
  };

  const closeLoginPopup = () => {
    setShowLoginPopup(false);
  };

  return (
    <>
      <div className="flex gap-4 max-sm:hidden">
        <div>
          <div onClick={openLoginPopup} className="text-2xl hover:text-primary">
            <FaRegCircleUser />
          </div>
        </div>
        <div>
          <Link href={"/"} className="text-2xl hover:text-primary">
            <FaRegQuestionCircle />
          </Link>
        </div>
      </div>

      {/* Pop-up Module */}
      {showLoginPopup && <SignUpModule closeLoginPopup={closeLoginPopup} />}
    </>
  );
};

function SignUpModule({ closeLoginPopup }: any) {
  const route = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  }: any = useForm();
  const [error, setError] = useState("");

  const createUser = async (data: any) => {
    setError("");
    try {
      // Handle sign-up
      route.push("/login");
      // }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleOverlayClick = (e: any) => {
    // Check if the click occurred on the overlay (the background)
    if (e.target === e.currentTarget) {
      closeLoginPopup();
    }
  };

  // Regular expressions for validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mobileRegex = /^[0-9]{10}$/;

  return (
    <section
      className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center"
      onClick={handleOverlayClick}
    >
      {/* Sign-up Module  */}
      <div className="z-10 w-[60%] max-md:w-full max-md:h-max min-h-3/4 bg-white flex rounded shadow-lg">
        {/* Left Side  */}
        <div className="[flex:5] text-black">
          <Image
            src={SignUp}
            alt="SignUp"
            className="w-full h-[40%] object-cover rounded-l mt-5"
          />
          <div className="p-5">
            <h3 className="font-bold text-center text-orange-500">
              Why we are better then rest?
            </h3>
            <ul className="list-disc p-5">
              <li>
                <strong>Proven Success : </strong> 90% admission success rate to
                top-choice colleges.
              </li>
              <li>
                <strong>Cost Effective : </strong> 80% cost effective.{" "}
              </li>
              <li>
                <strong>Access to Top Choice : </strong> 70% access to top
                choice.{" "}
              </li>
            </ul>
          </div>
        </div>
        {/* Right Side  */}
        <div className="[flex:5] relative flex flex-col justify-center bg-gradient-to-r from-red-400 to-orange-500 text-black p-8 rounded-r rounded-b">
          <button
            className="absolute top-[0.05rem] right-[0.05rem] w-max text-sm  text-white   hover:underline p-3"
            onClick={closeLoginPopup}
            type="button"
          >
            Close
          </button>
          <h1 className="font-bold text-zinc-800">
            Explore Top-notch college counseling from experts at absolutely no
            cost. <span>Sign Up Now!</span>
          </h1>
          <form onSubmit={handleSubmit(createUser)}>
            <Input
              placeholder="Name"
              {...register("name", {
                required: "Name is required",
              })}
            />
            {errors?.name && (
              <p className="text-red-600">{errors?.name?.message}</p>
            )}
            {/* Mobile No.  */}
            <div className="flex gap-2">
              <select
                className="px-1 py-2 my-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200"
                {...register("countryCode", {})}
              >
                <option value="+91">+91</option>
              </select>
              <Input
                type="text"
                placeholder="Enter 10 digit mobile Number"
                {...register("mobileNo", {
                  required: "Mobile No. is required",
                  pattern: {
                    value: mobileRegex,
                    message: "Please enter a valid 10-digit mobile number"
                  }
                })}
              />
            </div>
            {errors.mobileNo && (
              <p className="text-red-600">{errors.mobileNo.message}</p>
            )}
            {/* Email  */}
            <Input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: emailRegex,
                  message: "Please enter a valid email address"
                }
              })}
            />
            {errors.email && (
              <p className="text-red-600">{errors.email.message}</p>
            )}
            {/* Stream  */}
            <select
              className="px-3 py-2 my-2 rounded-lg bg-white text-black outline-none focus:outline-zinc-300 duration-200 border border-gray-200 w-full"
              {...register("stream", {
                required: "Stream Selection is required",
              })}
            >
              <option value="">Please Select Preferred Stream</option>
              <option value="engineering">Engineering</option>
              <option value="medical">Medical</option>
            </select>
            {errors.stream && (
              <p className="text-red-600">{errors.stream.message}</p>
            )}
            {/* Level  */}
            <select
              className="px-3 py-2 my-2 rounded-lg bg-white text-black outline-none focus:outline-zinc-300 duration-200 border border-gray-200 w-full"
              {...register("level", {
                required: "level Selection is required",
              })}
            >
              <option value="">Please Select Preferred level</option>
              <option value="level1">level1</option>
              <option value="level2">level2</option>
            </select>
            {errors.level && (
              <p className="text-red-600">{errors.level.message}</p>
            )}
            {/* Whatsapp No. Check  */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                {...register("isWhatsappNo", {})}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 rounded-full peer dark:bg-orange-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-600"></div>
              <span className="ml-3 text-sm font-medium text-gray-900">
                Whatsapp number is the same as provided above
              </span>
            </label>
            <button
              className="px-3 py-2 my-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 hover:font-bold w-full"
              type="submit"
            >
              Create a Account
            </button>
          </form>
          {/* Error Message */}
          {error && <p className="text-red-600 mt-5 text-center">{error}</p>}
        </div>
      </div>
    </section>
  );
}

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props }: any,
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1 pl-1" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={`px-3 py-2 my-2 rounded-lg bg-white text-black outline-none focus:outline-zinc-300 duration-200 border border-gray-200 w-full ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
});

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
