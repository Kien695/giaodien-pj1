import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import "swiper/css/navigation";
// import required modules
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import BannerBox from "../BannerBox";
import BannerBoxV2 from "../bannerBoxV2";
import BannerBoxV3 from "../bannerBoxV3";
export default function AllBannerSliderV2(props) {
  return (
    <div className="categorySlider py-5 w-full mt-6">
      <Swiper
        slidesPerView={props.item}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className=""
      >
        <SwiperSlide>
          <BannerBoxV3
            info="right"
            img="https://serviceapi.spicezgold.com/download/1753859360822_1737020916820_New_Project_52.jpg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBoxV3
            info="left"
            img="https://serviceapi.spicezgold.com/download/1741663408792_1737020756772_New_Project_1.png"
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBoxV3 img="https://serviceapi.spicezgold.com/download/1741664665391_1741497254110_New_Project_50.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBoxV3 img="https://serviceapi.spicezgold.com/download/1741664665391_1741497254110_New_Project_50.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBoxV3 img="https://serviceapi.spicezgold.com/download/1741664665391_1741497254110_New_Project_50.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBoxV3 img="https://serviceapi.spicezgold.com/download/1741664665391_1741497254110_New_Project_50.jpg" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
