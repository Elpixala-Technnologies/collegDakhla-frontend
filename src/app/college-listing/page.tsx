"use client";
import CollegeCard from "@/components/card/collegeCard";
import CarouselComponent from "@/components/carousel/carousel";
import CollegeListItem from "@/components/collegeListItem/collegeListItem";
import CollegeFilters from "@/components/collegeFilters/collageFilters";
import Feature from "@/components/feature/feature";
import { useEffect, useState } from "react";
import { MdOutlineSort } from "react-icons/md";
import { RiSearchLine } from "react-icons/ri";
import { getColleges } from "@/query/schema";
import { useQuery } from "@apollo/client";

type College = {
	id: string;
	name: string;
	location: string;
	state: string;
	affiliate: string;
	fee: string;
	rating: string;
	image: string;
	logo: string;
};

export default function CollegeList() {

	// get college data
	const { loading, error, data } = useQuery(getColleges);

	let stateTags = [
		{ name: "Maharashtra" },
		{ name: "Haryana" },
		{ name: "Uttar Pradesh" },
		{ name: "Tamil Nadu" },
		{ name: "Karnataka" },
		{ name: "Delhi NCR" },
		{ name: "Kerala" },
		{ name: "Delhi" },
		{ name: "Gujarat" },
	];
	const [isTruncated, setIsTruncated] = useState(true);
	const [Search, setSearch] = useState("");
	const [List, setList] = useState<College[]>([]);

	const toggleTruncate = () => {
		setIsTruncated(!isTruncated);
	};

	const handleSearch = (event: any) => {
		setSearch(event.target.value);
	};
	const aboutCollege =
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus aliquet interdum accumsan. Nulla tincidunt sem luctus libero porttitor, nec porta lectus blandit. Nam augue leo, tristique at tempor feugiat, tincidunt ac ante. Suspendisse fermentum efficitur massa, vitae elementum neque condimentum a. Nam et eros sed nisl imperdiet vulputate. Aenean tempus, diam nec fermentum laoreet, ipsum magna pulvinar turpis, in ornare nisl augue in sapien. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Praesent gravida purus nunc.";

	useEffect(() => {
		setList(
			data?.colleges?.data.filter((item: any) =>
				item.name.toLowerCase().includes(Search.toLowerCase())
			)
		);
	}, [Search]);

	useEffect(() => {
		setList(data?.colleges?.data);
	}, []);
	return (
		<>
			<section className="heroSection">
				<div className="m-4 p-8 bg-white flex flex-col rounded-sm">
					<h1 className="text-xl font-bold mb-3 text-center">
						Top Engineering Colleges in India 2024
					</h1>
					{isTruncated ? (
						<>
							<p className={`${isTruncated ? "text-center" : "text-left"}`}>
								{aboutCollege.slice(0, 400)}...
							</p>
							<div className="flex justify-end">
								<button
									onClick={toggleTruncate}
									className="text-primary ml-2 text-sm font-semibold"
								>
									Read more
								</button>
							</div>
						</>
					) : (
						<>
							<p>{aboutCollege}</p>
							<div className="flex justify-end">
								<button
									onClick={toggleTruncate}
									className="text-primary ml-2 text-sm font-semibold"
								>
									Read less
								</button>
							</div>
						</>
					)}
				</div>
			</section>
			<section className="topCollege">
				<div className="m-4 bg-white py-4 px-4">
					<h2 className="text-xl font-bold mb-3">Top Colleges in India</h2>
					<CarouselComponent />
				</div>
			</section>
			<section className="collegeList">
				<div className="flex flex-col md:flex-row gap-4 px-4">
					<div className="flex-none w-56">
						<CollegeFilters />
					</div>
					<div className="flex-1  w-full overflow-hidden">
						<div className="bg-white p-4 mb-4 flex gap-4 items-stretch">
							<div className="flex border-2 border-extra-light-text rounded-md flex-1 items-center text-primary-text px-2 focus-within:border-secondary-text">
								<RiSearchLine />
								<input
									className="w-full flex-1 text-sm px-2 py-1 outline-none"
									placeholder={`Search College Name`}
									onChange={handleSearch}
								/>
							</div>
							<div className="flex border-2 items-center px-2 border-extra-light-text gap-2 rounded-md cursor-pointer">
								<span>sort</span> <MdOutlineSort />
							</div>
						</div>
						{data?.colleges?.data?.map((college: any, index: any) => {
							return (
								<>
									<CollegeListItem
										key={Math.random() * 1000}
										college={college}
									/>
									{(index+1)%4 == 0 ? (
										<div>
											<Feature title="Filter By State" tags={stateTags} />
										</div>
									) : (
										<></>
									)}
								</>
							);
						})}
					</div>
				</div>
			</section>
		</>
	);
}
