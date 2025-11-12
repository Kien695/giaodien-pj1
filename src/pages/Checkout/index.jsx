import {
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { MyContext } from "../../App";
import { FaEdit } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import vnPay from "../../assets/vnpay-logo-vinadesign-25-12-59-16.jpg";
import moMo from "../../assets/momo.png";
import { getData, postData } from "../../untils/api";
export default function Checkout() {
  const context = React.useContext(MyContext);
  const navigate = useNavigate();
  const location = useLocation();
  const item = location.state?.item;
  const quantity = location.state?.quantity;
  const size = location.state?.size;

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [paymentStatus, setPaymentStatus] = useState("no");
  const [selectedCardMethod, setSelectedCardMethod] = useState("");
  const address = context?.addressData
    ? `${context.addressData.address_line}, ${context.addressData.ward}, ${context.addressData.district}, ${context.addressData.province}`
    : "";

  let totalPrice = 0;
  let formData = {};
  if (item) {
    // Mua ngay: chỉ 1 sản phẩm
    const discountedPrice =
      item.price - item.price * (item.discountPercentage / 100);

    totalPrice = discountedPrice * (quantity || 1);
    formData = {
      productItems:
        {
          productId: item._id,
          quantity: quantity,
          price: totalPrice,
          size: size,
          order_status: "pending",
        } || [],
      paymentMethod: paymentMethod,
      delivery_address: address,
      totalAmount: totalPrice,
      payment_status: paymentMethod == "cod" ? "no" : "yes",
      buyMethod: "direct",
    };
  } else {
    // Checkout từ giỏ hàng
    totalPrice = context?.cart?.reduce((total, cartItem) => {
      if (!cartItem?.productId || typeof cartItem.productId.price !== "number")
        return total;

      const discountedPrice =
        cartItem.productId.price -
        cartItem.productId.price *
          ((cartItem.productId.discountPercentage || 0) / 100);

      return total + discountedPrice * (cartItem.quantity || 1);
    }, 0);
    formData = {
      productItems:
        context?.cart?.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price:
            item.quantity *
            (item?.productId.price -
              item?.productId.price *
                (item?.productId.discountPercentage / 100)),
          size: item.size,
          order_status: "pending",
        })) || [],
      paymentMethod: paymentMethod,
      delivery_address: address,
      totalAmount: totalPrice,
      payment_status: paymentMethod == "cod" ? "no" : "yes",
      buyMethod: "indirect",
    };
  }

  const handlePayment = async () => {
    if (paymentMethod == "card") {
      if (selectedCardMethod == "vn-pay") {
        try {
          localStorage.setItem("orderInfo", JSON.stringify(formData));
          const res = await getData(
            `/api/checkout/payment?amount=${totalPrice}`
          );
          if (res.success) {
            window.location.href = res.url;
          }
        } catch (error) {
          if (error.response?.data?.message) {
            context.openAlertBox("error", error.response.data.message);
          } else {
            context.openAlertBox("error", "Không thể kết nối server!");
          }
        }
      }
    } else {
      const res = await postData("/api/order/add", formData);
      if (res.success) {
        if (!item) {
          context.setCountCart(0);
        }

        context.openAlertBox(
          "success",
          "Đặt hàng thành công! Vui lòng kiểm tra đơn hàng của bạn"
        );
        navigate("/product");
      }
    }
  };
  return (
    <div className="py-10">
      <div className="container">
        <div className=" w-[1100px] flex mx-auto gap-8">
          <div className="w-[500px] h-[300px] flex flex-col gap-3 bg-white rounded-md p-6 shadow-md">
            <div className="flex items-center justify-between">
              <h3 className="text-[20px] font-[600] text-[#ff5252] ">
                Địa chỉ giao hàng
              </h3>
              <Link to="/my-account">
                <FaEdit />
              </Link>
            </div>
            <hr />

            <div className="flex gap-3">
              <div className="flex flex-col justify-end font-[500]">
                Họ tên:
              </div>
              <TextField
                InputProps={{
                  readOnly: true, // chỉ đọc
                }}
                value={context?.addressData?.userId?.name || ""}
                id="standard-fullName-input"
                type="text"
                autoComplete="fullName"
                variant="standard"
                name="fullName"
              />
            </div>
            <div className="flex gap-3 mt-3">
              <div className="flex flex-col justify-end font-[500]">
                Số điện thoại:
              </div>
              <TextField
                slotProps={{
                  readOnly: true, //  chỉ đọc
                }}
                value={context?.addressData?.userId?.mobile || ""}
                id="standard-phone-input"
                type="text"
                autoComplete="address"
                variant="standard"
                name="phone"
              />
            </div>

            <div className="flex gap-3 mt-3 items-center">
              <div className="flex flex-col justify-end font-[500]">
                Địa chỉ:
              </div>
              <TextField
                slotProps={{
                  readOnly: true, //  chỉ đọc
                }}
                id="standard-address-input"
                value={address}
                type="text"
                autoComplete="address"
                variant="standard"
                sx={{ width: "70%" }}
                name="address_line"
              />
            </div>
            <div className="flex gap-3 items-center mt-3">
              <div className="flex flex-col justify-end font-[500]">
                Loại địa chỉ:
              </div>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={context?.addressData?.typeAddress || "Home"}
                  slotProps={{
                    readOnly: true, //  chỉ đọc
                  }}
                >
                  <FormControlLabel
                    value="Home"
                    control={<Radio color="error" />}
                    label="Nhà riêng"
                    name="typeAddress"
                    sx={{ color: "rgba(0,0,0,0.7)" }}
                  />
                  <FormControlLabel
                    value="Office"
                    control={<Radio color="error" />}
                    label="Văn phòng"
                    name="typeAddress"
                    sx={{ color: "rgba(0,0,0,0.7)" }}
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
          <div className=" ml-5 w-[600px] h-full bg-white rounded-md shadow-md p-3">
            <div className="flex-none">
              <p className="font-[600px] text-[#ff5252] font-bold mb-2">
                Đơn hàng của bạn
              </p>
              <hr />
              <div className="flex items-center justify-between mb-2">
                <div className="text-[15px] font-[600]">Sản phẩm</div>
                <div className="mr-5 text-[15px] font-[600]">Giá</div>
              </div>
              <hr />
            </div>

            <div className="h-[45%] overflow-y-scroll mb-3 flex flex-col gap-2 p-2">
              {item ? (
                <div className="flex items-center justify-between">
                  <div className="flex gap-3 w-[65%]">
                    <img
                      src={item?.images[0].url}
                      alt=""
                      className="w-[50px] rounded-md"
                    />
                    <div className="flex flex-col gap-1">
                      <div className="line-clamp-1 font-[500] text-[14px]">
                        {item?.name}
                      </div>
                      <div className="text-[12px]">
                        Số lượng: <span>{quantity}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-[14px] text-[#ff5252] font-[500] w-[25%] text-end">
                    {(
                      (item.price -
                        item?.price * (item?.discountPercentage / 100)) *
                      quantity
                    ).toLocaleString("vi-VN") + " đ"}
                  </div>
                </div>
              ) : (
                context?.cart?.map((item, index) => (
                  <div
                    className="flex items-center justify-between"
                    key={index}
                  >
                    <div className="flex gap-3 w-[65%]">
                      <img
                        src={item?.productId?.images[0].url}
                        alt=""
                        className="w-[50px] rounded-md"
                      />
                      <div className="flex flex-col gap-1">
                        <div className="line-clamp-1 font-[500] text-[14px]">
                          {item?.productId?.name}
                        </div>
                        <div className="text-[12px]">
                          Số lượng: <span>{item.quantity}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-[14px] text-[#ff5252] font-[500] w-[25%] text-end">
                      {(
                        (item?.productId.price -
                          item?.productId.price *
                            (item?.productId.discountPercentage / 100)) *
                        item.quantity
                      ).toLocaleString("vi-VN") + " đ"}
                    </div>
                  </div>
                ))
              )}
            </div>
            <hr />
            <div className="p-3">
              <div className="flex justify-between mb-3">
                <div className="font-[500] text-[15px]">Tổng tiền</div>
                <div className="font-[500] font-[16px]">
                  {Number(totalPrice).toLocaleString("vi-VN") + " đ"}
                </div>
              </div>
              <div className="flex justify-between mb-3">
                <div className="font-[500] text-[15px]">Vận chuyển</div>
                <div className="font-[500]  font-[16px]">Free</div>
              </div>
              <div className="flex justify-between mb-3">
                <div className="font-[600] text-[15px] italic">Thanh toán</div>
                <div className="font-[600] text-[#ff5252] font-[16px] italic">
                  {Number(totalPrice).toLocaleString("vi-VN") + " đ"}
                </div>
              </div>
              <div className="flex items-center justify-between mb-2">
                <div className="font-[500] text-[15px]">
                  Phương thức thanh toán
                </div>
                <select
                  id="underline_select"
                  className=" p-1 text-sm font-[500] text-[#ff5252] bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-500 peer"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option value="cod">Thanh toán khi nhận hàng</option>
                  <option value="card">Thanh toán thẻ</option>
                </select>
              </div>
              {paymentMethod === "card" && (
                <div className="mt-5">
                  <div className="text-[14px] font-[500] mb-3">
                    Thanh toán bằng:
                  </div>
                  <div className="flex space-x-4">
                    {[
                      { value: "vn-pay", img: vnPay, alt: "VN Pay" },
                      { value: "mo-mo", img: moMo, alt: "Mo Mo" },
                    ].map((item) => (
                      <label
                        key={item.value}
                        className="relative cursor-pointer"
                        onChange={(e) => setSelectedCardMethod(e.target.value)}
                      >
                        {/* Radio bị ẩn */}
                        <input
                          type="radio"
                          name="payment"
                          value={item.value}
                          className="peer absolute opacity-0 w-0 h-0"
                        />
                        {/* Hình ảnh */}
                        <img
                          src={item.img}
                          alt={item.alt}
                          className="w-[80px] border border-gray-200 rounded"
                        />
                        {/* Radio hiển thị trên góc */}
                        <span className="absolute top-0 left-0 w-4 h-4 border border-gray-400 rounded-full bg-white flex items-center justify-center peer-checked:bg-red-500 z-[50]">
                          {/* Dot bên trong khi checked */}
                          <span className="w-2 h-2 bg-red-500 rounded-full hidden peer-checked:block "></span>
                        </span>
                        {/* Lớp phủ mờ khi chọn */}
                        <div className="absolute inset-0 bg-black opacity-0 rounded-md peer-checked:opacity-20 transition-opacity"></div>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <hr />
            <div className="flex-1  flex justify-center mt-4">
              <Button
                variant="contained"
                color="error"
                sx={{
                  backgroundColor: "#ff5252",
                  color: "#black",
                  "&:hover": {
                    backgroundColor: "black",
                    color: "#f1f1f1",
                  },
                }}
                className=" flex items-center gap-2 "
                onClick={handlePayment}
              >
                <span>Thanh toán</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
