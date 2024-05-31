import React, { ReactNode, useEffect, useState } from "react";
import { FaAngleDown, FaAngleRight } from "react-icons/fa";

interface AccordionProps {
  children: ReactNode;
  title: string;
  titlePrimary?: boolean;
  opened?: any;
  showBorder?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({
  children,
  title,
  titlePrimary = false,
  opened = false,
  showBorder = true,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [Open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(opened);
  }, [opened]);

  const handleOpenAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`${
        showBorder ? "border border-primary-text-light rounded-md" : ""
      }`}
    >
      <div
        className={`flex justify-between items-center p-2 ${
          isOpen ? "border-b border-b-primary-text-light" : ""
        }`}
        onClick={handleOpenAccordion}
      >
        <p
          className={`flex-1 ${
            titlePrimary
              ? "text-black text-[25px] font-semibold"
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
