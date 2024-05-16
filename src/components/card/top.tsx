import Image from "next/image";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

export default function CollegeCardNoImage({ collegeData, id }: any) {
	const handleClick = () => {

	};
	return (
		<div
			className="text-primary-text flex flex-col lg:flex-row gap-4 border border-primary-light shadow-md hover:shadow-lg rounded-2xl md:min-h-[200px] max-h-fit justify-between min-w-80 md:min-w-fit"
			onClick={handleClick}
		>
			<div className="relative lg:w-1/3">
				<Image
					width={700}
					height={200}
					src={collegeData?.banner?.data[0]?.attributes?.url}
					alt="cardImage"
					className="object-contain object-center sm:h-[200px] h-[100px]  lg:h-full w-full rounded-xl p-1"
				/>

				<Image
					width={50}
					height={50}
					src={collegeData?.logo?.data?.attributes?.url}
					alt="College Logo"
					className="absolute top-0 left-0 object-contain p-2"
				/>

			</div>
			<div className="flex flex-col justify-stretch p-2 lg:w-2/3 gap-1">
				<div>
					<Link
						href={`/colleges/${collegeData?.college_url}/${collegeData?.nav_items?.data[0]?.attributes?.title}`}
					>
						<h2 className="cursor-pointer font-bold text-base lg:text-xl xl:text-2xl">
							{collegeData?.collegeName}
						</h2>
					</Link>
					<p className="text-xs lg:text-sm -mt-1">
						{collegeData?.city?.data?.attributes?.city_name},{" "}
						{collegeData?.state?.data?.attributes?.state_name}
					</p>
				</div>
				<div>
					<ul className="list-disc flex items-start justify-start flex-wrap gap-x-4 text-xs lg:text-sm px-4 lg:leading-tight ">
						<li className="opacity-50">Excellent</li>
						<li className=" opacity-50">2.3k reviews</li>
						<li className="opacity-50">5.8 km from nearest dorm</li>
					</ul>
					<h3 className="text-sm lg:text-md ">
						Annual fees:{" "}
						<b>
							&#8377;{collegeData?.courses?.data[0]?.attributes?.average_fee}
						</b>
					</h3>
					<h3 className="text-sm sm:text-md">
						University type:{" "}
						<b> {collegeData?.college_type?.data?.attributes?.college_type}</b>
					</h3>
				</div>
				{/* <div className="flex flex-col gap-2 md:gap-4">
          <button className="flex items-center gap-1 px-4 p-1 text-brand-blue border rounded-md text-sm lg:text-base">
            <span>Learn More</span>
            <FaArrowRightLong />
          </button>
          <Button paddingY="py-2" text="Recommended Courses(4)"></Button>
        </div> */}
				<div className="flex flex-col md:flex-row gap-2 md:gap-4 text-center mt-2 ">
					<button className="flex items-center gap-1 px-4 p-1 text-brand-blue border rounded-md text-sm lg:text-base">
						<span className="text-nowrap">Learn More</span>
						<FaArrowRightLong />
					</button>
					<button className="flex items-center text-center gap-1 px-4 p-1 text-white bg-brand-blue border rounded-md text-sm lg:text-base">
						Recommended Courses
					</button>
				</div>
			</div>
		</div>
	);
}
