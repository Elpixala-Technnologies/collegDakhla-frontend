import { gql } from "@apollo/client";

export const allfaqs = gql`
query AllFaqs {
	faqs{
    data{
      id
      attributes{
        question
        answer
      }
    }
  }
}`