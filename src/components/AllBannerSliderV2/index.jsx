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
        breakpoints={{
          0: { spaceBetween: 20 },
          768: { spaceBetween: 15 },
          1024: { spaceBetween: 10 },
        }}
        navigation={true}
        modules={[Navigation]}
        className=""
      >
        <SwiperSlide>
          <BannerBoxV3
            name="Thời trang nử giá rẻ"
            link="product?catId=68dbe8681ada8a2729ecd824"
            info="right"
            price={Number(100000).toLocaleString("vi-VN") + "đ"}
            img="https://serviceapi.spicezgold.com/download/1753859360822_1737020916820_New_Project_52.jpg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBoxV3
            name="Balo đẹp hiện nay"
            link="product?catId=691550ef962c06d59923ae46"
            info="left"
            price={Number(50000).toLocaleString("vi-VN") + "đ"}
            img="https://serviceapi.spicezgold.com/download/1741663408792_1737020756772_New_Project_1.png"
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBoxV3
            name="Dép giá rẻ"
            link="product?catId=691550ef962c06d59923ae46"
            info="right"
            price={Number(20000).toLocaleString("vi-VN") + "đ"}
            img="https://serviceapi.spicezgold.com/download/1741664665391_1741497254110_New_Project_50.jpg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBoxV3
            name="Đồ điện tử chất lượng"
            link="product?catId=68d4c83ab577fe9a291d120b"
            info="right"
            price={Number(4000000).toLocaleString("vi-VN") + "đ"}
            img="https://plus.unsplash.com/premium_photo-1711051475177-1ebe1594a9c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGlwaG9uZXxlbnwwfHwwfHx8MA%3D%3D"
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBoxV3
            name="Trang sức lịch lãm"
            link="product?catId=68d4c84db577fe9a291d120d"
            info="left"
            price={Number(200000).toLocaleString("vi-VN") + "đ"}
            img="https://images.unsplash.com/photo-1626784215021-2e39ccf971cd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGpld2VsbGVyeXxlbnwwfHwwfHx8MA%3D%3D"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
