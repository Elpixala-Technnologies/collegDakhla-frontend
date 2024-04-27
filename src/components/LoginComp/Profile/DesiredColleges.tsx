// import { DeleteForeverRounded, QuestionMarkOutlined } from "@mui/icons-material"
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { PiPlus } from "react-icons/pi";

const DesiredColleges = () => {
  const [expanded, setExpanded] = useState(true);
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
            <div className="border border-gray-300 w-full p-6 rounded-md">
              <div className="flex md:flex-row flex-col gap-4 items-center justify-start w-full">
                <div className="flex flex-col gap-1 flex-1 w-full">
                  <div className="flex flex-row justify-between">
                    <h1>
                      Select College <span className="text-red-500">*</span>
                    </h1>
                    <Image src={""} alt="" className="text-red-500 -mt-5" />
                  </div>
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
                    Status <span className="text-red-500">*</span>
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
            </div>

            <div className="border border-gray-300 w-full p-6 rounded-md">
              <div className="flex md:flex-row flex-col gap-4 items-center justify-start w-full">
                <div className="flex flex-col gap-1 flex-1 w-full">
                  <div className="flex flex-row justify-between">
                    <h1>
                      Select College <span className="text-red-500">*</span>
                    </h1>
                    <Image src={""} alt="" className="text-red-500 -mt-5" />
                  </div>
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
                    Status <span className="text-red-500">*</span>
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
            </div>

            <div className="flex flex-row items-center justify-between border border-primary rounded px-4 py-2">
              <PiPlus className="text-primary text-lg" />
              <button className="text-primary flex flex-row text-light">
                Add More
              </button>
            </div>
          </div>

          <div className="flex flex-row items-center justify-between gap-2">
            <button className="inline-flex w-fit my-4 px-4 md:px-8 py-3 border-primary border text-secondary rounded text-xl items-center justify-center">
              Previous
            </button>
            <button className="inline-flex w-fit my-4 px-4 md:px-8 py-3 bg-primary text-white rounded text-xl items-center justify-center">
              Save And Proceed
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DesiredColleges;
