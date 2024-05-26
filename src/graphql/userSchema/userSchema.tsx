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
    $appliedCourses: [ComponentCommonAppliedCoursesInput]
    $appliedExams: [ComponentCommonAppliedExamsInput]
    $educationDetailsPrimary: ComponentCommonEducationDetails10Input
    $educationDetailsSecondary: ComponentCommonEducationDetails12Input
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
        number: $number
        gender: $gender
        courseInterested: $courseInterested
        appliedColleges: $appliedColleges
        appliedCourses: $appliedCourses
        appliedExams: $appliedExams
        educationDetailsPrimary: $educationDetailsPrimary
        educationDetailsSecondary: $educationDetailsSecondary
        graduationDetails: $graduationDetails
        doctorateDetails: $doctorateDetails
        professionalExperience: $professionalExperience
        preferredInstitutions: $preferredInstitutions
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

// Define your queries and mutations =====

export const SaveCollege = gql`
  mutation UpdateUserMetaData(
    $id: ID!
    $saveColleges: [ComponentCommonSaveCollegesInput]
  ) {
    updateUserMetaData(id: $id, data: { saveColleges: $saveColleges }) {
      data {
        attributes {
          name
          email
        }
      }
    }
  }
`;

export const SaveExam = gql`
  mutation UpdateUserMetaData(
    $id: ID!
    $saveExams: [ComponentCommonSaveExamsInput]
  ) {
    updateUserMetaData(id: $id, data: { saveExams: $saveExams }) {
      data {
        attributes {
          name
          email
        }
      }
    }
  }
`;

export const SaveCourse = gql`
  mutation UpdateUserMetaData(
    $id: ID!
    $saveCourses: [ComponentCommonSaveCoursesInput]
  ) {
    updateUserMetaData(id: $id, data: { saveCourses: $saveCourses }) {
      data {
        attributes {
          name
          email
        }
      }
    }
  }
`;

export const GET_USER_METADATA_COLLEGE = gql`
  query GetUserMetadata($id: ID!) {
    usersMetaData(filters: { id: { eq: $id } }) {
      data {
        id
        attributes {
          saveColleges {
            college {
              data {
                id
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_USER_METADATA_EXAM = gql`
  query GetUserMetadata($id: ID!) {
    usersMetaData(filters: { id: { eq: $id } }) {
      data {
        id
        attributes {
          saveExams {
            exam {
              data {
                id
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_USER_METADATA_COURSE = gql`
  query GetUserMetadata($id: ID!) {
    usersMetaData(filters: { id: { eq: $id } }) {
      data {
        id
        attributes {
          saveCourses {
            course {
              data {
                id
              }
            }
          }
        }
      }
    }
  }
`;
