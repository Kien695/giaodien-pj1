import {
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Rating,
  TextField,
} from "@mui/material";
import React from "react";
import { BsCart3 } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { MdOutlineZoomOutMap } from "react-icons/md";
import ZoomImage from "../ImageZoom";

export default function DetailProductMini({ item }) {
  const [openDetailProduct, setOpenDetailProduct] = React.useState(false);
  const [maxWidth, setMaxWidth] = React.useState("lg");
  const [active, setActive] = React.useState(null);
  const handleCloseDetail = () => {
    setOpenDetailProduct(false);
  };
  return (
    <>
      <Button
        className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !bg-white !text-black hover:!bg-[#ff5252] hover:!text-white"
        onClick={() => setOpenDetailProduct(true)}
      >
        <MdOutlineZoomOutMap className="text-[18px]" />
      </Button>
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
              <ZoomImage images={item.images || []} />
            </div>
            <div className=" p-6 infoProduct w-[70%] flex flex-col gap-5">
              <div className="uppercase font-[600] text-[25px] text-[rgba(0,0,0,0.8)]">
                {item.name}
              </div>
              <div className="info flex gap-5">
                <div>
                  <span className="text-[rgba(0,0,0,0.5)]">Thương hiệu:</span>{" "}
                  {item.brand}
                </div>
                <Rating name="read-only" size="small" value={3} readOnly />
                <div>Đánh giá(0)</div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[rgba(0,0,0,0.6)]">
                  Voucher của shop:
                </span>
                <span className="w-[70px] h-[30px]  bg-[#F45930] text-[13px] flex items-center justify-center text-white rounded-md">
                  {item.discountPercentage + "%"}
                </span>
              </div>
              <div className="flex items-center  font-[500]  gap-5">
                <div className="flex items-center gap-3">
                  <div className="priceOld line-through text-gray-500">
                    {Number(item.price).toLocaleString("vi-VN") + "đ"}
                  </div>
                  <div className="priceNew text-[#ff5252] ">
                    {" "}
                    {(
                      item.price -
                      item.price * (item.discountPercentage / 100)
                    ).toLocaleString("vi-VN") + " đ"}
                  </div>
                </div>
                <div>
                  <span className="text-[rgba(0,0,0,0.5)]">Còn:</span>{" "}
                  <span className="text-[#ff5252]">
                    {item.countInStock} sản phẩm
                  </span>
                </div>
              </div>
              <div
                className="text-[rgba(0,0,0,0.6)] text-[15px] line-clamp-3"
                dangerouslySetInnerHTML={{ __html: item.description || "" }}
              ></div>
              <div className="flex items-center gap-3 mb-6">
                {item?.size?.length > 0 && (
                  <div className="flex items-center gap-3">
                    <div>Kích thước:</div>
                    <div className="flex !w-[30px] !h-[30px] !min-w-[30px] gap-2 action ">
                      {item.size.map((size, index) => (
                        <Button
                          className={`${
                            active == index
                              ? "!bg-[#ff5252] !text-white !border-none"
                              : ""
                          }`}
                          onClick={() => setActive(index)}
                        >
                          {size}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
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
