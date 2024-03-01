import Link from "next/link";
import { FaAngleDown } from "react-icons/fa";
import "./style.css";
import { ReactNode, useState } from "react";

type Props = {
  children: ReactNode;
  title: ReactNode;
};
export default function Tooltip({ children, title }: Props) {
  const [ShowOption, setShowOption] = useState(false);
  const handleShowOption = () => {
    setShowOption(!ShowOption);
  };
  return (
    <>
      <div className="relative">
        <div
          className="flex gap-2 items-center text-sm hover:text-primary cursor-pointer"
          onClick={handleShowOption}
        >
          {title}
        </div>
        {ShowOption ? (
          <>
            <div className="absolute z-50 top-10 bg-white shadow-2xl p-4 w-min tooltip tooltip-bottom ">
              {children}
            </div>
            <div
              className="fixed top-0 left-0 w-screen h-screen"
              onClick={handleShowOption}
            ></div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
