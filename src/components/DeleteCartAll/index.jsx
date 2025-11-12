import { Button } from "@mui/material";
import React from "react";
import { useContext } from "react";
import { MyContext } from "../../App";
import { deleteData } from "../../untils/api";

export default function DeleteCartAll() {
  const context = useContext(MyContext);
  const handleDeleteAll = async () => {
    try {
      const res = await deleteData(`/api/cart/deleteCartAll`);

      if (res.success) {
        context.openAlertBox(
          "success",
          res.message || "Xóa sản phẩm khỏi giỏ hàng thành công"
        );
        context.setCountCart(0);
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
      variant="outlined"
      color="error"
      sx={{
        color: "#black",
        "&:hover": {
          backgroundColor: "black",
          color: "#f1f1f1",
        },
      }}
      className=" flex items-center justify-center gap-2 "
      onClick={handleDeleteAll}
    >
      <span>Xóa tất cả</span>
    </Button>
  );
}
