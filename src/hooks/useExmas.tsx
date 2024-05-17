import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_ALL_EXAM } from "@/graphql/examSchema/examSchema";

 
const useExmas = () => {
	const {
		loading: allExamLoading,
		error: allExamError,
		data: allExamData,
	} = useQuery<any>(GET_ALL_EXAM);

	const [ExamListData, setExamListData] = useState<any[]>([]);

	const AllExamData = allExamData?.exams?.data;
	useEffect(() => {
		setExamListData(AllExamData || []);
	}, [AllExamData, allExamData]);


	const isTopExameData = ExamListData.filter((exam: any) => exam.attributes.is_top)
	const isFeaturedExamData = ExamListData.filter((exam: any) => exam.attributes.is_featured)

	// ============ 

 
	return {
		AllExamData,
		isFeaturedExamData,
		isTopExameData,
		allExamLoading,
		ExamListData
	};
};

export default useExmas;
