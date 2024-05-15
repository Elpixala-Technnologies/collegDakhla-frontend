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

export const UPDATE_USER_FORM_METADATA = gql`
  mutation UpdateUsersMetaData(
    $id: ID!
    $name: String
    $gender: String
    $email: String
    $appliedColleges: [ComponentUsermetaAppliedCollegesComponentInput]
    $appliedCourses: [ComponentUsermetaAppliedCoursesComponentInput]
    $appliedExams : [ComponentUsermetaAppliedExamsComponentInput]
    $appliedScholarships: [ComponentUsermetaAppliedScholarshipsInput]
    $careersInterested: [ComponentUsermetaCareersInterestedInput]
    $countriesInterested: ComponentUsermetaCountriesInterestedInput
    $otherServiceInterest: [ComponentUsermetaOtherServiceInterestInput]
    $preferredInstitutions: [ComponentUsermetaPreferredInstitutionsInput]
    $courseInterested: ID
    $entranceExam: [ComponentUsermetaEntranceExamInput]
    $primaryDetails: ComponentCommon10thClassInfoComponentInput
    $educationDetailsSecondary: ComponentCommon12ThClassInfoComponentInput
    $doctorateDetails: ComponentCommonGraduationInfoComponentInput
    $graduationDetails: ComponentCommonGraduationInfoComponentInput
    $professionalExperience:[ComponentUsermetaProfessionalExperienceComponentInput]
  ) {
    updateUsersMetaData(
      id: $id
      data: {
        name: $name
        gender:$gender
        email: $email
        applied_colleges: $appliedColleges
        applied_courses: $appliedCourses
        applied_exams: $appliedExams
        applied_scholarships: $appliedScholarships
        careers_interested:$careersInterested
        countries_interested: $countriesInterested
        other_service_interest: $otherServiceInterest
        preferred_institutions:$preferredInstitutions
        courseInterested: $courseInterested
        entrance_exam: $entranceExam
        educationDetailsPrimary: $primaryDetails
        educationDetailsSecondary: $educationDetailsSecondary
        doctorateDetails: $doctorateDetails
        graduationDetails: $graduationDetails
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
