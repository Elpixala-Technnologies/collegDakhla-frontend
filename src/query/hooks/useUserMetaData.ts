import { useMutation } from "@apollo/client"
import { createUserMetaData } from "../graphql/userMetaData"

export default function useUserMetaData() {
	const [userMetaCreate, { loading: userMetaCreateLoading, error: userMetaCreateError, data: userMetaCreateData }] = useMutation<any>(createUserMetaData)

	// const [userMetaUpdate, { loading: userMetaUpdateLoading, error: userMetaUpdateError, data: userMetaUpdateData }] = useMutation<any>(updateUserMetaData)

	return { userMetaCreate }
} 