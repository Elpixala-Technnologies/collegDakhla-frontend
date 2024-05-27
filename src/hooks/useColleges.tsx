import { GetReviewByID, GetReviewForUserId, WriteReviews } from "@/graphql/collegeSchema/collegeSchema";
import { getColleges } from "@/query/schema";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";


const GetReviewById = (id: any) => {
  const { loading, error, data } = useQuery(GetReviewByID, {
    variables: { id: id },
  });

  return {
    reviewsData: data?.colleges?.data,
    loading,
    error,
  };
};

const GetReviewByUserId =  (id: any, email: any) => {
  const { loading, error, data } = useQuery(GetReviewForUserId, {
    variables: { id: id, email : email},
  });

  return {
    reviewsUserData: data?.colleges?.data,
    loading,
    error,
  };
};

 
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

	const [writeReviews, { loading: writeReviewsLoading, error: writeReviewsError, data: writeReviewsData }] = useMutation<any>(WriteReviews)


  return {
    AllCollegesData,
    allCollegeLoading,
    allCollegeError,
    CollegeListData,
    isFeaturedCollegeData,
    isToCollegeData,
    writeReviews,
    GetReviewById,
    GetReviewByUserId

  };
};

export default useColleges;
