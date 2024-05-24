"use client"
import { useEffect, useState } from "react";
import Accordion from "@/components/accordian/accordian";
import { topColleges } from "@/query/schema";
import { useQuery } from "@apollo/client";
import CollegeCard from "@/components/card/collegeCard";
import CarouselComponent from "@/components/carousel/carousel";
// import CarouselComponent from "@components/carousel/CarouselComponent";



export default function RecommendedCollegeCard() {

    const [Limit, setLimit] = useState<number>(10);
    const {
        loading: topCollegesLoader,
        error: topCollegesError,
        data: topCollegesData,
    } = useQuery(topColleges, {
        variables: { Limit },
    });

    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (topCollegesData?.colleges?.data) {
            setIsLoading(false);
        }
    }, [topCollegesData]);

    const getTopColleges = () => {
        return topCollegesData?.colleges?.data?.slice(0, 3);
    };
    return (
        <>
            <div>
            <div className="max-w-screen-lg overflow-hidden">
				<div className="pt-4 pb-6 px-6 bg-[#f0f2f4] rounded w-full">
					<CarouselComponent
						slidesDesktop={3}
						slidesTablet={2}
						titleColor="text-primary"
						showPagination={false}
						title="Recommended Colleges"
						slides={topCollegesData?.colleges?.data?.map((college: any, index: number) => {
							return (
								<CollegeCard featuredCollege={college} key={index} />
							)
						})}
					/>
				</div>
			</div>
                {/* <Accordion
                    title="Recommended Colleges"
                    opened
                    titlePrimary
                >
                    <section className="topCollege">
                        <div className="m-4 bg-white py-4 px-4">
                            <h2 className="text-xl font-bold mb-3"></h2>
                            <Carousel
                                slidesDesktop={4}
                                slidesTablet={3}
                                showPagination={false}
                                slides={topCollegesData?.colleges?.data?.map(
                                    (college: any, index: number) => {
                                        return <CollegeCard key={index} featuredCollege={college} />;
                                    }
                                )}
                            />
                        </div>
                    </section>

                </Accordion> */}
                    {/* <section className="topCourses">
                        <div className="m-4 bg-white py-4 px-4">
                            {isLoading ? (
                                <div className="flex justify-center items-center h-full">
                                    <p>Loading...</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {getTopColleges().map((college: any, index: number) => (
                                        <CollegeCard key={index} featuredCollege={college} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </section> */}
            </div>

        </>
    );
}
