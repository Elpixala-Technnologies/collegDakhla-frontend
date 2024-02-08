"use client"
import CarouselComponent from "@/components/carousel/carousel";
import CollegeFilters from "@/components/collegeFilters/collegeFilters";
import CollegeListItem from "@/components/collegeListItem/collegeListItem";
import { getColleges, getStream } from "@/query/schema";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { MdOutlineSort } from "react-icons/md";
import { RiSearchLine } from "react-icons/ri";

type Props = {
	params: {
		stream: String
	}
}

export default function Stream({ params }: Props) {
	const [isTruncated, setIsTruncated] = useState(true);
	const toggleTruncate = () => {
		setIsTruncated(!isTruncated);
	};
	const [Search, setSearch] = useState("");
	// get college data
	const { loading: collegeLoader, error: collegeError, data: initialData } = useQuery(getColleges);
	const [allColleges, setAllColleges] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	// get stream data
	const streamName = params.stream;
	const { loading: streamLoader, error: streamError, data: streamData } = useQuery(getStream, {
		variables: { streamName },
	});

	const handleSearch = (event: any) => {
		setSearch(event.target.value);
		if (Search.length >= 1) {
			const filtered = allColleges.filter((item: any) =>
				item?.attributes?.collegeName.toLowerCase().includes(Search.toLowerCase())
			);
			setFilteredData(filtered);
			console.log("filteredData is ", filteredData);
		}
		else {
			setFilteredData(initialData.colleges.data)
		}
	};

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
	let streamDesc = streamData?.streams?.data[0]?.attributes?.description
	streamDesc = streamDesc ? streamDesc : "No stream Description Avaialble"
	console.log(streamDesc.length)
	let slicedStreamDesc = streamDesc.slice(0, 1500) + "..."
	console.log("sliced desc ", slicedStreamDesc);


	useEffect(() => {
		if (initialData && initialData.colleges.data) {
			setAllColleges(initialData.colleges.data);
			setFilteredData(initialData.colleges.data); // Initially, display all data
		}
	}, [initialData]);




	return (
		<>
			<section className="heroSection">
				<div className="m-4 p-8 bg-white flex flex-col rounded-sm">
					<h1 className="text-xl font-bold mb-3 text-center">
						Top {streamName.length <= 3 ? streamName.toUpperCase() : streamName.charAt(0).toUpperCase() + streamName.slice(1)} Colleges
					</h1>
					{streamDesc?.length > 400 ? (
						//if stream desc is >400 then use truncate
						<>
							{isTruncated ? (
								<>
									<div dangerouslySetInnerHTML={{ __html: slicedStreamDesc }} className={`${isTruncated ? "text-center" : "text-left"}`}></div>
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
									<div dangerouslySetInnerHTML={{ __html: streamDesc }} className={`${isTruncated ? "text-center" : "text-left"}`}></div>
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
						</>
					) : (
						<div dangerouslySetInnerHTML={{ __html: streamDesc }} className="text-center"></div>
					)
					}
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
						<div className="bg-white p-4 mb-4 flex gap-4 items-stretch relative">
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
						<CollegeListItem
							colleges={filteredData}
						/>
					</div>
				</div>
			</section >
		</>
	)
}