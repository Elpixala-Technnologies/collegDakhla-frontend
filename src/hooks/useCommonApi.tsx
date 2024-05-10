import { GET_BOARDS } from "@/graphql/commonSchema/commonSchema";
import { getCourseLevels, getStreams } from "@/query/schema";
import { useQuery } from "@apollo/client";
 

const useCommonApi = () => {
 
	const {
		loading: StreamLoading,
		error: StreamError,
		data: StreamData,
	} = useQuery(getStreams);
	const AllStreamData = StreamData?.streams?.data;
 
 
	const {
		loading: CourseLevelLoading,
		error: CourseLevelError,
		data: CourseLevelData,
	} = useQuery(getCourseLevels);

	const AllCourseLevelData = CourseLevelData?.courseLevels?.data;

 
	const {
		loading: BoardLoading,
		error: BoardError,
		data: BoardData,
	} = useQuery(GET_BOARDS);

	const AllBoardData = BoardData?.boards?.data;
 

	return {
		AllStreamData,
		AllCourseLevelData,
		AllBoardData
	};
};

export default useCommonApi;
