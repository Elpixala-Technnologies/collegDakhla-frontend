import { gql } from "@apollo/client";

export const getAllColleges = gql`
  query Colleges {
    colleges(pagination: { limit: 100 }) {
      data {
        id
        attributes {
          city {
            data {
              id
              attributes {
                name
              }
            }
          }
          collegeName
          createdAt
          establishmentYear
          publishedAt
          updatedAt
          url
          collegeLogo {
            data {
              id
              attributes {
                url
              }
            }
          }
          banner {
            data {
              attributes {
                url
              }
            }
          }
          college_type {
            data {
              id
              attributes {
                type
              }
            }
          }
          rankedBy {
            data {
              id
              attributes {
                description
                name
              }
            }
          }
          approvedBy {
            data {
              id
              attributes {
                name
              }
            }
          }
          collegeStreams {
            data {
              id
              attributes {
                streamName
              }
            }
          }
          country {
            data {
              id
              attributes {
                name
              }
            }
          }
          isTopCollege
          state {
            data {
              id
              attributes {
                name
              }
            }
          }
          pincode
        }
      }
      meta {
        pagination {
          total
        }
      }
    }
  }
`;
export const getCollegeDetails = gql`
query COLLEGE_DETAILS  {
  colleges {
    data {
      id
      attributes {
        url
        college_type {
          data {
            id
            attributes {
              type
            }
          }
        }
        collegeName
        collegeLogo {
          data {
            id
            attributes {
              alternativeText
              width
              height
              url
            }
          }
        }
        establishmentYear
        rankedBy {
          data {
            id
            attributes {
              name
            }
          }
        }
        approvedBy {
          data {
            id
            attributes {
              name
            }
          }
        }
        collegeDescription
        city {
          data {
            id
            attributes {
              name
            }
          }
        }
        brochure {
          data {
            id
            attributes {
              alternativeText
              url
            }
          }
        }
        banner {
          data {
            id
            attributes {
              alternativeText
              width
              height
              url
            }
          }
        }
        isTopCollege
        pincode
        state {
          data {
            id
            attributes {
              name
            }
          }
        }
        country {
          data {
            id
            attributes {
              name
            }
          }
        }
        navbars {
          data {
            id
            attributes {
              name
            }
          }
        }
        news {
          data {
            id
            attributes {
              title
              content
              excerpt
              featuredImage {
                data {
                  id
                  attributes {
                    alternativeText
                    width
                    height
                    url
                  }
                }
              }
            }
          }
        }
        pageData {
          __typename
        }
        courses {
          data {
            id
            attributes {
              name
            }
          }
        }
        collegeStreams {
          data {
            id
            attributes {
              streamName
            }
          }
        }
        collegeCourses {
          examAccepted {
            data {
              id
              attributes {
                name
              }
            }
          }
          courseName {
            data {
              id
              attributes {
                name
              }
            }
          }
          courseFee
          courseLebel
        }
      }
    }
  }
}
`