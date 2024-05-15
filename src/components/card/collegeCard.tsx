import { GetDefaultImage, getStrapiMedia } from "@/utils/api-helper";
import Link from "next/link";
import Image from "next/image";
import { FaHeart, FaMedal } from "react-icons/fa6";
import Tag from "../tag/tags";
import { BiBadgeCheck } from "react-icons/bi";
import { BsFlag } from "react-icons/bs";
import StarRating from "../starRating/starRating";

export default function CollegeCard({ featuredCollege }: any) {
	let college = featuredCollege?.attributes;
	const logoURL = college?.collegeLogo?.data?.attributes?.url
		? getStrapiMedia(college?.collegeLogo?.data?.attributes?.url)
		: GetDefaultImage("logo");
	const bannerURL = college?.banner?.data[0]
		? getStrapiMedia(college?.banner?.data[0]?.attributes?.url)
		: GetDefaultImage("banner");
		
	return (
		<div className="flex flex-col items-stretch min-w-56 bg-white rounded-lg drop-shadow-sm hover:drop-shadow-lg">
			<div className="relative rounded-t-lg">
				<img
					src={bannerURL!}
					alt={college?.name}
					className="w-full h-28 object-cover rounded-t-lg"
				/>
				<div className="absolute inset-0 bg-black bg-opacity-50 rounded-t-lg"></div>
				<div className="absolute inset-0 px-2 py-3 flex justify-between max-h-max items-center">
					<div className="bg-white rounded-full px-2 py-1 text-base text-primary flex gap-2 items-center">
						<FaMedal className="h-4 w-4" />
						<div className="text-sm">Featured</div>
					</div>
					<div className="rounded-full p-1 text-sm cursor-pointer text-white">
						<FaHeart />
					</div>
				</div>
			</div>
			<div className="relative flex flex-col">
				<div className="absolute left-2 -top-7">
					<Image
						src={logoURL!}
						alt=""
						className="shadow-md rounded-sm "
						width={60}
						height={60}
					/>
				</div>
				<div className="p-2 pt-4 flex-1 h-fit shadow flex flex-col gap-2">
					<div className=" flex justify-end">
						<StarRating rating={3.6} />
					</div>
					<Link href={`/college/${featuredCollege?.id}`}>
						<h4 className="text-primary font-semibold truncate max-w-60">
							{college.collegeName}
						</h4>
					</Link>
					<p className="text-xs text-secondary-text">
						{college.city?.data?.attributes?.name},
						{college.state?.data?.attributes?.name}
					</p>
					<p className="text-sm text-secondary-text flex gap-2">
						<div className="flex gap-1 items-center">
							<span>
								<BiBadgeCheck />
							</span>
							Approved By:
						</div>
						<div className="flex gap-2">
							<Tag
								href={""}
								text={"UGC"}
								bgcolor="bg-blue-100"
								color="text-gray-800"
								borderColor="transparent"
								rounded
								fontSize="text-xs"
							/>
							<Tag
								href={""}
								text={"AICTC"}
								bgcolor="bg-yellow-400"
								color="text-gray-800"
								borderColor="transparent"
								rounded
								fontSize="text-xs"
							/>
						</div>
						{/* {college.rankedBy?.data[0]?.attributes
              ? college.rankedBy?.data[0]?.attributes.name
              : "UGC"} */}
					</p>
					<p className="text-xs text-secondary-text flex gap-1">
						<div>
							<BsFlag />
						</div>
						<div>{college?.college_type?.data?.attributes?.type}</div>
					</p>
				</div>
				<Link href="">
					<div className="w-full p-2 bg-primary rounded-b-lg text-center text-white text-sm">
						Apply Now
					</div>
				</Link>
			</div>
		</div>
	);
}
