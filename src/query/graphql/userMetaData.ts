import { gql } from "@apollo/client";

export const createUserMetaData = gql`
  mutation CreateUsersMetaData(
    $name: String
    $email: String
    $number: String
    $userDataId: ID!
    $publishedAt: DateTime!
  ) {
    createUsersMetaData(
      data: {
        name: $name
        email: $email
        number: $number
        user_data: $userDataId
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
    $graduationDetails: ComponentCommonGraduationInfoComponentInput
    $secondaryDetails: ComponentCommon12ThClassInfoComponentInput
    $primaryDetails: ComponentCommon10thClassInfoComponentInput
    $appliedColleges: [ComponentUsermetaAppliedCollegesComponentInput]
    $professionalExperience: [ComponentUsermetaProfessionalExperienceComponentInput]
  ) {
    updateUsersMetaData(
      id: $id
      data: {
        gender: $gender
        city: $city
        name: $name
        courseInterested: $course
        graduationDetails: $graduationDetails
        educationDetailsSecondary: $secondaryDetails
        educationDetailsPrimary: $primaryDetails
        applied_colleges: $appliedColleges
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

export const getAllUserMetaDataID = gql`
  query UsersMetaData($id: ID!) {
    usersMetaData(id: $id) {
      data {
        id
        attributes {
          name
          email
          number
          gender
          city
          user_data {
            data {
              id
              attributes {
                stream {
                  data {
                    attributes {
                      stream_name
                    }
                  }
                }
                courseLevel {
                  data {
                    id
                    attributes {
                      course_level_name
                    }
                  }
                }
              }
            }
          }
          applied_colleges {
            id
            college {
              data {
                id
                attributes {
                  college_name
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
                course_name
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
