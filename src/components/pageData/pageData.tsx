import { useState, useEffect } from "react";
import "../../utils/css/tableStyle.css";
import Accordion from "../accordian/accordian";
import Carousel from "../carousel/carousel";
import CourseCard from "../card/courseCard";
import CollegeCard from "../card/collegeCard";

export default function PageData({ data }: any) {
	console.log("page data", data);
	const [showFullContent, setShowFullContent] = useState(false);
	const [showReadMore, setShowReadMore] = useState(true);

	const handleReadMoreClick = () => {
		setShowFullContent(true);
	};

	const handleReadLessClick = () => {
		setShowFullContent(false);
	};

	useEffect(() => {
		const content = document.getElementById("content")!;
		const readMore = document.getElementById("readMore")!;

		if (content?.scrollHeight > content?.clientHeight) {
			setShowReadMore(true);
		}
	}, []);
	const tableRegex = /<table[^>]*>[\s\S]*?<\/table>/;
	const tableMatch = data?.content?.match(tableRegex);
	const extractedTableHtml = tableMatch ? tableMatch[0] : "";


	if (data?.__typename === "ComponentCommonTabData") {
		return (
			<Accordion
				title={data?.heading}
				titlePrimary
				opened
				key={data?.id}
			>
				<div
					className="content bg-gray-50 rounded-xl p-5 mb-5"
					key={data?.id}
				>
					<div
						dangerouslySetInnerHTML={{ __html: data?.content }}
						className="font-poppins text-base text-wrap !overflow-x-auto"
						style={{
							// maxHeight: showFullContent ? "none" : "200px",
							overflow: "hidden",
						}}
					></div>
				</div>
			</Accordion>
		)
	}

	if ((data?.__typename === "ComponentRecommendedColleges")) {
		return (
			<div
				className="w-96 max-w-[22rem] md:w-full md:max-w-screen-sm lg:max-w-[932px] overflow-hidden "
				id={data?.id}
			>
				<Carousel
					slidesDesktop={4}
					slidesTablet={3}
					title="Recommended Colleges"
					showPagination={false}
					slides={data?.colleges?.data?.map(
						(college: any, index: number) => {
							return <CollegeCard key={index} featuredCollege={college} />;
						}
					)} />
			</div>
		)
	}
}