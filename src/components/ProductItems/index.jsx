import React, { useContext } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { Button } from "@mui/material";

import { MdOutlineZoomOutMap } from "react-icons/md";
import { IoGitCompareOutline } from "react-icons/io5";
import { BsCart3 } from "react-icons/bs";
import { MyContext } from "../../App";
import DetailProductMini from "../DetailProductMini";
import ListLikeProduct from "../ListLikeProduct";
import { postData } from "../../untils/api";
export default function ProductItems({ productData, type }) {
  const context = useContext(MyContext);
  const [quantity, setQuantity] = React.useState(1);
  const handleAddToCart = async (id) => {
    try {
      const res = await postData("/api/cart/add", {
        productId: id,
        quantity: quantity,
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
  return type == "grid" ? (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
      {productData?.map((item, index) => (
        <div
          className="group productItems rounded-md overflow-hidden shadow-lg border-2 border-[rgba(0,0,0,0.1)] relative"
          key={index}
        >
          <div className="imgWrap w-[100%] overflow-hidden rounded-md relative ">
            <Link>
              <div className="h-[220px] overflow-hidden">
                <img src={item?.images?.[0]?.url} alt="" className="w-full" />

                <img
                  src={item?.images?.[1]?.url}
                  alt=""
                  className="w-full absolute top-0 left-0 opacity-0 transition-all duration-500 group-hover:opacity-100"
                />
              </div>
            </Link>
          </div>
          <div className="info p-3 bg-[#f1f1f1] pt-1 pb-3">
            <h6 className="text-[13px]">
              <Link className="link transition-all">{item.brand || "..."}</Link>
            </h6>
            <h3 className="title line-clamp-2 text-[15px] mt-2 mb-2 font-[500] text-[rgba(0,0,0,0.9)]">
              <Link
                to={`/product/${item._id}`}
                className="link transition-all line-clamp-1"
              >
                {item.name}
              </Link>
            </h3>
            <Rating name="size-small" defaultValue={2} size="small" readOnly />
            <div className="flex text-[12px] items-center justify-between font-[500] mb-3">
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
                color: "#ff5252",
                "&:hover": {
                  backgroundColor: "black",
                  color: "#f1f1f1",
                },
              }}
              className=" flex items-center justify-center gap-2 !text-[11px] !ml-6"
              onClick={() => {
                handleAddToCart(item._id);
              }}
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
            <ListLikeProduct item={item} type="heartBig" />
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="flex flex-col gap-4 ">
      {productData?.map((item, index) => (
        <div
          className="bg-[#f1f1f1] flex productItems rounded-md overflow-hidden shadow-lg border-2 border-[rgba(0,0,0,0.1)] p-3 items-center"
          key={index}
        >
          <div className=" group w-[30%] imgWrap w-[100%] overflow-hidden rounded-md relative ">
            <Link>
              <div className="h-[270px] overflow-hidden relative">
                <img src={item?.images?.[0]?.url} alt="" className="w-full" />

                <img
                  src={item?.images?.[1]?.url}
                  alt=""
                  className="w-full absolute top-0 left-0 opacity-0 transition-all duration-500 group-hover:opacity-100"
                />
                <div className="action flex absolute top-[-200px] right-[1px] gap-2 flex-col w-[50px] transition-all duration-500 group-hover:top-[12px]">
                  <DetailProductMini item={item} />
                  <Button className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !bg-white !text-black hover:!bg-[#ff5252] hover:!text-white">
                    <IoGitCompareOutline className="text-[18px]" />
                  </Button>
                  <ListLikeProduct item={item} />
                </div>
                <div className="discount absolute top-[5px] left-[6px] rounded-md bg-[#ff5252] text-white">
                  15%
                </div>
              </div>
            </Link>
          </div>
          <div className="w-[70%] info p-3  p-5">
            <h6 className="text-[15px]">
              <Link className="link transition-all">{item.brand || "..."}</Link>
            </h6>
            <h3 className="title text-[17px] mt-2 mb-4 font-[500] text-[rgba(0,0,0,0.9)]">
              <Link to={`/product/${item._id}`} className="link transition-all">
                {item.name}
              </Link>
            </h3>
            <div
              className="title mb-4 line-clamp-3 text-[14px] mt-2  font-[500] text-[rgba(0,0,0,0.6)]"
              dangerouslySetInnerHTML={{
                __html: item.description || "",
              }}
            ></div>
            <Rating name="size-small" defaultValue={2} size="small" readOnly />
            <div className="flex items-center gap-6 font-[500] mb-4">
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
              className="w-auto self-start flex items-center justify-center gap-2"
              onClick={() => {
                handleAddToCart(item._id);
              }}
            >
              <BsCart3 />
              Thêm vào giỏ hàng
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
