import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import Rating from "@mui/material/Rating";
import { Button, Skeleton } from "@mui/material";
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
import { useEffect } from "react";
import { getData, postData } from "../../untils/api";
import { useState } from "react";
import ListLikeProduct from "../ListLikeProduct";
export default function ProductSale({ item, catId }) {
  const context = useContext(MyContext);
  const [productSaleData, setProductSaleData] = React.useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = React.useState(1);

  const handleAddToCart = async (item) => {
    let totalPrice =
      (item.price - item.price * ((item.discountPercentage || 0) / 100)) *
      quantity;
    try {
      const res = await postData("/api/cart/add", {
        productId: item._id,
        quantity: quantity,
        price: totalPrice,
      });
      if (res.success) {
        context.openAlertBox("success", res.message);
        context.setCountList((prev) => prev + 1);
      }
    } catch (error) {
      if (error.response?.data?.message) {
        context.openAlertBox("error", error.response.data.message);
      } else {
        context.openAlertBox("error", "Không thể kết nối server!");
      }
    }
  };
  useEffect(() => {
    if (!catId) return;

    setLoading(true);
    const fetchData = async () => {
      try {
        const res = await getData(`/api/productClient?catId=${catId}`);
        if (res.success) {
          setProductSaleData(res.dataSale);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [catId]);
  return (
    <div className="productSlider py-4">
      <Swiper
        slidesPerView={item}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
      >
        {loading
          ? Array(item)
              .fill(0)
              .map((_, i) => (
                <SwiperSlide key={i}>
                  <Skeleton variant="rectangular" width={210} height={300} />
                </SwiperSlide>
              ))
          : productSaleData?.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="group  productItems rounded-md overflow-hidden shadow-lg border-2 border-[rgba(0,0,0,0.1)] relative">
                  <div className="imgWrap w-[100%] overflow-hidden rounded-md relative ">
                    <Link>
                      <div className="md:h-[220px] h-[180px]  overflow-hidden">
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
                  <div className="info p-3 bg-[#f1f1f1]  ">
                    <Link className="link transition-all md:text-[13px] text-[11px]">
                      {item.brand}
                    </Link>

                    <h3 className="title line-clamp-1 md:text-[15px] text-[13px] mt-1 mb-2 font-[500] text-[rgba(0,0,0,0.9)]">
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
                      fullWidth
                      sx={{
                        backgroundColor: "white",
                        color: "#ff5252",
                        "&:hover": {
                          backgroundColor: "black",
                          color: "#f1f1f1",
                        },
                      }}
                      onClick={() => {
                        handleAddToCart(item);
                      }}
                      className=" flex items-center justify-center gap-2 !text-[11px] "
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

                    <ListLikeProduct item={item} type="heartBig" />
                  </div>
                </div>
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
}
