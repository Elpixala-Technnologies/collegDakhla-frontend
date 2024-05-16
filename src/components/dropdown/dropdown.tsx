import { DownAngleThinIcon } from "../../Asset/index";
import React, { useState } from "react";
import Image from "next/image";

const Dropdown = ({
  options,
  onSelect,
  title,
  placeholder = "Select an option",
}: {
  options: Array<any>;
  onSelect: Function;
  title?: string;
  placeholder?: string;
}) => {
  const [selectedOption, setSelectedOption] = useState<any>({});
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option: any) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };
  
  return (
    <div className="flex flex-col gap-1">
      {title ? <p className="text-xl font-medium">{title}</p> : <></>}
      <div className="relative inline-block">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full border border-primary-text-light bg-[#428BC10D]  text-primary-text py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          <div className="flex gap-2 items-center justify-between">
            <div>
              <span>
                {selectedOption.label ? selectedOption.label : placeholder}
              </span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="8"
              viewBox="0 0 16 8"
              fill="none"
              className={`transition-transform duration-300 ${
                isOpen ? 'rotate-180' : ''
              }`}
            >
              <path
                d="M8 2.02591L1.89462 6.87592C1.84542 6.91585 1.78701 6.94742 1.72276 6.9688C1.65852 6.99018 1.58971 7.00094 1.52034 7.00047C1.45096 7 1.38239 6.98831 1.31859 6.96606C1.25479 6.94381 1.19703 6.91145 1.14864 6.87086C1.10026 6.83027 1.06222 6.78224 1.03672 6.72957C1.01122 6.6769 0.998774 6.62062 1.0001 6.56399C1.00142 6.50736 1.01648 6.45151 1.04442 6.39967C1.07235 6.34782 1.1126 6.30102 1.16284 6.26196L7.63411 1.12182C7.73206 1.04402 7.86334 1.00049 8 1.00049C8.13666 1.00049 8.26793 1.04402 8.36589 1.12182L14.8372 6.26196C14.8874 6.30102 14.9276 6.34782 14.9556 6.39967C14.9835 6.45151 14.9986 6.50736 14.9999 6.56399C15.0012 6.62062 14.9888 6.6769 14.9633 6.72957C14.9378 6.78224 14.8997 6.83027 14.8514 6.87086C14.803 6.91145 14.7452 6.94381 14.6814 6.96606C14.6176 6.98831 14.549 7 14.4797 7.00047C14.4103 7.00094 14.3415 6.99018 14.2772 6.9688C14.213 6.94742 14.1546 6.91585 14.1054 6.87592L8 2.02591Z"
                fill="#020014"
                fill-opacity="0.7"
              />
              <path
                d="M7.32313 0.730298L7.32314 0.730289C7.51786 0.575626 7.76153 0.500489 8 0.500489C8.23847 0.500489 8.48214 0.575627 8.67686 0.730289L8.67687 0.730298L15.1465 5.86912C15.2461 5.94708 15.3328 6.04558 15.3958 6.16249M7.32313 0.730298L15.3958 6.16249M7.32313 0.730298L0.853545 5.8691C0.753899 5.94706 0.667254 6.04556 0.60425 6.16249C0.540444 6.2809 0.503464 6.41371 0.500231 6.55233C0.496997 6.69101 0.527773 6.82574 0.586677 6.94742C0.645304 7.06854 0.729162 7.17159 0.827272 7.2539C0.925229 7.33609 1.03697 7.39738 1.15396 7.43818C1.271 7.47899 1.39415 7.49963 1.51695 7.50046C1.63975 7.50129 1.76312 7.48233 1.88064 7.44322C1.99716 7.40444 2.10879 7.34554 2.20731 7.26608L8 2.66447L13.7927 7.2661C13.8912 7.34555 14.0029 7.40445 14.1194 7.44322C14.2369 7.48233 14.3603 7.50129 14.4831 7.50046C14.6058 7.49963 14.729 7.47899 14.846 7.43818C14.963 7.39738 15.0748 7.33609 15.1727 7.2539L14.8514 6.87086L15.1727 7.2539C15.2708 7.17158 15.3547 7.06853 15.4133 6.94743C15.4722 6.82574 15.503 6.69101 15.4998 6.55233C15.4965 6.41371 15.4596 6.28091 15.3958 6.16249M7.32313 0.730298L15.3958 6.16249"
                stroke="#020014"
                stroke-opacity="0.7"
              />
            </svg>
          </div>
        </button>

        {isOpen && (
          <div  className="absolute mt-2 w-fit z-10 bg-white border shadow-md rounded-md overflow-y-auto  max-h-60">
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleOptionClick(option)}
                className="py-2 px-4 cursor-pointer hover:bg-gray-100 z-50 w-full text-nowrap"
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
