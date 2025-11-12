import React from "react";
import { SlClose } from "react-icons/sl";
import { MyContext } from "../../App";
import { deleteData } from "../../untils/api";
export default function DeleteCart({ cart }) {
  const context = React.useContext(MyContext);
  const handleDelete = async () => {
    try {
      const res = await deleteData(`/api/cart/deleteCart`, {
        productId: cart?.productId._id,
        size: cart?.size,
      });
      if (res.success) {
        context.openAlertBox(
          "success",
          res.message || "Xóa sản phẩm khỏi giỏ hàng thành công"
        );
        context.setCountCart((prev) => prev - 1);
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
        onClick={handleDelete}
      />
    </div>
  );
}
