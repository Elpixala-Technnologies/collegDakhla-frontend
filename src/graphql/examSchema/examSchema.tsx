import { gql } from "@apollo/client";

export const GET_ALL_EXAM = gql`
  query Exams {
    exams {
      data {
        id
        attributes {
          name
          title
          isFeaturedExam
          url
          logo {
            data {
              id
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;
