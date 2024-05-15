/* eslint-disable react-hooks/exhaustive-deps */
// components/Carousel.js
import { ReactNode, useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const Carousel = ({
  slideGap = "gap-6",
  paginationAlignment = "justify-center",
  borderColor = "primary",
  slides,
  title = "",
  titleColor = "text-primary-text",
  slidesMobile = 1,
  slidesTablet = 2,
  slidesDesktop = 3,
  showButton = true,
  showPagination = true,
}: {
  slideGap?: string;
  paginationAlignment?: string;
  borderColor?: string;
  slides: Array<ReactNode>;
  title?: string;
  titleColor?: string;
  slidesMobile?: number;
  slidesTablet?: number;
  slidesDesktop?: number;
  showButton?: boolean;
  showPagination?: boolean;
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(1);
  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth >= 768) {
        setSlidesToShow(slidesDesktop);
      } else if (screenWidth <= 768 && screenWidth >= 480) {
        setSlidesToShow(slidesTablet);
      } else {
        setSlidesToShow(slidesMobile);
      }
    };

    // Initial setup
    handleResize();

    // Attach event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="relative flex flex-col gap-4">
      <div className="flex justify-between">
        <h4 className={`text-[30px] font-semibold ${titleColor}`}>{title}</h4>
        {showButton ? (
          <div className="flex gap-4 items-center">
            <button
              className="border border-primary p-2 cursor-pointer rounded-md text-primary"
              onClick={prevSlide}
            >
              <FaAngleLeft />
            </button>
            <button
              className="border border-primary p-2 cursor-pointer rounded-md text-primary"
              onClick={nextSlide}
            >
              <FaAngleRight />
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className="overflow-hidden w-full">
        <div
          className={`flex ${slideGap} transition-transform duration-300 ease-in-out p-2`}
          style={{
            transform: `translateX(-${activeIndex * (100 / slidesToShow)}%)`,
          }}
        >
          {slides?.map((slide, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full h-full"
              style={{ flex: `0 0 ${100 / slidesToShow}%` }}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>
      {showPagination ? (
        <div className={`flex ${paginationAlignment} items-center`}>
          <div className="transform  flex space-x-2">
            {slides?.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-4 h-4 rounded-full ${
                  index === activeIndex
                    ? `bg-${borderColor} border border-${borderColor}`
                    : "bg-slate-100 border border-primary-text-light"
                }`}
              />
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Carousel;
