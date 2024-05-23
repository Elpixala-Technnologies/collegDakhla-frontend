"use client"
import { useEffect, useState } from "react";
import Accordion from "@/components/accordian/accordian";
import { getFeaturedExams } from "@/query/schema";
import { useQuery } from "@apollo/client";
import ExamCard from "@/components/card/examCard";
import Carousel from "@/components/carousel/carousel";


export default function RecommendedExamCard() {

    const {
        loading: loader,
        error: error,
        data: featuredExams,
    } = useQuery(getFeaturedExams);

    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (featuredExams?.exams?.data) {
            setIsLoading(false);
        }
    }, [featuredExams]);

    const getTopExam = () => {
        return featuredExams?.exams?.data?.slice(0, 3);
    };
    return (
        <>

            <div>
                <Accordion
                    title="Recommended Exams"
                    opened
                    titlePrimary
                >
                    <section className="topExams">
                        <div className="m-4 bg-white py-4 px-4">
                            <Carousel
                                slidesDesktop={4}
                                slidesTablet={3}
                                showPagination={false}
                                slides={featuredExams?.exams?.data?.map(
                                    (exam: any, index: number) => {
                                        return <ExamCard key={index} featuredExams={exam} />;
                                    }
                                )}
                            />
                        </div>
                    </section>

                    {/* <section className="topCourses">
                        <div className="m-4 bg-white py-4 px-4">
                            {isLoading ? (
                                <div className="flex justify-center items-center h-full">
                                    <p>Loading...</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {getTopExam().map((exam: any, index: number) => (
                                        <ExamCard key={index} featuredExams={exam} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </section> */}

                </Accordion>
            </div>

        </>
    );
}
