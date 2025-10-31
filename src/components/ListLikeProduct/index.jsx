import { Button } from "@mui/material";
import React from "react";
import { useContext } from "react";
import { MyContext } from "../../App";
import { postData } from "../../untils/api";
import { FaRegHeart } from "react-icons/fa6";
export default function ListLikeProduct({ item }) {
  const context = useContext(MyContext);
  const handleClickLike = async () => {
    try {
      const res = await postData(`/api/myList/add/${item._id}`);
      if (res.success) {
        context.openAlertBox("success", res.message);
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
      className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !bg-white !text-black hover:!bg-[#ff5252] hover:!text-white"
      onClick={handleClickLike}
    >
      <FaRegHeart className="text-[18px]" />
    </Button>
  );
}
