import { getColleges } from "@/query/schema";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
 

const useColleges = () => {
  const {
    loading: allCollegeLoading,
    error: allCollegeError,
    data: allCollegeData,
  } = useQuery<any>(getColleges);
  const AllCollegesData = allCollegeData?.colleges?.data;
  const [CollegeListData, setCollegeListData] = useState<any[]>([]);

  
  useEffect(() => {
    setCollegeListData(AllCollegesData || []);
  }, [AllCollegesData]);

  const isToCollegeData = CollegeListData.filter((college) => college.attributes.is_top)
  const isFeaturedCollegeData = CollegeListData.filter((college) => college.attributes.is_featured)

  return {
    AllCollegesData,
    allCollegeLoading,
    allCollegeError,
    CollegeListData,
    isFeaturedCollegeData,
    isToCollegeData
  };
};

export default useColleges;
