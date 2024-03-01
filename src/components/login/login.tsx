import { TextField } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "../carousel/carousel";
import { sendOtp, verifyOtp } from "@/utils/sendOtp";

export default function LoginForm() {
  const [phoneNumber, setPhoneNumber] = useState("+91");
  const [otp, setOTP] = useState("");
  const [message, setMessage] = useState("");
  const [OTPSend, setOTPSend] = useState(false);

  const sendOTP = async () => {
    setOTPSend(true);
    try {
      const response = await sendOtp(8010859345);
      console.log(response);
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await verifyOtp(otp);
      console.log(response);
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  const handlePhoneNumberChange = (value: string) => {
    // Allow only numbers and the plus sign (+)
    const cleanedValue = value.replace(/[^0-9+]/g, "");
    setPhoneNumber(cleanedValue);
  };

  useEffect(() => {}, [OTPSend]);
  return (
    <div className="flex flex-row w-1/2">
      <div className="left w-2/6 bg-primary pl-2">
        <Carousel
          slides={[
            <p className="" key={"1"}>
              Agam
            </p>,
            <p key={"2"}>is</p>,
            <p key={"3"}>
              Education Library Get detailed information about Colleges,
              Careers, Courses, and Exams at CollegeDekho. Register now and make
              informed decisions about your career.
            </p>,
          ]}
          showPagination={true}
          showButton={false}
          slidesDesktop={1}
          slideGap="gap-0"
          paginationAlignment="justify-left"
          borderColor="black"
        ></Carousel>
      </div>
      <div className="w-3/4 relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border py-12 px-6">
        <div className="logo flex justify-center">
          <Image src="/logo.png" alt="" width={64} height={64} />
        </div>
        <div className="flex items-center flex-col">
          <h3 className="block font-sans text-2xl mb-2 antialiased font-semibold leading-snug tracking-normal text-black">
            OTP Verification
          </h3>
          <span className="block font-sans text-sm text-black text-center mb-4">
            We will send you an one time password on your mobile number
          </span>
        </div>

        <form className="flex flex-col gap-4 px-6 pb-6">
          <div className="relative h-11 w-full min-w-[200px]">
            <input
              className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 "
              placeholder=""
              name="Mobile No."
              value={phoneNumber}
              onChange={(e) => handlePhoneNumberChange(e.target.value)}
              type="tel"
              pattern="[0-9]{10,14}" // Regular expression to match phone numbers of length 10 to 14 digits
              title="Please enter a valid phone number" // Error message when pattern validation fails
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900">
              Mobile No.
            </label>
          </div>
          {!OTPSend ? (
            <button
              className="block w-full select-none rounded-lg bg-primary py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md  transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85]"
              type="submit"
              onClick={sendOTP}
            >
              Generate OTP
            </button>
          ) : (
            <div className="relative h-11 w-full min-w-[200px]">
              <input
                className="w-full h-full p-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0"
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
              />
              <div className="p-3 ">
                <button
                  className="block w-full select-none rounded-lg  py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md bg-primary transition-all"
                  type="submit"
                  onClick={handleLogin}
                >
                  Sign In
                  {/* {isSubmitted.showspinner ? (
						<san
							class="inline-block h-4 w-4 ml-3 mt-1 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
							role="status">

						</span>
					) : (
						<></>
					)} */}
                </button>
                <p>{message}</p>
              </div>
            </div>
          )}
        </form>
        <div className="p-6">
          <p className="flex justify-center font-sans text-sm antialiased font-light leading-normal text-inherit">
            Don't have an account?
            <Link
              href="/signup"
              className="block ml-1 font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900 text-primary"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
