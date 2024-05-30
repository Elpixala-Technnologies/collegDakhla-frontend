import { useEffect, useState } from "react";
import Filter from "../courseFilters/filter";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { getSpecializations, getStates } from "@/query/schema";
import { useQuery } from "@apollo/client";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "../../button/button";

export default function CourseFilters({ DurationFilter,
	setDurationFilter,
	SpecializationFilter,
	setSpecializationFilter,
	isMobile,
	handleMobileFilter,
	totalCourses
}: any) {

	const [open, setOpen] = useState(true);
	const handleOpen = () => setOpen(open ? false : true);
	const [SelectedFilter, setSelectedFilter] = useState({
		duration: "",
		specialization: "",
	});

	// query to get all specializations
	const {
		loading: specializationsLoader,
		error: specializationsError,
		data: specializationsData,
	} = useQuery(getSpecializations);

	//tab state
	const [value, setValue] = useState(0);

	const handleDurationFilter = (years: string) => {
		setDurationFilter(years);
		setSelectedFilter((prevData) => ({
			...prevData,
			duration: years,
		}));
	};

	const handleSpecializationFilter = (name: string) => {
		setSpecializationFilter(name);
		setSelectedFilter((prevData) => ({
			...prevData,
			specialization: name,
		}));
	};

	const handleUnselectFilter = (filter?: string, name?: string) => {
		if (filter === "duration") {
			setDurationFilter("");
			SelectedFilter.duration = "";
		} else if (filter === "specialization") {
			setSpecializationFilter("");
			SelectedFilter.specialization = "";
		}
	};

	const resetFilters = () => {
		const updatedFilter = {};
		handleMobileFilter();
	};

	// tab tabHandleChange
	const tabHandleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	// check for SelectedFilter
	useEffect(() => {
		const hasData = Object.values(SelectedFilter).some((value) => !!value);
	}, [SelectedFilter]);

	useEffect(() => {
		if (isMobile) {
			document.body.style.overflowY = "hidden"; // Disable vertical scrolling
			document.body.style.height = "100%"; // Set body height to 100%
		} else {
			document.body.style.overflowY = "auto"; // Enable vertical scrolling
			document.body.style.height = "auto"; // Reset body height
		}

		// Clean up function to reset styles when component unmounts
		return () => {
			document.body.style.overflowY = "auto"; // Reset vertical scrolling
			document.body.style.height = "auto"; // Reset body height
		};
	}, [isMobile]);

	return (
		<>
			<div className="bg-white hidden md:block p-2 rounded-md">
				<h3 className="uppercase text-sm px-2 py-3">
					Found <b>{totalCourses}</b>{" "}
					colleges
				</h3>
				{SelectedFilter.duration || SelectedFilter.specialization ? (
					<>
						<div
							className="bg-gray-50 px-2 py-2 flex items-center justify-between"
							onClick={handleOpen}
						>
							<span>Selected Filters</span>{" "}
							<span>{open ? <FaAngleDown /> : <FaAngleUp />}</span>
						</div>
						<div className="flex py-2 px-4 flex-wrap gap-2">
							{Object.entries(SelectedFilter).map(
								([key, value]) =>
									value != "" && (
										<div
											key={key}
											className="px-2 py-1 border border-orange-500 rounded-full text-xs flex gap-1 items-center"
										>
											<span>{value}</span>
											<span onClick={() => handleUnselectFilter(key, value)}>
												<MdClose />
											</span>
										</div>
									)
							)}
						</div>
					</>
				) : (
					<></>
				)}


				<Filter
					name="Duration"
					filters={["1", "2", "3", "4", "5", "6"]}
					handleFilter={handleDurationFilter}
					checked={DurationFilter}
				/>

				<Filter
					name="Specialization"
					filters={specializationsData?.specializations?.data}
					handleFilter={handleSpecializationFilter}
					checked={SpecializationFilter}
				/>
			</div>
			{isMobile ? (
				<div className="absolute top-0 right-0 left-0 h-full w-full bg-black/[0.5] z-50 overscroll-none">

					<div className="opacity-100 z-50 block fixed right-0 bottom-0 left-0 w-screen h-4/6 bg-white text-black rounded-xl">
						<div className="flex justify-between px-5 py-5 w-full border-b-2 border-gray-300">
							<h5 className="text-base font-bold">All Filter</h5>
							<span onClick={handleMobileFilter}>
								<FaAngleDown />
							</span>
						</div>
						<div className="filter-body">
							<div className="flex flex-wrap flex-row filters-wrapper">
								<div className="filters-section bg-white min-height px-0">
									<Box
										sx={{
											flexGrow: 1,
											bgcolor: "background.paper",
											display: "flex",
											height: 224,
										}}
									>
										<Tabs
											orientation="vertical"
											variant="scrollable"
											value={value}
											onChange={tabHandleChange}
											aria-label="Vertical tabs example"
											sx={{
												borderRight: 1,
												borderColor: "divider",
											}}
										>
											<Tab label="Duration" {...a11yProps(0)} />
											<Tab label="Specialization" {...a11yProps(1)} />
										</Tabs>
										<TabPanel value={value} index={0}>
											{["1", "2", "3", "4", "5", "6"].map((year: string, index: number) => {
												return (
													<div
														key={index}
														className="flex gap-1 items-center my-2 cursor-pointer"
													>
														<input
															type="radio"
															id={`${index}`}
															name={`${year}`}
															checked={
																DurationFilter === year
															}
															className=""
															onChange={() =>
																handleDurationFilter(year)
															}
														/>
														<span className="text-xxs font-semibold text-secondary-text hover:text-primary">
															{year} Years
														</span>
													</div>
												);
											})}
										</TabPanel>
										<TabPanel value={value} index={1}>
											{specializationsData?.specializations?.data?.map((specialization: any) => {

												return (
													<div
														key={specialization.id}
														className="flex gap-1 items-center my-2 cursor-pointer text-base"
													>
														<input
															type="radio"
															name={specialization?.attributes?.name}
															id={specialization?.id}
															className=""
															checked={SpecializationFilter === specialization?.attributes?.name}
															onChange={() =>
																handleSpecializationFilter(specialization?.attributes?.name)
															}
														/>
														<span className="text-xxs font-semibold text-secondary-text hover:text-primary">
															{specialization?.attributes?.name}
														</span>
													</div>
												);
											})}
										</TabPanel>
									</Box>
								</div>
							</div>
						</div>
						<div className="filter-buttons flex justify-center w-full gap-14 px-5 bg-white fixed bottom-0 left-0 right-0 z-10 mb-2">
							<div
								className="w-1/2 border border-gray-300"
								onClick={resetFilters}
							>
								<Button
									href={""}
									text="Cancel"
									filled
									fontSize="text-sm"
									fontWeight="font-bold"
									width="w-full"
									align="text-center"
									bgColor="bg-white"
									fontColor="text-primary"
								/>
							</div>
							<div className="w-1/2" onClick={handleMobileFilter}>
								<Button
									href={""}
									text="Apply Filters"
									filled
									fontSize="text-sm"
									fontWeight="font-bold"
									width="w-full"
									align="text-center"
									bgColor="bg-primary"
									fontColor="text-white"
								/>
							</div>
						</div>
					</div>
				</div>
			) : (
				<></>
			)}
		</>
	);

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
			"aria-controls": `vertical-tabpanel-${index}`,
		};
	}
}