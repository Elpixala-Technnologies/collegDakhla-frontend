import { useQuery } from "@apollo/client";
import { getColleges } from "../graphql/colleges";

export default function useColleges() {
	const {
		loading: allCollegeLoading,
		error: allCollegeError,
		data: allColleges,
	} = useQuery<any>(getColleges);

	const allCollegesData = allColleges?.colleges?.data

	return { allCollegesData }
}