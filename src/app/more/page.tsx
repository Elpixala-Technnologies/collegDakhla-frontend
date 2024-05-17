/* eslint-disable react/no-deprecated */
"use client";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import CarouselSideBtn from "../../components/carousel/carousel-side-button";

import {
  Bufferrr,
  LearnTest,
  Man,
  Study,
  TeamWork,
  Women,
} from "../../Asset/index";
import Button from "../../components/button/button";
import { FaAngleDown } from "react-icons/fa6";
import { IoIosArrowUp } from "react-icons/io";
import { render } from "react-dom";
import { StoryBanner1, StoryBanner2, StoryBanner3 } from "../../Asset/index";
import WavyText from "@/components/Motion/Wave";

const MorePage = () => {
  const [isHovered, setIsHovered] = useState(true);
  const spanRef = useRef<any>(null);
  const [spanWidth, setSpanWidth] = useState(39);
  const [replay, setReplay] = useState(true);

  useEffect(() => {
    if (spanRef.current) {
      setSpanWidth(spanRef.current.offsetWidth);
    }
  }, [isHovered]);

  const variants = {
    hidden: { x: 0, opacity: 1 },
    visible: { x: spanWidth + 12, opacity: 1 },
  };

  const [expend, setExpend] = useState(false);

  const slideData = [
    {
      image: StoryBanner1,
      text: "Without their guidance, I wouldn't have navigated the admissions process. Grateful for their support in achieving my dream college",
      title: "Adeniyi John’s Story",
      university: "Duke University",
      year: "2023",
    },
    {
      image: StoryBanner2,
      text: "The counselor's expertise and encouragement were invaluable. They helped me secure a spot at my dream college",
      title: "Adeniyi John’s Story",
      university: "Duke University",
      year: "2023",
    },
    {
      image: StoryBanner3,
      text: "The counselor's insight and encouragement were crucial in my college journey. Their support led me to my favorite college.",
      title: "Adeniyi John’s Story",
      university: "Duke University",
      year: "2023",
    },
    {
      image: StoryBanner1,
      text: "The counselor's expertise and encouragement were invaluable. They helped me secure a spot at my dream college",
      title: "Adeniyi John’s Story",
      university: "Duke University",
      year: "2023",
    },
    {
      image: StoryBanner2,
      text: "The counselor's insight and encouragement were crucial in my college journey. Their support led me to my favorite college.",
      title: "Adeniyi John’s Story",
      university: "Duke University",
      year: "2023",
    },
  ];

  return (
    <>
      <div className="min-h-[130px]"></div>

      <div className="flex flex-col md:flex-row gap-6 md:gap-1 justify-between max-w-screen-xl mx-auto items-center px-8 md:px-4">
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <div>
            <a
              href="/"
              className="wrapper"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(true)}
            >
              <div>
                <span className="text-5xl text-orange-400">C</span>
                <AnimatePresence>
                  {isHovered && (
                    <motion.span
                      ref={spanRef}
                      className="name"
                      exit={{
                        opacity: 0,
                        transition: { duration: 0.2, ease: "easeIn" },
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        duration: 0.6,
                        ease: "easeInOut",
                        delay: 0.1,
                      }}
                    >
                      <span className="text-5xl">OLLEGE</span>
                    </motion.span>
                  )}{" "}
                </AnimatePresence>
              </div>
              <motion.div
                animate={isHovered ? "visible" : "hidden"}
                variants={variants}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <span className="text-5xl">D</span>
                <AnimatePresence>
                  {isHovered && (
                    <motion.span
                      ref={spanRef}
                      className="name"
                      exit={{
                        opacity: 0,
                        transition: {
                          duration: 0.2,
                          ease: "easeIn",
                          delay: 0.1,
                        },
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        duration: 0.6,
                        ease: "easeInOut",
                        delay: 0.2,
                      }}
                    >
                      <span className="text-5xl text-orange-500">AKHLA</span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </a>
          </div>
          <h2 className="text-xl md:text-[40px] leading-tight">
            Confused about{" "}
            <span className="font-bold">the best career fit</span> for you?
          </h2>
          <WavyText text="Discover your strengths and interests for a better career fit with
            our College Dakhla." textSize="text-md" replay={replay} />
          <Button
            text="Begin Test"
            href="#"
            filled
            fontSize="text-md"
            width="w-36"
            align="text-center"
            paddingY="py-2 md:py-4"
            textColor="text-white"
          />
        </div>
        <Image
          className="object-contain lg:w-1/3 md:w-1/2 w-2/3"
          src={Man}
          alt="more-hero"
          height={0}
          width={0}
        />
      </div>

      <div className="flex justify-center items-center py-10 md:py-16 my-5 bg-gradient-to-b from-orange-600 via-orange-300 to-orange-100">
        <div className="flex flex-col md:flex-row gap-10 md:gap-2 justify-between max-w-screen-xl mx-auto items-center px-8 md:px-4 text-white">
          <div className="w-full md:w-1/2 flex flex-col gap-6">
            <h2 className="text-[40px] leading-tight">
              Begin your{" "}
              <span className="font-bold">Complimentary Assessment</span>
            </h2>
            <p className="text-md">
              Gain insight into your career trajectory by uncovering your
              strengths and interests with the College Dakhla.
            </p>

            <Button
              text="Get Started"
              href="#"
              filled
              fontSize="text-lg"
              width="w-36"
              align="text-center"
              textColor="text-black"
              paddingY="py-2"
              outline
            />
          </div>
          <Image
            className="object-contain lg:w-1/3 md:w-1/2 w-2/3"
            src={LearnTest}
            alt="more-middle"
            height={0}
            width={0}
          />
        </div>
      </div>

      <div className="mt-10 mb-10 max-w-screen-xl mx-auto px-8 md:px-4 py-6 md:py-3 flex flex-col gap-14 md:gap-3 md:flex-row justify-between items-center">
        <div className="w-full md:w-1/2 flex flex-col gap-3 relative">
          <h2 className="text-[40px] leading-tight">
            What is{" "}
            <span className="font-bold">College Dakhla Assessment?</span>
          </h2>
          <p>
            Introducing our College Dakhla, meticulously crafted to unveil
            insightful revelations about your personality traits and
            capabilities. This comprehensive evaluation delves into various
            dimensions of your cognitive, emotional, and behavioral attributes,
            empowering you to attain profound insights into your self-awareness
            and interpersonal dynamics.
          </p>
          <p>
            Through the College Dakhla, you'll unearth your inherent strengths
            and areas for development, empowering you to navigate career
            choices, interpersonal relationships, and personal evolution with
            clarity. Whether you seek to refine your communication prowess,
            bolster leadership acumen, or deepen self-awareness, our assessment
            equips you with the discernment needed for holistic growth.
          </p>
          {expend && (
            <p>
              Through the College Dakhla, you'll unearth your inherent strengths
              and areas for development, empowering you to navigate career
              choices, interpersonal relationships, and personal evolution with
              clarity. Whether you seek to refine your communication prowess,
              bolster leadership acumen, or deepen self-awareness, our
              assessment equips you with the discernment needed for holistic
              growth.
            </p>
          )}
          <div
            onClick={() => setExpend(!expend)}
            className="absolute -bottom-8 z-10 text-blue-700 border-none flex gap-1 items-center text-lg cursor-pointer"
          >
            <span>Read {expend ? "Less" : "More"}</span>{" "}
            {expend ? <IoIosArrowUp /> : <FaAngleDown />}
          </div>
        </div>

        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/3SsK-cxlj_w?si=QnPfCSuenc0yAGhT"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="w-[300px] sm:w-[450px] md:w-[560px] p-2"
        ></iframe>
      </div>

      <div className="bg-gradient-to-r opacity-80 from-blue-100 to-white py-10 md:py-16">
        <h2 className="text-[40px] leading-tight text-center mb-4">
          How does <span className="font-bold">it work?</span>
        </h2>
        <div className="flex flex-col md:flex-row gap-10 md:gap-2 justify-between max-w-screen-xl mx-auto items-center px-8 md:px-4">
          <div className="w-full md:w-1/2 flex flex-col gap-6">
            <p className="text-md">
              Explore your strengths with our College Dakhla Assessment Test.
            </p>
            <p>
              The College DakhlaAssessment is grounded in the RIASEC model,
              providing comprehensive career reports accompanied by personalized
              development strategies. Receive tailored career recommendations
              derived from diverse evaluation criteria.
            </p>
          </div>

          <Image
            className="object-contain lg:w-1/3 md:w-1/2 w-2/3"
            src={Bufferrr}
            alt="more-banner"
            height={0}
            width={0}
          />
        </div>
      </div>
      <div className="bg-gradient-to-r opacity-80 from-blue-100 to-white flex justify-center items-center py-8">
        <div className="flex flex-col md:flex-row gap-10 md:gap-2 justify-between max-w-screen-xl mx-auto items-center px-8 md:px-4">
          <Image
            className="object-contain lg:w-1/3 md:w-1/2 w-2/3"
            src={TeamWork}
            alt="more-banner-1"
            height={0}
            width={0}
          />
          <div className="w-full md:w-1/2 flex flex-col gap-6">
            <p className="text-md">
              Uncover your strengths with our College Dakhla Assessment Test.
            </p>
            <p>
              Our College Dakhla Assessment is rooted in the RIASEC model,
              offering detailed career reports coupled with personalized
              development plans. Receive tailored career recommendations based
              on a wide array of evaluation parameters.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-r opacity-80 from-blue-100 to-white flex justify-center items-center py-8">
        <div className="flex flex-col md:flex-row gap-10 md:gap-2 justify-between max-w-screen-xl mx-auto items-center px-8 md:px-4">
          <div className="w-full md:w-1/2 flex flex-col gap-6">
            <p className="text-md">
              Unlock your potential with our College Dakhla Assessment Test.
            </p>
            <p>
              Our College Dakhla Assessment is meticulously designed to align
              with the RIASEC model. Gain access to comprehensive career reports
              featuring personalized development plans tailored to your unique
              strengths and aspirations. Receive expert guidance and best-fit
              career recommendations derived from a diverse range of evaluation
              parameters.
            </p>
          </div>
          <Image
            className="object-contain lg:w-1/3 md:w-1/2 w-2/3"
            src={Women}
            alt="more-banner-2"
            height={0}
            width={0}
          />
        </div>
      </div>
      <div className="bg-gradient-to-r opacity-80 from-blue-100 to-white flex justify-center items-center py-12">
        <div className="flex flex-col md:flex-row gap-10 md:gap-2 justify-between max-w-screen-xl mx-auto items-center px-8 md:px-4">
          <Image
            className="object-contain lg:w-1/3 md:w-1/2 w-2/3"
            src={Study}
            alt="more-banner-3"
            height={0}
            width={0}
          />
          <div className="w-full md:w-1/2 flex flex-col gap-6">
            <p className="text-md">
              Explore your strengths with ourCollege Dakhla Assessment Test.
            </p>
            <p>
              The College Dakhla Assessment is rooted in the RIASEC model,
              providing detailed career reports with customized development
              plans. Receive tailored career recommendations based on a
              comprehensive assessment of various evaluation parameters.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MorePage;
