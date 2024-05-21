import { useRef } from "react";
import Button from "@/components/button/button";
import Image from "next/image";
import YoutubeVideo from "@/components/youtubeVideo/youtubeVideo";
import PageData from "@/components/pageData/pageData";
import Accordion from "@/components/accordian/accordian";
import NavbarSlider from "@/components/carousel/navbar-carousal";

export default function CollegeTab(props: any) {
    // Create a ref object to store references to Accordion elements
    const accordionRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Function to handle the scroll to the corresponding Accordion section
    // Function to handle the scroll to the corresponding Accordion section with an offset
	const handleScrollToAccordion = (index: number) => {
        const element = accordionRefs.current[index];
        if (element) {
            const offset = 90; // Adjust this value to set the desired offset
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    return (
        <>
            <div className="container h-full my-10">
                <div className="main-wrapper flex gap-4">
                    <div className="left-wrapper md:basis-3/4 w-full md:w-9/12 flex flex-col gap-5">
                        <div className="bg-primary-extra-light flex flex-col gap-4">
                            {props?.data?.map((item: any, index: number) => {
                                return (
                                    <Accordion
                                        title={item?.heading}
                                        titlePrimary
                                        opened
                                        key={index}
                                    >
                                        <div
                                            className="content rounded-xl px-5 pt-5 mb-5"
                                            key={index}
                                            ref={(el) => (accordionRefs.current[index] = el)} // Assign ref
                                        >
                                            <PageData data={item} />
                                        </div>
                                    </Accordion>
                                );
                            })}
                        </div>
                    </div>
                    <div className="right-wrapper basis-1/4 rounded-lg min-w-72 hidden md:block">
                        <div className="md:flex md:flex-col md:gap-2 h-full">
                            <div className="college-videos bg-gray-50 p-3 rounded-3xl">
                                <h4 className="text-base font-bold font-poppins border-b-2 pb-2">
                                    Videos
                                </h4>
                                <div className="flex flex-col gap-2">
                                    <YoutubeVideo
                                        videoId={"4-YEBaUXUGo"}
                                        width={"100%"}
                                        height={"168"}
                                    />
                                    <YoutubeVideo
                                        videoId={"4-YEBaUXUGo"}
                                        width={"100%"}
                                        height={"168"}
                                    />
                                </div>
                            </div>
                            <div className="college-videos bg-gray-50 p-3 rounded-3xl sticky top-2 h-fit">
                                <h2 className="text-base font-bold">Table of Content</h2>
                                <ul className="flex flex-col gap-2 list-disc pl-5">
                                    {props?.data?.map((item: any, index: number) => {
                                        return (
                                            <li
                                                key={index}
                                                className="hover:text-blue-600 cursor-pointer"
                                                onClick={() => handleScrollToAccordion(index)}
                                            >
                                                {item?.heading}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
