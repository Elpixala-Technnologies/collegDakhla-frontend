import Image from "next/image";
import { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";

const Information = () => {
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
                    <input
                      type="text"
                      className="pl-10 pr-3 py-2 border border-gray-300 rounded-sm w-full"
                      placeholder="Enter Gender..."
                    />
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
                  <input
                    type="text"
                    className="pl-10 pr-3 py-2 border border-gray-300 rounded-sm w-full "
                    placeholder="Enter Course Interest..."
                  />
                </div>
              </div>
            </div>

            <div className="flex md:flex-row flex-col gap-4 items-center justify-start">
              <div className="flex flex-col gap-y-1 w-full">
                <h1>
                  What currently describes you best?{" "}
                  <span className="text-red-500">*</span>
                </h1>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <AiOutlineUser className="text-gray-400 text-xl" />
                  </span>
                  <input
                    type="text"
                    className="pl-10 pr-3 py-2 border border-gray-300 rounded-sm w-full"
                    placeholder="Enter description..."
                  />
                </div>
              </div>
              <div className="flex flex-col gap-y-1 w-full">
                <h1>
                  What currently describes you best?{" "}
                  <span className="text-red-500">*</span>
                </h1>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <AiOutlineUser className="text-gray-400" />
                  </span>
                  <input
                    type="text"
                    className="pl-10 pr-3 py-2 border border-gray-300 rounded-sm w-full "
                    placeholder="Enter description..."
                  />
                </div>
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

export default Information;
