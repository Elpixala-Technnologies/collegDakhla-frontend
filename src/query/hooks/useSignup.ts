import { useMutation, useQuery } from "@apollo/client"
import { ID } from "@/types/global";
import { checkUser, checkUserOtp } from "../graphql/signup";


const userCheck = (number: string, email?: string) => {

	const { loading, error, data } = useQuery<any>(checkUser, {
		variables: {
			number,
			email: email ? email : ""
		},
		skip: number.length !== 10
	});

	if (data?.usersData?.data?.length === 0) {
		return false
	}
	else if (data?.usersData?.data?.length === 1) {
		return { userData: data?.usersData }
	}
}

const checkOTP = (userID: ID, number: string, userOtp: string) => {

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

const useSignup = () => {


	return { userCheck, checkOTP };
};

export default useSignup;