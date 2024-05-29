import { gql } from "@apollo/client";

export const CREATE_GET_TUCH = gql`
  mutation CreateGetInTouch(
    $name: String
    $email: String
    $phone: String
    $streams: [ID]
    $userPhone: String
    $publishedAt: DateTime
  ) {
    createGetInTouch(
      data: { name: $name, email: $email, phone: $phone, streams: $streams, userPhone: $userPhone , publishedAt:$publishedAt}
    ) {
      data {
        attributes {
          name
          email
        }
      }
    }
  }
`;

export const CHECK_GET_TUCH = gql`
  query GetInTouch($userPhone: String) {
    getInTouches(
      filters: { or: [{ userPhone: { eq: $userPhone } }] }
    ) {
      data {
        id
        attributes {
          name
          email
          phone
          userPhone
          streams {
            data {
              attributes {
                stream_name
              }
            }
          }
        }
      }
    }
  }
`;