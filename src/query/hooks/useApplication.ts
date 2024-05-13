
import { useQuery } from "@apollo/client";
import { allApplicationSteps } from "../graphql/application";

const useApplication = () => {
	const { loading: allApplicationStepsLoading, error: allApplicationStepsError, data: allApplicationStepsData } = useQuery(allApplicationSteps)

	return { allApplicationSteps: allApplicationStepsData?.applicationSteps?.data }
}

export default useApplication