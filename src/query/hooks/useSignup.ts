import { useMutation, useQuery } from "@apollo/client"
import { ID } from "@/types/global";
import { checkUser, checkUserOtp, getUserMetaId } from "../graphql/signup";


const UserCheck = (number: string, email?: string) => {

	const { loading, error, data, refetch } = useQuery<any>(checkUser, {
		variables: {
			number,
			email: email ? email : ""
		},
		skip: number.length != 10
	});

	if (data == undefined) {
		refetch();
	}
	else if (data?.usersData?.data.length === 1) {
		// return { userData: data?.usersData }
		return data
	}
	else if (data?.usersData?.data.length === 0) {
		return false;
	}

}

const CheckOTP = (userID: ID, number: string, userOtp: string) => {

	const { loading, error, data, refetch } = useQuery<any>(checkUserOtp, {
		variables: {
			userID,
			userOtp,
			number,
		},
		skip: userOtp.length !== 6
	});


	if (data?.usersData?.data?.length == 1 && data?.usersData?.data[0]?.id == userID) {
		return data.usersData.data[0]
	}
	else if (data?.usersData?.data?.length == 0) {
		return false;
	}
	else if (data == undefined) {
		return refetch();
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