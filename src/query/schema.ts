import { gql } from "@apollo/client";

// Query to get all college types
export const collegeTypes = gql`
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

// Query to get all colleges count
export const totalColleges = gql`
  query Colleges {
    colleges {
      id
      meta {
        pagination {
          total
        }
      }
    }
  }
`;

// Query to get all colleges
export const getColleges = gql`
  query Colleges {
    colleges(pagination: { limit: 100 }) {
      data {
        id
        attributes {
          pageData {
            ... on ComponentCommonTabData {
              content
              heading
              navbar {
                data {
                  id
                  attributes {
                    name
                  }
                }
              }
            }
            ... on ComponentCommonGallery {
              heading
              navbar {
                data {
                  id
                  attributes {
                    name
                  }
                }
              }
              pageGallery {
                data {
                  id
                  attributes {
                    url
                  }
                }
              }
            }
            ... on ComponentCommonFaqS {
              Answer
              Question
              navbar {
                data {
                  attributes {
                    name
                  }
                }
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
    }
    meta {
      pagination {
        total
      }
    }
  }
`;

// Query to get college data from college id
export const getCollege = gql`
  query College($collegeId: ID!) {
    college(id: $collegeId) {
      data {
        id
        attributes {
          url
          collegeName
          country {
            data {
              attributes {
                name
              }
            }
          }
          state {
            data {
              attributes {
                name
              }
            }
          }
          pincode
          establishmentYear
          city {
            data {
              attributes {
                name
              }
            }
          }
          createdAt
          updatedAt
          publishedAt
          college_type {
            data {
              id
              attributes {
                type
              }
            }
          }
          collegeLogo {
            data {
              attributes {
                name
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
          collegeStreams {
            data {
              id
              attributes {
                streamName
              }
            }
          }
          rankedBy {
            data {
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
          navbars {
            data {
              attributes {
                name
              }
            }
          }
          pageData {
            ... on ComponentCommonTabData {
              content
              heading
              navbar {
                data {
                  id
                  attributes {
                    name
                  }
                }
              }
            }
            ... on ComponentCommonGallery {
              heading
              navbar {
                data {
                  id
                  attributes {
                    name
                  }
                }
              }
              pageGallery {
                data {
                  id
                  attributes {
                    url
                  }
                }
              }
            }
            ... on ComponentCommonFaqS {
              Answer
              Question
              navbar {
                data {
                  attributes {
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

// Query to get default images
export const getDefaultImageUrl = gql`
  query UploadFiles($name: String!) {
    uploadFiles(filters: { name: { containsi: $name } }) {
      data {
        id
        attributes {
          url
        }
      }
    }
  }
`;

// Query to search for college
export const searchCollege = gql`
  query Colleges($Search: String!) {
    colleges(
      filters: { collegeName: { containsi: $Search } }
      pagination: { limit: 100 }
    ) {
      data {
        id
        attributes {
          city {
            data {
              attributes {
                name
              }
            }
          }
          collegeName
          country {
            data {
              attributes {
                name
              }
            }
          }
          createdAt
          establishmentYear
          pincode
          publishedAt
          state {
            data {
              id
              attributes {
                name
              }
            }
          }
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
              id
              attributes {
                url
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
        }
      }
    }
  }
`;

// Query to get all streams
export const getStreams = gql`
  query Streams {
    streams(filters: { streamName: { not: { eq: "default" } } }) {
      data {
        id
        attributes {
          streamName
        }
      }
    }
  }
`;

// Query to get description of stream
export const getStream = gql`
  query Streams($streamName: String!) {
    streams(filters: { streamName: { containsi: $streamName } }) {
      data {
        id
        attributes {
          streamName
        }
      }
    }
  }
`;

// Query to get colleges based on stream
export const getStreamColleges = gql`
  query Colleges($streamName: String!) {
    colleges(
      filters: { collegeStreams: { streamName: { containsi: $streamName } } }
      pagination: { limit: 100 }
    ) {
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
          country {
            data {
              id
              attributes {
                name
              }
            }
          }
          createdAt
          establishmentYear
          pincode
          publishedAt
          state {
            data {
              id
              attributes {
                name
              }
            }
          }
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
              id
              attributes {
                url
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
        }
      }
    }
  }
`;

// Query to get colleges based on filters
export const getCollegesFilter = gql`
  query Colleges($StreamFilter: String!, $StateFilter: String!) {
    colleges(
      filters: {
        and: [
          { collegeStreams: { streamName: { containsi: $StreamFilter } } }
          { state: { name: { containsi: $StateFilter } } }
        ]
      }
    ) {
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
          pincode
          publishedAt
          state {
            data {
              id
              attributes {
                name
              }
            }
          }
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
              id
              attributes {
                url
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
        }
      }
    }
  }
`;

// Query to get all states
export const getStates = gql`
  query States {
    states(filters: { name: { not: { eq: "default" } } }) {
      data {
        id
        attributes {
          name
        }
      }
    }
  }
`;

// Query to get description of state
export const getState = gql`
  query States($StateName: String!) {
    states(filters: { name: { containsi: $StateName } }) {
      data {
        id
        attributes {
          name
        }
      }
    }
  }
`;
