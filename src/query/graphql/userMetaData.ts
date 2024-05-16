import { gql } from "@apollo/client";

export const createUserMetaData = gql`
  mutation CreateUsersMetaData(
    $name: String
    $email: String
    $number: String
    $userDataId: ID!
    $publishedAt: DateTime!
  ) {
    createUserMetaData(
      data: {
        name: $name
        email: $email
        number: $number
        userData: $userDataId
        publishedAt: $publishedAt
      }
    ) {
      data {
        id
      }
    }
  }
`;

export const updateUserMetaData = gql`
  mutation UpdateUsersMetaData(
    $id: ID!
    $gender: String
    $city: String
    $name: String
    $course: ID
    $graduationDetails: ComponentCommonGraduationDetailsInput
    $secondaryDetails: ComponentCommonEducationDetails12Input
    $primaryDetails: ComponentCommonEducationDetails10Input
    $appliedColleges: [ComponentCommonAppliedCollegesInput]
    $professionalExperience: [ComponentCommonProfessionalExperienceInput]
  ) {
    updateUserMetaData(
      id: $id
      data: {
        gender: $gender
        city: $city
        name: $name
        courseInterested: $course
        graduationDetails: $graduationDetails
        educationDetailsSecondary: $secondaryDetails
        educationDetailsPrimary: $primaryDetails
        appliedColleges: $appliedColleges
        professionalExperience: $professionalExperience
      }
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

export const getAllUserMetaDataByID = gql`
  query UserMetaData($id: ID!) {
    userMetaData(id: $id) {
      data {
        id
        attributes {
          name
          email
          number
          gender
          city
          userData {
            data {
              id
              attributes {
                stream {
                  data {
                    attributes {
                      streamName
                    }
                  }
                }
              }
            }
          }
          appliedColleges {
            id
            college {
              data {
                id
                attributes {
                  collegeName
                }
              }
            }
            current_step {
              data {
                id
                attributes {
                  step_name
                }
              }
            }
          }
          graduationDetails {
            id
            institutionName
            passingYear
            gradingSystem
            grade
            course
          }
          courseInterested {
            data {
              id
              attributes {
                name
              }
            }
          }
          educationDetailsSecondary {
            id
            schoolName
            city
            passingYear
            gradingSystem
            grade
            board
            stream
          }
          educationDetailsPrimary {
            id
            schoolName
            city
            passingYear
            gradingSystem
            grade
            board
          }
          professionalExperience {
            id
            organizationName
            jobPosition
            jobStart
            jobEnd
          }
        }
      }
    }
  }
`;
