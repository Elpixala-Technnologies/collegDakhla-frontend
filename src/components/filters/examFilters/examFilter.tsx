import { useEffect, useState } from "react";
import Filter from "../examFilters/filter";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import {
  getExamLevels,
  getExamModes,
  getStreams,
} from "@/query/schema";
import { useQuery } from "@apollo/client";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "../../button/button";

export default function ExamFilters({
  LevelFilter,
  setLevelFilter,
  ModeFilter,
  setModeFilter,
  isMobile,
  handleMobileFilter,
  totalExams,
}: any) {
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(open ? false : true);
  const [StreamFilter, setStreamFilter] = useState<string>("");
  const [value, setValue] = useState(0);
  const [SelectedFilter, setSelectedFilter] = useState({
    stream: "",
    level: "",
    mode: "",
  });


  const {
    loading: examLevelLoader,
    error: examLevelError,
    data: examLevelData,
  } = useQuery(getExamLevels);


  const {
    loading: examModeLoader,
    error: examModeError,
    data: examModeData,
  } = useQuery(getExamModes);
  const {
    loading: streamLoader,
    error: streamsError,
    data: streamsData,
  } = useQuery(getStreams);
  

  const handleStreamFilter = (name: string) => {
    setStreamFilter(name);
    setSelectedFilter((prevData) => ({
      ...prevData,
      stream: name,
    }));
  };

  const handleLevelFilter = (level: string) => {
    setLevelFilter(level);
    setSelectedFilter((prevData) => ({
      ...prevData,
      level: level,
    }));
  };

  const handleModeFilter = (mode: string) => {
    setModeFilter(mode);
    setSelectedFilter((prevData) => ({
      ...prevData,
      mode: mode,
    }));
  };

  const handleUnselectFilter = (filter?: string, name?: string) => {
    if (filter === "stream") {
      setStreamFilter("");
      SelectedFilter.stream = "";
    }
    if (filter === "level") {
      setLevelFilter("");
      SelectedFilter.level = "";
    }
    if (filter === "mode") {
      setModeFilter("");
      SelectedFilter.mode = "";
    }
  };

  const resetFilters = () => {
    const updatedFilter = {};
    handleMobileFilter();
  };

  const tabHandleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    const hasData = Object.values(SelectedFilter).some((value) => !!value);
  }, [SelectedFilter]);

  useEffect(() => {
    if (isMobile) {
      document.body.style.overflowY = "hidden"; 
      document.body.style.height = "100%";
    } else {
      document.body.style.overflowY = "auto";
      document.body.style.height = "auto";
    }
    return () => {
      document.body.style.overflowY = "auto"; 
      document.body.style.height = "auto"; 
    };
  }, [isMobile]);



  console.log(streamsData, "streamsData");
  return (
    <>
      <div className="bg-white hidden md:block rounded-lg">
        <h3 className="uppercase text-sm px-2 py-3">
          Found <b>{totalExams}</b> colleges
        </h3>
        {SelectedFilter.level ||
        SelectedFilter.mode ||
        SelectedFilter.stream ? (
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
          name="Level"
          filters={examLevelData?.examLevels?.data} // add data here
          handleFilter={handleLevelFilter}
          checked={LevelFilter}
        />

        <Filter
          name="Mode"
          filters={examModeData?.examModes?.data} // add data here
          handleFilter={handleModeFilter}
          checked={ModeFilter}
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
                      {examLevelData?.examLevels?.data.map(
                        (level: any, index: number) => {
                          return (
                            <div
                              key={index}
                              className="flex gap-1 items-center my-2 cursor-pointer"
                            >
                              <input
                                type="radio"
                                id={level?.attributes?.name}
                                name={level?.attributes?.name}
                                checked={
                                  LevelFilter === level?.attributes?.name
                                }
                                className=""
                                onChange={() =>
                                  handleLevelFilter(level?.attributes?.name)
                                }
                              />
                              <span className="text-xxs font-semibold text-secondary-text hover:text-primary">
                                {level?.attributes?.name}
                              </span>
                            </div>
                          );
                        }
                      )}
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                      {examModeData?.examModes?.data?.map((mode: any) => {
                        return (
                          <div
                            key={mode.id}
                            className="flex gap-1 items-center my-2 cursor-pointer text-base"
                          >
                            <input
                              type="radio"
                              name={mode?.attributes?.name}
                              id={mode?.id}
                              className=""
                              checked={ModeFilter === mode?.attributes?.name}
                              onChange={() =>
                                handleModeFilter(mode?.attributes?.name)
                              }
                            />
                            <span className="text-xxs font-semibold text-secondary-text hover:text-primary">
                              {mode?.attributes?.name}
                            </span>
                          </div>
                        );
                      })}
                    </TabPanel>
                  </Box>
                </div>
              </div>
            </div>
            <div className="filter-buttons flex justify-center w-full gap-14 px-5 bg-white fixed bottom-0 left-0 right-0 z-10">
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
