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

export default function CourseFilters({
  DurationFilter,
  setDurationFilter,
  SpecializationFilter,
  setSpecializationFilter,
  totalCourses,
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

  // tab tabHandleChange
  const tabHandleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // check for SelectedFilter
  useEffect(() => {
    const hasData = Object.values(SelectedFilter).some((value) => !!value);
  }, [SelectedFilter]);

  return (
    <div className="bg-white hidden md:block p-2 rounded-md">
      <h3 className="uppercase text-sm px-2 py-3">
        Found <b>{totalCourses}</b> colleges
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
