import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { getCourses } from "@/query/schema";

type filterType = {
  courseLevel?: string;
  streamName?: string;
};

 
const useCourses = () => {
  const {
    loading: allCourseLoading,
    error: allCourseError,
    data: allCourseData,
  } = useQuery<any>(getCourses);

  const AllCourseData = allCourseData?.courses?.data;

  const [CourseListData, setCourseListData] = useState<any[]>([]);

  useEffect(() => {
    setCourseListData(AllCourseData || []);
  }, [AllCourseData, allCourseData]);

  const isTopCourseeData = CourseListData.filter((Course: any) => Course.attributes.is_top)
  const isFeaturedCourseData = CourseListData.filter((Course: any) => Course.attributes.is_featured)


  return {
    AllCourseData,
    isTopCourseeData,
    isFeaturedCourseData,
    CourseListData,
    allCourseLoading
  };
};

export default useCourses;
