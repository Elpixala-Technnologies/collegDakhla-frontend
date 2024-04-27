import { useState } from "react";
import Information from "../../components/LoginComp/Profile/Information";
import EducationDetails from "../../components/LoginComp/Profile/EducationDetails";
import DesiredColleges from "../../components/LoginComp/Profile/DesiredColleges";
import Professional from "../../components/LoginComp/Profile/Professional";

export default function YourInformation() {
  const [selectedOption, setSelectedOption] = useState("Your Information");

  const handleOptionClick = (option:any) => {
    setSelectedOption(option);
  };

  const options = [
    "Your Information",
    "Education Details",
    "Desired Colleges",
    "Professional Experience",
  ];

  return (
    <div className="shadow-lg border rounded-lg mt-5 md:mt-0 flex flex-col w-full px-4 md:px-0">
      <div className="flex flex-col md:flex-row md:gap-4 items-center justify-between">
        {options.map((option, index) => (
          <div key={index} className="flex-1">
            <div
              className={`hover:text-black sm:flex hidden text-xs md:text-base text-center justify-center py-2 lg:px-4 font-work-sans capitalize cursor-pointer lg:p-2 w-full ${
                selectedOption === option
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
          <Information />
          <EducationDetails />
          <DesiredColleges />
          <Professional />
        </div>

        {/* For larger screens, render based on selected option */}
        <div className="hidden sm:flex flex-col">
          {selectedOption === "Your Information" && <Information />}
          {selectedOption === "Education Details" && <EducationDetails />}
          {selectedOption === "Desired Colleges" && <DesiredColleges />}
          {selectedOption === "Professional Experience" && <Professional />}
        </div>
      </div>
    </div>
  );
}
