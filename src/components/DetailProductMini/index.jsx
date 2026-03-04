import {
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Rating,
  TextField,
  useMediaQuery,
} from "@mui/material";
import React, { useContext } from "react";
import { BsCart3 } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { MdOutlineZoomOutMap } from "react-icons/md";
import ZoomImage from "../ImageZoom";
import { MyContext } from "../../App";
import { deleteData, postData } from "../../untils/api";
import { useNavigate } from "react-router-dom";

export default function DetailProductMini({ item }) {
  const isMobile = useMediaQuery("(max-width:900px)");
  const context = useContext(MyContext);
  const navigate = useNavigate();
  const [quantity, setQuantity] = React.useState(1);
  const [openDetailProduct, setOpenDetailProduct] = React.useState(false);
  const [maxWidth, setMaxWidth] = React.useState("lg");
  const [active, setActive] = React.useState(null);
  const [size, setSize] = React.useState("");
  const isLiked = context.wishlist?.some((w) => w.product?._id === item._id);
  const wishItem = context.wishlist.find((w) => w.product._id === item._id);
  const handleCloseDetail = () => {
    setOpenDetailProduct(false);
  };
  //buy now
  const handleBuy = (item, qty, size) => {
    navigate("/checkout", { state: { item, quantity: qty, size: size || "" } });
  };
  //adđ to cart
  const handleAddToCart = async (id) => {
    try {
      const res = await postData("/api/cart/add", {
        productId: id,
        quantity: quantity,
        size: size,
      });
      if (res.success) {
        context.openAlertBox("success", res.message);
        context.setCountList((prev) => prev + 1);
      }
    } catch (error) {
      if (error.response?.data?.message) {
        context.openAlertBox("error", error.response.data.message);
      } else {
        context.openAlertBox("error", "Không thể kết nối server!");
      }
    }
  };
  //add to like list
  const handleClickLike = async () => {
    try {
      if (!isLiked) {
        const res = await postData(`/api/myList/add/${item._id}`);

        if (res.success) {
          context.setCountList((prev) => prev + 1);
          context.openAlertBox("success", res.message);
        }
      } else {
        const res = await deleteData(`/api/myList/remove/${wishItem._id}`);

        if (res.success) {
          context.setCountList((prev) => prev - 1);
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
    <>
      <Button
        className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !bg-white !text-black hover:!bg-[#ff5252] hover:!text-white"
        onClick={() => setOpenDetailProduct(true)}
      >
        <MdOutlineZoomOutMap className="md:text-[18px] text-[16px]" />
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
          <div className=" flex md:flex-row flex-col gap-5 mt-5 p-4 bg-white rounded-md">
            <div className="imageZoom md:w-[30%] w-full">
              <ZoomImage images={item.images || []} />
            </div>
            <div className=" p-6 infoProduct md:w-[70%] w-full flex flex-col gap-5">
              <div className="uppercase font-[600] md:text-[25px] text-[18px] text-[rgba(0,0,0,0.8)]">
                {item.name}
              </div>
              <div className="info flex md:flex-row flex-col md:gap-5 gap-2">
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
              <div className="flex md:flex-row flex-col md:items-center  font-[500]  md:gap-5 gap-2 md:text-[16px] text-[14px]">
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
                className="text-[rgba(0,0,0,0.6)] md:text-[15px] text-[13px] line-clamp-3"
                dangerouslySetInnerHTML={{ __html: item.description || "" }}
              ></div>
              <div className="flex items-center gap-3 mb-6">
                {item?.size?.length > 0 && (
                  <div className="flex items-center gap-3">
                    <div>Kích thước:</div>
                    <div className="flex !w-[30px] !h-[30px] !min-w-[30px] gap-2 action ">
                      {item.size.map((size, index) => (
                        <Button
                          key={index}
                          className={`${
                            active == index
                              ? "!bg-[#ff5252] !text-white !border-none"
                              : ""
                          }`}
                          onClick={() => {
                            setActive(index);
                            setSize(size);
                          }}
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
                  sx={{
                    width: { xs: "100px", md: "70px" },
                    fontSize: "14px",
                  }}
                />
                <div className="ml-6 flex gap-3">
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    sx={{
                      textTransform: "none",
                      backgroundColor: "white",
                      color: "#ff5252",
                      "&:hover": {
                        backgroundColor: "black",
                        color: "#f1f1f1",
                      },
                    }}
                    className=" flex items-center justify-center gap-2 md:!text-[15px] !text-[13px]"
                    onClick={() => {
                      handleAddToCart(item._id);
                    }}
                  >
                    {isMobile ? (
                      <BsCart3 className="text-[20px]" />
                    ) : (
                      <>
                        <BsCart3 /> <span>Thêm vào giỏ hàng</span>
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={() => {
                      handleBuy(item, quantity, size);
                    }}
                    sx={{
                      textTransform: "none",
                    }}
                    size="small"
                    variant="contained"
                    color="error"
                  >
                    Mua ngay
                  </Button>
                </div>
              </div>
              {isLiked ? (
                <div
                  className="flex items-center gap-1 text-[#ff5252] text-[15px] cursor-pointer"
                  onClick={handleClickLike}
                >
                  <FaRegHeart />
                  Đã thích
                </div>
              ) : (
                <div
                  className=" flex items-center gap-1 cursor-pointer hover:text-[#ff5252] text-[15px]"
                  onClick={handleClickLike}
                >
                  <FaRegHeart />
                  Thêm vào yêu thích
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
