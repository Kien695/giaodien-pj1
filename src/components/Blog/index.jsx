import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import "swiper/css/navigation";
// import required modules
import { Navigation } from "swiper/modules";
import BlogItem from "../BlogItem";

export default function Blog(props) {
  return (
    <div className="blog py-5 w-full bg-white">
      <div className="container">
        <h2 className="text-[22px] font-[600] mb-4">Trang BLog</h2>
        <Swiper
          slidesPerView={props.item}
          spaceBetween={25}
          navigation={true}
          modules={[Navigation]}
          className="blogSlider"
        >
          <SwiperSlide>
            <BlogItem />
          </SwiperSlide>
          <SwiperSlide>
            <BlogItem />
          </SwiperSlide>
          <SwiperSlide>
            <BlogItem />
          </SwiperSlide>
          <SwiperSlide>
            <BlogItem />
          </SwiperSlide>
          <SwiperSlide>
            <BlogItem />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
