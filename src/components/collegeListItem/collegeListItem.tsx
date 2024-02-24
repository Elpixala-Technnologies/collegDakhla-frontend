import Link from "next/link";
import Button from "../button/button";
import { FaRegStar, FaRegUser } from "react-icons/fa";
import { PiBooksLight } from "react-icons/pi";
import Feature from "../feature/feature";
import { useQuery } from "@apollo/client";
import { getStates } from "@/query/schema";
import { GetDefaultImage, getStrapiMedia } from "@/utils/api-helper";

export default function CollegeListItem(allColleges: any) {
	//query to get all states
	const { loading: statesLoader, error: statesError, data: statesData } = useQuery(getStates);

	const collegeFee = parseInt(allColleges?.colleges?.attributes?.fees ? allColleges?.colleges?.attributes?.fees : 200000).toLocaleString('en-IN', {
		style: 'currency',
		currency: 'INR',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	});

	return (
		<>
			{
				allColleges?.colleges?.length > 0 ? <>{
					allColleges.colleges.map((college: any, index: any) => {
						const logoURL = college?.attributes?.collegeLogo?.data?.attributes?.url ? getStrapiMedia(college?.attributes?.collegeLogo?.data?.attributes?.url) : GetDefaultImage("logo")

						const bannerURL = college?.attributes?.banner?.data[0] ? getStrapiMedia(college?.attributes?.banner?.data[0]?.attributes?.url) : GetDefaultImage("banner")

						return (
							<div key={index}>
								<div className="mb-4 p-4 flex flex-col sm:flex-row gap-4 shadow-lg bg-white">
									<div className="relative h-40">
										<img src={bannerURL!} alt={college.collegeName} className="w-full sm:w-48 h-40 object-fill rounded-sm" />
										<div className="absolute inset-0 bg-black bg-opacity-50 rounded-sm"></div>
										<div className="absolute inset-0 text-white flex gap-4 justify-end mx-auto my-2 w-10/12">
											<div>
												<div className="text-xs">
													Our Rating
												</div>
												<div className="text-end">
													{college?.attributes?.rating ? college?.attributes?.rating : 8.6}/10
												</div>
											</div>
										</div>
									</div>
									<div className="pb-4 flex flex-1 flex-col gap-2">
										<Link href={`/college/${college.id}`}>
											<div className="flex flex-row gap-2">
												<div><img src={college.logo} /></div>
												<div className="flex flex-col">
													<h2 className="text-sm font-bold">{college?.attributes?.collegeName}</h2>
													<div className="text-xxs">
														{college?.attributes?.city?.data?.attributes?.name},{college?.attributes?.state?.data?.attributes?.name} | {college?.attributes?.rankedBy?.data[0]?.attributes?.name ? college?.attributes?.rankedBy?.data[0]?.attributes?.name : "UGC"} | {college?.attributes?.college_type?.data?.attributes?.type ? college?.attributes?.college_type?.data?.attributes?.type : "Private"} | {"Rank 6"}
													</div>
												</div>
											</div>
										</Link>
										<div className="flex items-stretch">
											<div className="pr-4 mr-4 border-r border-extra-light-text">
												<p className="text-primary font-semibold text-lg">{collegeFee}</p>
												<p className="text-xxs text-secondary-text font-light">BE/B.Tech First year fees</p>
											</div>
											<div className="pr-4 mr-4 border-r border-extra-light-text">
												<p className="text-primary font-semibold text-lg">{collegeFee}</p>
												<p className="text-xxs text-secondary-text font-light">Total fees</p>
											</div>
											<div className="pr-4 mr-4">
												<p className="text-primary font-semibold text-lg">{college?.attributes?.rating ? college?.attributes?.rating : 8.6}/10</p>
												<p className="text-xxs text-secondary-text font-light">Based on user review</p>
											</div>
										</div>

										<div className="flex gap-2">
											<Button href={`/college/${college.id}`} text="Admission 2024" icon={<FaRegUser />} fontSize="text-xxs" outline rounded />
											<Button href={`/college/${college.id}`} text="Review" icon={<FaRegStar />} outline rounded fontSize="text-xxs" />
											<Button href={`/college/${college.id}`} text="Course & Fees" icon={<PiBooksLight />} outline rounded fontSize="text-xxs" />
										</div>
									</div>
									<div className="flex flex-row gap-1 flex-wrap justify-center md:flex-col md:gap-4 md:my-4 items-center">
										<Button href={`/college/${college.id}`} text="Apply Now" filled fontSize="text-sm" fontWeight="font-bold" width="w-36" align="text-center" />
										<Button href={`/college/${college.id}`} text="Download Brochure" outline fontSize="text-sm" width="w-36" align="text-center" />
										<Button href={`/college/${college.id}`} text="Compare" outline fontSize="text-sm" width="w-36" align="text-center" />
									</div>
								</div>
								{
									(index + 1) % 4 == 0 ? (
										<div>
											<Feature title="Filter By State" tags={statesData?.states?.data} />
										</div>
									) : (
										<></>
									)
								}

							</div>

						)
					})
				}</>
					:
					<div className=" p-4 shadow-lg bg-white">
						<p className="text-2xl text-center text-gray-500">No data available</p>
					</div>


			}
		</>

	);
}