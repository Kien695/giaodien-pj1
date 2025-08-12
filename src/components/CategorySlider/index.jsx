import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import "swiper/css/navigation";
// import required modules
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
export default function CategorySlider() {
  return (
    <div className="categorySlider mb-6">
      <div className="container">
        <Swiper
          slidesPerView={6}
          spaceBetween={10}
          navigation={true}
          modules={[Navigation]}
          className=""
        >
          <SwiperSlide>
            <Link to="">
              <div className="item bg-white p-3 rounded-sm text-center flex items-center justify-center flex-col">
                <img
                  src="/src/assets/ap001.webp"
                  className="w-70px transition-all"
                />
                <h3 className="text-[18px] font-[600px] mt-3">Áo nam</h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="">
              <div className="item bg-white p-3 rounded-sm text-center flex items-center justify-center flex-col">
                <img
                  src="/src/assets/ap001.webp"
                  className="w-70px transition-all"
                />
                <h3 className="text-[18px] font-[600px] mt-3">Áo nam</h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="">
              <div className="item bg-white p-3 rounded-sm text-center flex items-center justify-center flex-col">
                <img
                  src="/src/assets/ap001.webp"
                  className="w-70px transition-all"
                />
                <h3 className="text-[18px] font-[600px] mt-3">Áo nam</h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="">
              <div className="item bg-white p-3 rounded-sm text-center flex items-center justify-center flex-col">
                <img
                  src="/src/assets/ap001.webp"
                  className="w-70px transition-all"
                />
                <h3 className="text-[18px] font-[600px] mt-3">Áo nam</h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="">
              <div className="item bg-white p-3 rounded-sm text-center flex items-center justify-center flex-col">
                <img
                  src="/src/assets/ap001.webp"
                  className="w-70px transition-all"
                />
                <h3 className="text-[18px] font-[600px] mt-3">Áo nam</h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="">
              <div className="item bg-white p-3 rounded-sm text-center flex items-center justify-center flex-col">
                <img
                  src="/src/assets/ap001.webp"
                  className="w-70px transition-all"
                />
                <h3 className="text-[18px] font-[600px] mt-3">Áo nam</h3>
              </div>
            </Link>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
