import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { Swiper, SwiperSlide } from "swiper/react";
import { MdOutlineAccessTime } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
// Import Swiper styles
import "swiper/css";

import "swiper/css/navigation";
// import required modules
import { Navigation } from "swiper/modules";

import { getData } from "../../untils/api";
import { Link } from "react-router-dom";
import { MyContext } from "../../App";

export default function Blog(props) {
  const context = useContext(MyContext);
  const [dataBlog, setDataBlog] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getData("/api/blog");
        if (res.success) {
          setDataBlog(res.data);
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
    <div className="blog md:py-5 pb-2 w-full bg-white">
      <div className="container">
        <h2 className="md:text-[22px] text-[18px] font-[600] mb-4">
          Trang BLog
        </h2>
        <Swiper
          slidesPerView={props.items}
          spaceBetween={35}
          navigation={true}
          modules={[Navigation]}
          className="blogSlider"
        >
          {dataBlog?.map((item) => (
            <SwiperSlide>
              <div className="blogItem ">
                <div className="blogImage w-full rounded-md overflow-hidden cursor-pointer relative">
                  <img
                    src={item.images}
                    alt=""
                    className="w-full transition-all hover:scale-105 hover:rotate-1 md:[h-300px] h-[250px] object-cover"
                  />
                  <div className="time absolute bottom-2 right-2">
                    <div className="flex items-center  text-white bg-[#ff5252] text-[13px] p-1 gap-1 rounded-md">
                      <MdOutlineAccessTime />
                      <span>{dayjs(item.createdAt).format("YYYY-MM-DD")}</span>
                    </div>
                  </div>
                </div>
                <div className="info py-5 flex flex-col gap-2">
                  <Link to="" className="link transition-all">
                    <div className="font-[600] line-clamp-2">{item.title}</div>
                  </Link>

                  <div
                    className="line-clamp-3 text-[rgba(0,0,0,0.8)]"
                    dangerouslySetInnerHTML={{
                      __html: item.description || "",
                    }}
                  ></div>
                  <Link to="" className="link transition-all">
                    <div className="flex items-center gap-1">
                      Xem thêm <MdKeyboardArrowRight />
                    </div>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
