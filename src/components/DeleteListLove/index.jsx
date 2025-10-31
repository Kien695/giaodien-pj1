import React, { useEffect } from "react";
import { SlClose } from "react-icons/sl";
import { MyContext } from "../../App";
import { deleteData } from "../../untils/api";

export default function DeleteListLove({ item, onSuccess }) {
  const context = React.useContext(MyContext);
  const handleClick = async () => {
    try {
      const res = await deleteData(`/api/myList/remove/${item._id}`);
      if (res.success) {
        context.openAlertBox("success", res.message);
        if (onSuccess) onSuccess();
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
    <div className="w-[20%] flex justify-end ">
      <SlClose
        className="text-[20px] hover:text-red-600"
        onClick={handleClick}
      />
    </div>
  );
}
