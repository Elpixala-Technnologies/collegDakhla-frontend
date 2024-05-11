import useUserMetaData from "@/query/hooks/useUserMetaData";
import { EducationDetailsProps, EducationPrimaryDetails, EducationSecondaryDetails, GraduationDetails, } from "@/types/global";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { FaGraduationCap } from "react-icons/fa6";

const EducationDetails = (educationData: { props: EducationDetailsProps }) => {
	const { userMetaId, setSelectedOption } = educationData.props;
	const [expanded, setExpanded] = useState(true);
	const { userMetaUpdate } = useUserMetaData();
	const [gradDetails, setGradDetails] = useState<GraduationDetails>({
		institutionName: "",
		passingYear: "",
		gradingSystem: "",
		grade: "",
		course: "",
	});

	const secondaryEducation: any = educationData.props.secondaryEducation;
	const [secondaryDetails, setSecondaryDetails] =
		useState<EducationSecondaryDetails>({
			schoolName: secondaryEducation?.schoolName || "",
			city: secondaryEducation?.city || "",
			passingYear: secondaryEducation?.passingYear || "",
			gradingSystem: secondaryEducation?.gradingSystem || "",
			grade: secondaryEducation?.grade || "",
			board: secondaryEducation?.board || "",
			stream: secondaryEducation?.stream || "",
		});

	const primaryEducation: any = educationData.props.primaryEducation;
	const [primaryDetails, setPrimaryDetails] = useState<EducationPrimaryDetails>(
		{
			schoolName: primaryEducation?.schoolName || "",
			city: primaryEducation?.city || "",
			passingYear: primaryEducation?.passingYear || "",
			gradingSystem: primaryEducation?.gradingSystem || "",
			grade: primaryEducation?.grade || "",
			board: primaryEducation?.board || "",
		}
	);

	const handleToggle = () => {
		setExpanded(!expanded);
	};

	const handleGradChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setGradDetails((prevValues) => {
			return { ...prevValues, [name]: value };
		});
	};

	const handleSecondaryChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setSecondaryDetails((prevValues) => {
			return { ...prevValues, [name]: value };
		});
	};

	const handlePrimaryChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setPrimaryDetails((prevValues) => {
			return { ...prevValues, [name]: value };
		});
	};

	const updateUserProfile = async (e: any) => {
		try {
			const response = await userMetaUpdate({
				variables: {
					id: userMetaId,
					graduationDetails: gradDetails,
					secondaryDetails: secondaryDetails,
					primaryDetails: primaryDetails,
				},
			});
			setSelectedOption("Desired Colleges");
			window.scrollTo({ top: 0, behavior: "smooth" });
		} catch (error) {
			console.log("error in updating user ", error);
		}
	};

	useEffect(() => {
		if (educationData.props.graduation) {
			const {
				institutionName,
				passingYear,
				gradingSystem,
				grade,
				course,
			}: any = educationData.props.graduation;

			setGradDetails({
				institutionName: institutionName || "",
				passingYear: passingYear || "",
				gradingSystem: gradingSystem || "",
				grade: grade || "",
				course: course || "",
			});
		}
	}, [educationData.props.graduation]);

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
				className="bg-[#F5F9FC] text-white font-bold py-2 px-4 my-4 rounded flex sm:hidden w-full cursor-pointer"
			>
				{expanded ? (
					<div className="flex flex-row mx-2 items-center justify-between w-full">
						<h4 className="text-lg font-normal text-black">Education details</h4>
						<Image src={""} alt="" className="" />
					</div>
				) : (
					<div className="flex flex-row mx-2 items-center justify-between w-full">
						<h4 className="text-lg font-normal text-black">Education details</h4>
						<Image src={""} alt="" className="" />
					</div>
				)}
			</div>
			{expanded && (
				<div className="flex flex-col px-4">
					<div className="pt-4 flex gap-5 flex-col items-start justify-start">
						<span className="text-2xl">Graduation Education Details</span>

						<div className="flex flex-row gap-4 items-center justify-start w-full">
							<div className="flex flex-col flex-1 gap-1 w-full">
								<h1>
									Institution Name<span className="text-red-500">*</span>
								</h1>
								<div className="relative">
									<span className="absolute inset-y-0 left-0 flex items-center pl-3">
										<AiOutlineUser className="text-gray-400 text-xl" />
									</span>
									<input
										type="text"
										className="pl-10 pr-3 py-2 border border-gray-300 rounded-sm w-full"
										placeholder=""
										name="institutionName"
										value={gradDetails.institutionName}
										onChange={handleGradChange}
									/>
								</div>
							</div>
						</div>

						<div className="flex flex-row gap-4 items-center justify-start w-full">
							<div className="flex flex-col flex-1 gap-1 w-full">
								<h1>
									Graduation Passing Year <span className="text-red-500">*</span>
								</h1>
								<div className="relative">
									<span className="absolute inset-y-0 left-0 flex items-center pl-3">
										<AiOutlineUser className="text-gray-400 text-xl" />
									</span>
									<input
										type="text"
										className="pl-10 pr-3 py-2 border border-gray-300 rounded-sm w-full"
										placeholder=""
										name="passingYear"
										value={gradDetails.passingYear}
										onChange={handleGradChange}
									/>
								</div>
							</div>
						</div>
						<div className="flex md:flex-row flex-col gap-4 items-center justify-start w-full">
							<div className="flex flex-col gap-1 flex-1 w-full">
								<h1>
									Grading System <span className="text-red-500">*</span>
								</h1>
								<div className="relative">
									<span className="absolute inset-y-0 left-0 flex items-center pl-3">
										<AiOutlineUser className="text-gray-400 text-xl" />
									</span>
									<input
										type="text"
										className="pl-10 pr-3 py-2 border border-gray-300 rounded-sm w-full"
										placeholder="Percentage"
										name="gradingSystem"
										value={gradDetails.gradingSystem}
										onChange={handleGradChange}
									/>
								</div>
							</div>
							<div className="flex flex-col gap-1 w-full flex-1">
								<h1>
									Percentage
									<span className="text-red-500">*</span>
								</h1>
								<div className="relative">
									<span className="absolute inset-y-0 left-0 flex items-center pl-3">
										<AiOutlineUser className="text-gray-400" />
									</span>
									<input
										type="text"
										className="pl-10 pr-3 py-2 border border-gray-300 rounded-sm w-full "
										placeholder="Percentage/Grade"
										name="grade"
										value={gradDetails.grade}
										onChange={handleGradChange}
									/>
								</div>
							</div>
						</div>
						<div className="flex flex-row gap-4 items-center justify-start w-full">
							<div className="flex flex-col flex-1 gap-1 w-full">
								<h1>
									Graduation Course <span className="text-red-500">*</span>
								</h1>
								<div className="relative">
									<span className="absolute inset-y-0 left-0 flex items-center pl-3">
										<FaGraduationCap className="text-gray-400 text-xl" />
									</span>
									<input
										type="text"
										className="pl-10 pr-3 py-2 border border-gray-300 rounded-sm w-full"
										placeholder=""
										name="course"
										value={gradDetails.course}
										onChange={handleGradChange}
									/>
								</div>
							</div>
						</div>

						{/* 4th line  */}
						<hr className="w-full h-2 " />

						<span className="text-2xl">12th Education Details</span>

						<div className="flex flex-row gap-4 items-center justify-start w-full">
							<div className="flex flex-col flex-1 gap-1 w-full">
								<h1>
									School Name <span className="text-red-500">*</span>
								</h1>
								<div className="relative">
									<span className="absolute inset-y-0 left-0 flex items-center pl-3">
										<AiOutlineUser className="text-gray-400 text-xl" />
									</span>
									<input
										type="text"
										className="pl-10 pr-3 py-2 border border-gray-300 rounded-sm w-full"
										placeholder=""
										name="schoolName"
										value={secondaryDetails.schoolName}
										onChange={handleSecondaryChange}
									/>
								</div>
							</div>
						</div>
						{/*2nd line  */}
						<div className="flex flex-row gap-4 items-center justify-between w-full">
							<div className="flex flex-col w-full flex-1 gap-1">
								<h1>
									City <span className="text-red-500">*</span>
								</h1>
								<div className="relative">
									<span className="absolute inset-y-0 left-0 flex items-center pl-3">
										<AiOutlineUser className="text-gray-400" />
									</span>
									<input
										type="text"
										className="pl-10 pr-3 py-2 border border-gray-300 rounded-sm w-full "
										placeholder=""
										name="city"
										value={secondaryDetails.city}
										onChange={handleSecondaryChange}
									/>
								</div>
							</div>
						</div>
						{/* 3rd line  */}
						<div className="flex flex-row gap-4 items-center justify-between w-full">
							<div className="flex flex-col gap-1 flex-1 w-full">
								<h1>
									12th Passing Year <span className="text-red-500">*</span>
								</h1>
								<div className="relative">
									<span className="absolute inset-y-0 left-0 flex items-center pl-3">
										<AiOutlineUser className="text-gray-400" />
									</span>
									<input
										type="text"
										className="pl-10 pr-3 py-2 border border-gray-300 rounded-sm w-full "
										placeholder=""
										name="passingYear"
										value={secondaryDetails.passingYear}
										onChange={handleSecondaryChange}
										maxLength={4}
									/>
								</div>
							</div>
						</div>

						{/* 4rd line  */}

						<div className="flex md:flex-row flex-col gap-4 items-center justify-start w-full">
							<div className="flex flex-col gap-1 flex-1 w-full">
								<h1>
									Grading System <span className="text-red-500">*</span>
								</h1>
								<div className="relative">
									<span className="absolute inset-y-0 left-0 flex items-center pl-3">
										<AiOutlineUser className="text-gray-400 text-xl" />
									</span>
									<input
										type="text"
										className="pl-10 pr-3 py-2 border border-gray-300 rounded-sm w-full"
										placeholder="Percentage"
										name="gradingSystem"
										value={secondaryDetails.gradingSystem}
										onChange={handleSecondaryChange}
									/>
								</div>
							</div>
							<div className="flex flex-col gap-1 w-full flex-1">
								<h1>
									<span className="text-red-500">*</span>
								</h1>
								<div className="relative">
									<span className="absolute inset-y-0 left-0 flex items-center pl-3">
										<AiOutlineUser className="text-gray-400" />
									</span>
									<input
										type="text"
										className="pl-10 pr-3 py-2 border border-gray-300 rounded-sm w-full "
										placeholder="Percentage/Grade"
										name="grade"
										value={secondaryDetails.grade}
										onChange={handleSecondaryChange}
									/>
								</div>
							</div>
						</div>
						{/* 4th line  */}
						<div className="flex flex-row gap-4 items-center justify-between w-full">
							<div className="flex flex-col gap-1 flex-1 w-full">
								<h1>
									Board <span className="text-red-500">*</span>
								</h1>
								<div className="relative">
									<span className="absolute inset-y-0 left-0 flex items-center pl-3">
										<AiOutlineUser className="text-gray-400" />
									</span>
									<input
										type="text"
										className="pl-10 pr-3 py-2 border border-gray-300 rounded-sm w-full "
										placeholder=""
										name="board"
										value={secondaryDetails.board}
										onChange={handleSecondaryChange}
									/>
								</div>
							</div>
						</div>

						{/* 5th line  */}
						<div className="flex flex-row gap-4 items-center justify-between w-full">
							<div className="flex flex-col gap-1 flex-1 w-full">
								<h1>
									Stream of Study <span className="text-red-500">*</span>
								</h1>
								<div className="relative">
									<span className="absolute inset-y-0 left-0 flex items-center pl-3">
										<AiOutlineUser className="text-gray-400" />
									</span>
									<input
										type="text"
										className="pl-10 pr-3 py-2 border border-gray-300 rounded-sm w-full "
										placeholder=""
										name="stream"
										value={secondaryDetails.stream}
										onChange={handleSecondaryChange}
									/>
								</div>
							</div>
						</div>

						<hr className="w-full" />
						<div>
							<h4 className="text-2xl">10th Education Details</h4>
							<div className="flex flex-row items-center gap-2">
								<input type="checkbox" className="h-10 w-5" />
								<span>Same as 12th</span>
							</div>
						</div>

						<div className="flex flex-row gap-4 items-center justify-between w-full">
							<div className="flex flex-col gap-1 flex-1 w-full">
								<h1>
									School Name <span className="text-red-500">*</span>
								</h1>
								<div className="relative">
									<span className="absolute inset-y-0 left-0 flex items-center pl-3">
										<AiOutlineUser className="text-gray-400" />
									</span>
									<input
										type="text"
										className="pl-10 pr-3 py-2 border border-gray-300 rounded-sm w-full "
										placeholder=""
										name="schoolName"
										value={primaryDetails.schoolName}
										onChange={handlePrimaryChange}
									/>
								</div>
							</div>
						</div>
						{/*2nd line  */}
						<div className="flex flex-row gap-4 items-center justify-between w-full">
							<div className="flex flex-col gap-1 flex-1 w-full">
								<h1>
									City <span className="text-red-500">*</span>
								</h1>
								<div className="relative">
									<span className="absolute inset-y-0 left-0 flex items-center pl-3">
										<AiOutlineUser className="text-gray-400" />
									</span>
									<input
										type="text"
										className="pl-10 pr-3 py-2 border border-gray-300 rounded-sm w-full "
										placeholder=""
										name="city"
										value={primaryDetails.city}
										onChange={handlePrimaryChange}
									/>
								</div>
							</div>
						</div>
						{/* 3rd line  */}
						<div className="flex flex-row gap-4 items-center justify-between w-full">
							<div className="flex flex-col gap-1 flex-1 w-full">
								<h1>
									10th Passing Year <span className="text-red-500">*</span>
								</h1>
								<div className="relative">
									<span className="absolute inset-y-0 left-0 flex items-center pl-3">
										<AiOutlineUser className="text-gray-400" />
									</span>
									<input
										type="text"
										className="pl-10 pr-3 py-2 border border-gray-300 rounded-sm w-full "
										placeholder=""
										name="passingYear"
										value={primaryDetails.passingYear}
										onChange={handlePrimaryChange}
									/>
								</div>
							</div>
						</div>

						{/* 4rd line  */}

						<div className="flex md:flex-row flex-col gap-4 items-center justify-start w-full">
							<div className="flex flex-col gap-1 flex-1 w-full">
								<h1>
									Grading System <span className="text-red-500">*</span>
								</h1>
								<div className="relative">
									<span className="absolute inset-y-0 left-0 flex items-center pl-3">
										<AiOutlineUser className="text-gray-400 text-xl" />
									</span>
									<input
										type="text"
										className="pl-10 pr-3 py-2 border border-gray-300 rounded-sm w-full"
										placeholder="Percentage"
										name="gradingSystem"
										value={primaryDetails.gradingSystem}
										onChange={handlePrimaryChange}
									/>
								</div>
							</div>
							<div className="flex flex-col gap-1 w-full flex-1">
								<h1>
									<span className="text-red-500">*</span>
								</h1>
								<div className="relative">
									<span className="absolute inset-y-0 left-0 flex items-center pl-3">
										<AiOutlineUser className="text-gray-400" />
									</span>
									<input
										type="text"
										className="pl-10 pr-3 py-2 border border-gray-300 rounded-sm w-full "
										placeholder="Percentage/Grade"
										name="grade"
										value={primaryDetails.grade}
										onChange={handlePrimaryChange}
									/>
								</div>
							</div>
						</div>

						{/* 4th line  */}
						<div className="flex flex-row gap-4 items-center justify-between w-full">
							<div className="flex flex-col gap-1 flex-1 w-full">
								<h1>
									Board <span className="text-red-500">*</span>
								</h1>
								<div className="relative">
									<span className="absolute inset-y-0 left-0 flex items-center pl-3">
										<AiOutlineUser className="text-gray-400" />
									</span>
									<input
										type="text"
										className="pl-10 pr-3 py-2 border border-gray-300 rounded-sm w-full "
										placeholder=""
										name="board"
										value={primaryDetails.board}
										onChange={handlePrimaryChange}
									/>
								</div>
							</div>
						</div>

						<hr className="w-full" />

						<span className="text-lg">Addional Education Details</span>

						<div className="flex sm:flex-row flex-col justify-between gap-2 -mt-5">
							<div className="flex flex-row  items-center gap-2">
								<Image src={""} alt="image" width={20} height={20} className="text-gray-400" />
								{/* <QuestionMarkOutlined className="text-gray-400" /> */}
								<span>Have you appeared or scheduled for any entrance exams?</span>
							</div>

							<div className="sm:gap-4 gap-2 flex items-center">
								<label className="flex items-center gap-1">
									<input type="radio" value="option" name="options" />
									Yes
								</label>

								<label className="flex items-center gap-1">
									<input type="radio" value="option2" name="options" />
									No
								</label>

								<label className="flex items-center gap-1">
									<input type="radio" value="option3" name="options" />
									Booked
								</label>
							</div>
						</div>
					</div>
					<div className="flex flex-row items-center justify-between gap-2 px-4 py-4">
						<button
							className="inline-flex w-fit px-4 py-2 border-primary border text-secondary rounded text-sm items-center justify-center"
							onClick={(e) => {
								setSelectedOption("Your Information");
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}
						>
							Previous
						</button>
						<button
							className="inline-flex w-fit px-4 py-2 bg-primary text-white rounded text-sm items-center justify-center"
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

export default EducationDetails;
