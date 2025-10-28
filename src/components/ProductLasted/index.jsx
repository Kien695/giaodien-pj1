import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import Rating from "@mui/material/Rating";
import { Button } from "@mui/material";
import { FaRegHeart } from "react-icons/fa6";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { IoGitCompareOutline } from "react-icons/io5";
import { BsCart3 } from "react-icons/bs";
// Import Swiper styles
import "swiper/css";

import "swiper/css/navigation";
// import required modules
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

import { MyContext } from "../../App";
import DetailProductMini from "../DetailProductMini";
export default function ProductLasted(props) {
  const context = useContext(MyContext);
  return (
    <div className="productSlider py-4">
      <Swiper
        slidesPerView={props.item}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className=""
      >
        {context?.productNewData.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="group  productItems rounded-md overflow-hidden shadow-lg border-2 border-[rgba(0,0,0,0.1)] relative">
              <div className="imgWrap w-[100%] overflow-hidden rounded-md relative ">
                <Link>
                  <div className="h-[220px] overflow-hidden">
                    <img
                      src={item.images?.[0]?.url}
                      alt=""
                      className="w-full"
                    />

                    <img
                      src={item.images?.[1]?.url}
                      alt=""
                      className="w-full absolute top-0 left-0 opacity-0 transition-all duration-500 group-hover:opacity-100"
                    />
                  </div>
                </Link>
              </div>
              <div className="info  p-3 bg-[#f1f1f1] pt-1 pb-4">
                <h6 className="text-[13px]">
                  <Link className="link transition-all">{item.brand}</Link>
                </h6>
                <h3 className="title line-clamp-1 text-[15px] mt-1 mb-2 font-[500] text-[rgba(0,0,0,0.9)]">
                  <Link
                    to={`/product/${item._id}`}
                    className="link transition-all"
                  >
                    {item.name}
                  </Link>
                </h3>
                <Rating
                  name="size-small"
                  defaultValue={2}
                  size="small"
                  readOnly
                />
                <div className="flex items-center text-[12px] justify-between font-[500] mb-3">
                  <div className="priceOld line-through text-gray-500">
                    {Number(item.price).toLocaleString("vi-VN") + " đ"}
                  </div>
                  <div className="priceNew text-[#ff5252] ">
                    {(
                      item.price -
                      item.price * (item.discountPercentage / 100)
                    ).toLocaleString("vi-VN") + " đ"}
                  </div>
                </div>
                <Button
                  variant="outlined"
                  color="error"
                  sx={{
                    backgroundColor: "white",
                    color: "#ff5252",
                    "&:hover": {
                      backgroundColor: "black",
                      color: "#f1f1f1",
                    },
                  }}
                  className=" flex items-center justify-center gap-2 !text-[11px] !ml-6 "
                >
                  <BsCart3 />
                  <span>Thêm vào giỏ hàng</span>
                </Button>
              </div>
              <div className="discount absolute top-[5px] left-[6px] rounded-md bg-[#ff5252] text-white">
                {item.discountPercentage + "%"}
              </div>
              <div className="action flex absolute top-[-200px] right-[1px] gap-2 flex-col w-[50px] transition-all duration-500 group-hover:top-[12px]">
                <DetailProductMini item={item} />
                <Button className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !bg-white !text-black hover:!bg-[#ff5252] hover:!text-white">
                  <IoGitCompareOutline className="text-[18px]" />
                </Button>
                <Button className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !bg-white !text-black hover:!bg-[#ff5252] hover:!text-white">
                  <FaRegHeart className="text-[18px]" />
                </Button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
