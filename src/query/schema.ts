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
                            alternativeText
                            ext
                            height
                            mime
                            name
                            url
                            width
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
                            alternativeText
                            width
                            height
                            size
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
            }
        }
    }
}`

// query to get default images
export const getDefaultImage = gql`
query UploadFiles {
    uploadFiles(filters: { name: { eq: "default-college-logo.png" } }) {
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
    colleges(filters: { collegeName: { containsi: $Search } }) {
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
										alternativeText
										ext
										height
										mime
										name
										url
										width
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
    streams {
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
								alternativeText
								ext
								height
								mime
								name
								url
								width
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
										alternativeText
										ext
										height
										mime
										name
										url
										width
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