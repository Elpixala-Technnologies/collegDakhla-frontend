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
query UsersData($userID: ID!, $number:String!, $userOtp: String) {
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