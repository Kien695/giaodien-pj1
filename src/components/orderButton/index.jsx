import React, { useContext } from "react";
import Swal from "sweetalert2";
import { Button } from "@mui/material";
import { patchData, postData } from "../../untils/api";
import { MyContext } from "../../App";
import { useNavigate } from "react-router-dom";

export default function OrderButton({ item, onSuccess }) {
  const context = useContext(MyContext);
  const navigate = useNavigate();
  const getButtonAction = (order_status) => {
    switch (order_status) {
      case "pending":
        return { label: "Hủy", value: "cancel" };
      case "delivering":
        return { label: "Đang giao", value: "" };

      case "delivered":
        return { label: "Đã giao", value: "delivered" };
      case "cancelled":
        return { label: "Đã hủy", value: "cancelled" };
      default:
        return { label: "", value: "" };
    }
  };

  const { label, value } = getButtonAction(item.order_status);
  const onClick = (value) => {
    Swal.fire({
      title: "Bạn muốn hủy đơn hàng này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Vâng, hủy nó!",
      cancelButtonText: "Hủy",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await patchData("/api/order/updateStatus", {
            productId: item.productId._id,
            size: item?.size,
            action: value,
          });
          if (res.success) {
            context.openAlertBox("success", "Hủy đơn hàng thành công");
            if (onSuccess) onSuccess();
          }
        } catch (error) {
          if (error.response?.data?.message) {
            context.openAlertBox("error", error.response.data.message);
          } else {
            context.openAlertBox("error", "Không thể kết nối server!");
          }
        }
      }
    });
  };
  const handleBuy = (item, qty, size) => {
    navigate("/checkout", { state: { item, quantity: qty, size: size || "" } });
  };
  return (
    <div className="flex gap-2 justify-end">
      {(item.order_status == "cancelled" ||
        item.order_status == "delivered") && (
        <Button
          variant="contained"
          color="error"
          sx={{
            backgroundColor: "#ff5252",
            color: "white",
            marginTop: "10px",
            "&:hover": {
              backgroundColor: "black",
              color: "#f1f1f1",
            },
          }}
          onClick={() => handleBuy(item?.productId, item?.quantity, item?.size)}
        >
          Mua lại
        </Button>
      )}
      <Button
        variant="contained"
        color="error"
        sx={{
          backgroundColor:
            item.order_status === "cancelled" ? "#888888" : "#ff5252",
          color: "white",
          marginTop: "10px",
          "&:hover": {
            backgroundColor: "black",
            color: "#f1f1f1",
          },
        }}
        disabled={item.order_status !== "pending"}
        onClick={() => onClick(value)}
      >
        {label}
      </Button>
    </div>
  );
}
