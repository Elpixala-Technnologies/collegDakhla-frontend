import { useEffect, useState } from "react"
import Filter from "./filter/filter"
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { getStreams } from "@/query/schema";
import { useQuery } from "@apollo/client";

export default function CollegeFilters(params: any) {
	const [SelectedFilter, setSelectedFilter] = useState<string[]>([]);
	const [StreamFilter, setStreamFilter] = useState<string[]>([])
	const [StateFilter, setStateFilter] = useState<string[]>([])
	const { loading: streamLoader, error: streamsError, data: streamsData } = useQuery(getStreams);

	//console.log(StreamFilter, " filtered data ", filteredData)
	const states = [
		{ name: "Maharashtra", count: 3444 },
		{ name: "Haryana ", count: 12 },
		{ name: "Uttar Pradesh ", count: 45 },
		{ name: "Rajasthan", count: 33 },
		{ name: "Himanchal Pradesh", count: 33 },
		{ name: "Tamil Nadu", count: 554 },
		{ name: "Karnataka", count: 1232 },
		{ name: "Delhi NCR", count: 55 },
		{ name: "Kerala", count: 66 },
		{ name: "Delhi", count: 76 },
		{ name: "Gujarat", count: 33 },
		{ name: "Telengana", count: 33 },
	]

	const [open, setOpen] = useState(true);
	const handleOpen = () => setOpen(open ? false : true);
	//console.log("params data ", params.filteredData);

	const handleStreamFilter = (name: string) => {
		if (SelectedFilter.includes(name)) {
			handleUnselectFilter("stream", name);
		} else {
			setSelectedFilter([...SelectedFilter, name]);
			setStreamFilter([...StreamFilter, name])
		}
	}

	const handleStateFilter = (name: string) => {
		if (SelectedFilter.includes(name)) {
			handleUnselectFilter("state", name);
		} else {
			setSelectedFilter([...SelectedFilter, name]);
			setStateFilter([...StateFilter, name])
			console.log("state is ", StateFilter);
		}
	}

	const handleUnselectFilter = (filter?: string, name?: string) => {
		let filterData = SelectedFilter.filter(item => item !== name);
		setSelectedFilter(filterData!);

		if (filter === "stream") {
			let streamFilterValue = StreamFilter.filter(item => item !== name);
			setStreamFilter(streamFilterValue!);
		} else {
			let stateFilterValue = StateFilter.filter(item => item !== name);
			setStateFilter(stateFilterValue!);
		}
	}

	// render data when streams is changed
	useEffect(() => {
		console.log(params.filteredData);
		console.log(StreamFilter);

		let matchingColleges = params.filteredData.filter((college: any) => college?.attributes?.collegeStreams?.data.some((stream: any) =>
			StreamFilter.includes(stream.attributes.streamName)
		));
		params.setFilteredData(matchingColleges)

		console.log("matching Colleges of stream are ", matchingColleges);
	}, [StreamFilter]);

	// render data when states are changed
	useEffect(() => {
		const matchingColleges = params?.filteredData?.filter((college: any) => {
			const collegeState = college?.attributes?.state;
			const hasMatchingState = StateFilter.includes(collegeState);
			return hasMatchingState;
		})
		params.setFilteredData(matchingColleges)
		console.log("matching Colleges of state are ", matchingColleges);
	}, [StateFilter]);

	return (
		<>
			<div className="bg-white">
				<h3 className="uppercase text-xxs px-2 py-2">Found <b>123</b> colleges</h3>
				{
					SelectedFilter.length > 0 ? (<>
						<div className="bg-gray-200 px-2 py-2 flex items-center justify-between" onClick={handleOpen}><span>Selected Filters</span> <span>{open ? <FaAngleDown /> : <FaAngleUp />}</span></div>
						<div className="flex py-2 px-4 flex-wrap gap-2">
							{SelectedFilter.map(filter => {
								return <div key={filter} className="px-2 py-1 border border-orange-500 rounded-full text-xs flex gap-1 items-center">
									<span>{filter}</span><span onClick={() => handleUnselectFilter(filter)}><MdClose /></span></div>
							})}
						</div>
					</>) : (<></>)
				}
				{params.page != "stream" ? <Filter name="Stream" filters={streamsData?.streams?.data} handleFilter={handleStreamFilter} /> : ""}
				<Filter name="State" filters={states} handleFilter={handleStateFilter} />
			</div>
		</>

	)
}