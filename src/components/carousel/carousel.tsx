import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./style.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from 'swiper/modules';
import CollegeCard from '../card/collegeCard';
import SwiperCore from "swiper";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { getColleges } from "@/query/schema";
import { useQuery } from "@apollo/client";

// Install Swiper modules
SwiperCore.use([Navigation]);
export default function CarouselComponent() {
	// get college data
	const { loading, error, data } = useQuery(getColleges);
	//console.log(data)

	return (<>
		<Swiper
			spaceBetween={10}
			slidesPerView={'auto'}
			grabCursor={true}
			className="mySwiper"
			navigation={{
				nextEl: '.custom-next',
				prevEl: '.custom-prev'
			}}
			breakpoints={{
				480: {
					slidesPerView: 2,
					spaceBetween: 40,
				},
				640: {
					slidesPerView: 3,
					spaceBetween: 40,
				},
				768: {
					slidesPerView: 4,
					spaceBetween: 40,
				},
				1180: {
					slidesPerView: 5,
					spaceBetween: 40,
				},
				1300: {
					slidesPerView: 6,
					spaceBetween: 40,
				},
			}}
			modules={[]}
		>
			{/* carousel component loop */}
			{data?.colleges?.data?.slice(0, 10).map((college: any, index: any) => {
				return (
					<SwiperSlide key={college.id}>
						<CollegeCard college={college} />
					</SwiperSlide>
				)
			})}

			<div className="flex justify-end gap-4 mt-4">
				<div className="custom-prev bg-primary text-white p-2 cursor-pointer rounded-sm"><FaAngleLeft /></div>
				<div className="custom-next bg-primary text-white p-2 cursor-pointer rounded-sm"><FaAngleRight /></div>
			</div>
		</Swiper>
	</>)
}