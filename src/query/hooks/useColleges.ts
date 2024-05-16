import { useQuery } from "@apollo/client";
import { getAllColleges } from "../graphql/colleges";

export default function useColleges() {
	const {
		loading: allCollegeLoading,
		error: allCollegeError,
		data: allColleges,
	} = useQuery<any>(getAllColleges);

	const allCollegesData = allColleges?.colleges?.data

	return { allCollegesData }
}