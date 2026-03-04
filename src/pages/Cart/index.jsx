import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LiaWindowCloseSolid } from "react-icons/lia";
import { Button, Menu, MenuItem, Rating, TextField } from "@mui/material";
import { IoBagCheckOutline } from "react-icons/io5";

import { MyContext } from "../../App";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useEffect } from "react";
import DeleteCart from "../../components/DeleteCart";
import DeleteCartAll from "../../components/DeleteCartAll";

export default function Cart() {
  const navigate = useNavigate();
  const context = React.useContext(MyContext);
  const [anchorElQut, setAnchorElQut] = React.useState(null);
  const [anchorElSize, setAnchorElSize] = React.useState(null);
  const [menuId, setMenuId] = useState(null);
  const cart = context?.cart || [];
  const [cartItems, setCartItems] = React.useState(cart);
  useEffect(() => {
    setCartItems(cart);
  }, [cart]);
  const [selectedSize, setSelectedSize] = React.useState("");

  const handleQuiPlus = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id
          ? { ...item, quantity: Number(item.quantity) + 1 }
          : item,
      ),
    );
  };
  const handleQuiMinus = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: Number(item.quantity) - 1 }
          : item,
      ),
    );
  };

  const handleClickSize = (event, productId) => {
    setAnchorElSize(event.currentTarget);
    setMenuId(productId);
  };
  const handleCloseSize = () => {
    setAnchorElSize(null);
    setMenuId(null);
  };
  const handleSelectSize = (id, size) => {
    setSelectedSize((prev) => ({ ...prev, [id]: size }));
    handleCloseSize();
  };
  const handleChangeQuantity = (id, newValue) => {
    const value = Number(newValue);
    if (isNaN(value) || value < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, quantity: value } : item,
      ),
    );
  };
  const totalPrice = useMemo(() => {
    return cartItems?.reduce((total, item) => {
      const discountedPrice =
        item.productId.price -
        item.productId.price * (item.productId.discountPercentage / 100);

      return total + discountedPrice * item.quantity;
    }, 0);
  }, [cartItems]);
  const handleToCheckout = () => {
    if (cartItems.length === 0) {
      context.openAlertBox("error", "Giỏ hàng của bạn đang trống!");
      return;
    }
    if (cartItems.some((item) => !selectedSize[item.productId._id])) {
      context.openAlertBox(
        "error",
        "Vui lòng chọn kích thước cho tất cả sản phẩm!",
      );
      return;
    }
    navigate("/checkout", {
      state: {
        cartItems,
        totalPrice,
        selectedSize,
      },
    });
  };
  return (
    <div className="container !my-6">
      <div className="flex md:flex-row flex-col w-full justify-center gap-6 mx-auto">
        <div className=" md:w-[65%] w-full ">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <caption className="p-5 md:text-lg text-[14px] gap-2 font-semibold text-left bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 flex justify-between">
                Có {context?.cart?.length} sản phẩm trong giỏ hàng của bạn
                <DeleteCartAll />
              </caption>

              <tbody>
                {cartItems?.map((item, index) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                    key={index}
                  >
                    <td className="p-4">
                      <div className=" flex items-center">
                        <div className="md:w-[15%] w-[20%] relative">
                          <img
                            src={item?.productId?.images[0].url}
                            alt=""
                            className="w-[110px] md:h-[110px] h-[90px] rounded-md"
                          />
                          <div className="absolute top-[-7px] left-[-9px] rounded-md bg-[#ff5252] text-white p-1">
                            -{item?.productId.discountPercentage}%
                          </div>
                        </div>
                        <div className="md:w-[65%] w-[60%] flex flex-col gap-1 ml-6">
                          <div className="md:text-[14px] text-12">
                            {item?.productId.brand}
                          </div>
                          <Link
                            className="line-clamp-1 md:text-[16px] text-[14px] font-[500] text-black hover:text-[#ff5252]"
                            to={`/product/${item?.productId._id}`}
                          >
                            {item?.productId.name}
                          </Link>
                          {item?.productId?.rating ? (
                            <Rating
                              name="read-only"
                              value={item?.productId.rating}
                              readOnly
                              size="small"
                            />
                          ) : (
                            <div className="text-[12px] text-gray-500 italic">
                              Chưa có đánh giá
                            </div>
                          )}

                          <div className="flex md:flex-row flex-col md:gap-4 gap-1">
                            <div className="flex items-center">
                              <div className="text-[14px] mr-1">Số lượng:</div>
                              <div className="relative flex items-center ">
                                <button
                                  type="button"
                                  id="increment-button"
                                  data-input-counter-increment="quantity-input"
                                  className="flex items-center justify-center bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-1"
                                  onClick={() => {
                                    handleQuiMinus(item._id);
                                  }}
                                >
                                  <FaMinus className="!text-[10px]" />
                                </button>
                                <input
                                  type="text"
                                  className="w-[40px] bg-gray-50 border-x-0 border-gray-300 text-center text-gray-900 text-sm p-1"
                                  value={item.quantity}
                                  onChange={(e) =>
                                    handleChangeQuantity(
                                      item._id,
                                      e.target.value,
                                    )
                                  }
                                  min={1}
                                />
                                <button
                                  type="button"
                                  id="increment-button"
                                  data-input-counter-increment="quantity-input"
                                  className="flex items-center justify-center bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-1"
                                  onClick={() => handleQuiPlus(item._id)}
                                >
                                  <FaPlus className="!text-[10px]" />
                                </button>
                              </div>
                            </div>

                            {item?.productId?.size?.length > 0 && (
                              <div className="flex items-center">
                                <div className="text-[14px] mr-1">
                                  Kích thước:
                                </div>

                                <Button
                                  size="small"
                                  id="basic-button"
                                  aria-controls={
                                    open ? "basic-menu" : undefined
                                  }
                                  aria-haspopup="true"
                                  aria-expanded={open ? "true" : undefined}
                                  onClick={(e) =>
                                    handleClickSize(e, item.productId._id)
                                  }
                                  sx={{
                                    background: "gray",
                                    padding: "2px 8px",
                                    minWidth: "auto",
                                    color: "#fff",
                                  }}
                                >
                                  {selectedSize[item.productId._id] ||
                                    item.size ||
                                    "Chọn kích thước"}
                                </Button>

                                <Menu
                                  id="basic-menu"
                                  anchorEl={anchorElSize}
                                  open={menuId === item.productId._id}
                                  onClose={handleCloseSize}
                                  slotProps={{
                                    list: {
                                      "aria-labelledby": "basic-button",
                                    },
                                  }}
                                >
                                  {item?.productId?.size.map((size, index) => (
                                    <MenuItem
                                      onClick={() => {
                                        handleSelectSize(
                                          item?.productId._id,
                                          size,
                                        );
                                      }}
                                      key={index}
                                    >
                                      {size}
                                    </MenuItem>
                                  ))}
                                </Menu>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center  font-[500]">
                            <div className="priceOld line-through text-gray-500 mr-3">
                              {Number(
                                item?.productId.price * item.quantity,
                              ).toLocaleString("vi-VN") + " đ"}
                            </div>
                            <div className="priceNew text-[#ff5252] ">
                              {(
                                (item?.productId.price -
                                  item?.productId.price *
                                    (item?.productId.discountPercentage /
                                      100)) *
                                item.quantity
                              ).toLocaleString("vi-VN") + " đ"}
                            </div>
                          </div>
                        </div>
                        <DeleteCart cart={item} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="md:w-[32%] w-full h-[270px] rounded-lg p-3 bg-white ">
          <div className="flex flex-col gap-3">
            <div className="text-[20px] font-[600] text-[#ff5252]">
              Thanh toán
            </div>
            <hr />
            <div className="flex items-center justify-between">
              <div className="text-[15px]">Tổng phụ</div>
              <span className="text-[15px] font-[500]">
                {Number(totalPrice).toLocaleString("vi-VN") + " đ"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-[15px]">Vận chuyển</div>
              <span className="text-[15px] font-[600]">Free</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-[15px] italic font-[500]">Tổng tiền</div>
              <span className="text-[16px] text-[#ff5252] font-[600] italic">
                {" "}
                {Number(totalPrice).toLocaleString("vi-VN") + " đ"}
              </span>
            </div>
            <hr className="mb-3" />

            <div onClick={handleToCheckout} className="flex justify-center">
              <Button
                variant="contained"
                color="error"
                disabled={context.cart.length === 0}
                sx={{
                  backgroundColor: "#ff5252",
                  color: "#black",
                  "&:hover": {
                    backgroundColor: "black",
                    color: "#f1f1f1",
                  },
                }}
                className=" flex items-center gap-2 "
              >
                <IoBagCheckOutline className="text-[20px]" />
                <span>Đặt hàng</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
