import { GetDefaultImage, getStrapiMedia } from "@/utils/api-helper";
import Image from "next/image";

export default function TopCollectionCard({ college }: any) {
	console.log("colleges are ", college);
	const logoUrl = college?.collegeLogo?.data?.attributes?.url ? getStrapiMedia(college?.collegeLogo?.data?.attributes?.url) : GetDefaultImage("logo");
	return (
		<>
			<div className="min-w-48">
				<div className="relative rounded-lg">
					<Image
						src={logoUrl!}
						alt={college?.name}
						className="w-full h-36 object-cover rounded-lg"
						width={100}
						height={200}
					/>
					<div className="absolute inset-0 bg-black bg-opacity-50 rounded-t-lg"></div>
					<div className="absolute inset-0 p-2 h-36 flex flex-col justify-end max-h-max  text-white">
						<div>{college?.collegeName}</div>
						<div className="flex gap-1 items-center relative">
							<div className="shadow">
								<Image
									src={logoUrl!}
									alt={college?.collegeName}
									className="rounded-full"
									height={30}
									width={30}
								/>
							</div>
							{/* <div className="absolute left-4 shadow">
								<Image
									src={logoUrl!}
									alt={college?.name}
									className="rounded-full"
									height={30}
									width={30}
								/>
							</div>
							<div className="absolute left-8 shadow">
								<Image
									src={logoUrl!}
									alt={college?.name}
									className="rounded-full"
									height={30}
									width={30}
								/>
							</div> */}
							{college?.collegeStreams?.data?.length} Streams
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
