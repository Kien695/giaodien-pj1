import { Swiper, SwiperSlide } from "swiper/react";
import bannerBoxV2Image2 from "../../assets/1756273096312_1737036773579_sample-1.jpg";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
export default function HomeSliderV2() {
  return (
    <Swiper
      loop={true}
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
      className=""
    >
      <SwiperSlide className="">
        <div className="item rounded-[5px] overflow-hidden relative">
          <img
            src="https://serviceapi.spicezgold.com/download/1742441193376_1737037654953_New_Project_45.jpg"
            className="w-full"
          />
        </div>
        <div className="info absolute top-0 -right-[100%] p-8 w-[50%] h-[100%] flex items-center flex-col gap-2 justify-center opacity-0 transition-all duration-700">
          <h4 className="md:text-[20px] text-[12px] font-[500] text-left w-full relative -right-[100%] opacity-0">
            Giảm giá mạnh
          </h4>
          <h2 className="md:text-[30px] text-[22x] font-[700] relative -right-[100%] opacity-0">
            Xu hướng điện thoại hiện nay
          </h2>
          <h3 className="md:text-[20px] text-[15px] font-[500] text-left w-full relative -right-[100%] opacity-0">
            Chỉ từ{" "}
            <span className="text-[#ff5252] md:text-[25px] text-[20px] font-[600]">
              1 triệu
            </span>
          </h3>
          <Button variant="contained" className="w-auto self-start ">
            <Link to="/product?catId=68f663db9aba3f9e0331954f">MUA NGAY</Link>
          </Button>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="item rounded-[5px] overflow-hidden">
          <img src={bannerBoxV2Image2} className="w-full" />
        </div>
        <div className="info absolute top-0 -right-[100%] p-8 w-[50%] h-[100%] flex items-center flex-col gap-2 justify-center opacity-0 transition-all duration-700">
          <h4 className="md:text-[20px] text-[12px] font-[500] text-left w-full relative -right-[100%] opacity-0">
            Giảm giá mạnh
          </h4>
          <h2 className="md:text-[30px] text-[22x] font-[700] relative -right-[100%] opacity-0">
            Xu hướng thời trang nữ hiện nay
          </h2>
          <h3 className="md:text-[20px] text-[15px]  font-[500] text-left w-full relative -right-[100%] opacity-0">
            Chỉ từ{" "}
            <span className="text-[#ff5252] md:text-[25px] text-[20px] font-[600]">
              59k
            </span>
          </h3>
          <Button variant="contained" className="w-auto self-start">
            <Link to="/product?catId=68dbe8681ada8a2729ecd824">MUA NGAY</Link>
          </Button>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
