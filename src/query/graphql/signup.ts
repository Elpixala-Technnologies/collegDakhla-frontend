import { gql } from "@apollo/client";

export const checkUser = gql`
query UsersData($number: String, $email: String) {
		usersData( filters: { or: [{ number: { eq: $number } }, { email: { eq: $email } }] }
		)  {
		data {
			id
			attributes {
				name
				email
				number
			}
		}
	}
}
`

export const checkUserOtp = gql`
query UsersData($userID: ID, $number:String, $userOtp: String) {
	usersData(
		filters: {and : [{ id: { eq: $userID }, otp: { eq: $userOtp }, number: { eq: $number } }]}
	) {
		data {
			id
			attributes {
				email
				number
				name
			}
		}
	}
}`

export const getUserMetaId = gql`
query UserData($userID: ID!) {
	userData(id: $userID) {
		data {
			attributes {
				userMetaData {
					data {
						id
					}
				}
			}
		}
	}
}
`

export const register = gql`
	mutation registerUser($name: String!, $email: String, $phoneNumber: String!, $stream: ID, $courseLevel: ID) {
		registerUser(
			input: {
				name: $name
				email: $email
				phoneNumber: $phoneNumber
				stream: $stream
				courseLevel: $courseLevel
			}
		) {
			status
			message
		}
	}
`;

export const verifyOTP = gql`
	query VerifyOTP($phoneNumber: String!, $userOtp: String!) {
		verifyOTP(input: {phoneNumber: $phoneNumber, otp: $userOtp}) {
			... on UserProfileEntityResponse {
				data {
					id
					attributes {
						name
						username
						email
						phoneNumber
						roles
						permissions
						token
					}
				}
			}
			... on verifyOTPErrorEntity {
				status
				message
			}
		}
	}
`;

export const sendOTP = gql`
	query GenerateOTP($phoneNumber: String, $isResend: Boolean) {
		generateOTP(
			input: {phoneNumber: $phoneNumber, isResend_otp: $isResend}) {
				status
				message
			}
	}
`;