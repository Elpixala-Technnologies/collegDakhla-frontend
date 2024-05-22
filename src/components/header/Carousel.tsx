"use client";
import React, { useCallback, useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Image from "next/image";

const Carousel = ({
  children: sliderContent,
  autoSlide = false,
  autoSlideInterval = 3000,
  // onSlideChange,
  // curr,
  // setCurr,
}: any) => {

  const [curr, setCurr] = useState(0);
  const prev = () => {
    const newIndex = curr === 0 ? sliderContent.steps.length - 1 : curr - 1;
    // setCurr(newIndex);
    // onSlideChange(newIndex);
  };

  const next = useCallback(() => {
    const newIndex = curr === sliderContent.steps.length - 1 ? 0 : curr + 1;
    setCurr(newIndex);
    // onSlideChange(newIndex);
  }, [curr, sliderContent?.steps?.length, setCurr]);

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [curr, autoSlide, autoSlideInterval, next]);

  return (
    <>
      {/* Carousel  */}
      <div className="w-full h-max relative overflow-hidden bg-gradient-to-r from-gray-300 to-gray-200 rounded-lg">
        <div
          className="w-full h-max flex transition-transform ease-out duration-500"
          style={{ transform: `translateX(-${curr * 100}%)` }}
        >
          {sliderContent?.steps?.map((slide: any, index: number) => (
            <div key={index} className="slide min-w-full p-3 text-black">
              <h2 className="text-lg mb-2 font-semibold">{slide.title}</h2>
              <p className="text-sm">{slide.content}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Pagination  */}
      <div className="absolute z-10 top-[105%] left-0">
        <div className="flex items-center justify-center gap-2">
          {sliderContent?.steps?.map((_: any, i: number) => (
            <div
              onClick={() => {
                setCurr(i);
                // onSlideChange(i);
              }}
              key={i}
              className={`transition-all rounded-full h-2 bg-orange-500 cursor-pointer  ${
                curr === i ? "p-0.5 w-5" : "bg-opacity-50 w-2"
              }`}
            />
          ))}
        </div>
      </div>
      {/* Navigation  */}
      {/* <div className="z-10 absolute left-1/2 inset-0 flex items-center justify-between w-[400px]">
        <button
          onClick={prev}
          className="p-1 rounded-full shadow bg-orange-500/80 text-white  hover:text-gray-800 hover:bg-white hover:border-2 border-2 border-orange-500"
        >
          <IoIosArrowBack />
        </button>
        <button
          onClick={next}
          className="p-1 rounded-full shadow bg-orange-500/80 text-white  hover:text-gray-800 hover:bg-white hover:border-2 border-2 border-orange-500"
        >
          <IoIosArrowForward />
        </button>
      </div> */}
    </>
  );
};

export default Carousel;
