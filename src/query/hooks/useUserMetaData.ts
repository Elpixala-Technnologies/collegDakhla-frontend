import { useMutation, useQuery } from "@apollo/client"
import { createUserMetaData, getAllUserMetaDataByID, updateUserMetaData } from "../graphql/userMetaData"
import { ID } from "@/types/global"


const GetUserMetaData = (id: ID) => {

	const { loading, error, data } = useQuery(getAllUserMetaDataByID, {
		variables: {
			id
		}
	})

	return { userAllMetaData: data?.userMetaData?.data?.attributes }
}

export default function useUserMetaData() {
	const [userMetaCreate, { loading: userMetaCreateLoading, error: userMetaCreateError, data: userMetaCreateData }] = useMutation<any>(createUserMetaData)

	const [userMetaUpdate, { loading: userMetaUpdateLoading, error: userMetaUpdateError, data: userMetaUpdateData }] = useMutation<any>(updateUserMetaData)

	return { userMetaCreate, userMetaUpdate, GetUserMetaData }
} 