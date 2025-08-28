import React, { useRef } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "./style.css";
// Import Swiper styles
import "swiper/css";

import "swiper/css/navigation";
// import required modules
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
export default function ZoomImage() {
  const [slideIndex, setSlideIndex] = React.useState(0);
  const zoomSliderBig = useRef();
  const zoomSliderSml = useRef();
  const goto = (index) => {
    setSlideIndex(index);
    zoomSliderSml.current.swiper.slideTo(index);
    zoomSliderBig.current.swiper.slideTo(index);
  };
  return (
    <div>
      <Swiper
        ref={zoomSliderBig}
        slidesPerView={1}
        spaceBetween={0}
        navigation={false}
      >
        <SwiperSlide>
          <InnerImageZoom
            src="https://serviceapi.spicezgold.com/download/1753722939206_125c18d6-592d-4082-84e5-49707ae9a4fd1749366193911-Flying-Machine-Women-Wide-Leg-High-Rise-Light-Fade-Stretchab-1.jpg"
            zoomType="hover"
            zoomPreload={true}
            hideHint={true}
            className="transition-transform duration-300 hover:scale-117 rounded-md"
          />
        </SwiperSlide>
        <SwiperSlide>
          <InnerImageZoom
            src="https://serviceapi.spicezgold.com/download/1753722939207_5107b7b1-ba6d-473c-9195-8576a6a0a9611749366193848-Flying-Machine-Women-Wide-Leg-High-Rise-Light-Fade-Stretchab-3.jpg"
            zoomType="hover"
            zoomPreload={true}
            hideHint={true}
            className="transition-transform duration-300 hover:scale-117 rounded-md"
          />
        </SwiperSlide>
        <SwiperSlide>
          <InnerImageZoom
            src="https://serviceapi.spicezgold.com/download/1753722959679_8a58d99c-b76b-4485-bb49-ba39521f94f31749366193880-Flying-Machine-Women-Wide-Leg-High-Rise-Light-Fade-Stretchab-2.jpg"
            zoomType="hover"
            zoomPreload={true}
            hideHint={true}
            className="transition-transform duration-300 hover:scale-117 rounded-md"
          />
        </SwiperSlide>
        <SwiperSlide>
          <InnerImageZoom
            src="https://serviceapi.spicezgold.com/download/1753711304615_zoom_0-1677748187.jpg"
            zoomType="hover"
            zoomPreload={true}
            hideHint={true}
            className="transition-transform duration-300 hover:scale-117 rounded-md"
          />
        </SwiperSlide>

        <SwiperSlide>
          <InnerImageZoom
            src="https://serviceapi.spicezgold.com/download/1753711304616_zoom_1-1677748187.jpg"
            zoomType="hover"
            zoomPreload={true}
            hideHint={true}
            className="transition-transform duration-300 hover:scale-117 rounded-md"
          />
        </SwiperSlide>
      </Swiper>

      <div className="categoryImage py-1">
        <Swiper
          ref={zoomSliderSml}
          slidesPerView={3}
          spaceBetween={10}
          navigation={true}
          modules={[Navigation]}
          className=""
        >
          <SwiperSlide>
            <div
              className={`rounded-md overflow-hidden cursor-pointer ${
                slideIndex == 0 ? "opacity-1" : "opacity-50"
              }`}
              onClick={() => goto(0)}
            >
              <img
                src="https://serviceapi.spicezgold.com/download/1753722939206_125c18d6-592d-4082-84e5-49707ae9a4fd1749366193911-Flying-Machine-Women-Wide-Leg-High-Rise-Light-Fade-Stretchab-1.jpg"
                alt=""
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className={`rounded-md overflow-hidden cursor-pointer ${
                slideIndex == 1 ? "opacity-1" : "opacity-50"
              }`}
              onClick={() => goto(1)}
            >
              <img
                src="https://serviceapi.spicezgold.com/download/1753722939207_5107b7b1-ba6d-473c-9195-8576a6a0a9611749366193848-Flying-Machine-Women-Wide-Leg-High-Rise-Light-Fade-Stretchab-3.jpg"
                alt=""
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className={`rounded-md overflow-hidden cursor-pointer ${
                slideIndex == 2 ? "opacity-1" : "opacity-50"
              }`}
              onClick={() => goto(2)}
            >
              <img
                src="https://serviceapi.spicezgold.com/download/1753722959679_8a58d99c-b76b-4485-bb49-ba39521f94f31749366193880-Flying-Machine-Women-Wide-Leg-High-Rise-Light-Fade-Stretchab-2.jpg"
                alt=""
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className={`rounded-md overflow-hidden cursor-pointer ${
                slideIndex == 3 ? "opacity-1" : "opacity-50"
              }`}
              onClick={() => goto(3)}
            >
              <img
                src="https://serviceapi.spicezgold.com/download/1753711304615_zoom_0-1677748187.jpg"
                alt=""
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className={`rounded-md overflow-hidden cursor-pointer ${
                slideIndex == 4 ? "opacity-1" : "opacity-50"
              }`}
              onClick={() => goto(4)}
            >
              <img
                src="https://serviceapi.spicezgold.com/download/1753711304616_zoom_1-1677748187.jpg"
                alt=""
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
