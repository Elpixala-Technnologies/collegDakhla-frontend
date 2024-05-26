import { gql } from "@apollo/client";

export const GET_USER_FORM = gql`
  query {
    userForms {
      data {
        attributes {
          form_title
          form_description
          form_url
          form_stape {
            field {
              filed_type
              field_label
            }
            step_label
            step_banner {
              data {
                attributes {
                  url
                }
              }
            }
            step_heading
            step_description {
              heading
              details
            }
          }
        }
      }
    }
  }
`;

 
export const UPDATE_USER_FORM = gql`
  mutation UpdateUsersMetaData(
    $id: ID!
    $name: String
    $email: String
    $number: String
    $gender: String
    $courseInterested: ID
    $publishedAt: DateTime
    $appliedColleges: [ComponentCommonAppliedCollegesInput]
    $appliedCourses:[ComponentCommonAppliedCoursesInput]
    $appliedExams: [ComponentCommonAppliedExamsInput]
    $educationDetailsPrimary:ComponentCommonEducationDetails10Input
    $educationDetailsSecondary:ComponentCommonEducationDetails12Input
    $graduationDetails: ComponentCommonGraduationDetailsInput
    $doctorateDetails: ComponentCommonDoctorateDetailsInput
    $professionalExperience: [ComponentCommonProfessionalExperienceInput]
    $preferredInstitutions: [ComponentCommonPreferredInstitutionsInput]
    $entranceExam: [ComponentCommonEntranceExamInput]
  ) {
    updateUserMetaData(
      id: $id
      data: {
        name: $name
        email: $email
        number:$number
        gender: $gender
        courseInterested: $courseInterested
        appliedColleges: $appliedColleges
        appliedCourses:$appliedCourses
        appliedExams:$appliedExams
        educationDetailsPrimary: $educationDetailsPrimary
        educationDetailsSecondary: $educationDetailsSecondary
        graduationDetails:$graduationDetails
        doctorateDetails: $doctorateDetails
        professionalExperience: $professionalExperience
        preferredInstitutions:$preferredInstitutions
        entranceExam: $entranceExam
        publishedAt: $publishedAt
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
