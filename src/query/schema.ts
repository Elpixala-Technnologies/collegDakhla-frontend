import { gql } from "@apollo/client";
export const get_college = gql`
  query CollegeTypes {
    collegeTypes {
      data {
        id
        attributes {
          type
          createdAt
          updatedAt
          publishedAt
        }
      }
    }
  }
`;
