import { Button } from "@mui/material";
import React from "react";
import { deleteData } from "../../untils/api";
import { MyContext } from "../../App";

export default function DeleteAllListLove({ onSuccess }) {
  const context = React.useContext(MyContext);
  const handleClick = async () => {
    try {
      const res = await deleteData(`/api/myList/removeAll`);
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
      onClick={handleClick}
    >
      <span>Xóa tất cả</span>
    </Button>
  );
}
