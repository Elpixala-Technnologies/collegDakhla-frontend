/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQuery } from "@apollo/client"
import { ID } from "@/types/global";
import { checkUser, checkUserOtp, getUserMetaId } from "../graphql/signup";


const UserCheck = (number: string, email?: string) => {

	const { loading, error, data } = useQuery<any>(checkUser, {
		variables: {
			number,
			email: email ? email : ""
		},
		skip: number.length != 10
	});

	if (data && data !== undefined) {
		if (data?.usersData?.data?.length === 0) {
			return false
		}
		else if (data?.usersData?.data?.length === 1) {
			return { userData: data?.usersData }
		}
	}
}

const CheckOTP = (userID: ID, number: string, userOtp: string) => {

	const { loading, error, data } = useQuery<any>(checkUserOtp, {
		variables: {
			userID,
			userOtp,
			number,
		},
		skip: userOtp.length !== 6
	});

	if (data?.usersData?.data?.length == 1 && data?.usersData?.data[0]?.id == userID) {
		return { loggedInUser: data.usersData.data[0] }
	}
	else {
		return false;
	}
}

const GetUserDataMetaId = (userID: ID) => {
	const { loading, error, data } = useQuery<any>(getUserMetaId, {
		variables: { userID },
	});

	const userMetaDataId: ID = Number(data?.userData?.data?.attributes?.userMetaData?.data?.id);

	return userMetaDataId;
}

const useSignup = () => {


	return { UserCheck, CheckOTP, GetUserDataMetaId };
};

export default useSignup;