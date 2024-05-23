"use client"
import { useEffect, useState } from "react";
import Accordion from "@/components/accordian/accordian";
import { getFeaturedCourses, searchCourses } from "@/query/schema";
import { useQuery } from "@apollo/client";
import CourseCard from "@/components/card/courseCard";


export default function RecommendedCourseCard() {

    const {
		loading: featuredLoader,
		error: featuredError,
		data: featuredCourses,
	} = useQuery(getFeaturedCourses);

    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (featuredCourses?.courses?.data) {
            setIsLoading(false);
        }
    }, [featuredCourses]);

    const getTopCourses = () => {
        return featuredCourses?.courses?.data?.slice(0, 3);
    };

    return (
        <>
            <div>
                <Accordion
                    title="Recommended Courses"
                    opened
                    titlePrimary
                >
                    <section className="topCourses">
                        <div className="m-4 bg-white py-4 px-4">
                            {isLoading ? (
                                <div className="flex justify-center items-center h-full">
                                    <p>Loading...</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {getTopCourses().map((course: any, index: number) => (
                                        <CourseCard key={index} featuredCourse={course} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>

                </Accordion>
            </div>

        </>
    );
}
