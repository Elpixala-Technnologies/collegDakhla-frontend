import { useEffect, useState } from "react";
import Filter from "../examFilters/filter";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { getExamLevels, getExamModes, getStreams } from "@/query/schema";
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


  const tabHandleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    const hasData = Object.values(SelectedFilter).some((value) => !!value);
  }, [SelectedFilter]);

  return (
      <div className="bg-white max-md:mt-24  rounded-lg">
        <h3 className="uppercase text-sm px-2 py-3">
          Found <b>{""}</b> colleges
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
