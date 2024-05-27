import { gql } from "@apollo/client";

export const WriteReviews = gql`
  mutation UpdateCollege($id: ID!, $review: [ComponentCommonReviewInput]) {
    updateCollege(id: $id, data: { review: $review }) {
      data {
        attributes {
          collegeName
        }
      }
    }
  }
`;

export const GetReviewByID = gql`
  query GetRevewById($id: ID) {
    colleges(filters: { id: { eq: $id } }) {
      data {
        id
        attributes {
          review {
            userDetails {
              name
              email
              phone
            }
            infrastructure_hostel_facilities_detail
            infrastructure_hostel_facilities_rating
            academics_faculty_details
            academics_faculty_rating
            placements_internships_details
            placements_internships_rating
            crowd_campus_life_details
            crowd_campus_life_rating
            fees_scholarships_details
            fees_scholarships_rating
            overallrating
          }
        }
      }
    }
  }
`;

export const GetReviewForUserId = gql`
  query GetRevewById($id: ID, $email: String) {
    colleges(
      filters: {
        id: { eq: $id }
        review: { userDetails: { email: { eq: $email } } }
      }
    ) {
      data {
        id
        attributes {
          review {
            userDetails {
              name
              email
              phone
            }
            infrastructure_hostel_facilities_detail
            infrastructure_hostel_facilities_rating
            academics_faculty_details
            academics_faculty_rating
            placements_internships_details
            placements_internships_rating
            crowd_campus_life_details
            crowd_campus_life_rating
            fees_scholarships_details
            fees_scholarships_rating
            overallrating
          }
        }
      }
    }
  }
`;
