"use client";
import CollegeListItem from "@/components/collegeListItem/collegeListItem";
import CollegeFilters from "@/components/collegeFilters/collegeFilters";
import { useEffect, useState } from "react";
import { MdOutlineSort } from "react-icons/md";
import { RiSearchLine } from "react-icons/ri";
import {
	getColleges,
	getCollegesFilter,
	getDefaultStream,
	searchCollege,
} from "@/query/schema";
import { useQuery } from "@apollo/client";
import Carousel from "@/components/carousel/carousel";

export default function CollegeList() {
	const [Search, setSearch] = useState("");
	const [MobileFilter, setMobileFilter] = useState(false);
	const [showFullContent, setShowFullContent] = useState(false);
	const [showReadMore, setShowReadMore] = useState(true);
	const [filteredData, setFilteredData] = useState([]);

	// get college data
	const { loading, error, data: initialData } = useQuery(getColleges);

	const {
		loading: filterLoader,
		error: filterError,
		data: filteredCollege,
	} = useQuery(searchCollege, {
		variables: {
			Search,
		},
	});

	const {
		loading: streamLoader,
		error: streamError,
		data: streamData,
	} = useQuery(getDefaultStream);
	let aboutStream = streamData?.streams?.data[0]?.attributes?.description;

	const handleReadMoreClick = () => {
		setShowFullContent(true);
	};

	const handleReadLessClick = () => {
		setShowFullContent(false);
	};

	const handleSearch = (event: any) => {
		setSearch(event.target.value);

		if (Search.length >= 1) {
			const filtered = filteredCollege.colleges.data.filter((item: any) =>
				item.attributes.collegeName.toLowerCase().includes(Search.toLowerCase())
			);
			setFilteredData(filtered);
		} else {
			setFilteredData(initialData?.colleges?.data);
		}
	};

	const handleMobileFilter = () => {
		setMobileFilter(!MobileFilter);
		if (MobileFilter) {
			document.body.style.overflow = "hidden";
		}
	};

	useEffect(() => {
		const content = document.getElementById("content")!;
		const readMore = document.getElementById("readMore")!;

		if (content?.scrollHeight > content?.clientHeight) {
			setShowReadMore(true);
		}
	}, []);

	return (
		<>
			<div className="max-w-screen-xl mx-auto">
				<section className="heroSection">
					<div className="m-4 px-8 pt-8 bg-white flex flex-col rounded-sm">
						<h1 className="text-xl font-bold mb-3 text-center text-primary">
							Top Colleges in India 2024
						</h1>
						<div
							dangerouslySetInnerHTML={{ __html: aboutStream }}
							className="font-poppins text-base text-wrap"
							style={{
								maxHeight: showFullContent ? "none" : "200px",
								overflow: "hidden",
							}}
						></div>
						<div className="py-2 text-primary text-sm text-right">
							{showReadMore && !showFullContent && (
								<div className="readMore cursor-s-resize">
									<span onClick={handleReadMoreClick}>Read more</span>
								</div>
							)}
							{showFullContent && (
								<div className="cursor-n-resize">
									<span onClick={handleReadLessClick}>Read less</span>
								</div>
							)}
						</div>
					</div>
				</section>
				<section className="topCollege">
					<div className="m-4 bg-white py-4 px-4">
						<h2 className="text-xl font-bold mb-3">Top Colleges in India</h2>
						<Carousel slides={[]} />
					</div>
				</section>
				<section className="collegeList">
					<div className="flex flex-col md:flex-row gap-4 px-4">
						<div className="flex-none w-56">
							<CollegeFilters
								allColleges={initialData}
								setFilteredData={setFilteredData}
								isMobile={MobileFilter}
								handleMobileFilter={handleMobileFilter}
							/>
						</div>
						<div className="flex-1 w-full overflow-hidden">
							<div className="mb-4 flex gap-4 items-stretch relative max-md:flex-col">
								<div className="bg-white h-10 flex border-2 border-extra-light-text rounded-md flex-1 items-center text-primary-text px-2 focus-within:border-secondary-text">
									<RiSearchLine />
									<input
										className="w-full flex-1 text-sm px-2 py-1 outline-none"
										placeholder={`Search College Name`}
										onChange={handleSearch}
									/>
								</div>
								<div className="flex gap-4">
									<div className="flex border-2 items-center px-2 border-extra-light-text gap-2 rounded-md cursor-pointer">
										<span>Sort</span> <MdOutlineSort />
									</div>
									<div className="max-md:block hidden">
										<div className="flex border-2 items-center px-2 border-extra-light-text gap-2 rounded-md cursor-pointer">
											<span onClick={handleMobileFilter}>Filter</span>
											<MdOutlineSort />
										</div>
									</div>
								</div>
							</div>
							<CollegeListItem colleges={filteredData} />
						</div>
					</div>
				</section>
			</div>
		</>
	);
}
