import { useEffect, useState } from "react"
import Filter from "./filter/filter"
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { getStreams, getStates, getCollegesFilter } from "@/query/schema";
import { useQuery } from "@apollo/client";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from "../button/button";

export default function CollegeFilters(params?: any) {
	const [open, setOpen] = useState(true);
	const handleOpen = () => setOpen(open ? false : true);
	//const [SelectedFilter, setSelectedFilter] = useState<string[]>([]);
	const [SelectedFilter, setSelectedFilter] = useState({
		stream: "",
		state: ""
	});
	const [StreamFilter, setStreamFilter] = useState<string>("")
	const [StateFilter, setStateFilter] = useState<string>("")
	const { loading: streamLoader, error: streamsError, data: streamsData } = useQuery(getStreams);
	const { loading: statesLoader, error: statesError, data: statesData } = useQuery(getStates);
	const { loading: filterLoader, error: filterError, data: filteredCollege, refetch } = useQuery(getCollegesFilter, {
		variables: {
			StreamFilter,
			StateFilter,
		}
	});
	console.log("filtered data ", filteredCollege);

	//tab state
	const [value, setValue] = useState(0);

	const handleStreamFilter = (name: string) => {
		setStreamFilter(name)
		setSelectedFilter(prevData => ({
			...prevData,
			stream: name,
		}));

	}

	const handleStateFilter = (name: string) => {
		//setSelectedFilter([...SelectedFilter, name]);
		setStateFilter(name)
		setSelectedFilter(prevData => ({
			...prevData,
			state: name,
		}));
	}

	const handleUnselectFilter = (filter?: string, name?: string) => {
		if (filter === "stream") {
			setStreamFilter("");
			SelectedFilter.stream = "";
		} else if (filter === "state") {
			setStateFilter("");
			SelectedFilter.state = "";
		}
	}

	const resetFilters = () => {
		const updatedFilter = {};
		console.log("selected ", SelectedFilter)
		params.handleMobileFilter();
	}

	// tab tabHandleChange
	const tabHandleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};


	// render data when filter values are changed
	useEffect(() => {
		params?.setFilteredData(filteredCollege?.colleges?.data)
	}, [filteredCollege, filterLoader])

	// check for SelectedFilter
	useEffect(() => {
		const hasData = Object.values(SelectedFilter).some(value => !!value);
	}, [SelectedFilter])

	useEffect(() => {
		if (params.isMobile) {
			document.body.style.overflowY = 'hidden'; // Disable vertical scrolling
			document.body.style.height = '100%'; // Set body height to 100%
		} else {
			document.body.style.overflowY = 'auto'; // Enable vertical scrolling
			document.body.style.height = 'auto'; // Reset body height
		}

		// Clean up function to reset styles when component unmounts
		return () => {
			document.body.style.overflowY = 'auto'; // Reset vertical scrolling
			document.body.style.height = 'auto'; // Reset body height
		};
	}, [params.isMobile]);



	return (
		<>
			<div className="bg-white hidden md:block">
				<h3 className="uppercase text-xxs px-2 py-2">Found <b>{filteredCollege?.colleges?.meta?.pagination?.total}</b> colleges</h3>
				{
					SelectedFilter.stream || SelectedFilter.state ? (<>
						<div className="bg-gray-200 px-2 py-2 flex items-center justify-between" onClick={handleOpen}><span>Selected Filters</span> <span>{open ? <FaAngleDown /> : <FaAngleUp />}</span></div>
						<div className="flex py-2 px-4 flex-wrap gap-2">
							{Object.entries(SelectedFilter).map(([key, value]) => (
								(value != "") && (
									< div
										key={key}
										className="px-2 py-1 border border-orange-500 rounded-full text-xs flex gap-1 items-center"
									>
										<span>{value}</span>
										<span onClick={() => handleUnselectFilter(key, value)}><MdClose /></span></div>
								)
							))}
						</div>
					</>) : (<></>)
				}
				{params.page != "stream" ? <Filter name="Stream" filters={streamsData?.streams?.data} handleFilter={handleStreamFilter} checked={StreamFilter} /> : ""}
				<Filter name="State" filters={statesData?.states?.data} handleFilter={handleStateFilter} checked={StateFilter} />
			</div >
			{

				params.isMobile ? (
					<div className="absolute top-0 right-0 left-0 h-full w-full bg-black/[0.5] z-50 overscroll-none">
						{/* <div className="fixed top-0 h-2/6 w-full bg-black opacity-2" onClick={params.handleMobileFilter
						}></div> */}
						<div className="opacity-100 z-50 block fixed right-0 bottom-0 left-0 w-screen h-4/6 bg-white text-black rounded-xl">
							<div className="flex justify-between px-5 py-5 w-full border-b-2 border-gray-300">
								<h5 className="text-base font-bold">All Filter</h5>
								<span onClick={params.handleMobileFilter
								}><FaAngleDown /></span>
							</div>
							<div className="filter-body">
								<div className="flex flex-wrap flex-row filters-wrapper">
									<div className="filters-section bg-white min-height px-0">
										<Box
											sx={
												{
													flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224
												}
											}
										>
											<Tabs
												orientation="vertical"
												variant="scrollable"
												value={value
												}
												onChange={tabHandleChange
												}
												aria-label="Vertical tabs example"
												sx={
													{
														borderRight: 1, borderColor: 'divider'
													}
												}
											>
												<Tab label="Streams"{...a11yProps(0)
												} />
												<Tab label="States"{...a11yProps(1)
												} />
											</Tabs>
											<TabPanel value={value
											} index={
												0
											}>
												{streamsData?.streams?.data?.map((stream: any) => {
													return (
														<div key={stream.id
														} className="flex gap-1 items-center my-2 cursor-pointer">
															<input
																type="radio"
																id={stream.id
																}
																name={stream.attributes.streamName
																}
																checked={StreamFilter === stream.attributes.streamName
																}
																className=""
																onChange={() => handleStreamFilter(stream.attributes.streamName)
																}
															/>
															<span className="text-xxs font-semibold text-secondary-text hover:text-primary">{stream.attributes.streamName
															}</span>
														</div>
													)
												})
												}
											</TabPanel>
											<TabPanel value={value
											} index={
												1
											}>
												{statesData.data?.map((state: any) => {
													return (
														<div
															key={state.id
															}
															className="flex gap-1 items-center my-2 cursor-pointer text-base"
														>
															<input
																type="radio"
																name={state?.attributes?.name}
																id={state?.id}
																className=""
																checked={StateFilter === state?.attributes?.name}
																onChange={() => handleStateFilter(state?.attributes?.name)}
															/>
															<span
																className="text-xxs font-semibold text-secondary-text hover:text-primary">
																{state.name
																}
															</span>
														</div>
													)
												})
												}
											</TabPanel>
										</Box>
									</div>
								</div>
							</div>
							<div className="filter-buttons flex justify-center w-full gap-14 px-5 bg-white fixed bottom-0 left-0 right-0 z-10">
								<div className="w-1/2 border border-gray-300" onClick={resetFilters
								}>
									<Button href={
										""
									} text="Cancel" filled fontSize="text-sm" fontWeight="font-bold" width="w-full" align="text-center" bgColor="bg-white" fontColor="text-primary" />
								</div>
								<div className="w-1/2" onClick={params.handleMobileFilter
								}>
									<Button href={
										""
									} text="Apply Filters" filled fontSize="text-sm" fontWeight="font-bold" width="w-full" align="text-center" bgColor="bg-primary" fontColor="text-white" />
								</div>
							</div>
						</div>
					</div>

				) : (
					<></>)
			}

		</>

	)

	interface TabPanelProps {
		children?: React.ReactNode;
		index: number;
		value: number;
	}

	function TabPanel(props: TabPanelProps) {
		const { children, value, index, ...other } = props;

		return (
			<div
				role="tabpanel"
				hidden={value !== index}
				id={`vertical-tabpanel-${index}`}
				aria-labelledby={`vertical-tab-${index}`}
				{...other}
			>
				{value === index && (
					<Box sx={{ p: 3 }}>
						<Typography>{children}</Typography>
					</Box>
				)}
			</div>
		);
	}

	function a11yProps(index: number) {
		return {
			id: `vertical-tab-${index}`,
			'aria-controls': `vertical-tabpanel-${index}`,
		};
	}
}


