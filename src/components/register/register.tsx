import Link from "next/link"
import Image from "next/image";
import { useEffect, useState } from "react";
import Carousel from "../carousel/carousel";
import { getCourseLevels, getStreams } from "@/query/schema";
import { useQuery } from "@apollo/client";

export default function Register() {
	const [phoneNumber, setPhoneNumber] = useState('');

	const { loading: streamLoader, error: streamsError, data: streamsData } = useQuery(getStreams);
	const { loading: courseLevelLoader, error: courseLevelError, data: courseLevelData } = useQuery(getCourseLevels);

	console.log("courseLevelData are ", courseLevelData);


	function handleRegister(event: any): void {
		throw new Error("Function not implemented.")
	}

	function handlePhoneNumberChange(value: string): void {
		// Allow only numbers and the plus sign (+)
		const cleanedValue = value.replace(/[^0-9+]/g, "");
		setPhoneNumber(cleanedValue);
	}

	return (
		<div className="flex flex-row w-1/2">
			<div className="left w-4/6 bg-primary pl-2">
				<Carousel
					slides={[
						<div className="text-white" key={"1"}>
							<div className="text-xl">Education Library</div>
							<p>Get detailed information about Colleges, Careers, Courses, and Exams at CollegeDekho. Register now and make informed decisions about your career.</p>
						</div>
						,
						<div className="text-white" key={"2"}>
							<div className="text-xl ">Counselling</div>
							<p>Sign up to get free counselling by CollegeDekho experts and find the best career path for yourself.</p>
						</div>,
						<div className="text-white" key={"3"}>
							<div className="text-xl ">Guaranteed Admissions</div>
							<p>Avail the chance of getting guaranteed admission to the best college for you. Register now and take a step towards your bright future.</p>
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
					<Image src="/logo.png" alt="" width={64} height={64} />
				</div>
				<div className="flex items-center flex-col">
					<h3 className="block font-sans text-2xl mb-2 antialiased font-semibold leading-snug tracking-normal text-black">Welcome, Create your account</h3>
				</div>
				<form className="flex flex-col gap-4 px-6 pb-6 h-96 overflow-y-auto" onSubmit={handleRegister}>
					<div className="relative h-11 w-full min-w-[200px] mt-1">
						<input
							className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-primary focus:border-t-transparent focus:outline-0 "
							placeholder=" "
							name="name"
						// value={LoginState.name}
						// onChange={handleRegisterStateChange}
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
						// value={LoginState.name}
						// onChange={handleRegisterStateChange}
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
							value={phoneNumber}
							onChange={(e) => handlePhoneNumberChange(e.target.value)}
							type="tel"
							pattern="[0-9]{10,14}" // Regular expression to match phone numbers of length 10 to 14 digits
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
						// value={RegisterState.companyid}
						// onChange={handleCompanyStateChange}
						>
							<option disabled selected value="">
								Select Stream
							</option>
							{streamsData?.streams?.data?.map((stream: any, index: any) => {
								return (
									<option value={stream?.attributes?.streamName} key={index}>
										{stream?.attributes?.streamName}
									</option>
								)
							})}
						</select>
					</div>
					<div className="relative h-10 min-w-[200px]">
						<select
							className="peer h-full w-full rounded-[7px] border border-blue-gray-200  bg-transparent px-3 py-0 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-white-900 focus:border-2 focus:border-primary focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
							name="level"
						// value={RegisterState.companyid}
						// onChange={handleCompanyStateChange}
						>
							<option disabled selected value="">
								Select Level
							</option>
							{courseLevelData?.courseLevels?.data?.map((level: any, index: any) => {
								return (
									<option value={level?.attributes?.levelName} key={index}>
										{level?.attributes?.levelName}
									</option>
								)
							})}
						</select>
					</div>
					<div className="relative h-11 w-full min-w-[200px]">
						<input
							className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-primary focus:border-t-transparent focus:outline-0 "
							placeholder=" "
							type="password"
							name="password"
						// value={LoginState.password}
						// onChange={handleRegisterStateChange}
						/>
						<label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-primary peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-primary">
							Password
						</label>
					</div>
				</form >

				<div className="p-6 pt-0">
					<button
						className="block w-full select-none rounded-lg bg-primary py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
						type="submit"
						onClick={handleRegister}
					>
						Sign In
					</button>
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
			</div >
		</div>
	)
}