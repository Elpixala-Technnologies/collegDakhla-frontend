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
			id
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

//query to get all streams
export const getStreams = gql`
query Streams {
    streams (filters: {streamName: {not: {eqi: "default"}}}) {
        data {
            id
            attributes {
                streamName
            }
        }
    }
}`

//query to get description of stream
export const getStream = gql`
query Streams($streamName : String!) {
    streams(filters: { streamName: { containsi: $streamName } }) {
        data {
					id
            attributes {
                streamName
                
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

export const getStreamData = gql`
query Streams($Stream : String!) {
    streams(filters: {streamName: {containsi: $Stream}}) {
        data {
					id
            attributes {
							contentForCourses
              contentForColleges
							contentForExams
            }
        }
    }
}`

// query to get all top colleges based on filters
export const topColleges = gql`
query Colleges($Limit: Int!) {
    colleges(
			filters: {
				isTopCollege: {eq: true} 
			}
			pagination: {limit: $Limit}
		) {
        data {
            id
            attributes {
                collegeName
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
                approvedBy {
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
                brochure {
                    data {
											id
                        attributes {
                            name
                            hash
                        }
                    }
                }
                state {
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
				name
				url
				fees
				duration
				logo {
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
				colleges {
					data {
						id
						attributes {
							collegeName
						}
					}
				}
				courseType {
					data {
						id
						attributes {
							type
						}
					}
				}
			}
		}
	}
}
`;

//query to get course on id
export const getCourse = gql`
query CourseExam($courseId : ID!) {
    course(id: $courseId) {
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
                navbars {
                    data {
                        id
                        attributes {
                            name
                        }
                    }
                }
                pageData {
                    ... on ComponentCommonTabData {
                        id
                        heading
                        content
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
                        id
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
                        id
                        Question
                        Answer
                        navbar {
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
    }
}`

// query to search courses
export const searchCourses = gql`
query Courses($Search : String!, $DurationFilter : String!, $SpecializationFilter : String!) {
    courses(filters: { 
			and: [
				{name: { containsi: $Search } }
				{duration: { containsi: $DurationFilter }		}
				{ specializations: { name: { containsi: $SpecializationFilter } } }
			]
			}
			
			) {
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
                colleges {
                    data {
											id
                        attributes {
                            collegeName
                        }
                    }
                }
								courseLevels {
                    data {
											id
                        attributes {
                            levelName
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

// query to get featured courses
export const getFeaturedCourses = gql`query Courses {
    courses(filters: { isFeaturedCourse: { eq: true } }) {
      data {
            id
            attributes {
                name
                duration
                fees
                specializations {
                    data {
                        id
                        attributes {
                            name
                        }
                    }
                }
                courseLevels {
                    data {
											id
                        attributes {
                            levelName
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
                logo {
                    data {
											id
                        attributes {
                            url
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
query Exams($Search : String!, $LevelFilter : String!, $ModeFilter : String!) {
    exams(filters: { 
			and: [
				{name: { containsi: $Search } }
				{examLevel: { name: { containsi: $LevelFilter } }		}
				{examMode: { mode: { containsi: $ModeFilter } } }
			]
		 }) {
        data {
					id
					attributes {
						name
						title
						logo {
							data {
								id
								attributes {
									url
								}
							}
						}
						examLevel {
							data {
								id
								attributes {
									name
								}
							}
						}
						examDate {
							id
							startDate
							endDate
						}
						resultDate {
							id
							startDate
							endDate
						}
						applicationDate {
							id
							startDate
							endDate
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

//query to get exams on id
export const getExam = gql`
query Exam($examId : ID!) {
    exam(id: $examId) {
        data {
            id
            attributes {
                name
                title
								url
                logo {
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
                navbars {
                    data {
                        id
                        attributes {
                            name
                        }
                    }
                }
                applicationDate {
                    id
                    startDate
                    endDate
                }
                examDate {
                    id
                    startDate
                    endDate
                }
                resultDate {
                    id
                    startDate
                    endDate
                }
                examMode {
                    data {
                        id
                        attributes {
                            mode
                        }
                    }
                }
                examLevel {
                    data {
                        id
                        attributes {
                            name
                        }
                    }
                }
								pageData {
                    ... on ComponentCommonTabData {
                        id
                        heading
                        content
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
                        id
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
                        id
                        Question
                        Answer
                        navbar {
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
    }
}`

//query to get featured exams
export const getFeaturedExams = gql`
query Exams {
    exams(filters: { isFeaturedExam: { eq: true } }) {
        data {
            id
            attributes {
							name
                examDate {
									id
                  startDate
                }
                banner {
									data {
										id
										attributes {
											url
										}
									}
                }
                logo {
									data {
										id
										attributes {
											url
										}
									}
                }
                examLevel {
									data {
										id
										attributes {
											name
										}
									}
                }
                examMode {
									data {
										id
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

//query to get all specializations
export const getSpecializations = gql`
query Specializations {
    specializations {
        data {
            id
            attributes {
                name
            }
        }
    }
}`

//query to get all exam modes
export const getExamModes = gql`
query ExamModes {
    examModes {
        data {
            id
            attributes {
                mode
            }
        }
    }
}`

//query to get exam levels
export const getExamLevels = gql`
query ExamLevels {
    examLevels {
        data {
            id
            attributes {
                name
            }
        }
    }
}`

//query to get all news
export const getAllNews = gql`
query News {
    news(sort: "publishedAt:desc") {
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
                            url
                        }
                    }
                }
                 colleges {
                    data {
                        id
                        attributes {
                            url
                            collegeName
                            establishmentYear
                            collegeDescription
                            isTopCollege
                            pincode
                            createdAt
                            updatedAt
                            publishedAt
                        }
                    }
                }
                courses {
                    data {
                        id
                        attributes {
                            name
                            url
                        }
                    }
                }
                exams {
                    data {
                        id
                        attributes {
                            name
                            url
                        }
                    }
                }
								newsCategories {
                    data {
                        id
                    }
                }
								publishedAt
            }
        }
    }
}
`

//query to get news on id
export const getNews = gql`
query New($newsID : ID!) {
    new(id: $newsID) {
        data {
            attributes {
                title
                content
                excerpt
                featuredImage {
                    data {
                        id
                        attributes {
                            url
                        }
                    }
                }
                colleges {
                    data {
                        id
                        attributes {
                            collegeName
                        }
                    }
                }
                courses {
                    data {
                        id
                        attributes {
                            name
                        }
                    }
                }
                exams {
                    data {
                        id
                        attributes {
                            name
                        }
                    }
                }
                newsCategories {
                    data {
                        id
                        attributes {
                            category
                        }
                    }
                }
                publishedAt
            }
        }
    }
}`

export const getNewsCategories = gql`
query NewsCategories {
	newsCategories {
		data {
			attributes {
				category
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
											url
									}
								}
							}
						}
					}
				}
			}
		}
	}
}`

export const getTestimonials = gql`
query Testimonials {
    testimonials {
        data {
            id
            attributes {
                comment
                banner {
                    data {
                        id
                        attributes {
                            url
                        }
                    }
                }
                logo {
                    data {
                        id
                        attributes {
                            url
                        }
                    }
                }
                commentBy
                college {
                    data {
                        id
                        attributes {
                            collegeName
                        }
                    }
                }
            }
        }
    }
}
`