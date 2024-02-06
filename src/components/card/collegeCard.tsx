import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";

export default function CollegeCard(props: any) {

	let college = props.college.attributes;
	const logoURL = college?.collegeLogo?.data?.attributes.url ? college.collegeLogo.data?.attributes.url : "https://images.collegedunia.com/public/college_data/images/appImage/1509430807cover.jpg?h=300&w=250&mode=stretch"

	return (
		<>
			<div className="flex flex-col items-stretch min-w-48 bg-white rounded-lg shadow-lg">
				<div className="relative rounded-t-lg">
					<img src={logoURL} alt={college.name} className="w-full h-20 object-cover rounded-t-lg" />
					<div className="absolute inset-0 bg-black bg-opacity-50 rounded-t-lg"></div>
					<div className="absolute inset-0 p-2 flex justify-between max-h-max items-center">
						<div className="bg-white rounded-full px-2 py-1 text-xs">Featured</div>
						<div className="bg-white rounded-full p-1 text-sm cursor-pointer"><FaRegHeart /></div>
					</div>
				</div>
				<div className="relative flex flex-col">
					<div className="absolute left-2 -top-7">
						<img src={"https://images.shiksha.com/mediadata/images/1605086820phpSFQlAR_s.jpg"} className="shadow-md rounded-sm h-14 w-14" />
					</div>
					<div className="p-2 pt-8 flex-1">
						<h4 className="text-primary text-sm font-semibold">
							{college.collegeName}
						</h4>
						<p className="text-xxs text-secondary-text">{college.city},{college.state}</p>
						<p className="text-xs text-secondary-text">Approved By: {college.rankedBy?.data[0]?.attributes ? college.rankedBy?.data[0]?.attributes.name : "UGC"}</p>
						<p className="text-xs text-secondary-text">{college?.college_type?.data?.attributes?.type}</p>

					</div>
					<Link href="/">
						<div className="w-full p-2 bg-primary rounded-b-lg text-center text-white text-sm">
							Apply Now
						</div>
					</Link>
				</div>
			</div>
		</>
	)
}