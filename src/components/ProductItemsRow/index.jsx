import React, { useContext } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { Button } from "@mui/material";
import { FaRegHeart } from "react-icons/fa6";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { IoGitCompareOutline } from "react-icons/io5";
import { BsCart3 } from "react-icons/bs";
import { MyContext } from "../../App";
import DetailProductMini from "../DetailProductMini";
export default function ProductItemsRow({ product }) {
  const context = useContext(MyContext);
  return (
    <div className="bg-[#f1f1f1] flex productItems rounded-md overflow-hidden shadow-lg border-2 border-[rgba(0,0,0,0.1)] p-3 items-center">
      <div className=" group w-[30%] imgWrap w-[100%] overflow-hidden rounded-md relative ">
        <Link>
          <div className="h-[270px] overflow-hidden relative">
            <img src={product?.images?.[0]?.url} alt="" className="w-full" />

            <img
              src={product?.images?.[1]?.url}
              alt=""
              className="w-full absolute top-0 left-0 opacity-0 transition-all duration-500 group-hover:opacity-100"
            />
            <div className="action flex absolute top-[-200px] right-[1px] gap-2 flex-col w-[50px] transition-all duration-500 group-hover:top-[12px]">
              <DetailProductMini item={product} />
              <Button className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !bg-white !text-black hover:!bg-[#ff5252] hover:!text-white">
                <IoGitCompareOutline className="text-[18px]" />
              </Button>
              <Button className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !bg-white !text-black hover:!bg-[#ff5252] hover:!text-white">
                <FaRegHeart className="text-[18px]" />
              </Button>
            </div>
            <div className="discount absolute top-[5px] left-[6px] rounded-md bg-[#ff5252] text-white">
              15%
            </div>
          </div>
        </Link>
      </div>
      <div className="w-[70%] info p-3  p-5">
        <h6 className="text-[15px]">
          <Link className="link transition-all">{product.brand || "..."}</Link>
        </h6>
        <h3 className="title text-[17px] mt-2 mb-4 font-[500] text-[rgba(0,0,0,0.9)]">
          <Link to={`/product/${product._id}`} className="link transition-all">{product.name}</Link>
        </h3>
        <div
          className="title mb-4 line-clamp-3 text-[14px] mt-2  font-[500] text-[rgba(0,0,0,0.6)]"
          dangerouslySetInnerHTML={{
            __html: product.description || "",
          }}
        ></div>
        <Rating name="size-small" defaultValue={2} size="small" readOnly />
        <div className="flex items-center gap-6 font-[500] mb-4">
          <div className="priceOld line-through text-gray-500">
            {Number(product.price).toLocaleString("vi-VN") + " đ"}
          </div>
          <div className="priceNew text-[#ff5252] ">
            {(
              product.price -
              product.price * (product.discountPercentage / 100)
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
        >
          <BsCart3 />
          Thêm vào giỏ hàng
        </Button>
      </div>
    </div>
  );
}
