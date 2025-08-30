import React, { createContext } from "react";
import Header from "./components/Header";
import AllRouter from "./components/AllRouter";

import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import { IoMdClose } from "react-icons/io";

import Rating from "@mui/material/Rating";

import { Button, TextField } from "@mui/material";
import { BsCart3 } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa6";
import toast, { Toaster } from "react-hot-toast";
import ZoomImage from "./components/ImageZoom";

const MyContext = createContext();
export default function App() {
  const [openDetailProduct, setOpenDetailProduct] = React.useState(false);
  const [active, setActive] = React.useState(null);

  const [maxWidth, setMaxWidth] = React.useState("lg");
  // const handleClickOpenDetail = () => {
  //   setOpenDetailProduct(true);
  // };
  const handleCloseDetail = () => {
    setOpenDetailProduct(false);
  };
  const openAlertBox = (value, msg) => {
    if (value == "success") {
      toast.success(msg);
    } else {
      toast.error(msg);
    }
  };
  const value = {
    setOpenDetailProduct,
    openAlertBox,
  };
  return (
    <>
      <MyContext.Provider value={value}>
        <AllRouter />
      </MyContext.Provider>
      <Toaster />
      <Dialog
        onClose={handleCloseDetail}
        aria-labelledby="customized-dialog-title"
        open={openDetailProduct}
        maxWidth={maxWidth}
      >
        <IconButton
          aria-label="close"
          onClick={handleCloseDetail}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <IoMdClose />
        </IconButton>
        <DialogContent dividers>
          <div className=" flex gap-5 mt-5 p-4 bg-white rounded-md">
            <div className="imageZoom w-[30%]">
              <ZoomImage />
            </div>
            <div className=" p-6 infoProduct w-[70%] flex flex-col gap-5">
              <div className="font-[600] text-[25px] text-[rgba(0,0,0,0.8)]">
                ÁO POLO THOM NƠ CHẤT LEN HÀNG QC FULL TAG MÁC, ÁO PHONG CÁCH GƠN
                PHỐ SIÊU CHOÁY SIÊU HOT
              </div>
              <div className="info flex gap-5">
                <div>
                  <span className="text-[rgba(0,0,0,0.5)]">Thương hiệu:</span>{" "}
                  fff
                </div>
                <Rating name="read-only" size="small" value={3} readOnly />
                <div>Đánh giá(0)</div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[rgba(0,0,0,0.6)]">
                  Voucher của shop:
                </span>
                <span className="w-[70px] h-[30px]  bg-[#F45930] text-[13px] flex items-center justify-center text-white rounded-md">
                  Giảm 15%
                </span>
              </div>
              <div className="flex items-center  font-[500]  gap-5">
                <div className="flex items-center gap-3">
                  <div className="priceOld line-through text-gray-500">
                    $58.00
                  </div>
                  <div className="priceNew text-[#ff5252] ">$53.00</div>
                </div>
                <div>
                  <span className="text-[rgba(0,0,0,0.5)]">Còn:</span>{" "}
                  <span className="text-[#ff5252]">100 sản phẩm</span>
                </div>
              </div>
              <div className="text-[rgba(0,0,0,0.6)] text-[15px] line-clamp-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatibus doloribus cupiditate dolorem repellendus dicta
                nostrum in, dolorum tempore iste, non fugiat veritatis ex veniam
                explicabo quisquam minus quas deleniti. Dicta.Lorem ipsum dolor
                sit amet consectetur adipisicing elit. Voluptatibus doloribus
                cupiditate dolorem repellendus dicta nostrum in, dolorum tempore
                iste, non fugiat veritatis ex veniam explicabo quisquam minus
                quas deleniti. Dicta.
              </div>
              <div className="flex items-center gap-3 mb-6">
                <div>Kích thước:</div>
                <div className="flex !w-[30px] !h-[30px] !min-w-[30px] gap-2 action ">
                  <Button
                    className={`${
                      active == 1
                        ? "!bg-[#ff5252] !text-white !border-none"
                        : ""
                    }`}
                    onClick={() => setActive(1)}
                  >
                    S
                  </Button>
                  <Button
                    className={`${
                      active == 2
                        ? "!bg-[#ff5252] !text-white !border-none"
                        : ""
                    }`}
                    onClick={() => setActive(2)}
                  >
                    M
                  </Button>
                  <Button
                    className={`${
                      active == 3
                        ? "!bg-[#ff5252] !text-white !border-none"
                        : ""
                    }`}
                    onClick={() => setActive(3)}
                  >
                    L
                  </Button>
                  <Button
                    className={`${
                      active == 4
                        ? "!bg-[#ff5252] !text-white !border-none"
                        : ""
                    }`}
                    onClick={() => setActive(4)}
                  >
                    XL
                  </Button>
                </div>
              </div>
              <div className="flex gap-3">
                <TextField
                  size="small"
                  type="number"
                  defaultValue={1}
                  InputProps={{ inputProps: { min: 1 } }}
                  sx={{ width: "70px", fontSize: "14px" }}
                />
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
                  className=" flex items-center justify-center gap-2 !text-[15px] !ml-6"
                >
                  <BsCart3 />
                  <span>Thêm vào giỏ hàng</span>
                </Button>
                <Button variant="contained" color="error">
                  Mua ngay
                </Button>
              </div>
              <div className="flex">
                <div className="flex items-center gap-1 cursor-pointer hover:text-[#ff5252] text-[15px]">
                  <FaRegHeart />
                  Thêm vào yêu thích
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
export { MyContext };
