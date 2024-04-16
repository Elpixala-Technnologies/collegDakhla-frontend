"use client";
import Image from "next/image";
import Link from "next/link";
import TopCollectionCard from "@/components/card/topCollectionCard";
import HeroSection from "@/components/heroComponent/heroComponent";
import NotificationCard from "@/components/card/notificationCar";
import CarouselSideBtn from "@/components/carousel/carousel-side-button";
import { FaAngleRight, FaCity } from "react-icons/fa6";
import { useQuery } from "@apollo/client";
import { getAllNews, getCourses, getStates, getStreams, getTestimonials, topColleges } from "@/query/schema";
import { GetDefaultImage, getStrapiMedia } from "../utils/api-helper";
import { useState } from "react";
import Button from "@/components/button/button";
import TestimonyCard from "@/components/card/testimonyCard";
import CourseCard from "@/components/card/courseCard";
import Accordian from "@/components/accordian/accordian";
import formatFees from "@/utils/formatFees";
import { getDate } from "@/utils/formatDate";
export default function Home() {
	const [Stream, setStream] = useState<string>("");
	const [Limit, setLimit] = useState<number>(10);

	//get all states
	const {
		loading: statesLoader,
		error: statesError,
		data: statesData,
	} = useQuery(getStates);

	//get all streams data
	const {
		loading: streamLoader,
		error: streamsError,
		data: streamsData,
	} = useQuery(getStreams);

	//get all colleges data
	const {
		loading: topCollegesLoader,
		error: topCollegesError,
		data: topCollegesData,
	} = useQuery(topColleges, {
		variables: { Limit },
	});
	let topCollegesLength = topCollegesData?.colleges?.data?.length;

	// get all courses 
	const {
		loading: coursesLoader,
		error: coursesError,
		data: coursesData,
	} = useQuery(getCourses)

	//get all news in descending order
	const {
		loading: newsLoader,
		error: newsError,
		data: newsData,
	} = useQuery(getAllNews)

	// get all testimonials
	const {
		loading: testimonialsLoader,
		error: testimonialsError,
		data: testimonialsData,
	} = useQuery(getTestimonials)

	function handleStream(stream: string) {
		setStream(stream);
	}

	return (
		<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
			<p className="text-2xl font-semibold text-gray-800">Temporarily Not Available</p>
		</div>
	);
}
