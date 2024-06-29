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
          navbars{
            data{
              id
              attributes{
                name
              }
            }
          }
          applicationDate{
            startDate
            endDate
          }
					examDate{
            startDate
            endDate
          }
          resultDate{
            startDate
            endDate
          }
          isFeaturedExam
          examMode{
            data{
              id
              attributes{
                mode
              }
            }
          }
          examLevel{
            data{
              id
              attributes{
                name
              }
            }
          }
          url
          description
        }
      }
    }
  }
`;
