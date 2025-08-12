import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import "swiper/css/navigation";
// import required modules
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import ProductItems from "../ProductItems";
export default function ProductSlider(props) {
  return (
    <div className="productSlider py-4">
      <Swiper
        slidesPerView={props.item}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className=""
      >
        <SwiperSlide>
          <ProductItems />
        </SwiperSlide>
        <SwiperSlide>
          <ProductItems />
        </SwiperSlide>
        <SwiperSlide>
          <ProductItems />
        </SwiperSlide>
        <SwiperSlide>
          <ProductItems />
        </SwiperSlide>
        <SwiperSlide>
          <ProductItems />
        </SwiperSlide>
        <SwiperSlide>
          <ProductItems />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
