import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { MyContext } from "../../App";
import { getData } from "../../untils/api";
export default function HomeSlider() {
  const context = useContext(MyContext);
  const [bannerData, setBanner] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getData("/api/banner");
        if (res.success) {
          setBanner(res.data);
        }
      } catch (error) {
        if (error.response) {
          context.openAlertBox("error", error.response.data.message);
        } else {
          context.openAlertBox("error", "Không thể kết nối server!");
        }
      }
    };
    fetchData();
  }, []);
  return (
    <div className="homeSlider py-6 ">
      <div className="container">
        <Swiper
          spaceBetween={15}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="sliderHome"
        >
          {bannerData.map((item) => (
            <SwiperSlide className="">
              <div className="item rounded-[20px] overflow-hidden">
                <img src={item.images} className="w-full" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
