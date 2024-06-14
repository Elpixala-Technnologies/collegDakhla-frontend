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
        showBorder ? "border border-zinc-300 rounded-md" : ""
      }`}
    >
      <div
        className={`flex justify-between items-center p-2 ${
          isOpen ? "border-b border-zinc-300" : ""
        }`}
        onClick={handleOpenAccordion}
      >
        <p
          className={`flex-1 pl-3 ${
            titlePrimary
              ? "text-zinc-800 text-lg font-semibold"
              : "text-secondary text-base"
          }`}
        >
          {title}
        </p>
        <div className="bg-primary-light p-1 text-primary rounded-md">
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
