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

// query to get all colleges
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


export const getColleges = gql`
	query Colleges {
    colleges (pagination: { limit: 100 }) {
			data {
					id
				attributes {
						city
						collegeName
						country
						createdAt
						establishmentYear
						pincode
						publishedAt
						state
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
						collegeStream {
								data {
										id
										attributes {
												description
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

// query to get college data from college id
export const getCollege = gql`
	query College($collegeId : ID!) {
    college(id: $collegeId) {
        data {
            id
            attributes {
                url
                collegeName
                country
                state
                pincode
                establishmentYear
                city
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
                collegeStream {
                    data {
                        id
                        attributes {
                            streamName
                            description
                            createdAt
                            updatedAt
                            publishedAt
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
