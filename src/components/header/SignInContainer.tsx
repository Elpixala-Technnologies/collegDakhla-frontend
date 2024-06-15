"use client";

import React from "react";
import Image from "next/image";
import { useState } from "react";
import { OTPInput } from "@/components/otpInput/otp";
import useSignup from "@/query/hooks/useSignup";
import { ID } from "@/types/global";
import { restUrl } from "@/utils/network";
import axios from "axios";
import { useAppDispatch } from "@/store";
import { setAuthState } from "@/store/authSlice";
import { useRouter } from "next/navigation";

export function SignInContainer({ setIsLogin, isLogIn, closeLoginPopup }: any) {
	const [phoneNumber, setPhoneNumber] = useState("");
	const [userOtp, setUserOtp] = useState("");
	const [message, setMessage] = useState("");
	const [isOtp, setIsOtp] = useState(false);
	const [userId, setUserId] = useState<ID>();
	const { GenerateOTP, CheckOTP } = useSignup();
	const dispatch = useAppDispatch();
	const router = useRouter();
	const [isResend, setIsResend] = useState(false)

	const sendLoginOtp = async (e: any) => {
		e.preventDefault();


		const sendOtp = await GenerateOTP({
			variables: {
				phoneNumber: phoneNumber,
				isResend: isResend,
			},
		})



		if (sendOtp?.data != undefined) {
			setIsOtp(true);
		}
		else {
			setMessage("User does not exists.")
			console.log(sendOtp.data?.generateOTP?.message);
		}
	};

	const handleSignin = async () => {
		if (userOtp.length !== 6) {
			setMessage("Please enter a valid 6-digit OTP.");
			return;
		}

		const otpchecker = await CheckOTP({
			variables: {
				phoneNumber: phoneNumber,
				userOtp: userOtp,
			},
		})

		if (otpchecker?.data != undefined && otpchecker?.data?.verifyOTP?.data) {
			closeLoginPopup();
			setUserId(otpchecker?.data?.verifyOTP?.data?.id);

			dispatch(
				setAuthState({
					authState: true,
					userName: otpchecker?.data?.verifyOTP?.data?.attributes?.name,
					email: otpchecker?.data?.verifyOTP?.data?.attributes?.email,
					number: otpchecker?.data?.verifyOTP?.data?.attributes?.phone_number,
					userID: otpchecker?.data?.verifyOTP?.data?.id,
					// token: otpchecker?.data?.verifyOTP?.data?.attributes?.token
				})
			);
			console.log(
				"user logged in successfully",
				otpchecker?.data?.verifyOTP?.data?.attributes?.name
			);
		}
		else {
			setMessage("Wrong OTP. Please try again.")
			console.log("wrong otp");
		}
	};

	return (
		<div className="[flex:5] relative flex flex-col justify-center  text-black p-8 rounded-r rounded-b">
			<button
				className="absolute top-[0.05rem] right-[0.05rem] w-max text-sm  text-white   hover:underline p-3"
				onClick={closeLoginPopup}
				type="button"
			>
				Close
			</button>
			<div className="logo flex justify-center mb-5">
				<div className="p-4 w-max rounded-lg border-4 border-orange-600 bg-gradient-to-r from-orange-400 to-white">
					<Image src="/logo.png" alt="" width={64} height={64} />
				</div>
			</div>
			<div className="flex items-center flex-col">
				<h3 className="block font-sans text-2xl mb-2 antialiased font-semibold leading-snug tracking-normal text-black">
					OTP Verification
				</h3>
				<span className="block font-sans text-sm text-black text-center mb-4">
					We will send you an one time password on your mobile number
				</span>
			</div>

			<div className="flex flex-col gap-4 px-6 pb-6 items-center">
				<div className="relative h-11 w-full min-w-[200px]">
					<input
						className="bg-white w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all  border rounded-md peer border-blue-gray-200  text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-primary focus:border-t-transparent focus:outline-0 "
						placeholder=""
						name="Mobile No."
						value={phoneNumber}
						onChange={(e) => setPhoneNumber(e.target.value)}
						type="phone"
						maxLength={10}
						pattern="[0-9]{10}"
						title="Please enter a valid phone number"
						required
					/>
					<label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-primary peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-primary">
						Mobile No.
					</label>
				</div>
				{!isOtp ? (
					<button
						className="block w-1/3 select-none rounded-lg bg-primary py-3 px-3 text-center align-middle font-sans text-xs font-semibold uppercase text-white shadow-md  transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85]"
						type="submit"
						onClick={sendLoginOtp}
					>
						Generate OTP
					</button>
				) : (
					<>
						<div className="relative h-11 w-full min-w-[200px]">
							<div className="flex text-xs mb-2">
								<OTPInput
									userOtp={userOtp}
									setUserOtp={setUserOtp}
									otpLength={6}
								/>
							</div>
							<div className="p-3 ">
								<button
									className="block w-full select-none rounded-lg  py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md bg-primary transition-all"
									type="submit"
									onClick={handleSignin}
								>
									Sign In
								</button>
							</div>
							{message && <p className="text-red-600 mt-5 text-center">{message}</p>}
						</div>
					</>
				)}
			</div>
			<div className="p-6">
				<p className="flex justify-center font-sans text-sm antialiased font-light leading-normal text-inherit">
					Don't have an account?
					<span
						onClick={() => setIsLogin(!isLogIn)}
						className="block ml-1 font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900 text-blue-500 hover:text-primary hover:underline cursor-pointer"
					>
						Register
					</span>
				</p>
			</div>
		</div>
	);
}
