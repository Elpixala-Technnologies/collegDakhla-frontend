import Image from "next/image";
import { RiSearchLine } from "react-icons/ri";
export default function HeroSection() {
  return (
    <>
      <div className="relative w-full h-[90vh] overflow-hidden">
        <img
          src={"/collegeImg.jpg"}
          alt="College"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 p-2 flex flex-col justify-center items-center">
          <h1 className="text-white text-xl sm:text-4xl py-4">
            Find 2500+ colleages in India
          </h1>
          <div className="Search flex bg-white items-center rounded-md w-8/12 min-w-min">
            <div className="p-3 text-extra-light-text">
              <RiSearchLine />
            </div>
            <div className="flex-1">
              <input type="text" placeholder="Search For college, Exam" />
            </div>
            <div className="px-4 py-2 bg-primary text-white font-bold text-lg rounded-r-md">
              search
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

{
  /* <div className="relative w-screen h-[90vh] overflow-hidden">
  <img
    src={"/collegeImg.jpg"}
    alt="College"
    className="object-cover w-full h-full"
  />
  <div className="absolute inset-0 bg-black bg-opacity-50"></div>
  <div className="absolute inset-0 p-2 flex flex-col justify-center  items-center">
    <div className="bg-white rounded-full px-2 py-1 text-xs">
      Featured
    </div>
  </div>
</div>
</div> */
}
