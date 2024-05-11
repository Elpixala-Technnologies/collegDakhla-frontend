"use client";

import Carousel from "@/components/carousel/carousel";
import { getStreams, getCourseLevels } from "@/query/schema";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { ID } from "@/types/global";
import { restUrl } from "@/utils/network";
import useSignup from "@/query/hooks/useSignup";
import { OTPInput } from "@/components/otpInput/otp";
import { useAppDispatch } from "@/store";
import { setAuthState } from "@/store/authSlice";
import useUserMetaData from "@/query/hooks/useUserMetaData";
const axios = require("axios");
import { useRouter } from "next/navigation";

export default function Signup() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [stream, setStream] = useState("");
  const [courseLevel, setCourseLevel] = useState("");
  const [email, setEmail] = useState("");
  const [userOtp, setUserOtp] = useState("");
  const [userId, setUserId] = useState<ID>();
  const [isOtp, setIsOtp] = useState(false);
  const { userCheck, checkOTP } = useSignup();
  const { userMetaCreate } = useUserMetaData();
  const dispatch = useAppDispatch();
  const { data: streamsData } = useQuery(getStreams);
  const { data: courseLevelData } = useQuery(getCourseLevels);
  const checkUser = userCheck(phoneNumber, email);
  const otpchecker = checkOTP(userId!, phoneNumber, userOtp);
  const router = useRouter();

  const sendSignupOtp = async (e: any) => {
    e.preventDefault();

    const currentDate = new Date();
    const publishedAt = currentDate.toISOString();

    if (checkUser === false) {
      try {
        let data = JSON.stringify({
          data: {
            name: name,
            email: email,
            number: phoneNumber,
            stream: stream,
            courseLevel: courseLevel,
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
            name: name,
            email: email,
            number: phoneNumber,
            userDataId: userId,
            publishedAt,
          },
        });
        console.log("user signed up");
        router.push("/");
      } catch (error) {
        console.error("Error publishing user:", error);
      }
    } else {
      console.log("wrong otp");
    }
  };

  return (
    <div className="flex flex-row w-1/2">
      <div className="left w-4/6 bg-primary pl-2">
        <Carousel
          slides={[
            <div className="text-white" key={"1"}>
              <div className="text-xl">Education Library</div>
              <p>
                Get detailed information about Colleges, Careers, Courses, and
                Exams at CollegeDekho. Register now and make informed decisions
                about your career.
              </p>
            </div>,
            <div className="text-white" key={"2"}>
              <div className="text-xl ">Counselling</div>
              <p>
                Sign up to get free counselling by CollegeDekho experts and find
                the best career path for yourself.
              </p>
            </div>,
            <div className="text-white" key={"3"}>
              <div className="text-xl ">Guaranteed Admissions</div>
              <p>
                Avail the chance of getting guaranteed admission to the best
                college for you. Register now and take a step towards your
                bright future.
              </p>
            </div>,
          ]}
          showPagination={true}
          showButton={false}
          slidesDesktop={1}
          slideGap="gap-0"
          paginationAlignment="justify-left"
          borderColor="black"
        ></Carousel>
      </div>
      <div className=" w-2/3 relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border">
        <div className="logo flex justify-center pt-10">
          <Image src="/logo.png" alt="agam" height={64} width={64} />
        </div>
        <div className="flex items-center flex-col">
          <h3 className="block font-sans text-2xl mb-2 antialiased font-semibold leading-snug tracking-normal text-black">
            Welcome, Create your account
          </h3>
        </div>
        {isOtp ? (
          <div className="flex text-xs mb-2">
            <OTPInput userOtp={userOtp} setUserOtp={setUserOtp} otpLength={6} />
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-4 px-6 pb-6 h-96 overflow-y-auto">
              <div className="relative h-11 w-full min-w-[200px] mt-1">
                <input
                  className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-primary focus:border-t-transparent focus:outline-0 "
                  placeholder=" "
                  name="name"
                  // value={LoginState.name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-primary peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-primary">
                  Name
                </label>
              </div>
              <div className="relative h-11 w-full min-w-[200px]">
                <input
                  className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-primary focus:border-t-transparent focus:outline-0 "
                  placeholder=" "
                  name="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-primary peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-primary">
                  Email
                </label>
              </div>
              <div className="relative h-11 w-full min-w-[200px]">
                <input
                  className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-primary focus:border-t-transparent focus:outline-0 "
                  placeholder=" "
                  name="Mobile No."
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  type="phone"
                  pattern="[0-9]{10}"
                  maxLength={10}
                  title="Please enter a valid phone number" // Error message when pattern validation fails
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-primary peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-primary">
                  Mobile No.
                </label>
              </div>
              <div className="relative h-10 min-w-[200px]">
                <select
                  className="peer h-full w-full rounded-[7px] border border-blue-gray-200  bg-transparent px-3 py-0 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-white-900 focus:border-2 focus:border-primary focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  name="stream"
                  onChange={(e) => setStream(e.target.value)}
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
              </div>
              <div className="relative h-10 min-w-[200px]">
                <select
                  className="peer h-full w-full rounded-[7px] border border-blue-gray-200  bg-transparent px-3 py-0 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-white-900 focus:border-2 focus:border-primary focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  name="level"
                  onChange={(e) => setCourseLevel(e.target.value)}
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
              </div>
            </div>
          </>
        )}
        <div className="p-6 pt-0">
          <button
            className="block w-full select-none rounded-lg bg-primary py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="submit"
            onClick={!isOtp ? sendSignupOtp : handleSubmitSignup}
          >
            {isOtp ? "Signup" : "Send OTP"}
          </button>
        </div>

        <div className="">
          <p className="flex justify-center mt-6 font-sans text-sm antialiased font-light leading-normal text-inherit">
            Already have an account?
            <Link
              href="/login"
              className="block ml-1 font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900 text-primary"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
