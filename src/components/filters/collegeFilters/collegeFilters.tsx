/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Filter from "./filter";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import {
  getStreams,
  getStates,
  getCollegesFilter,
  getCourses,
  collegeTypes,
  getAllColleges,
} from "@/query/schema";
import { useQuery } from "@apollo/client";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "../../button/button";

export default function CollegeFilters(params?: any) {
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(open ? false : true);
  const [SelectedFilter, setSelectedFilter] = useState({
    stream: "",
    state: "",
    city: "",
    courses: "",
    collegeType: "",
  });

  const [StreamFilter, setStreamFilter] = useState<string>("");
  const [StateFilter, setStateFilter] = useState<string>("");
  const [CityFilter, setCityFilter] = useState<string>("");
  const [CoursesFilter, setCoursesFilter] = useState<string>("");
  const [collegeTypeFilter, setcollegeTypeFilter] = useState<string>("");
  const {
    loading: streamLoader,
    error: streamsError,
    data: streamsData,
  } = useQuery(getStreams);
  const {
    loading: statesLoader,
    error: statesError,
    data: statesData,
  } = useQuery(getStates);

  const {
    loading: courseLoader,
    error: courseError,
    data: coursesData,
  } = useQuery(getCourses);

  const {
    loading: collegeTypeLoader,
    error: collegeTypeError,
    data: collegeTypesData,
  } = useQuery(collegeTypes);

  const {
    loading: filterLoader,
    error: filterError,
    data: filteredCollege,
    refetch,
  } = useQuery(getCollegesFilter, {
    variables: {
      StreamFilter,
      StateFilter,
      CityFilter,
      CoursesFilter,
      collegeTypeFilter,
    },
  });

  const { loading, error, data: initialData } = useQuery(getAllColleges);

  //tab state
  const [value, setValue] = useState(0);

  const handleStreamFilter = (name: string) => {
    setStreamFilter(name);
    setSelectedFilter((prevData) => ({
      ...prevData,
      stream: name,
    }));
  };

  const handleStateFilter = (name: string) => {
    //setSelectedFilter([...SelectedFilter, name]);
    setStateFilter(name);
    setSelectedFilter((prevData) => ({
      ...prevData,
      state: name,
    }));
  };
  const handleCityFilter = (name: string) => {
    setCityFilter(name);
    setSelectedFilter((prevData) => ({
      ...prevData,
      city: name,
    }));
  };

  const handleCoursesFilter = (name: string) => {
    setCoursesFilter(name);
    setSelectedFilter((prevData) => ({
      ...prevData,
      courses: name,
    }));
  };

  const handlecollegeTypeFilter = (name: string) => {
    setcollegeTypeFilter(name);
    setSelectedFilter((prevData) => ({
      ...prevData,
      collegeType: name,
    }));
  };

  const handleUnselectFilter = (filter?: string, name?: string) => {
    if (filter === "stream") {
      setStreamFilter("");
      setSelectedFilter((prevData) => ({
        ...prevData,
        stream: "",
      }));
    } else if (filter === "state") {
      setStateFilter("");
      setSelectedFilter((prevData) => ({
        ...prevData,
        state: "",
      }));
    } else if (filter === "city") {
      setCityFilter("");
      setSelectedFilter((prevData) => ({
        ...prevData,
        city: "",
      }));
    } else if (filter === "courses") {
      setCoursesFilter("");
      setSelectedFilter((prevData) => ({
        ...prevData,
        courses: "",
      }));
    } else if (filter === "collegeType") {
      setcollegeTypeFilter("");
      setSelectedFilter((prevData) => ({
        ...prevData,
        collegeType: "",
      }));
    }
  };

  // render data when filter values are changed
  useEffect(() => {
    params?.setFilteredData(filteredCollege?.colleges?.data);
  }, [filteredCollege, filterLoader]);

  return (
      <div className="bg-white max-md:mt-24  rounded-lg">
        <h3 className="uppercase text-sm px-2 py-3">Found colleges</h3>
        {SelectedFilter.stream ||
        SelectedFilter.state ||
        SelectedFilter.courses ||
        SelectedFilter.collegeType ? (
          <>
            <div
              className="bg-gray-200 px-2 py-2 flex items-center justify-between"
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
          name="Stream"
          filters={streamsData?.streams?.data}
          handleFilter={handleStreamFilter}
          checked={StreamFilter}
        />

        <Filter
          name="State"
          filters={statesData?.states?.data}
          handleFilter={handleStateFilter}
          checked={StateFilter}
        />
        {/* <Filter
          name="City"
          filters={citiesData?.cities?.data}
          handleFilter={handleCityFilter}
          checked={CityFilter}
        /> */}

        {/* New tab for courses */}
        <Filter
          name="Courses"
          filters={coursesData?.courses?.data}
          handleFilter={handleCoursesFilter}
          checked={CoursesFilter}
        />

        <Filter
          name="CollegeType"
          filters={collegeTypesData?.collegeTypes?.data}
          handleFilter={handlecollegeTypeFilter}
          checked={CoursesFilter}
        />
      </div>
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
