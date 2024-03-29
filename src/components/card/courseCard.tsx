import { GetDefaultImage, getStrapiMedia } from "@/utils/api-helper";
import formatFees from "@/utils/formatFees";
import Image from "next/image";
import Link from "next/link";
import { FaMedal, FaHeart } from "react-icons/fa";

export default function CourseCard({ featuredCourse }: any) {

	const logoURL = featuredCourse?.attributes?.logo?.data?.attributes?.url
		? getStrapiMedia(featuredCourse?.attributes?.logo?.data?.attributes?.url)
		: GetDefaultImage("logo");

	const bannerUrl = featuredCourse?.attributes?.banner?.data[0] ? getStrapiMedia(featuredCourse?.attributes?.banner?.data[0]?.attributes?.url) : GetDefaultImage("banner")

	return (
		<div className="flex flex-col items-stretch min-w-60 bg-white rounded-lg shadow-xl">
			<div className="relative rounded-t-lg">
				<img
					src={bannerUrl!}
					alt={""}
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
				<div className="absolute left-2 -top-7 bg-white p-2 rounded">
					<Image
						src={logoURL!}
						alt=""
						className="shadow-md rounded-sm "
						width={60}
						height={60}
					/>
				</div>
				<div className="p-2 pt-4 flex-1 h-72 shadow flex flex-col gap-2">
					<div className=" flex justify-end">
						<span className="bg-primary-light text-sm px-2 py-1 rounded-full">
							{formatFees(featuredCourse?.attributes?.fees)}
						</span>
					</div>

					<div className="p-2 pt-4 flex-1 flex flex-col gap-2 pr-2">
						<Link href={`/courses/${featuredCourse?.id}`}>
							<h4 className="text-primary font-semibold truncate max-w-60">{featuredCourse?.attributes?.name}</h4>
						</Link>
						<div className="flex flex-col text-sm tracking-tighter gap-2">
							<div className="flex justify-between">
								<div className="">Specializations</div>
								<div className="font-semibold">
									{featuredCourse?.attributes?.specializations?.data?.length}
								</div>
							</div>
							<div className="flex justify-between">
								<div className="">Course Duration</div>
								<div className="font-semibold">{featuredCourse?.attributes?.duration} Years</div>
							</div>
							<div className="flex justify-between">
								<div className="">Course Level</div>
								<div className="font-semibold">{featuredCourse?.attributes?.courseLevels?.data?.map((level: any, index: number) => {
									return (
										<span key={index}>
											{" " + `${level?.attributes?.levelName}`}
										</span>
									)
								})}</div>
							</div>
						</div>
					</div>
				</div>
				<Link href="">
					<div className="w-full p-2 bg-primary rounded-b-lg text-center text-white text-sm">
						Application Process & Course Info
					</div>
				</Link>
			</div>
		</div>
	);
}
