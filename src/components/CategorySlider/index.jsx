import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import "swiper/css/navigation";
// import required modules
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import { MyContext } from "../../App";
export default function CategorySlider() {
  const context = useContext(MyContext);
  return (
    <div className="categorySlider mb-6">
      <div className="container">
        <Swiper
          breakpoints={{
            0: {
              slidesPerView: 3, // mobile
            },
            768: {
              slidesPerView: 5, // tablet
            },
            1024: {
              slidesPerView: 8, // desktop
            },
          }}
          spaceBetween={20}
          centerInsufficientSlides={true}
          navigation={true}
          modules={[Navigation]}
          className="flex justify-center"
        >
          {context?.catData.map((item) => (
            <SwiperSlide key={item._id}>
              <Link to={`/product?catId=${item.slug || item._id}`}>
                <div className="item bg-white rounded-md  text-center flex items-center justify-center flex-col h-[170px]">
                  <div className="w-full h-full rounded-md overflow-hidden flex items-center justify-center">
                    <img
                      src={item.images}
                      alt={item.name}
                      className="w-full h-full object-cover transition-all"
                    />
                  </div>
                  <h3 className="text-[14px] font-[500] mt-3 mb-2">
                    {item.name}
                  </h3>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
