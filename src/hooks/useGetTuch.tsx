import { CHECK_GET_TUCH, CREATE_GET_TUCH } from "@/graphql/getTuch/getTuch";
import { useMutation, useQuery } from "@apollo/client";

const CheckGetTuch = (userPhone: string) => {
	const { loading, error, data } = useQuery<any>(CHECK_GET_TUCH, {
		variables: {
			userPhone,
		},
		// skip: userPhone.length !== 10,
	});

	return {
		error,
		loading,
		getTuchData: data?.getInTouches?.data,
	};
};

const useGetTuch = () => {
	const [
		createGetTuch,
		{ loading: GetTuchLoading, error: GetTuchError, data: GetTuchData },
	] = useMutation(CREATE_GET_TUCH);

	return {
		createGetTuch,
		CheckGetTuch,
	};
};

export default useGetTuch;
