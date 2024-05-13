"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useId, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

import { SignUp } from "@/Asset";
import useSignup from "@/query/hooks/useSignup";
import useUserMetaData from "@/query/hooks/useUserMetaData";
import { useAppDispatch } from "@/store";
import { useQuery } from "@apollo/client";
import { getStreams, getCourseLevels } from "@/query/schema";
import { restUrl } from "@/utils/network";
import { setAuthState } from "@/store/authSlice";
import { ID } from "@/types/global";
import { OTPInput } from "../otpInput/otp";
import Carousel from "./Carousel";
import { sliderContent } from "./data";

export function SignUpModule({ closeLoginPopup }: any) {
  const route = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  }: any = useForm();
  const [error, setError] = useState("");
  const [userSubmittedData, setuserSubmittedData] = useState<UserSubmittedData>(
    {
      name: "",
      email: "",
      mobileNo: "",
      isWhatsappNo: false,
      stream: "",
      level: "",
    }
  );

  const [userOtp, setUserOtp] = useState("");
  const [userId, setUserId] = useState<ID>();
  const [isOtp, setIsOtp] = useState(false);
  const { UserCheck, CheckOTP } = useSignup();
  const { userMetaCreate } = useUserMetaData();
  const dispatch = useAppDispatch();
  const { data: streamsData } = useQuery(getStreams);
  const { data: courseLevelData } = useQuery(getCourseLevels);
  const checkUser = UserCheck(
    userSubmittedData?.mobileNo,
    userSubmittedData?.email
  );
  const otpchecker = CheckOTP(userId!, userSubmittedData?.mobileNo, userOtp);

  interface UserSubmittedData {
    name: string;
    email: string;
    mobileNo: string;
    isWhatsappNo: boolean;
    stream: string;
    level: string;
  }

  const sendSignupOtp = async (e: any) => {
    e.preventDefault();
    const currentDate = new Date();
    const publishedAt = currentDate.toISOString();

    if (checkUser === false) {
      try {
        let data = JSON.stringify({
          data: {
            name: userSubmittedData.name,
            email: userSubmittedData.email,
            number: userSubmittedData.mobileNo,
            stream: userSubmittedData.stream,
            courseLevel: userSubmittedData.level,
            publishedAt: publishedAt,
          },
        });
        console.log("data ", data);

        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: `${restUrl}/api/users-data`,
          headers: {
            "Content-Type": "application/json",
          },
          data: data,
        };

        axios
          .request(config)
          .then((response: any) => {
            setUserId(response?.data?.data?.id);
            setIsOtp(true);
          })
          .catch((error: any) => {
            console.log(error);
          });
      } catch (error) {
        console.error("Error adding user:", error);
      }
    } else {
      console.log("user already exists");
    }
  };
  const handleSubmitSignup = async (e: any) => {
    e.preventDefault();
    const currentDate = new Date();
    const publishedAt = currentDate.toISOString();

    if (otpchecker != false) {
      try {
        dispatch(
          setAuthState({
            authState: true,
            userID: otpchecker?.loggedInUser?.id,
            userName: otpchecker?.loggedInUser?.attributes?.name,
            email: otpchecker?.loggedInUser?.attributes?.email,
            number: otpchecker?.loggedInUser?.attributes?.number,
          })
        );

        await userMetaCreate({
          variables: {
            name: userSubmittedData.name,
            email: userSubmittedData.email,
            number: userSubmittedData.mobileNo,
            userDataId: userId,
            publishedAt,
          },
        });

        console.log("user signed up");
      } catch (error) {
        console.error("Error publishing user:", error);
      }
    } else {
      console.log("wrong otp");
    }
  };

  const handleFormSubmit = async (data: any) => {
    setuserSubmittedData(data);
    !isOtp ? sendSignupOtp : handleSubmitSignup;
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
      <div className="z-10 md:w-[60%] w-full bg-white flex rounded shadow-lg">
        {/* Left Side  */}
        <div className="[flex:5] text-black px-5 py-10 hidden md:block">
          <Image
            src={SignUp}
            alt="SignUp"
            className="w-full h-[250px] object-cover rounded-l"
          />
          <div className="p-5">
            <h3 className="font-bold text-center text-orange-500">
              Why we are better then rest?
            </h3>
            <ul className="list-disc">
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
          <div className="relative w-full">
            <Carousel autoSlide={true}>{sliderContent}</Carousel>
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

          <form onSubmit={handleSubmit(handleFormSubmit)}>
            {isOtp ? (
              <div className="flex text-xs mb-2">
                <OTPInput
                  userOtp={userOtp}
                  setUserOtp={setUserOtp}
                  otpLength={6}
                />
              </div>
            ) : (
              <>
                <Input
                  label="Name "
                  placeholder=" "
                  {...register("name", {
                    required: "Name is required",
                  })}
                />
                {errors?.name && (
                  <p className="text-red-600">{errors?.name?.message}</p>
                )}
                {/* Mobile No.  */}
                <Input
                  label="Mobile No "
                  type="text"
                  placeholder=" "
                  {...register("mobileNo", {
                    required: "Mobile No. is required",
                    pattern: {
                      value: mobileRegex,
                      message: "Please enter a valid 10-digit mobile number",
                    },
                  })}
                />
                {errors.mobileNo && (
                  <p className="text-red-600">{errors.mobileNo.message}</p>
                )}
                {/* Email  */}
                <Input
                  label="Email ID "
                  type="email"
                  placeholder=" "
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: emailRegex,
                      message: "Please enter a valid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-600">{errors.email.message}</p>
                )}
                {/* Stream  */}
                <select
                  className="px-3 py-2 my-2 rounded-lg bg-white text-black outline-none focus:outline-zinc-300 duration-200 border border-gray-200 w-full"
                  {...register("stream", {
                    // required: "Stream Selection is required",
                  })}
                >
                  <option disabled={true} selected={true} value="">
                    Select Stream
                  </option>
                  {streamsData?.streams?.data?.map(
                    (stream: any, index: any) => {
                      return (
                        <option value={stream?.id} key={index}>
                          {stream?.attributes?.streamName}
                        </option>
                      );
                    }
                  )}
                </select>
                {errors.stream && (
                  <p className="text-red-600">{errors.stream.message}</p>
                )}
                {/* Level  */}
                <select
                  className="px-3 py-2 my-2 rounded-lg bg-white text-black outline-none focus:outline-zinc-300 duration-200 border border-gray-200 w-full"
                  {...register("level", {
                    // required: "level Selection is required",
                  })}
                >
                  <option disabled={true} selected={true} value="">
                    Select Level
                  </option>
                  {courseLevelData?.courseLevels?.data?.map(
                    (level: any, index: any) => {
                      return (
                        <option value={level?.id} key={index}>
                          {level?.attributes?.levelName}
                        </option>
                      );
                    }
                  )}
                </select>
                {errors.level && (
                  <p className="text-red-600">{errors.level.message}</p>
                )}
                {/* Whatsapp No. Check  */}
                <div className="flex items-center">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      value=""
                      className="sr-only peer"
                      {...register("isWhatsappNo", {})}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 rounded-full peer dark:bg-orange-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-600"></div>
                  </label>
                  <span className="ml-3 text-sm font-medium text-gray-900">
                    Whatsapp number is the same as provided above
                  </span>
                </div>
              </>
            )}
            <button
              className="px-3 py-2 my-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 hover:font-bold w-full"
              type="submit"
            >
              {isOtp ? "Sign Up" : "Send OTP"}
            </button>
          </form>

          <p className="flex font-sans text-sm antialiased  leading-normal text-inherit">
            Already have an account?
            <Link
              href="/login"
              className="block ml-1 font-sans text-sm antialiased font-bold leading-normal  text-blue-600 hover:underline"
            >
              LogIn
            </Link>
          </p>
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
    <div className="relative h-11 w-full min-w-[200px] mt-1 mb-5">
      <input
        type={type}
        className={`bg-white w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-primary focus:border-t-transparent focus:outline-0 ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
      {label && (
        <label
          className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[12px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-primary peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-primary"
          // htmlFor={id}
        >
          {label}
        </label>
      )}
    </div>
  );
});
