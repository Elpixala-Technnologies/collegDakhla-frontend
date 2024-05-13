// import { ReactNode, useEffect, useState } from "react";
// import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

// const NavbarSlider = ({
//   slides,
//   title = "",
//   titleColor = "text-primary-text",
//   buttonTextColor = "text-primary",
//   buttonBorderColor = "border-primary",
//   slidesMobile = 1,
//   slidesTablet = 2,
//   slidesDesktop = 3,
//   showButton = true,
//   showPagination = true,
// }: {
//   slides: Array<ReactNode>;
//   title?: string;
//   titleColor?: string;
//   slidesMobile?: number;
//   slidesTablet?: number;
//   slidesDesktop?: number;
//   showButton?: boolean;
//   showPagination?: boolean;
//   buttonBorderColor?: string;
//   buttonTextColor?: string;
// }) => {
//   let duplicatedSlides = slides;
//   if (slides?.length >= 11) {
//     duplicatedSlides = [...slides];
//   }

//   const [activeIndex, setActiveIndex] = useState(0);
//   const [slidesToShow, setSlidesToShow] = useState(1);

//   const nextSlide = () => {
//     if (activeIndex < slides.length - slidesToShow) {
//       setActiveIndex((prevIndex) => prevIndex + 1);
//     }
//   };

//   const prevSlide = () => {
//     if (activeIndex > 0) {
//       setActiveIndex((prevIndex) => prevIndex - 1);
//     }
//   };

//   const goToSlide = (index: number) => {
//     setActiveIndex(index);
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       const screenWidth = window.innerWidth;

//       if (screenWidth >= 1024) {
//         setSlidesToShow(slidesDesktop);
//       } else if (screenWidth >= 768) {
//         setSlidesToShow(slidesTablet);
//       } else {
//         setSlidesToShow(slidesMobile);
//       }
//     };

//     // Initial setup
//     handleResize();

//     // Attach event listener for window resize
//     window.addEventListener("resize", handleResize);

//     // Cleanup on component unmount
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   return (
//     <div className="relative flex flex-col gap-4 max-w-screen-xl">
//       <div className="flex justify-between">
//         <h4 className={`text-[30px] font-semibold ${titleColor}`}>{title}</h4>
//       </div>

//       <div className="flex gap-4 relative max-w-screen-xl">
//         {showButton ? (
//           <div className="flex gap-4 items-center">
//             <button
//               data-testid="prev-button"
//               className={`border ${buttonBorderColor} p-3 cursor-pointer rounded-lg ${buttonTextColor}`}
//               onClick={prevSlide}
//               aria-label="Previous Slide"
//             >
//               <FaAngleLeft />
//             </button>
//           </div>
//         ) : (
//           <></>
//         )}

//         <div className="w-[70vw] md:w-[90vw] sm:w-[80vw] overflow-hidden">
//           <div>
//             <div
//               className="flex gap-4 transition-transform duration-300 ease-in-out"
//               style={{
//                 transform: `translateX(-${
//                   activeIndex * (100 / slidesToShow)
//                 }%)`,
//               }}
//             >
//               {duplicatedSlides?.map((slide, index) => (
//                 <div key={index}>{slide}</div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {showButton ? (
//           <div className="flex gap-4 items-center">
//             <button
//               data-testid="next-button"
//               className={`border ${buttonBorderColor} p-3 cursor-pointer rounded-lg ${buttonTextColor}`}
//               onClick={nextSlide}
//               aria-label="Next Slide"
//             >
//               <FaAngleRight />
//             </button>
//           </div>
//         ) : (
//           <></>
//         )}
//       </div>

//       {showPagination ? (
//         <div className="flex justify-center items-center">
//           <div className="transform  flex space-x-2">
//             {slides.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => goToSlide(index)}
//                 aria-label={`pagination button ${index}`}
//                 className={`w-4 h-4 rounded-full ${
//                   index === activeIndex
//                     ? "bg-primary border border-primary"
//                     : "bg-slate-100 border border-primary-text-light"
//                 }`}
//               />
//             ))}
//           </div>
//         </div>
//       ) : (
//         <></>
//       )}
//     </div>
//   );
// };

// export default NavbarSlider;

import { ReactNode, useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const NavbarSlider = ({
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
}: {
  slides: Array<ReactNode>;
  title?: string;
  titleColor?: string;
  slidesMobile?: number;
  slidesTablet?: number;
  slidesDesktop?: number;
  showButton?: boolean;
  showPagination?: boolean;
  buttonBorderColor?: string;
  buttonTextColor?: string;
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(1);

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

  const totalSlides = slides?.length;
  const totalPages = Math.ceil(totalSlides / slidesToShow);
  const isBeginning = activeIndex === 0;
  const isEnd = activeIndex + slidesToShow >= totalSlides;

  const nextSlide = () => {
    if (!isEnd) {
      setActiveIndex((prevIndex) => prevIndex + 1);
    }
  };

  const prevSlide = () => {
    if (!isBeginning) {
      setActiveIndex((prevIndex) => prevIndex - 1);
    }
  };

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="relative flex  flex-col md:gap-4 max-w-screen-xl">
      {title && (
        <div className="flex justify-between">
          <h4 className={`text-[30px] font-semibold ${titleColor}`}>{title}</h4>
        </div>
      )}

      <div className="flex gap-4 relative lg:max-w-screen-xl">
        {showButton ? (
          <div className="flex gap-4 items-center">
            <button
              data-testid="prev-button"
              className={`border ${buttonBorderColor} p-2 md:p-3 cursor-pointer rounded-lg ${buttonTextColor} ${
                isBeginning ? "opacity-50 pointer-events-none" : ""
              }`}
              onClick={prevSlide}
              aria-label="Previous Slide"
              disabled={isBeginning}
            >
              <FaAngleLeft />
            </button>
          </div>
        ) : (
          <></>
        )}

        <div className="w-full overflow-hidden ">
          <div
            className="flex gap-x-20 items-center transition-transform duration-300 ease-in-out h-full"
            style={{
              transform: `translateX(-${(100 / totalSlides) * activeIndex}%)`,
            }}
          >
            {slides?.map((slide, index) => (
              <div key={index} className="flex justify-start items-center">
                {slide}
              </div>
            ))}
          </div>
        </div>

        {showButton ? (
          <div className="flex gap-4 items-center">
            <button
              data-testid="next-button"
              className={`border ${buttonBorderColor} p-1 md:p-3 cursor-pointer rounded-lg ${buttonTextColor} ${
                isEnd ? "opacity-50 pointer-events-none" : ""
              }`}
              onClick={nextSlide}
              aria-label="Next Slide"
              disabled={isEnd}
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
            {slides?.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                aria-label={`pagination button ${index}`}
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

export default NavbarSlider;
