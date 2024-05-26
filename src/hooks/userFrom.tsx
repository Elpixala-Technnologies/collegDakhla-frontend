/* eslint-disable react-hooks/rules-of-hooks */
import { GET_USER_FORM, UPDATE_USER_FORM } from "@/graphql/userSchema/userSchema";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
 
const userFrom = () => {
  const {
    loading: collegeApplicationLoading,
    error: collegeApplicationError,
    data: collegeApplicationData,
  } = useQuery<any>(GET_USER_FORM);

  const AllCollegeApplicationData = collegeApplicationData?.userForms?.data;

  const [CollegeApplicatonListData, setCollegeApplicatonListData] =
    useState<any>(null);
  const [CollegeApplicaton, setCollegeApplicaton] = useState<any[]>([]);

  useEffect(() => {
    setCollegeApplicaton(AllCollegeApplicationData || []);
  }, [AllCollegeApplicationData, collegeApplicationData]);

  const CollegeApplication = CollegeApplicaton?.filter(
    (application: any) =>
      application?.attributes?.form_url == "standard-application-form"
  );

  useEffect(() => {
    if (CollegeApplication.length > 0) {
      setCollegeApplicatonListData(CollegeApplication[0]?.attributes || []);
    }
  }, [CollegeApplication]); 

	const [userFromMetaUpdate, { loading: userFromMetaUpdateLoading, error: userFromMetaUpdateError, data: userFromMetaUpdateData }] = useMutation<any>(UPDATE_USER_FORM)


  return {
    CollegeApplicatonListData,
    CollegeApplicaton,
    userFromMetaUpdate
  };
};

export default userFrom;
