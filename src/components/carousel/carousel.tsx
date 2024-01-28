import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./style.css";
import { Swiper,SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from 'swiper/modules';
import CollegeCard from '../card/collegeCard';


export default function CarouselComponent(){
    return (<>
        <Swiper 
          slidesPerView={6}
          spaceBetween={30}
          grabCursor={true}
          modules={[]}
          className="mySwiper"
        >
            <SwiperSlide><CollegeCard/></SwiperSlide>
            <SwiperSlide><CollegeCard/></SwiperSlide>
            <SwiperSlide><CollegeCard/></SwiperSlide>
            <SwiperSlide><CollegeCard/></SwiperSlide>
            <SwiperSlide><CollegeCard/></SwiperSlide>
            <SwiperSlide><CollegeCard/></SwiperSlide>
            <SwiperSlide><CollegeCard/></SwiperSlide>
            <SwiperSlide><CollegeCard/></SwiperSlide>
            <SwiperSlide><CollegeCard/></SwiperSlide>
        </Swiper>
    </>)
}