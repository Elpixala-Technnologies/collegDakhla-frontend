import { gql } from "@apollo/client";

export const allApplicationSteps = gql`
query ApplicationSteps {
	applicationSteps {
		data {
			id
			attributes {
				step_name
			}
		}
	}
}`