import { GetDefaultImage, getStrapiMedia } from "@/utils/api-helper";
import Image from "next/image";
import { BiSolidQuoteLeft, BiSolidQuoteRight } from "react-icons/bi";

export default function TestimonyCard({ testimonial }: any) {
	const logoUrl = testimonial?.attributes?.logo?.data?.attributes?.url
		? getStrapiMedia(testimonial?.attributes?.logo?.data?.attributes?.url)
		: GetDefaultImage("logo");
	const bannerUrl = testimonial?.attributes?.banner?.data[0]
		? getStrapiMedia(testimonial?.attributes?.banner?.data[0]?.attributes?.url)
		: GetDefaultImage("banner");
	return (
		<>
			<div className="shadow-lg">
				<div className="relative rounded-lg h-56 w-full md:w-96">
					<div className="absolute inset-0 bg-[#8d6e63] bg-opacity-50 rounded-t-lg"></div>
					<div className="absolute  p-4 flex flex-col w-full md:w-96 rounded-b-lg text-white">
						<div className="text-3xl">
							<BiSolidQuoteLeft />
						</div>
						<p className="text-base md:text-lg">
							{testimonial?.attributes?.comment}
						</p>
						<div className="text-3xl w-1/2">
							<BiSolidQuoteRight />
						</div>
					</div>
				</div>
				<div className="bg-white p-4 flex gap-4  w-full md:w-96 h-25 rounded-b-lg">
					<div>
						<Image src={logoUrl!} alt="" width={56} height={56} />
					</div>
					<div>
						<span className="font-semibold">{testimonial?.attributes?.commentBy}, </span>
						<span className="font-light">Studying at {testimonial?.attributes?.college?.data?.attributes?.collegeName}</span>
					</div>
				</div>
			</div>
		</>
	);
}
