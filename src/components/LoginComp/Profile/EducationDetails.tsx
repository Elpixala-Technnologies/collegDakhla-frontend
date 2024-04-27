import Image from "next/image";
import { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";

const EducationDetails = () => {

  const [expanded, setExpanded] = useState(true);
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

  const handleToggle = () => {
    setExpanded(!expanded);
  };

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
                />
              </div>
            </div>
          </div>
          {/*2nd line  */}
  
          {/* 3rd line  */}
  
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
                />
              </div>
            </div>
          </div>
  
          <hr className="w-full" />
  
          <span className="text-lg">Addional Education Details</span>
  
          <div className="flex sm:flex-row flex-col justify-between gap-2 -mt-5">
            <div className="flex flex-row  items-center gap-2">
              <Image src={""} alt="image" width={20} height={20}  className="text-gray-400"/>
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
        <div className="flex items-center justify-center">
          <button className="inline-flex w-fit my-4 px-4 md:px-8 py-3 bg-primary text-white rounded text-xl items-center justify-center">
            Save And Proceed
          </button>
        </div>
      </div>
      )}
    
    </>
  );
};

export default EducationDetails;
