import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Button } from "@mui/material";
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
          <h4 className="text-[20px] font-[500] text-left w-full relative -right-[100%] opacity-0">
            Giảm giá mạnh
          </h4>
          <h2 className="text-[30px] font-[700] relative -right-[100%] opacity-0">
            Xu hướng điện thoại hiện nay
          </h2>
          <h3 className="text-[20px] font-[500] text-left w-full relative -right-[100%] opacity-0">
            Chỉ từ{" "}
            <span className="text-[#ff5252] text-[25px] font-[600]">
              1 triệu
            </span>
          </h3>
          <Button variant="contained" className="w-auto self-start ">
            MUA NGAY
          </Button>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="item rounded-[5px] overflow-hidden">
          <img
            src="https://serviceapi.spicezgold.com/download/1742439896581_1737036773579_sample-1.jpg"
            className="w-full"
          />
        </div>
        <div className="info absolute top-0 -right-[100%] p-8 w-[50%] h-[100%] flex items-center flex-col gap-2 justify-center opacity-0 transition-all duration-700">
          <h4 className="text-[20px] font-[500] text-left w-full relative -right-[100%] opacity-0">
            Giảm giá mạnh
          </h4>
          <h2 className="text-[30px] font-[700] relative -right-[100%] opacity-0">
            Xu hướng thời trang nữ hiện nay
          </h2>
          <h3 className="text-[20px] font-[500] text-left w-full relative -right-[100%] opacity-0">
            Chỉ từ{" "}
            <span className="text-[#ff5252] text-[25px] font-[600]">59k</span>
          </h3>
          <Button variant="contained" className="w-auto self-start">
            MUA NGAY
          </Button>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
