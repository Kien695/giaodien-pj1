import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import "swiper/css/navigation";
// import required modules
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import BannerBox from "../BannerBox";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";
import { getData } from "../../untils/api";
export default function AllBannerSlider(props) {
  const context = useContext(MyContext);
  const [bannerData, setBanner] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getData("/api/bannerList/");
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
    <div className="categorySlider py-5 w-full mt-6">
      <Swiper
        slidesPerView={props.item}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className=""
      >
        {bannerData.map((item) => (
          <SwiperSlide className="">
            <BannerBox img={item.images} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
