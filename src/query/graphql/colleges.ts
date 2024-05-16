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