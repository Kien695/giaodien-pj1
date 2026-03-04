import { Button, useMediaQuery } from "@mui/material";
import React from "react";
import { deleteData } from "../../untils/api";
import { MyContext } from "../../App";
import { MdOutlineDeleteSweep } from "react-icons/md";

export default function DeleteAllListLove() {
  const isMobile = useMediaQuery("(max-width:900px)");
  const context = React.useContext(MyContext);
  const handleClick = async () => {
    try {
      const res = await deleteData(`/api/myList/removeAll`);
      if (res.success) {
        context.openAlertBox("success", res.message);
        context.setWishlist([]);
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
      size="small"
      variant="outlined"
      color="error"
      sx={{
        color: "#black",
        "&:hover": {
          backgroundColor: "black",
          color: "#f1f1f1",
        },
      }}
      disabled={context.wishlist.length === 0}
      className=" flex items-center justify-center gap-2 "
      onClick={handleClick}
    >
      {isMobile ? (
        <MdOutlineDeleteSweep className="text-[25px] font-semibold" />
      ) : (
        <span>Xóa tất cả</span>
      )}
    </Button>
  );
}
