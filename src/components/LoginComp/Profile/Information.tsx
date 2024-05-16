import useCourses from "@/query/hooks/useCourses";
import useUserMetaData from "@/query/hooks/useUserMetaData";
import { useAppSelector } from "@/store";
import { InformationProps, UserInformation } from "@/types/global";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";

const Information = ({ props }: { props: InformationProps }) => {
	const { userMetaId, setSelectedOption } = props;
	const [expanded, setExpanded] = useState(true);
	const { userName, authState, email, number } = useAppSelector(
		(store: any) => store.auth
	);
	const { allCoursesData } = useCourses();
	const genders = props.userData.gender;
	const citee = props.userData.city;
	const courseIntrested = props.userData.courseIntrested;

	const selectedCourse = allCoursesData?.find(
		(course: any) => course.attributes.name === courseIntrested
	);
	const courseId = selectedCourse?.id || "";
	const { userMetaUpdate } = useUserMetaData();
	const [userInformation, setUserInformation] = useState<UserInformation>({
		firstName: userName?.trim().split(" ")[0],
		lastName: userName?.trim().split(" ")[1],
		email: email,
		number: number,
		gender: "",
		city: "",
		interestedCourse: courseId || "",
	});

	const handleToggle = () => {
		setExpanded(!expanded);
	};

	const handleDataChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setUserInformation((prevValues) => ({
			...prevValues,
			[name]: value,
		}));
	};

	const updateUserProfile = async () => {
		try {
			const response = await userMetaUpdate({
				variables: {
					id: userMetaId,
					gender: userInformation.gender,
					city: userInformation.city,
					course: userInformation.interestedCourse,
				},
			});
			setSelectedOption("Education Details");
		} catch (error) {
			console.log("error in updating user ", error);
		}
	};

	useEffect(() => {
		if (genders && !userInformation.gender) {
			setUserInformation((prevValues) => ({
				...prevValues,
				gender: genders,
			}));
		}
	}, [genders]);

	useEffect(() => {
		if (citee && !userInformation.city) {
			setUserInformation((prevValues) => ({
				...prevValues,
				city: citee,
			}));
		}
	}, [citee]);

	useEffect(() => {
		if (courseIntrested && !userInformation.interestedCourse) {
			setUserInformation((prevValues) => ({
				...prevValues,
				interestedCourse: courseId,
			}));
		}
	}, [courseIntrested, courseId]);

	useEffect(() => {
		const handleResize = () => {
			const isMobile = window.innerWidth < 640; // Adjust breakpoint as needed
			setExpanded(!isMobile); // Set expanded to true for desktop/laptop, false for mobile
		};

		handleResize(); // Set initial state based on current width

		window.addEventListener('resize', handleResize); // Listen for window resize events

		return () => {
			window.removeEventListener('resize', handleResize); // Clean up listener on component unmount
		};
	}, []);

	return (
		<>
			<div
				onClick={handleToggle}
				className="bg-[#F5F9FC] text-white font-bold py-2 mt-5 px-4 rounded flex sm:hidden w-full cursor-pointer"
			>
				{expanded ? (
					<div className="flex flex-row items-center justify-between mx-2 w-full">
						<h4 className="text-lg font-normal text-black">Your Information</h4>
						<Image src={""} alt="" className="" />
					</div>
				) : (
					<div className="flex flex-row items-center justify-between mx-2 w-full ">
						<h4 className="text-lg font-normal text-black ">Your Information</h4>
						<Image src={""} alt="" className="" />
					</div>
				)}
			</div>

			{expanded && (
				<div className="flex flex-col px-4">
					<div className="pt-4 flex sm:gap-6 gap-4 flex-col">

						<div>
							<div className="flex md:flex-row flex-col gap-4 items-center lg:justify-between justify-center">
								<div className="flex flex-col w-full gap-1">
									<h1>
										First Name <span className="text-red-500">*</span>
									</h1>
									<div className="relative">
										<span className="absolute inset-y-0 left-0 flex items-center pl-3">
											<AiOutlineUser className="text-gray-400" />
										</span>
										<input
											type="text"
											className="pl-10 pr-3 py-2 border border-gray-300 rounded-sm w-full "
											placeholder="Enter First Name..."
											value={userInformation.firstName}
											readOnly={true}
										/>
									</div>
								</div>
								<div className="flex flex-col w-full gap-1">
									<h1>
										Last Name <span className="text-red-500">*</span>
									</h1>
									<div className="relative">
										<span className="absolute inset-y-0 left-0 flex items-center pl-3">
											<AiOutlineUser className="text-gray-400" />
										</span>
										<input
											type="text"
											className="pl-10 pr-3 py-2 border border-gray-300 rounded-sm w-full"
											placeholder="Enter Last Name..."
											value={userInformation.lastName}
											readOnly={true}
										/>
									</div>
								</div>

								<div className="flex flex-col w-full gap-1">
									<h1>
										Email Address <span className="text-red-500">*</span>
									</h1>
									<div className="relative">
										<span className="absolute inset-y-0 left-0 flex items-center pl-3">
											<AiOutlineUser className="text-gray-400" />
										</span>
										<input
											type="text"
											className="pl-10 pr-3 py-2 border border-gray-300 rounded-sm w-full"
											placeholder="Enter Email Address..."
											name="email"
											value={userInformation.email}
											readOnly={true}
										/>
									</div>
								</div>
							</div>
						</div>

						<div>
							<div className="flex md:flex-row flex-col gap-4 items-center justify-start">
								<div className="flex flex-col w-full gap-1">
									<h1>
										Contact Number <span className="text-red-500">*</span>
									</h1>
									<div className="relative">
										<span className="absolute inset-y-0 left-0 flex items-center pl-3">
											<AiOutlineUser className="text-gray-400" />
										</span>
										<input
											type="text"
											className="pl-10 pr-3 py-2 border border-gray-300 rounded-sm w-full"
											placeholder="Enter Contact Number..."
											value={userInformation.number}
											name="number"
											readOnly={true}
										/>
									</div>
								</div>
								<div className="flex flex-col w-full gap-1">
									<h1>
										Gender<span className="text-red-500">*</span>
									</h1>
									<div className="relative">
										<span className="absolute inset-y-0 left-0 flex items-center pl-3">
											<AiOutlineUser className="text-gray-400" />
										</span>
										<select
											className="pl-8 pr-3 py-2 border border-gray-300 rounded-sm w-full outline-none cursor-pointer"
											value={userInformation.gender}
											name="gender"
											onChange={handleDataChange}
										>
											<option value="">Select Gender</option>
											<option value="Male">Male</option>
											<option value="Female">Female</option>
										</select>
									</div>
								</div>
							</div>
						</div>

						<div className="flex md:flex-row flex-col gap-4 items-center justify-start">
							<div className="flex flex-col gap-y-1 w-full">
								<h1>
									City you Live in <span className="text-red-500">*</span>
								</h1>
								<div className="relative">
									<span className="absolute inset-y-0 left-0 flex items-center pl-3">
										<AiOutlineUser className="text-gray-400 text-xl" />
									</span>
									<input
										type="text"
										className="pl-10 pr-3 py-2 border border-gray-300 rounded-sm w-full"
										placeholder="Enter City..."
										value={userInformation.city}
										name="city"
										onChange={handleDataChange}
									/>
								</div>
							</div>
							<div className="flex flex-col gap-y-1 w-full">
								<h1>
									Course Interested <span className="text-red-500">*</span>
								</h1>
								<div className="relative">
									<span className="absolute inset-y-0 left-0 flex items-center pl-3">
										<AiOutlineUser className="text-gray-400" />
									</span>
									<select
										className="pl-7 pr-3 py-2 border border-gray-300 rounded-sm w-full cursor-pointer outline-none"
										value={userInformation.interestedCourse}
										name="interestedCourse"
										onChange={handleDataChange}
									>
										<option>Please Select Preferred Course</option>
										{allCoursesData &&
											allCoursesData.map((course: any) => {
												// setCourseValue(course?.attributes?.name);
												return (
													<option key={course.id} value={course.id}>
														{course.attributes.name}
													</option>
												);
											})}
									</select>
								</div>
							</div>
						</div>
					</div>
					<div className="flex items-center justify-center">
						<button className="inline-flex w-fit my-4 px-4 md:px-8 py-3 bg-primary text-white rounded text-xl items-center justify-center"
							onClick={updateUserProfile}
						>
							Save And Proceed
						</button>
					</div>
				</div>
			)}

		</>
	);
};

export default Information;
