import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import "swiper/css/navigation";
// import required modules
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import BannerBox from "../BannerBox";
export default function AllBannerSlider(props) {
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
          <BannerBox img="/src/assets/1741669012402_banner1.webp" />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBox img="/src/assets/1741669012402_banner1.webp" />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBox img="/src/assets/1741669012402_banner1.webp" />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBox img="/src/assets/1741669012402_banner1.webp" />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBox img="/src/assets/1741669012402_banner1.webp" />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBox img="/src/assets/1741669012402_banner1.webp" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
