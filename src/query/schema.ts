import { gql } from "@apollo/client";

// query to get all college types
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

// query to get all colleges count
let totalColleges = gql`
query Colleges {
    colleges {
        meta {
            pagination {
                total
            }
        }
    }
}
`;

// query to get all colleges
export const getColleges = gql`
	query Colleges {
    colleges(pagination: { limit: 100 }) {
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
                            description
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
                        attributes {
                            name
                        }
                    }
                }
                isTopCollege
                state {
                    data {
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

// query to get college data from college id
export const getCollege = gql`
	query College($collegeId : ID!) {
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
                                attributes {
                                    name
                                }
                            }
                        }
                        pageGallery {
                            data {
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
}`

// query to get default images
export const getDefaultImageUrl = gql`
query UploadFiles($name : String!) {
    uploadFiles(filters: { name: { containsi: $name } }) {
        data {
            id
            attributes {
                url
            }
        }
    }
}`

//query to search for college
export const searchCollege = gql`
query Colleges($Search : String!) {
    colleges(filters: { collegeName: { containsi: $Search } }
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
										description
										name
								}
						}
					}
				}
			}
    }
}
`;

//query to get all streams
export const getStreams = gql`
query Streams {
    streams (filters: {streamName: {not: {eqi: "default"}}}) {
        data {
            id
            attributes {
                streamName
                description
            }
        }
    }
}`

//query to get description of stream
export const getStream = gql`
query Streams($streamName : String!) {
    streams(filters: { streamName: { containsi: $streamName } }) {
        data {
            attributes {
                streamName
                description
            }
        }
    }
}
`

// query to get colleges based on stream
export const getStreamColleges = gql`
	query Colleges ($streamName : String!){
    colleges (
        filters: { collegeStreams: { streamName: { containsi: $streamName } } }
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
									description
									name
							}
						}
					}
				}
			}
    }
	}
`;

//query to get colleges based on filters
export const getCollegesFilter = gql`
query Colleges($StreamFilter : String!, $StateFilter :String!) {
    colleges(
        filters: {
            and: [
                { collegeStreams: { streamName: { containsi : $StreamFilter } } }
              	{ state: {name: { containsi : $StateFilter } } }
            ]
        }
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
					createdAt
					establishmentYear
					pincode
					publishedAt
					state {
                    data {
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
										description
										name
								}
						}
					}
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

//query to get all states
export const getStates = gql`
query States {
    states {
        data {
            id
            attributes {
                name
            }
        }
    }
}
`

export const getDefaultStream = gql`
query Streams {
    streams(filters: {streamName: {eqi: "default"}}) {
        data {
            attributes {
                description
            }
        }
    }
}`

// query to get all top colleges based on filters
export const topColleges = gql`
query Colleges($Stream : String!, $Limit: Int!) {
    colleges(
			filters: {
				isTopCollege: {eq: true}, 
				and: {collegeStreams: {streamName: {containsi: $Stream}}}
			}
			pagination: {limit: $Limit}
		) {
        data {
            id
            attributes {
                collegeName
                college_type {
                    data {
                        attributes {
                            type
                        }
                    }
                }
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
                approvedBy {
                    data {
                        attributes {
                            name
                        }
                    }
                }
                city {
                    data {
                        attributes {
                            name
                        }
                    }
                }
                brochure {
                    data {
                        attributes {
                            name
                            hash
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
								collegeStreams {
                    data {
                        attributes {
                            streamName
                        }
                    }
                }
            }
        }
    }
}
`;

//query to get course levels
export const getCourseLevels = gql`query CourseLevels {
    courseLevels {
        data {
			id
            attributes {
				levelName
			}
		}
	}
}
`;

// query to get all courses 
export const getCourses = gql`
query Courses {
    courses {
        data {
            id
            attributes {
                isTopCourse
                name
                logo {
                    data {
                        id
                        attributes {
                            name
                            url
                        }
                    }
                }
                banner {
                    data {
                        id
                        attributes {
                            url
                            name
                        }
                    }
                }
                colleges {
                    data {
                        attributes {
                            collegeName
                        }
                    }
                }
            }
        }
    }
}
`;

// query to search courses
export const searchCourses = gql`
query Courses($Search : String!) {
    courses(filters: { name: { containsi: $Search } }) {
        data {
            id
            attributes {
                name
								duration
								fees
                logo {
                    data {
                        id
                        attributes {
                            name
                            url
                        }
                    }
                }
                banner {
                    data {
                        id
                        attributes {
                            url
                            name
                        }
                    }
                }
                colleges {
                    data {
                        attributes {
                            collegeName
                        }
                    }
                }
								courseLevels {
                    data {
                        attributes {
                            levelName
                        }
                    }
                }
            }
        }
    }
}
`;

// query to get featured courses
export const getFeaturedCourses = gql`query Courses {
    courses(filters: { isFeaturedCourse: { eq: true } }) {
        data {
            id
            attributes {
                logo {
                    data {
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
                name
                specializations {
                    data {
                        attributes {
                            name
                        }
                    }
                }
                fees
								courseLevels {
                    data {
                        attributes {
                            levelName
                        }
                    }
                }
            }
        }
    }
}
`;

// query to search exams
export const searchExams = gql`
query Exams($Search : String!) {
    exams(filters: { name: { containsi: $Search } }) {
        data {
            id
            attributes {
                name
                title
                logo {
                    data {
                        attributes {
                            url
                        }
                    }
                }
                examLevel {
                    data {
                        attributes {
                            name
                        }
                    }
                }
                examDate {
                    startDate
                    endDate
                }
                resultDate {
                    startDate
                    endDate
                }
                applicationDate {
                    startDate
                    endDate
                }
            }
        }
    }
}
`;

//query to get featured exams
export const getFeaturedExams = gql`
query Exams {
    exams(filters: { isFeaturedExam: { eq: true } }) {
        data {
            id
            attributes {
                examDate {
                    startDate
                }
                banner {
                    data {
                        attributes {
                            url
                        }
                    }
                }
                logo {
                    data {
                        attributes {
                            url
                        }
                    }
                }
                name
                examLevel {
                    data {
                        attributes {
                            name
                        }
                    }
                }
                examMode {
                    data {
                        attributes {
                            mode
                        }
                    }
                }
            }
        }
    }
}
`;