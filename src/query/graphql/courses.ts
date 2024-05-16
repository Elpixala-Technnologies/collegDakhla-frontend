import { gql } from "@apollo/client";

export const getCourses = gql`
query Courses {
	courses(sort: "createdAt:asc", pagination: { limit: 100 }) {
		data {
			id
			attributes {
				name
				url
				fees
				duration
				logo {
					data {
						id
						attributes {
							url
						}
					}
				}
				banner {
					data {
						id
						attributes {
							url
						}
					}
				}
				colleges {
					data {
						id
						attributes {
							collegeName
						}
					}
				}
				courseType {
					data {
						id
						attributes {
							type
						}
					}
				}
			}
		}
	}
}
`;