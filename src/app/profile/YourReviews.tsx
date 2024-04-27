import Image from "next/image";
import ContainerBox from "../../components/containerBox/containerBox";
import { ProfileImage } from "@/Asset";
import StarRating from "../../components/starRating/starRating";

export default function YourReviews({ reviews, name }: any) {
  let testimonials = [
    {
      review: {
        name: "Floyd Miles",
        rating: 3,
        ratings: [
          {
            title: "College Infrastructure & Hostel facilities",
            description:
              "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.",
            rating: 3,
          },
          {
            title: "College Infrastructure & Hostel facilities",
            description:
              "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.",
            rating: 3,
          },
          {
            title: "College Infrastructure & Hostel facilities",
            description:
              "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.",
            rating: 3,
          },
          {
            title: "College Infrastructure & Hostel facilities",
            description:
              "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.",
            rating: 3,
          },
          {
            title: "College Infrastructure & Hostel facilities",
            description:
              "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.",
            rating: 3,
          },
        ],
      },
    },
    {
      review: {
        name: "Floyd Miles",
        rating: 3,
        ratings: [
          {
            title: "College Infrastructure & Hostel facilities",
            description:
              "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.",
            rating: 3,
          },
          {
            title: "College Infrastructure & Hostel facilities",
            description:
              "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.",
            rating: 3,
          },
          {
            title: "College Infrastructure & Hostel facilities",
            description:
              "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.",
            rating: 3,
          },
          {
            title: "College Infrastructure & Hostel facilities",
            description:
              "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.",
            rating: 3,
          },
          {
            title: "College Infrastructure & Hostel facilities",
            description:
              "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.",
            rating: 3,
          },
        ],
      },
    },

    {
      review: {
        name: "Floyd Miles",
        rating: 3,
        ratings: [
          {
            title: "College Infrastructure & Hostel facilities",
            description:
              "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.",
            rating: 3,
          },
          {
            title: "College Infrastructure & Hostel facilities",
            description:
              "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.",
            rating: 3,
          },
          {
            title: "College Infrastructure & Hostel facilities",
            description:
              "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.",
            rating: 3,
          },
          {
            title: "College Infrastructure & Hostel facilities",
            description:
              "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.",
            rating: 3,
          },
          {
            title: "College Infrastructure & Hostel facilities",
            description:
              "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.",
            rating: 3,
          },
        ],
      },
    },
  ];
  return (
    <>
      <section className="mainSection max-w-screen-xl mx-auto text-primary-text ">
        <div className="flex gap-4">
          <div className="main flex-1 flex flex-col gap-6">
            <div className="flex flex-col gap-6 ">
              {testimonials.map((review, index) => {
                return (
                  <ContainerBox key={index} bgColor="bg-white">
                    <div className="flex flex-col gap-8">
                      <div className="flex justify-between items-start">
                        <Image
                          src={ProfileImage}
                          width={80}
                          height={80}
                          alt=""
                        />
                        <div className="flex gap-2 items-center">
                          <div>
                            Overall Rating: ({review?.review?.rating})
                          </div>
                          <StarRating rating={3.5} />
                        </div>
                      </div>
                      <div className="text-3xl font-semibold">
                        {review?.review?.name}
                      </div>
                      <div className="flex flex-col gap-8">
                        {review?.review?.ratings?.map((rating) => {
                          return (
                            <div
                              key={Math.random()}
                              className="text-primary-text flex gap-2 items-start"
                            >
                              <p>
                                <span className="text-primary text-xl font-semibold">
                                  {rating?.title}:{" "}
                                </span>
                                {rating?.description}
                              </p>
                              <div>
                                <StarRating rating={3} />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </ContainerBox>
                );
              })}
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
