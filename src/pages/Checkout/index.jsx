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
  const cartItems = location.state?.cartItems;
  const selectedSize = location.state?.selectedSize;

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [paymentStatus, setPaymentStatus] = useState("no");
  const [selectedCardMethod, setSelectedCardMethod] = useState("");
  const address = context?.addressData
    ? `${context.addressData.address_line}, ${context.addressData.ward}, ${context.addressData.district}, ${context.addressData.province}`
    : "";

  const mobile = context?.userData?.mobile || "";
  const typeAddress = context?.addressData?.typeAddress || "Home";
  const [formData, setFormData] = useState({
    productItems: [],
    paymentMethod: paymentMethod,
    delivery_address: "",
    mobile: "",
    totalAmount: 0,
    payment_status: "",
    typeAddress: "",
  });
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      delivery_address: address,
      mobile: mobile,
      typeAddress: typeAddress,
    }));
  }, [address, mobile, typeAddress]);
  const ref = {
    mobile: React.useRef(),
    address: React.useRef(),
  };
  const handleInfoCheckout = (e) => {
    const { name, value } = e.target;
    if (name === "mobile") {
      if (!/^\d*$/.test(value)) return; // chỉ cho số
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  useEffect(() => {
    let totalPrice = 0;
    let productItems = [];
    let buyMethod = "";

    if (item) {
      const discountedPrice =
        item.price - item.price * (item.discountPercentage / 100);

      totalPrice = discountedPrice * (quantity || 1);

      productItems = [
        {
          productId: item._id,
          quantity,
          price: totalPrice,
          size,
          order_status: "pending",
        },
      ];

      buyMethod = "direct";
    } else if (cartItems?.length) {
      totalPrice = location.state?.totalPrice;
      productItems = cartItems.map((cartItem) => {
        return {
          productId: cartItem.productId._id,
          quantity: cartItem.quantity,
          price:
            (cartItem.productId.price -
              cartItem.productId.price *
                (cartItem.productId.discountPercentage / 100)) *
            cartItem.quantity,

          size: selectedSize[cartItem.productId._id],
          order_status: "pending",
        };
      });

      buyMethod = "indirect";
    }

    if (productItems.length > 0) {
      setFormData((prev) => ({
        ...prev,
        productItems,
        totalAmount: totalPrice,
        payment_status: paymentMethod === "cod" ? "no" : "yes",
        buyMethod,
      }));
    }
  }, [
    item,
    quantity,
    size,
    paymentMethod,
    address,
    context?.cart,
    mobile,
    typeAddress,
  ]);

  const handlePayment = async () => {
    if (!formData.mobile) {
      context.openAlertBox("warning", "Vui lòng điền số điện thoại!");
      ref.mobile.current.focus();
      return;
    }
    if (!formData.delivery_address) {
      context.openAlertBox("warning", "Vui lòng điền địa chỉ giao hàng!");
      ref.address.current.focus();
      return;
    }
    if (paymentMethod == "card") {
      if (selectedCardMethod == "vn-pay") {
        try {
          sessionStorage.setItem("paymentMethod", "vn-pay");
          const res = await postData(`/api/checkout/payment`, formData);
          if (res.success) {
            window.location.href = res.url;
          }
        } catch (error) {
          if (error.response?.data?.message) {
            context.openAlertBox("error", error.response.data.message);
          } else {
            context.openAlertBox("error", "Lỗi!");
          }
        }
      } else if (selectedCardMethod == "mo-mo") {
        try {
          sessionStorage.setItem("paymentMethod", "mo-mo");
          const res = await postData(`/api/checkout/payment-momo`, formData);
          if (res.success) {
            window.location.href = res.url;
          }
        } catch (error) {
          if (error.response?.data?.message) {
            context.openAlertBox("error", error.response.data.message);
          } else {
            context.openAlertBox("error", "Lỗi!");
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
          "Đặt hàng thành công! Vui lòng kiểm tra đơn hàng của bạn",
        );
        navigate("/product");
      }
    }
  };
  return (
    <div className="py-10">
      <div className="container">
        <div className=" md:w-[1100px] flex md:flex-row flex-col mx-auto md:gap-16 gap-6">
          <div className="md:w-[500px] w-full h-[300px] flex flex-col gap-3 bg-white rounded-md p-6 shadow-md">
            <div className="flex items-center justify-between">
              <h3 className="md:text-[20px] text-[16px] font-[600] text-[#ff5252] ">
                Địa chỉ giao hàng
              </h3>
              <Link to="/my-account">
                <FaEdit />
              </Link>
            </div>
            <hr />

            <div className="flex gap-3">
              <div className="flex flex-col justify-end font-[500] md:text-[15px] text-[13px]">
                Họ tên:
              </div>
              <TextField
                slotProps={{
                  readOnly: true, // chỉ đọc
                }}
                value={context?.userData?.name || ""}
                type="text"
                variant="standard"
                name="fullName"
              />
            </div>
            <div className="flex gap-3 md:mt-3 mt-2">
              <div className="flex flex-col justify-end font-[500] md:text-[15px] text-[13px]">
                Số điện thoại:
              </div>
              <TextField
                inputRef={ref.mobile}
                value={formData?.mobile || ""}
                type="tel"
                variant="standard"
                name="mobile"
                onChange={handleInfoCheckout}
              />
            </div>

            <div className="flex gap-3 mt-3 items-center">
              <div className="flex flex-col justify-end font-[500] md:text-[15px] text-[13px]">
                Địa chỉ:
              </div>
              <TextField
                inputRef={ref.address}
                id="standard-address-input"
                value={formData?.delivery_address || ""}
                type="text"
                autoComplete="address"
                variant="standard"
                sx={{ width: "70%" }}
                name="delivery_address"
                onChange={handleInfoCheckout}
              />
            </div>
            <div className="flex gap-3 items-center mt-3">
              <div className="flex flex-col justify-end font-[500] md:text-[15px] text-[13px]">
                Loại địa chỉ:
              </div>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="typeAddress"
                  value={formData?.typeAddress}
                  onChange={handleInfoCheckout}
                >
                  <FormControlLabel
                    value="Home"
                    control={<Radio color="error" />}
                    label="Nhà riêng"
                    sx={{ color: "rgba(0,0,0,0.7)" }}
                  />
                  <FormControlLabel
                    value="Office"
                    control={<Radio color="error" />}
                    label="Văn phòng"
                    sx={{ color: "rgba(0,0,0,0.7)" }}
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
          <div className=" md:w-[600px] w-full h-full bg-white rounded-md shadow-md p-3">
            <div className="flex-none">
              <p className=" text-[#ff5252] font-bold mb-2">Đơn hàng của bạn</p>
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
                cartItems?.map((item, index) => (
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
                        <div className="flex gap-3">
                          <div className="text-[12px]">
                            Số lượng: <span>{item.quantity}</span>
                          </div>
                          <div className="text-[12px] ">
                            Kích thước:{" "}
                            <span className="uppercase">
                              {selectedSize[item.productId._id]}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-[14px] text-[#ff5252] font-[500] w-[25%] text-end">
                      {(
                        (item.productId.price -
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
                <div className="font-[500] text-[16px]">
                  {Number(formData.totalAmount).toLocaleString("vi-VN") + " đ"}
                </div>
              </div>
              <div className="flex justify-between mb-3">
                <div className="font-[500] text-[15px]">Vận chuyển</div>
                <div className="font-[500]  text-[16px]">Free</div>
              </div>
              <div className="flex justify-between mb-3">
                <div className="font-[600] text-[15px] italic">Thanh toán</div>
                <div className="font-[600] text-[#ff5252] text-[16px] italic">
                  {Number(formData.totalAmount).toLocaleString("vi-VN") + " đ"}
                </div>
              </div>
              <div className="flex items-center justify-between mb-2">
                <div className="font-[500] text-[15px]">
                  Phương thức thanh toán
                </div>
                <select
                  id="underline_select"
                  className=" p-1 text-sm font-[500] text-[#ff5252] bg-transparent border-0 border-b-2 border-gray-200  dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-500 peer"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option value="cod">Thanh toán khi nhận hàng</option>
                  <option value="card">Thanh toán điện tử</option>
                </select>
              </div>
              {paymentMethod === "card" && (
                <div className="mt-5">
                  <div className="text-[15px] font-semibold mb-3">
                    Chọn cổng thanh toán
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {[
                      {
                        value: "vn-pay",
                        img: vnPay,
                        alt: "VN Pay",
                        desc: "ATM / Internet Banking",
                      },
                      {
                        value: "mo-mo",
                        img: moMo,
                        alt: "MoMo",
                        desc: "Ví điện tử MoMo",
                      },
                    ].map((item) => (
                      <label
                        key={item.value}
                        className={`
            relative flex items-center gap-3 p-4 rounded-xl border cursor-pointer
            transition-all duration-200 bg-white
            ${
              selectedCardMethod === item.value
                ? "border-red-500 ring-2 ring-red-100 shadow-md"
                : "border-gray-200 hover:border-red-300 hover:shadow-sm"
            }
          `}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={item.value}
                          checked={selectedCardMethod === item.value}
                          onChange={(e) =>
                            setSelectedCardMethod(e.target.value)
                          }
                          className="hidden"
                        />

                        <div className="w-[56px] h-[56px] rounded-lg border border-gray-100 flex items-center justify-center bg-gray-50">
                          <img
                            src={item.img}
                            alt={item.alt}
                            className="w-[42px] h-[42px] object-contain"
                          />
                        </div>

                        <div className="flex-1">
                          <div className="text-[14px] font-semibold text-gray-800">
                            {item.alt}
                          </div>
                          <div className="text-[12px] text-gray-500 mt-1">
                            {item.desc}
                          </div>
                        </div>

                        <div
                          className={`
              w-5 h-5 rounded-full border flex items-center justify-center
              ${
                selectedCardMethod === item.value
                  ? "border-red-500 bg-red-500"
                  : "border-gray-300 bg-white"
              }
            `}
                        >
                          {selectedCardMethod === item.value && (
                            <div className="w-2 h-2 bg-white rounded-full" />
                          )}
                        </div>
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
