// components/Carousel.js
import { ReactNode, useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const CarouselSideBtn = ({
  slides,
  title = "",
  titleColor = "text-primary-text",
  buttonTextColor = "text-primary",
  buttonBorderColor = "border-primary",
  slidesMobile = 1,
  slidesTablet = 2,
  slidesDesktop = 3,
  showButton = true,
  showPagination = true,
  bgColor = "",
  gap = "gap-4",
}: {
  slides: Array<any>;
  title?: string;
  titleColor?: string;
  slidesMobile?: number;
  slidesTablet?: number;
  slidesDesktop?: number;
  showButton?: boolean;
  showPagination?: boolean;
  buttonBorderColor?: string;
  buttonTextColor?: string;
  bgColor?: string;
  gap?: string;
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

      if (screenWidth >= 1024) {
        setSlidesToShow(slidesDesktop);
      } else if (screenWidth >= 768) {
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
  }, [slidesDesktop, slidesMobile, slidesTablet]);
  return (
    <div className="relative flex flex-col gap-4 max-w-screen-xl">
      <div className="flex justify-between">
        <h4 className={`text-[30px] font-semibold ${titleColor}`}>{title}</h4>
      </div>
      <div className=" flex gap-2">
        {showButton ? (
          <div className="absolute top-1/2 -left-5 z-40  flex gap-4 items-center">
            <button
              className={`bg-white ${buttonBorderColor} p-5 cursor-pointer rounded-full shadow-lg ${buttonTextColor}`}
              onClick={prevSlide}
            >
              <FaAngleLeft />
            </button>
          </div>
        ) : (
          <></>
        )}

        <div className="max-w-screen-xl overflow-hidden">
          <div className={`${bgColor}`}>
            <div
              className={`flex ${gap} transition-transform duration-300 ease-in-out py-4 px-10 rounded-2xl ${bgColor}`}
              style={{
                transform: `translateX(-${
                  activeIndex * (120 / slidesToShow)
                }%)`,
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
        </div>
        {showButton ? (
          <div className="flex gap-4 items-center absolute top-1/2 -right-5 z-40  ">
            <button
              className={`bg-white ${buttonBorderColor}  p-5 cursor-pointer rounded-full shadow-lg ${buttonTextColor}`}
              onClick={nextSlide}
            >
              <FaAngleRight />
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>

      {showPagination ? (
        <div className="flex justify-center items-center">
          <div className="transform  flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-4 h-4 rounded-full ${
                  index === activeIndex
                    ? "bg-primary border border-primary"
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

export default CarouselSideBtn;
