import { useLazyQuery, useMutation, useQuery } from "@apollo/client"
import { ID } from "@/types/global";
import { getUserMetaId, register, sendOTP, verifyOTP } from "../graphql/signup";

const GetUserDataMetaId = (userID: ID) => {
	const { loading, error, data } = useQuery<any>(getUserMetaId, {
		variables: { userID },
	});

	const userMetaDataId: ID = Number(data?.userData?.data?.attributes?.userMetaData?.data?.id);

	return userMetaDataId;
}

const useSignup = () => {
	const [RegisterUser, { loading: registerLoading, error: registerError, data: registerData }] = useMutation<any>(register)
	const [GenerateOTP, { loading: sendOtpLoading, error: sendOtpError, data: sendOtpData }] = useLazyQuery<any>(sendOTP);
	const [CheckOTP, { loading: verifyOtpLoading, error: verifyOtpError, data: verifyOtpData }] = useLazyQuery<any>(verifyOTP)

	return { GetUserDataMetaId, RegisterUser, GenerateOTP, CheckOTP };
};

export default useSignup;