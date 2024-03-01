// import { ReactNode, useEffect, useState } from "react";
// import { FaAngleDown } from "react-icons/fa";
// import { FaAngleRight } from "react-icons/fa";
// export default function Accordian({
//   children,
//   title,
//   opened = false,
//   titlePrimary = false,
// }: {
//   children: ReactNode;
//   title: string;
//   opened?: boolean;
//   titlePrimary?: boolean;
// }) {
  // const [Open, setOpen] = useState(false);
  // const handleOpenAccordion = () => {
  //   console.log(Open);

  //   setOpen(!Open);
  // };
  // useEffect(() => {
  //   setOpen(opened);
  // }, [opened]);
//   return (
//     <>
//       <div className="border border-primary-text-light rounded-md">
//         <div
//           className={`flex justify-between ${
//             Open ? "border-b border-b-primary-text-light" : ""
//           } items-center ${titlePrimary ? "px-5 py-4" : "p-2"}`}
//           onClick={handleOpenAccordion}
//         >
//           <p
//             className={`flex-1 ${
//               titlePrimary
//                 ? "text-primary text-[25px] font-semibold "
//                 : "text-secondary text-base"
//             }`}
//           >
//             {title}
//           </p>
//           <div className="bg-primary-light p-1 text-primary rounded-sm">
//             {Open ? <FaAngleDown /> : <FaAngleRight />}
//           </div>
//         </div>
//         {Open ? <div className="p-5">{children}</div> : <></>}
//       </div>
//     </>
//   );
// }

import React, { ReactNode, useEffect, useState } from "react";
import { FaAngleDown, FaAngleRight } from "react-icons/fa";

interface AccordionProps {
  children: ReactNode;
  title: string;
  titlePrimary?: boolean;
  opened?: any
}

const Accordion: React.FC<AccordionProps> = ({
  children,
  title,
  titlePrimary = false,
  opened = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [Open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(opened);
  }, [opened]);

  const handleOpenAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border border-primary-text-light rounded-md">
      <div
        className={`flex justify-between items-center p-2 ${
          isOpen ? "border-b border-b-primary-text-light" : ""
        }`}
        onClick={handleOpenAccordion}
      >
        <p
          className={`flex-1 ${
            titlePrimary
              ? "text-primary text-[25px] font-semibold"
              : "text-secondary text-base"
          }`}
        >
          {title}
        </p>
        <div className="bg-primary-light p-1 text-primary rounded-sm">
          {isOpen ? <FaAngleDown /> : <FaAngleRight />}
        </div>
      </div>
      {isOpen && (
        <div className="p-5" data-testid="accordion-content">
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordion;
