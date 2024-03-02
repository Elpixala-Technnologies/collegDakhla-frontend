import Link from "next/link";

import Image from "next/image";
import Tag from "../tag/tags";
import Button from "../button/button";
import { GetDefaultImage, getStrapiMedia } from "@/utils/api-helper";

export default function ExamListItem(examsData: any) {
	// const { attributes } = ExamData;
	console.log("exam data is ", examsData);


	const formatDate = (dateString: string | number | Date) => {
		if (!dateString) return "";
		const options: any = { year: "numeric", month: "short", day: "numeric" };
		return new Date(dateString).toLocaleDateString("en-US", options);
	};

	return (
		<>
			{examsData?.exams?.data?.length > 0 ? (
				<>
					{examsData?.exams?.data.map((exam: any, index: number) => {
						const logoURL = exam?.attributes?.logo?.data?.attributes
							?.url
							? getStrapiMedia(
								exam?.attributes?.logo?.data?.attributes?.url
							)
							: GetDefaultImage("logo");


						return (
							<div className="py-4 border-b-2 border-[#DDDDDD] ">
								<div className="px-4 flex item-center gap-4 bg-white shadow-sm rounded border flex-col md:flex-row ">
									<div className="flex items-center">
										<Image src={logoURL!} width={150} height={150} alt={""} />
									</div>
									<div className="my-4 flex flex-1 flex-col gap-4 border-r border-r-primary-light ">
										<Link href={`/exams/${exam.id}`}>
											<div>
												<h2 className="text-xl font-semibold text-primary">
													{exam?.attributes?.name}
												</h2>
											</div>
										</Link>
										<div className="flex flex-col gap-1 items-stretch">
											<p className="text-secondary-text font-light">
												Application Date:{" "}
												<span className="text-primary-text font-medium">
													{/* {exam?.attributes?.applicationDate?.startDate} - {exam?.attributes?.applicationDate?.endDate} */}
													{formatDate(exam?.attributes?.applicationDate?.startDate)}{" "}
													{exam?.attributes?.applicationDate?.endDate &&
														`- ${formatDate(exam?.attributes?.applicationDate?.endDate)}`}
												</span>
											</p>
											<p className="text-secondary-text font-light">
												Exam Date:{" "}
												<span className="text-primary-text font-medium">
													{/* {exam?.attributes?.examDate?.startDate} - {exam?.attributes?.examDate?.endDate} */}
													{formatDate(exam?.attributes?.examDate?.startDate)}{" "}
													{exam?.attributes?.examDate?.endDate &&
														`- ${formatDate(exam?.attributes?.examDate?.endDate)}`}
												</span>
											</p>
											<p className="text-secondary-text font-light">
												Result Date:{" "}
												<span className="text-primary-text font-medium">
													{/* {exam?.attributes?.resultDate?.startDate} - {exam?.attributes?.resultDate?.endDate} */}
													{formatDate(exam?.attributes?.resultDate?.startDate)}{" "}
													{exam?.attributes?.resultDate?.endDate &&
														`- ${formatDate(exam?.attributes?.resultDate?.endDate)}`}
												</span>
											</p>

											<p className="text-secondary-text font-light">
												Level:{" "}
												<span className="text-primary-text font-medium">
													National
													{/* {attributes?.exam_levels?.data[0]?.attributes?.exam_level_name} */}
												</span>
											</p>
											<div className="flex gap-2 flex-wrap my-2 items-center">
												<Tag
													text="Overview"
													outlineColor="border-primary"
													bgcolor="bg-white"
												/>
												<Tag
													text="Eligibility"
													outlineColor="border-primary"
													bgcolor="bg-white"
												/>
												<Tag
													text="Exam Pattern & Sylabus"
													outlineColor="border-primary"
													bgcolor="bg-white"
												/>
												<Tag
													text="Application"
													outlineColor="border-primary"
													bgcolor="bg-white"
												/>
												<Tag
													text="Process"
													outlineColor="border-primary"
													bgcolor="bg-white"
												/>
												<Tag
													text="Preparation Materials"
													outlineColor="border-primary"
													bgcolor="bg-white"
												/>
												<Tag
													text="Sample Paers"
													outlineColor="border-primary"
													bgcolor="bg-white"
												/>
												<Tag
													text="Discussion"
													outlineColor="border-primary"
													bgcolor="bg-white"
												/>
												<Tag
													text="Forum"
													outlineColor="border-primary"
													bgcolor="bg-white"
												/>
												<Tag
													text="Cut-off"
													outlineColor="border-primary"
													bgcolor="bg-white"
												/>
												<Tag
													text="College Predictor"
													outlineColor="border-primary"
													bgcolor="bg-white"
												/>
												<Tag
													text="Accepting Colleges"
													outlineColor="border-primary"
													bgcolor="bg-white"
												/>
											</div>
										</div>
									</div>

									<div className="flex flex-row gap-1 flex-wrap justify-center md:flex-col md:gap-4 md:my-4 items-center">
										<Button
											href={`/college`}
											text="Register Now"
											filled
											fontSize="text-sm"
											width="w-40"
											align="text-center"
											bgColor="bg-primary"
										/>
										<Button
											href={`/college`}
											text="Download Brochure"
											fontSize="text-sm"
											outline
											width="w-40"
											align="text-center"
											bgColor="bg-white"
											fontColor="text-primary-text"
										/>
										<Button
											href={`/college`}
											text="Get Updates"
											outline
											fontSize="text-sm"
											width="w-40"
											fontColor="text-primary-text"
											align="text-center"
										/>
									</div>
								</div>
							</div>
						)
					})}
				</>
			) : (
				<div className=" p-4 shadow-lg bg-white">
					<p className="text-2xl text-center text-gray-500">
						No data available
					</p>
				</div>
			)

			}
		</>
		// <div className="py-4 border-b-2 border-[#DDDDDD] ">
		//   <div className="px-4 flex item-center gap-4 bg-white shadow-sm rounded border flex-col md:flex-row ">
		//     <div className="flex items-center">
		//       <Image src={"/exam.png"} width={150} height={150} alt={""} />
		//     </div>
		//     <div className="my-4 flex flex-1 flex-col gap-4 border-r border-r-primary-light ">
		//       <Link
		//         href={{
		//           pathname: `/exams/3`,
		//           query: { tab: "overview" },
		//         }}
		//       >
		//         <div>
		//           <h2 className="text-xl font-semibold text-primary">
		//             {/* {attributes?.exam_name} */}
		//             JEE Advance
		//           </h2>
		//         </div>
		//       </Link>
		//       <div className="flex flex-col gap-1 items-stretch">
		//         <p className="text-secondary-text font-light">
		//           Application Date:{" "}
		//           <span className="text-primary-text font-medium">
		//             24 Jan, 2024 - 01 Feb, 2024
		//             {/* {formatDate(attributes?.application_date?.start_date)}{" "}
		//             {attributes?.application_date?.end_date &&
		//               `- ${formatDate(attributes?.application_date?.end_date)}`} */}
		//           </span>
		//         </p>
		//         <p className="text-secondary-text font-light">
		//           Exam Date:{" "}
		//           <span className="text-primary-text font-medium">
		//             24 Jan, 2024 - 01 Feb, 2024
		//             {/* {formatDate(attributes?.exam_date?.start_date)}{" "}
		//             {attributes?.exam_date?.end_date &&
		//               `- ${formatDate(attributes?.exam_date?.end_date)}`} */}
		//           </span>
		//         </p>
		//         <p className="text-secondary-text font-light">
		//           Result Date:{" "}
		//           <span className="text-primary-text font-medium">
		//             24 Jan, 2024 - 01 Feb, 2024
		//             {/* {formatDate(attributes?.result_date?.start_date)}{" "}
		//             {attributes?.result_date?.end_date &&
		//               `- ${formatDate(attributes?.result_date?.end_date)}`} */}
		//           </span>
		//         </p>

		//         <p className="text-secondary-text font-light">
		//           Level:{" "}
		//           <span className="text-primary-text font-medium">
		//             National
		//             {/* {attributes?.exam_levels?.data[0]?.attributes?.exam_level_name} */}
		//           </span>
		//         </p>
		//         <div className="flex gap-2 flex-wrap my-2 items-center">
		//           <Tag
		//             text="Overview"
		//             outlineColor="border-primary"
		//             bgcolor="bg-white"
		//           />
		//           <Tag
		//             text="Eligibility"
		//             outlineColor="border-primary"
		//             bgcolor="bg-white"
		//           />
		//           <Tag
		//             text="Exam Pattern & Sylabus"
		//             outlineColor="border-primary"
		//             bgcolor="bg-white"
		//           />
		//           <Tag
		//             text="Application"
		//             outlineColor="border-primary"
		//             bgcolor="bg-white"
		//           />
		//           <Tag
		//             text="Process"
		//             outlineColor="border-primary"
		//             bgcolor="bg-white"
		//           />
		//           <Tag
		//             text="Preparation Materials"
		//             outlineColor="border-primary"
		//             bgcolor="bg-white"
		//           />
		//           <Tag
		//             text="Sample Paers"
		//             outlineColor="border-primary"
		//             bgcolor="bg-white"
		//           />
		//           <Tag
		//             text="Discussion"
		//             outlineColor="border-primary"
		//             bgcolor="bg-white"
		//           />
		//           <Tag
		//             text="Forum"
		//             outlineColor="border-primary"
		//             bgcolor="bg-white"
		//           />
		//           <Tag
		//             text="Cut-off"
		//             outlineColor="border-primary"
		//             bgcolor="bg-white"
		//           />
		//           <Tag
		//             text="College Predictor"
		//             outlineColor="border-primary"
		//             bgcolor="bg-white"
		//           />
		//           <Tag
		//             text="Accepting Colleges"
		//             outlineColor="border-primary"
		//             bgcolor="bg-white"
		//           />
		//         </div>
		//       </div>
		//     </div>

		//     <div className="flex flex-row gap-1 flex-wrap justify-center md:flex-col md:gap-4 md:my-4 items-center">
		//       <Button
		//         href={`/college`}
		//         text="Register Now"
		//         filled
		//         fontSize="text-sm"
		//         width="w-40"
		//         align="text-center"
		//         bgColor="bg-primary"
		//       />
		//       <Button
		//         href={`/college`}
		//         text="Download Brochure"
		//         fontSize="text-sm"
		//         outline
		//         width="w-40"
		//         align="text-center"
		//         bgColor="bg-white"
		//         fontColor="text-primary-text"
		//       />
		//       <Button
		//         href={`/college`}
		//         text="Get Updates"
		//         outline
		//         fontSize="text-sm"
		//         width="w-40"
		//         fontColor="text-primary-text"
		//         align="text-center"
		//       />
		//     </div>
		//   </div>
		// </div>
	);
}
