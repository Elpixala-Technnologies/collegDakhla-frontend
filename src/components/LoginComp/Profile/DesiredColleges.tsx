// import { DeleteForeverRounded, QuestionMarkOutlined } from "@mui/icons-material"
import { Trash } from "@/Asset";
import useApplication from "@/query/hooks/useApplication";
import useColleges from "@/query/hooks/useColleges";
import useUserMetaData from "@/query/hooks/useUserMetaData";
import { DesiredCollegesInformation } from "@/types/global";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaGraduationCap } from "react-icons/fa6";
import { PiPlus } from "react-icons/pi";

const DesiredColleges = (desiredCollegesProps: any) => {
	const { userMetaId, setSelectedOption } = desiredCollegesProps.props;
	const [expanded, setExpanded] = useState(true);
	const [collegeCount, setCollegeCount] = useState(1);
	const { allCollegesData } = useColleges();
	const { allApplicationSteps } = useApplication();
	const { userMetaUpdate } = useUserMetaData();

	const [appliedColleges, setAppliedColleges] =
		useState<DesiredCollegesInformation>({
			data: desiredCollegesProps.props.appliedColleges
				? desiredCollegesProps.props.appliedColleges.map(
					(appliedCollege: any, index: number) => ({
						id: 1,
						attributes: {
							college: appliedCollege?.college?.data?.id,
							current_step: "",
						}
					})
				) : [
					{
						id: 1,
						attributes: {
							college: "",
							current_step: "",
						},
					},
				],
		});

	const handleToggle = () => {
		setExpanded(!expanded);
	};

	const handleAddMore = () => {
		if (collegeCount < 5) {
			setCollegeCount(collegeCount + 1);
			setAppliedColleges((prevState) => ({
				data: [
					...prevState.data,
					{
						id: prevState.data.length + 1,
						attributes: {
							college: "",
							current_step: "",
						},
					},
				],
			}));
		}
	};

	const handleRemove = (id: any) => {
		setCollegeCount(collegeCount - 1);

		setAppliedColleges((prevState) => ({
			data: prevState.data.filter((college) => college.id !== id),
		}));
	};

	const handleDataChange = (
		e: React.ChangeEvent<HTMLSelectElement>,
		index: number
	) => {
		const { name, value } = e.target;
		const newData = [...appliedColleges.data];

		if (index >= 0 && index < newData.length) {
			newData[index].attributes[
				name as keyof (typeof newData)[number]["attributes"]
			] = value;
		} else {
			newData.push({
				id: newData.length + 1,
				attributes: {
					college: "",
					current_step: "",
				},
			});
			newData[newData.length - 1].attributes[
				name as keyof (typeof newData)[number]["attributes"]
			] = value;
		}
		setAppliedColleges({ data: newData });
	};

	const updateUserProfile = async (e: any) => {
		try {
			const response = await userMetaUpdate({
				variables: {
					id: userMetaId,
					appliedColleges: appliedColleges.data.map((item) => item.attributes),
				},
			});
			setSelectedOption("Professional Experience");
			window.scrollTo({ top: 0, behavior: "smooth" });
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
				className="bg-[#F5F9FC] text-white font-bold py-2 px-4 my-4 rounded flex sm:hidden w-full cursor-pointer"
			>
				{expanded ? (
					<div className="flex flex-row mx-2 items-center justify-between w-full">
						<span className="text-lg font-normal text-black">
							Desired Colleges
						</span>
						<Image src={""} alt="" className="" />
					</div>
				) : (
					<div className="flex flex-row mx-2 items-center justify-between w-full">
						<span className="text-lg font-normal text-black">
							Desired Colleges
						</span>
						<Image src={""} alt="" className="" />
					</div>
				)}
			</div>
			{expanded && (
				<div className="flex flex-col px-4">
					<div className="pt-4 flex gap-5 flex-col items-start justify-start">
						<span className="text-2xl">Colleges You Applied/Applying To:</span>

						{appliedColleges?.data?.map((appliedCollege, index) => (
							<div className="border border-gray-300 w-full p-6 rounded-md" key={index}>
								<div className="flex md:flex-row flex-col gap-4 items-center justify-start w-full">
									<div className="flex flex-col gap-1 flex-1 w-full">
										<div className="flex flex-row justify-between">
											<h1>
												Select College <span className="text-red-500">*</span>
											</h1>
											{collegeCount > 1 && (
												<button onClick={() => handleRemove(appliedCollege.id)}>
													<Image
														src={Trash}
														alt=""
														className="text-red-500 -mt-5"
													/>
												</button>
											)}
										</div>
										<div className="flex items-center gap-1 border border-gray-300 rounded relative">
											<span className="absolute inset-y-0 left-0 flex items-center pl-3">
												<FaGraduationCap className="text-gray-400" />
											</span>
											<select
												onChange={(e) => handleDataChange(e, index)}
												className="pl-8 py-2 w-full text-sm outline-none text-gray-400 cursor-pointer rounded"
												value={appliedCollege?.attributes?.collegeName}
												name="college"
											>
												<option value="" className="mt-1  w-40">
													Please Select Applied College
												</option>
												{allCollegesData &&
													allCollegesData.map((college: any) => (
														<option
															key={college?.id}
															value={college?.id}
															className="w-40"
														>
															{college?.attributes?.collegeName}
														</option>
													))}
											</select>
										</div>
									</div>
								</div>
								<div className="flex md:flex-row flex-col gap-4 items-center justify-start w-full">
									<div className="flex flex-col gap-1 flex-1 w-full">
										<h1>
											Status <span className="text-red-500">*</span>
										</h1>
										<div className="flex items-center gap-1 border border-gray-300 rounded relative">
											<span className="absolute inset-y-0 left-0 flex items-center pl-3">
												<FaGraduationCap className="text-gray-400" />
											</span>
											<select
												onChange={(e) => handleDataChange(e, index)}
												className="pl-8 py-2 w-full text-sm text-gray-400 cursor-pointer outline-none rounded"
												value={appliedCollege?.attributes?.current_step}
												name="current_step"
											>
												<option value="">Please Select of Application</option>
												{allApplicationSteps &&
													allApplicationSteps.map((step: any) => (
														<option key={step?.id} value={step?.id}>
															{step?.attributes?.step_name}
														</option>
													))}
											</select>
										</div>
									</div>
								</div>
							</div>
						))}

						{collegeCount < 5 && (
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
								setSelectedOption("Education Details");
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

export default DesiredColleges;
