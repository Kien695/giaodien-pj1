import { Button } from "@mui/material";
import React from "react";
import { useContext } from "react";
import { MyContext } from "../../App";
import { deleteData, getData, postData } from "../../untils/api";
import { FaRegHeart } from "react-icons/fa6";
export default function ListLikeProduct({ item, type }) {
  const context = useContext(MyContext);
  const isLiked = context.wishlist?.some((w) => w.product?._id === item._id);
  const wishItem = context.wishlist.find((w) => w.product._id === item._id);

  const handleClickLike = async () => {
    try {
      if (!isLiked) {
        const res = await postData(`/api/myList/add/${item._id}`);

        if (res.success) {
          context.setCountList((prev) => prev + 1);
          context.openAlertBox("success", res.message);
        }
      } else {
        const res = await deleteData(`/api/myList/remove/${wishItem._id}`);

        if (res.success) {
          context.setCountList((prev) => prev - 1);
          context.openAlertBox("success", res.message);
        }
      }
    } catch (error) {
      if (error.response?.data?.message) {
        context.openAlertBox("error", error.response.data.message);
      } else {
        context.openAlertBox("error", "Không thể kết nối server!");
      }
    }
  };
  return (
    <>
      {type === "heartBig" ? (
        <Button
          className={`!w-[40px] !h-[40px] !min-w-[40px] !rounded-full hover:!bg-[#ff5252] hover:!text-white ${
            isLiked ? "!bg-[#ff5252] !text-white" : "!bg-white !text-black"
          }`}
          onClick={handleClickLike}
        >
          <FaRegHeart className="text-[18px]" />
        </Button>
      ) : (
        <div className="flex">
          <div
            className={`flex items-center gap-1 cursor-pointer hover:text-[#ff5252] text-[15px] ${
              isLiked ? "text-[#ff5252]" : "text-[rgba(0,0,0,0.7)]"
            }`}
            onClick={handleClickLike}
          >
            <FaRegHeart />
            thích
          </div>
        </div>
      )}
    </>
  );
}
