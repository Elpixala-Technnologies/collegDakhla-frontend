import Image from "next/image";
import { BiSolidQuoteLeft, BiSolidQuoteRight } from "react-icons/bi";

export default function TestimonyCard() {
  return (
    <>
      <div className="shadow-lg">
        <div className="relative rounded-lg h-56 w-full md:w-96">
          <div className="absolute inset-0 bg-[#8d6e63] bg-opacity-50 rounded-t-lg"></div>
          <div className="absolute  p-4 flex flex-col w-full md:w-96 rounded-b-lg text-white">
            <div className="text-3xl">
              <BiSolidQuoteLeft />
            </div>
            <p className="text-base md:text-lg">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s
            </p>
            <div className="text-3xl w-1/2 flex justify-end">
              <BiSolidQuoteRight />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 flex gap-4  w-full md:w-96 rounded-b-lg">
          <div>
            <Image src={"/avatar.svg"} alt="" width={56} height={56} />
          </div>
          <div>
            <span className="font-semibold">Atul Diwedi, </span>
            <span className="font-light">Studying at University of Bombay</span>
          </div>
        </div>
      </div>
    </>
  );
}
