"use client"
import useUserMetaData from "@/query/hooks/useUserMetaData";
import { ProfessionalInformation } from "@/types/global";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { PiPlus } from "react-icons/pi";
import { useRouter } from 'next/navigation'
import { DropDown, Trash } from "@/Asset";
import { MdLocalPostOffice } from "react-icons/md";
import { HiMiniBuildingOffice } from "react-icons/hi2";

const Professional = (professionalInformationProps: any) => {
	const { userMetaId, setSelectedOption } = professionalInformationProps.props;
	const { userMetaUpdate } = useUserMetaData();
	const [expanded, setExpanded] = useState(true);
	const [companyCount, setCompanyCount] = useState(1);
	const router = useRouter()

	const [companies, setCompanies] = useState(
		professionalInformationProps.props.professionalExperience
			? Array.from(
				{
					length:
						professionalInformationProps.props.professionalExperience.length,
				},
				(_, i) => ({ id: i + 1 })
			)
			: []
	);

	const [organization, setOrganization] = useState<ProfessionalInformation>({
		data: professionalInformationProps.props.professionalExperience
			? professionalInformationProps.props.professionalExperience.map(
				(experience: any, index: number) => ({
					id: experience.id,
					attributes: {
						organizationName: experience.organizationName,
						jobPosition: experience.jobPosition,
						jobStart: experience.jobStart,
						jobEnd: experience.jobEnd,
					},
				})
			)
			: [{
				id: 1,
				attributes: {
					organizationName: "",
					jobPosition: "",
					jobStart: "",
					jobEnd: "",
				},
			}],
	});

	const handleToggle = () => {
		setExpanded(!expanded);
	};

	const handleAddMore = () => {
		if (companyCount < 5) {
			setCompanyCount(companyCount + 1);
			setOrganization((prevState) => ({
				data: [
					...prevState.data,
					{
						id: prevState.data.length + 1,
						attributes: {
							organizationName: "",
							jobPosition: "",
							jobStart: "",
							jobEnd: "",
						},
					},
				],
			}));

			setCompanies([...companies, { id: companyCount + 1 }]);
		}
	};

	const handleRemove = (id: any) => {
		setCompanies(companies.filter((company) => company.id !== id));
		setOrganization((prevState) => ({
			data: prevState.data.filter((data) => data.id !== id),
		}));

		setCompanyCount(companyCount - 1);
	};

	const handleDataChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
		index: number
	) => {
		const { name, value } = e.target;
		const newData = [...organization.data];

		if (index >= 0 && index < newData.length) {
			newData[index].attributes[
				name as keyof (typeof newData)[number]["attributes"]
			] = value;
		} else {
			newData.push({
				id: newData.length + 1,
				attributes: {
					organizationName: "",
					jobPosition: "",
					jobStart: "",
					jobEnd: "",
				},
			});
			newData[newData.length - 1].attributes[
				name as keyof (typeof newData)[number]["attributes"]
			] = value;
		}

		setOrganization({ data: newData });
	};

	const updateUserProfile = async (e: any) => {
		try {
			const response = await userMetaUpdate({
				variables: {
					id: userMetaId,
					professionalExperience: organization.data.map(
						(item) => item.attributes
					),
				},
			});
			router.push("/");
		} catch (error) {
			console.log("error in updating user ", error);
		}
	};

	useEffect(() => {
		const handleResize = () => {
			const isMobile = window.innerWidth < 640; // Adjust breakpoint as needed
			setExpanded(!isMobile); // Set expanded to true for desktop/laptop, false for mobile
		};

		handleResize(); // Set initial state based on current width

		window.addEventListener("resize", handleResize); // Listen for window resize events

		return () => {
			window.removeEventListener("resize", handleResize); // Clean up listener on component unmount
		};
	}, []);

	return (
		<>
			<div
				onClick={handleToggle}
				className="bg-[#F5F9FC] text-white font-bold py-2 px-4 my-4 rounded flex sm:hidden w-full items-start cursor-pointer"
			>
				{expanded ? (
					<div className="flex flex-row mx-2 items-center justify-between w-full">
						<span className="text-lg font-normal text-black">
							Professional Experience
						</span>
						<Image src={DropDown} alt="" className="" />
					</div>
				) : (
					<div className="flex flex-row mx-2 items-center justify-between w-full">
						<span className="text-lg font-normal text-black">
							Professional Experience
						</span>
						<Image src={DropDown} alt="" className="" />
					</div>
				)}
			</div>
			{expanded && (
				<div className="flex flex-col px-4">
					<div className="pt-4 flex gap-5 flex-col items-start justify-start">
						<span className="sm:text-2xl">Companies you have worked for:</span>
						{organization?.data?.map((company, index) => (
							<div
								key={index}
								className="border border-gray-300 w-full p-6 rounded-md flex flex-col gap-2"
							>
								<div className="flex md:flex-row flex-col gap-4 items-center justify-start w-full">
									<div className="flex flex-col gap-1.5 flex-1 w-full">
										<div className="flex justify-between items-center">
											<h1>Organization Name</h1>

											{companyCount > 1 && (
												<button onClick={() => handleRemove(company.id)}>
													<Image
														src={Trash}
														alt=""
														className="text-red-500 -mt-5"
													/>
												</button>
											)}
										</div>
										<div className="flex items-center border border-gray-300 rounded-sm px-4 gap-1">
											<MdLocalPostOffice className="text-gray-400 text-xl" />
											<input
												type="text"
												className="py-2 w-full text-sm outline-none"
												placeholder="Enter Your Organization Name"
												name="organizationName"
												value={company?.attributes?.organizationName}
												onChange={(e) => handleDataChange(e, index)}
											/>
										</div>
									</div>
								</div>
								<div className="flex md:flex-row flex-col gap-4 items-center justify-start w-full">
									<div className="flex flex-col gap-1 flex-1 w-full">
										<h1>Job Position</h1>
										<div className="flex items-center  gap-1  border border-gray-300 rounded-sm px-4">
											<HiMiniBuildingOffice className="text-gray-400 text-xl" />
											<input
												type="text"
												className="py-2 w-full text-sm outline-none"
												placeholder="Enter your job position"
												name="jobPosition"
												value={company?.attributes?.jobPosition}
												onChange={(e) => handleDataChange(e, index)}
											/>
										</div>
									</div>
								</div>

								<div className="flex md:flex-row flex-col gap-4 items-center justify-start w-full">
									<div className="flex flex-col flex-1 w-full gap-1.5">
										<h1>From</h1>
										<div className=" border border-gray-300 rounded-sm flex items-center gap-1 px-4">
											{/* <AiOutlineUser className="text-gray-400 text-xl" /> */}
											<input
												type="date"
												className="py-2 w-full outline-none cursor-pointer appearance-none text-gray-600"
												placeholder="When you started"
												// value={startDate}
												// onChange={handleStartDateChange}
												name="jobStart"
												value={company?.attributes?.jobStart}
												onChange={(e) => handleDataChange(e, index)}
											/>
										</div>
									</div>
									<div className="flex flex-col w-full flex-1 gap-1.5">
										<h1>to</h1>
										<div className="border border-gray-300 rounded-sm flex items-center gap-1 px-4">
											{/* <AiOutlineUser className="text-gray-400" /> */}
											<input
												type="date"
												className="py-2 w-full outline-none cursor-pointer appearance-none text-gray-600"
												placeholder="When you ended or still working"
												// value={endDate}
												// onChange={handleEndDateChange}
												name="jobEnd"
												value={company?.attributes?.jobEnd}
												onChange={(e) => handleDataChange(e, index)}
											/>
										</div>
									</div>
								</div>
							</div>
						))}
						{companyCount < 5 && (
							<div className="w-full flex items-center justify-center">
								<div
									className="flex flex-row items-center border border-primary rounded-full p-3 cursor-pointer"
									onClick={handleAddMore}
								>
									<PiPlus className="text-primary text-sm" />
								</div>
							</div>
						)}
					</div>

					<div className="flex flex-row items-center justify-between gap-2 px-4 py-4">
						<button
							className="inline-flex w-fit px-4 py-2 border-primary border text-secondary rounded text-sm items-center justify-center"
							onClick={(e) => {
								setSelectedOption("Desired Colleges");
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}
						>
							Previous
						</button>
						<button
							className="inline-flex w-fit px-4 py-2 bg-primary text-white rounded text-sm items-center justify-center"
							onClick={updateUserProfile}
						>
							Save
						</button>
					</div>
				</div>
			)}
		</>
	);
};

export default Professional;
