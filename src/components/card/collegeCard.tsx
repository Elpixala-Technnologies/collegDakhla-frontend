import { GetDefaultImage, getStrapiMedia } from "@/utils/api-helper";
import Link from "next/link";
import { FaHeart, FaMedal } from "react-icons/fa6";

export default function CollegeCard(props: any) {

	let college = props.college.attributes;
	const logoURL = college?.collegeLogo?.data?.attributes?.url ? getStrapiMedia(college?.collegeLogo?.data?.attributes?.url) : GetDefaultImage("logo")
	const bannerURL = college?.banner?.data[0] ? getStrapiMedia(college?.banner?.data[0]?.attributes?.url) : GetDefaultImage("banner")
	return (
		<div className="flex flex-col items-stretch min-w-48 bg-white rounded-lg shadow-xl">
			<div className="relative rounded-t-lg">
				<img src={bannerURL!} alt={college.name} className="w-full h-20 object-cover rounded-t-lg" />
				<div className="absolute inset-0 bg-black bg-opacity-50 rounded-t-lg"></div>
				<div className="absolute inset-0 p-2 flex justify-between max-h-max items-center">
					<div className="bg-white rounded-full px-2 py-1 text-base text-primary"><FaMedal /></div>
					<div className="rounded-full p-1 text-sm cursor-pointer text-white"><FaHeart /></div>
				</div>
			</div>
			<div className="relative flex flex-col">
				<div className="absolute left-2 -top-7">
					<img src={logoURL!} className="shadow-md rounded-sm h-14 w-14" />
				</div>
				<div className="p-2 pt-8 flex-1 min-h-32">
					<Link href={`/college/${props?.college?.id}`} >
						<h4 className="text-primary text-sm font-semibold">
							{college.collegeName}
						</h4>
					</Link>
					<p className="text-xxs text-secondary-text">{college.city?.data?.attributes?.name},{college.state?.data?.attributes?.name}</p>
					<p className="text-xs text-secondary-text">Approved By: {college.rankedBy?.data[0]?.attributes ? college.rankedBy?.data[0]?.attributes.name : "UGC"}</p>
					<p className="text-xs text-secondary-text">{college?.college_type?.data?.attributes?.type}</p>
				</div>
				<Link href="">
					<div className="w-full p-2 bg-primary rounded-b-lg text-center text-white text-sm">
						Apply Now
					</div>
				</Link>
			</div>
		</div >
	)
}