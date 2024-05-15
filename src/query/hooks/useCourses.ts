import { useQuery } from "@apollo/client";
import { getCourses } from "../graphql/courses";

export default function useCourses() {
	const {
		loading: allCourseLoading,
		error: allCourseError,
		data: allCourses,
	} = useQuery<any>(getCourses);

	const allCoursesData = allCourses?.courses?.data;


	return { allCoursesData }
}