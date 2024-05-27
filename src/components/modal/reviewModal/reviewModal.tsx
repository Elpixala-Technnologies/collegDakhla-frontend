import React, { useEffect, useState } from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import { Box, Button, Textarea, Typography } from "@mui/joy";
import Rating from "@mui/material/Rating";
import Swal from "sweetalert2";
import { useAppSelector } from "@/store";
import useColleges from "@/hooks/useColleges";

const ReviewModal = ({ isOpen, onClose, id, ReviewData }: any) => {
  const { writeReviews } = useColleges();
  const [RatingCollegeInfrastructure, setRatingCollegeInfrastructure] =
    useState<number | null>(0);
  const [RatingAcademicsFaculty, setRatingAcademicsFaculty] = useState<
    number | null
  >(0);
  const [RatingPlacementsInternships, setRatingPlacementsInternships] =
    useState<number | null>(0);

  const [RatingCrowdCampus, setRatingCrowdCampus] = useState<number | null>(0);
  const [RatingFeesScholarships, setRatingFeesScholarships] = useState<
    number | null
  >(0);

  const [CollegeInfrastructure, setCollegeInfrastructure] = useState<any>(null);
  const [AcademicsFaculty, setAcademicsFaculty] = useState<any>(null);
  const [PlacementsInternships, setPlacementsInternships] = useState<any>(null);
  const [CrowdCampus, setCrowdCampus] = useState<any>(null);
  const [FeesScholarships, setFeesScholarships] = useState<any>(null);

  const { email, userName } = useAppSelector((store: any) => store.auth);

  const [existingReviewsData, setExistingReviewsData] = useState<any>(null);

  useEffect(() => {
    setExistingReviewsData(ReviewData);
  }, [ReviewData]);

  const calculateOverallRating = () => {
    const totalRating =
      (RatingCollegeInfrastructure || 0) +
      (RatingAcademicsFaculty || 0) +
      (RatingPlacementsInternships || 0) +
      (RatingCrowdCampus || 0) +
      (RatingFeesScholarships || 0);
    const averageRating = totalRating / 5;
    return averageRating;
  };

  const existingReviews =
    existingReviewsData &&
    existingReviewsData?.map((review: any) => ({
      userDetails: {
        name: review.user_details.name,
        email: review.user_details.email,
      },
      infrastructure_hostel_facilities_detail:
        review.infrastructure_hostel_facilities_detail,
      infrastructure_hostel_facilities_rating:
        review.infrastructure_hostel_facilities_rating,
      academics_faculty_details: review.academics_faculty_details,
      academics_faculty_rating: review.academics_faculty_rating,
      placements_internships_details: review.placements_internships_details,
      placements_internships_rating: review.placements_internships_rating,
      crowd_campus_life_details: review.crowd_campus_life_details,
      crowd_campus_life_rating: review.crowd_campus_life_rating,
      fees_scholarships_details: review.fees_scholarships_details,
      fees_scholarships_rating: review.fees_scholarships_rating,
      overallrating: review.overallrating,
    }));

  const handleSubmit = async () => {
    try {
      const newReview = [
        {
          userDetails: {
            name: userName,
            email: email,
          },
          infrastructure_hostel_facilities_detail: CollegeInfrastructure,
          infrastructure_hostel_facilities_rating: RatingCollegeInfrastructure,
          academics_faculty_details: AcademicsFaculty,
          academics_faculty_rating: RatingAcademicsFaculty,
          placements_internships_details: PlacementsInternships,
          placements_internships_rating: RatingPlacementsInternships,
          crowd_campus_life_details: CrowdCampus,
          crowd_campus_life_rating: RatingCrowdCampus,
          fees_scholarships_details: FeesScholarships,
          fees_scholarships_rating: RatingFeesScholarships,
          overallrating: calculateOverallRating(),
        },
      ];

      // Assuming existingReviews holds the existing reviews
      const updatedReviews = [...existingReviews, ...newReview];

      const response = await writeReviews({
        variables: {
          id: id,
          review: updatedReviews,
        },
      });

      if (response.data) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Successfully Saved",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(response, "response");
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="review"
        aria-describedby="review-description"
      >
        <Box className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2 transform bg-white shadow-md p-4 w-full max-w-lg h-5/6 overflow-y-auto">
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography id="review" level="h4" sx={{ mb: 2 }}>
            Write a Review
          </Typography>
          <hr />
          <div className="my-4">
            <div>
              <div>
                <Typography level="h4" sx={{ mb: 1 }}>
                  College Infrastructure & Hostel Facilities
                </Typography>
                <Rating
                  name="rating"
                  value={RatingCollegeInfrastructure}
                  onChange={(event, newValue) => {
                    setRatingCollegeInfrastructure(newValue);
                  }}
                />
              </div>
              <div>
                <Textarea
                  minRows={4}
                  placeholder="Write About College Infrastructure & Hostel Facilities..."
                  value={CollegeInfrastructure}
                  required
                  onChange={(e) => setCollegeInfrastructure(e.target.value)}
                  sx={{ width: "100%" }}
                />
              </div>
            </div>

            <div className="my-2">
              <div>
                <Typography level="h4" sx={{ mb: 1 }}>
                  Academics & Faculty
                </Typography>
                <Rating
                  name="rating"
                  value={RatingAcademicsFaculty}
                  onChange={(event, newValue) => {
                    setRatingAcademicsFaculty(newValue);
                  }}
                />
              </div>
              <div>
                <Textarea
                  minRows={4}
                  placeholder="Write About Academics & Faculty..."
                  value={AcademicsFaculty}
                  required
                  onChange={(e) => setAcademicsFaculty(e.target.value)}
                  sx={{ width: "100%" }}
                />
              </div>
            </div>

            <div className="my-2">
              <div>
                <Typography level="h4" sx={{ mb: 1 }}>
                  Placements & Internships
                </Typography>
                <Rating
                  name="rating"
                  value={RatingPlacementsInternships}
                  onChange={(event, newValue) => {
                    setRatingPlacementsInternships(newValue);
                  }}
                />
              </div>
              <div>
                <Textarea
                  minRows={4}
                  required
                  placeholder="Write About Placements & Internships..."
                  value={PlacementsInternships}
                  onChange={(e) => setPlacementsInternships(e.target.value)}
                  sx={{ width: "100%" }}
                />
              </div>
            </div>

            <div className="my-2">
              <div>
                <Typography level="h4" sx={{ mb: 1 }}>
                  Crowd & Campus Life
                </Typography>
                <Rating
                  name="rating"
                  value={RatingCrowdCampus}
                  onChange={(event, newValue) => {
                    setRatingCrowdCampus(newValue);
                  }}
                />
              </div>
              <div>
                <Textarea
                  minRows={4}
                  required
                  placeholder="Write About Crowd & Campus Life..."
                  value={CrowdCampus}
                  onChange={(e) => setCrowdCampus(e.target.value)}
                  sx={{ width: "100%" }}
                />
              </div>
            </div>

            <div className="my-2">
              <div>
                <Typography level="h4" sx={{ mb: 1 }}>
                  Fees & Scholarships
                </Typography>
                <Rating
                  name="rating"
                  value={RatingFeesScholarships}
                  onChange={(event, newValue) => {
                    setRatingFeesScholarships(newValue);
                  }}
                />
              </div>
              <div>
                <Textarea
                  minRows={4}
                  required
                  placeholder="Write About Fees & Scholarships..."
                  value={FeesScholarships}
                  onChange={(e) => setFeesScholarships(e.target.value)}
                  sx={{ width: "100%" }}
                />
              </div>
            </div>

            <Button
              variant="solid"
              color="primary"
              sx={{ mt: 3, width: "100%" }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default ReviewModal;
