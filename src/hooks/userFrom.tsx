/* eslint-disable react-hooks/rules-of-hooks */
import {
  GET_USER_FORM,
  SaveCollege,
  SaveCourse,
  SaveExam,
  UPDATE_USER_FORM,
} from "@/graphql/userSchema/userSchema";
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

  const [
    userFromMetaUpdate,
    {
      loading: userFromMetaUpdateLoading,
      error: userFromMetaUpdateError,
      data: userFromMetaUpdateData,
    },
  ] = useMutation<any>(UPDATE_USER_FORM);

  // ==============

  const [
    saveCollege,
    {
      loading: saveCollegeLoading,
      error: saveCollegeError,
      data: saveCollegeData,
    },
  ] = useMutation<any>(SaveCollege);

  const [
    saveExam,
    { loading: saveExamLoading, error: saveExamError, data: saveExamData },
  ] = useMutation<any>(SaveExam);

  const [
    saveCourse,
    { loading: saveCourseLoading, error: saveCourserror, data: saveCourseData },
  ] = useMutation<any>(SaveCourse);


  return {
    CollegeApplicatonListData,
    CollegeApplicaton,
    userFromMetaUpdate,

    saveCollege,
    saveExam,
    saveCourse,
  };
};

export default userFrom;
