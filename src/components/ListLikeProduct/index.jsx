import { Button } from "@mui/material";
import React from "react";
import { useContext } from "react";
import { MyContext } from "../../App";
import { deleteData, getData, postData } from "../../untils/api";
import { FaRegHeart } from "react-icons/fa6";
export default function ListLikeProduct({ item }) {
  const context = useContext(MyContext);
  const isLiked = context.wishlist?.some(
    (w) => w.product?._id?.toString() === item._id.toString()
  );
  const wishItem = context.wishlist.find((w) => w.product._id === item._id);

  const handleClickLike = async () => {
    try {
      if (!isLiked) {
        const res = await postData(`/api/myList/add/${item._id}`);

        if (res.success) {
          const resWishList = await getData("/api/myList/");
          if (resWishList.success) {
            context.setCountList(resWishList.countList);
          }
          context.openAlertBox("success", res.message);
        }
      } else {
        const res = await deleteData(`/api/myList/remove/${wishItem._id}`);

        if (res.success) {
          const resWishList = await getData("/api/myList/");
          if (resWishList.success) {
            context.setCountList(resWishList.countList);
          }
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
    <Button
      className={`!w-[40px] !h-[40px] !min-w-[40px] !rounded-full hover:!bg-[#ff5252] hover:!text-white ${
        isLiked ? "!bg-[#ff5252] !text-white" : "!bg-white !text-black"
      }`}
      onClick={handleClickLike}
    >
      <FaRegHeart className="text-[18px]" />
    </Button>
  );
}
