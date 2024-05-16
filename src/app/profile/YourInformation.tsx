import { useState } from "react";
import Information from "../../components/LoginComp/Profile/Information";
import EducationDetails from "../../components/LoginComp/Profile/EducationDetails";
import DesiredColleges from "../../components/LoginComp/Profile/DesiredColleges";
import Professional from "../../components/LoginComp/Profile/Professional";
import { useAppSelector } from "@/store";
import useSignup from "@/query/hooks/useSignup";
import useUserMetaData from "@/query/hooks/useUserMetaData";
import { EducationDetailsProps, ID, InformationProps } from "@/types/global";

export default function YourInformation() {
	const options = [
		"Your Information",
		"Education Details",
		"Desired Colleges",
		"Professional Experience",
	];
	const [selectedOption, setSelectedOption] = useState("Your Information");
	const { userID } = useAppSelector((store: any) => store.auth);
	const { GetUserDataMetaId } = useSignup()
	const { GetUserMetaData } = useUserMetaData();
	const userMetaId: ID = GetUserDataMetaId(userID);

	const userData = GetUserMetaData(userMetaId);

	const informationData: InformationProps = {
		userMetaId: userMetaId,
		setSelectedOption: setSelectedOption,
		userData: {
			name: userData.userAllMetaData?.name,
			email: userData.userAllMetaData?.email,
			number: userData.userAllMetaData?.number,
			gender: userData.userAllMetaData?.gender,
			city: userData.userAllMetaData?.city,
			courseIntrested:
				userData.userAllMetaData?.courseInterested?.data?.attributes
					?.name,
		},
	};

	const educationDetailsData: EducationDetailsProps = {
		userMetaId: userMetaId,
		setSelectedOption: setSelectedOption,
		primaryEducation: userData?.userAllMetaData?.educationDetailsPrimary,
		secondaryEducation: userData?.userAllMetaData?.educationDetailsSecondary,
		graduation: userData?.userAllMetaData?.graduationDetails,
	};

	const desiredCollegesData = {
		userMetaId: userMetaId,
		setSelectedOption: setSelectedOption,
		appliedColleges: userData?.userAllMetaData?.appliedColleges,
	};

	const professionalDetailsData = {
		userMetaId: userMetaId,
		setSelectedOption: setSelectedOption,
		professionalExperience: userData?.userAllMetaData?.professionalExperience
	}


	const handleOptionClick = (option: any) => {
		setSelectedOption(option);
	};

	return (
		<div className="shadow-lg border rounded-lg mt-5 md:mt-0 flex flex-col w-full px-4 md:px-0">
			<div className="flex flex-col md:flex-row md:gap-4 items-center justify-between">
				{options.map((option, index) => (
					<div key={index} className="flex-1">
						<div
							className={`hover:text-black sm:flex hidden text-xs md:text-base text-center justify-center py-2 lg:px-4 font-work-sans capitalize cursor-pointer lg:p-2 w-full ${selectedOption === option
								? "text-gray-900 border-b border-b-orange-500 bg-orange-50 font-medium"
								: "text-gray-500 font-normal"
								}`}
							onClick={() => handleOptionClick(option)}
						>
							{option}
						</div>
					</div>
				))}
			</div>
			{/* <hr className="w-full" /> */}

			{/* Render components based on selected option */}
			<div className="flex flex-col">
				{/* For mobile devices, render all components sequentially */}
				<div className=" sm:hidden ">
					<Information props={informationData} />
					<EducationDetails props={educationDetailsData} />
					<DesiredColleges props={desiredCollegesData} />
					<Professional props={professionalDetailsData} />
				</div>

				{/* For larger screens, render based on selected option */}
				<div className="hidden sm:flex flex-col">
					{selectedOption === "Your Information" && (
						<Information props={informationData} />
					)}
					{selectedOption === "Education Details" && (
						<EducationDetails props={educationDetailsData} />
					)}
					{selectedOption === "Desired Colleges" && (
						<DesiredColleges props={desiredCollegesData} />
					)}
					{selectedOption === "Professional Experience" && (
						<Professional props={professionalDetailsData} />
					)}
				</div>
			</div>
		</div>
	);
}
