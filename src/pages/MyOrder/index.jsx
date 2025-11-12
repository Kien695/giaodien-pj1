import React from "react";
import Profile from "../../components/Frofile";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button, Rating } from "@mui/material";
import { CiDeliveryTruck } from "react-icons/ci";
import { MyContext } from "../../App";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getData } from "../../untils/api";
import OrderButton from "../../components/orderButton";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FcCancel, FcProcess } from "react-icons/fc";

export default function MyOrder() {
  const context = useContext(MyContext);
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState([]);
  const [active, setActive] = useState(1);
  const fetchData = async () => {
    try {
      const res = await getData("/api/order");
      if (res.success) {
        setOrderData(res.data);
      }
    } catch (error) {
      if (error.response?.data?.message) {
        context.openAlertBox("error", error.response.data.message);
      } else {
        context.openAlertBox("error", "Không thể kết nối server!");
      }
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleBuy = (item, qty, size) => {
    navigate("/checkout", { state: { item, quantity: qty, size: size || "" } });
  };
  return (
    <div className="container flex gap-8 py-10">
      <Profile />
      <div>
        <div className="flex items-center justify-between w-[500px]  bg-white p-6 h-[30px] rounded-md shadow-md">
          <div
            className={`${
              active == 1
                ? "text-red-500 font-[600]"
                : "text-gray-600 font-[500]"
            } cursor-pointer`}
            onClick={() => setActive(1)}
          >
            Tất cả
          </div>
          <div
            className={`${
              active == 2
                ? "text-red-500 font-[600]"
                : "text-gray-600 font-[500]"
            } cursor-pointer`}
            onClick={() => setActive(2)}
          >
            Đang giao
          </div>
          <div
            className={`${
              active == 3
                ? "text-red-500 font-[600]"
                : "text-gray-600 font-[500]"
            } cursor-pointer`}
            onClick={() => setActive(3)}
          >
            Đã giao
          </div>
          <div
            className={`${
              active == 4
                ? "text-red-500 font-[600]"
                : "text-gray-600 font-[500]"
            } cursor-pointer`}
            onClick={() => setActive(4)}
          >
            Đã hủy
          </div>
        </div>
        <br />
        {active == 1 && (
          <>
            {orderData.map((item, index) => (
              <React.Fragment key={index}>
                {item?.productItems.map((item1, i) => (
                  <div
                    className="bg-white w-[800px] py-3 px-6 shadow-md rounded-md mb-2"
                    key={i}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-[500] text-[12px]">
                        {item1.productId?.brand}
                      </div>
                      <div className="flex items-center">
                        <div className="text-[14px] font-[500]  border-r border-gray-400 pr-2 flex leading-none">
                          {item1.order_status === "pending" ? (
                            <span className="flex items-center gap-1">
                              <FcProcess className="text-[20px] !text-green-500" />
                              Đang xử lí
                            </span>
                          ) : item1.order_status === "delivering" ? (
                            <span className="flex items-center gap-1">
                              <CiDeliveryTruck className="text-[20px]" />
                              Đang giao
                            </span>
                          ) : item1.order_status === "cancelled" ? (
                            <span className="flex text-gray-500 items-center gap-1">
                              <FcCancel className="text-[20px]" /> Đã hủy
                            </span>
                          ) : (
                            <span className="flex items-center text-green-500  gap-1">
                              <IoMdCheckmarkCircleOutline className="text-[20px]" />{" "}
                              Giao hàng thành công
                            </span>
                          )}
                        </div>
                        <div className="pl-2 text-[12px] uppercase text-[#ff5252] font-[600] flex items-center leading-none">
                          {item.payment_status === "yes"
                            ? "Đã thanh toán"
                            : "Chưa thanh toán"}
                        </div>
                      </div>
                    </div>

                    <hr />
                    <div className="flex my-3">
                      <div className="w-[10%]">
                        <img
                          src={item1.productId?.images?.[0].url}
                          alt=""
                          className="w-[90px] rounded-md"
                        />
                      </div>
                      <div className="w-[75%] flex flex-col gap-1 ml-6">
                        <Link className="line-clamp-1 text-[18px] font-[500] text-black hover:text-[#ff5252]">
                          {item1.productId?.name}
                        </Link>

                        <div className="flex gap-4">
                          <div className="flex items-center">
                            <div className="text-[14px] mr-1">Số lượng:</div>
                            <Button
                              size="small"
                              sx={{
                                background: "gray",
                                padding: "2px 8px",
                                minWidth: "auto",
                                color: "#fff",
                              }}
                            >
                              {item1.quantity}
                            </Button>
                          </div>
                          {item1?.size?.length > 0 && (
                            <div className="flex items-center">
                              <div className="text-[14px] mr-1">
                                Kích thước:
                              </div>
                              <Button
                                size="small"
                                sx={{
                                  background: "gray",
                                  padding: "2px 8px",
                                  minWidth: "auto",
                                  color: "#fff",
                                }}
                              >
                                {item1.size}
                              </Button>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center font-[500]">
                          <div className="priceNew text-[#ff5252] ">
                            {item1.price.toLocaleString()} đ
                          </div>
                        </div>
                      </div>
                    </div>

                    <hr />
                    <div className="flex items-center justify-end mt-2">
                      <div>Thành tiền:</div>
                      <span className="ml-3 text-[#ff5252] font-[600]">
                        {item1.price.toLocaleString()} đ
                      </span>
                    </div>

                    <div className="flex justify-end">
                      <OrderButton item={item1} onSuccess={() => fetchData()} />
                    </div>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </>
        )}
        {active == 2 && (
          <>
            {orderData.some((order) =>
              order.productItems.some(
                (item1) => item1.order_status === "delivering"
              )
            ) ? (
              orderData.map((item, index) => (
                <React.Fragment key={index}>
                  {item?.productItems
                    .filter((item1) => item1.order_status === "delivering")
                    .map((item1, i) => (
                      <div
                        className="bg-white w-[800px] py-3 px-6 shadow-md rounded-md mb-2"
                        key={i}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-[500] text-[12px]">
                            {item1.productId?.brand}
                          </div>
                          <div className="flex items-center">
                            <div className="text-[14px] flex gap-1 font-[500] border-r border-gray-400 pr-2 flex items-center leading-none">
                              <span className="flex items-center gap-1">
                                <CiDeliveryTruck className="text-[20px]" />
                                Đang giao
                              </span>
                            </div>
                            <div className="pl-2 text-[12px] uppercase text-[#ff5252] font-[600] flex items-center leading-none">
                              {item.payment_status === "yes"
                                ? "Đã thanh toán"
                                : "Chưa thanh toán"}
                            </div>
                          </div>
                        </div>

                        <hr />
                        <div className="flex my-3">
                          <div className="w-[10%]">
                            <img
                              src={item1.productId?.images?.[0].url}
                              alt=""
                              className="w-[90px] rounded-md"
                            />
                          </div>
                          <div className="w-[75%] flex flex-col gap-1 ml-6">
                            <Link className="line-clamp-1 text-[18px] font-[500] text-black hover:text-[#ff5252]">
                              {item1.productId?.name}
                            </Link>

                            <div className="flex gap-4">
                              <div className="flex items-center">
                                <div className="text-[14px] mr-1">
                                  Số lượng:
                                </div>
                                <Button
                                  size="small"
                                  sx={{
                                    background: "gray",
                                    padding: "2px 8px",
                                    minWidth: "auto",
                                    color: "#fff",
                                  }}
                                >
                                  {item1.quantity}
                                </Button>
                              </div>
                              {item1?.size?.length > 0 && (
                                <div className="flex items-center">
                                  <div className="text-[14px] mr-1">
                                    Kích thước:
                                  </div>
                                  <Button
                                    size="small"
                                    sx={{
                                      background: "gray",
                                      padding: "2px 8px",
                                      minWidth: "auto",
                                      color: "#fff",
                                    }}
                                  >
                                    {item1.size}
                                  </Button>
                                </div>
                              )}
                            </div>

                            <div className="flex items-center font-[500]">
                              <div className="priceNew text-[#ff5252] ">
                                {item1.price.toLocaleString()} đ
                              </div>
                            </div>
                          </div>
                        </div>

                        <hr />
                        <div className="flex items-center justify-end mt-2">
                          <div>Thành tiền:</div>
                          <span className="ml-3 text-[#ff5252] font-[600]">
                            {item1.price.toLocaleString()} đ
                          </span>
                        </div>

                        <div className="flex justify-end">
                          <OrderButton
                            item={item1}
                            onSuccess={() => fetchData()}
                          />
                        </div>
                      </div>
                    ))}
                </React.Fragment>
              ))
            ) : (
              <div className="flex w-[500px] h-[200px] bg-white items-center justify-center text-gray-500 text-[18px] italic">
                Hiện chưa có đơn hàng nào!
              </div>
            )}
          </>
        )}
        {active == 3 && (
          <>
            {orderData.some((order) =>
              order.productItems.some(
                (item1) => item1.order_status === "delivered"
              )
            ) ? (
              orderData.map((item, index) => (
                <React.Fragment key={index}>
                  {item?.productItems
                    .filter((item1) => item1.order_status === "delivered")
                    .map((item1, i) => (
                      <div
                        className="bg-white w-[800px] py-3 px-6 shadow-md rounded-md mb-2"
                        key={i}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-[500] text-[12px]">
                            {item1.productId?.brand}
                          </div>
                          <div className="flex items-center">
                            <div className="text-[14px] flex gap-1 font-[500]  border-r border-gray-400 pr-2 flex items-center leading-none">
                              <span className="flex items-center text-green-500  gap-1">
                                <IoMdCheckmarkCircleOutline className="text-[20px]" />
                                Giao hàng thành công
                              </span>
                            </div>
                            <div className="pl-2 text-[12px] uppercase text-[#ff5252] font-[600] flex items-center leading-none">
                              {item.payment_status === "yes"
                                ? "Đã thanh toán"
                                : "Chưa thanh toán"}
                            </div>
                          </div>
                        </div>

                        <hr />
                        <div className="flex my-3">
                          <div className="w-[10%]">
                            <img
                              src={item1.productId?.images?.[0].url}
                              alt=""
                              className="w-[90px] rounded-md"
                            />
                          </div>
                          <div className="w-[75%] flex flex-col gap-1 ml-6">
                            <Link className="line-clamp-1 text-[18px] font-[500] text-black hover:text-[#ff5252]">
                              {item1.productId?.name}
                            </Link>

                            <div className="flex gap-4">
                              <div className="flex items-center">
                                <div className="text-[14px] mr-1">
                                  Số lượng:
                                </div>
                                <Button
                                  size="small"
                                  sx={{
                                    background: "gray",
                                    padding: "2px 8px",
                                    minWidth: "auto",
                                    color: "#fff",
                                  }}
                                >
                                  {item1.quantity}
                                </Button>
                              </div>
                              {item1?.size?.length > 0 && (
                                <div className="flex items-center">
                                  <div className="text-[14px] mr-1">
                                    Kích thước:
                                  </div>
                                  <Button
                                    size="small"
                                    sx={{
                                      background: "gray",
                                      padding: "2px 8px",
                                      minWidth: "auto",
                                      color: "#fff",
                                    }}
                                  >
                                    {item1.size}
                                  </Button>
                                </div>
                              )}
                            </div>

                            <div className="flex items-center font-[500]">
                              <div className="priceNew text-[#ff5252] ">
                                {item1.price.toLocaleString()} đ
                              </div>
                            </div>
                          </div>
                        </div>

                        <hr />
                        <div className="flex items-center justify-end mt-2">
                          <div>Thành tiền:</div>
                          <span className="ml-3 text-[#ff5252] font-[600]">
                            {item1.price.toLocaleString()} đ
                          </span>
                        </div>

                        <div className="flex justify-end">
                          <OrderButton
                            item={item1}
                            onSuccess={() => fetchData()}
                          />
                        </div>
                      </div>
                    ))}
                </React.Fragment>
              ))
            ) : (
              <div className="flex w-[500px] h-[200px] bg-white items-center justify-center text-gray-500 text-[18px] italic">
                Hiện chưa có đơn hàng nào!
              </div>
            )}
          </>
        )}
        {active == 4 && (
          <>
            {orderData.some((order) =>
              order.productItems.some(
                (item1) => item1.order_status === "cancelled"
              )
            ) ? (
              orderData.map((item, index) => (
                <React.Fragment key={index}>
                  {item?.productItems
                    .filter((item1) => item1.order_status === "cancelled")
                    .map((item1, i) => (
                      <div
                        className="bg-white w-[800px] py-3 px-6 shadow-md rounded-md mb-2"
                        key={i}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-[500] text-[12px]">
                            {item1.productId?.brand}
                          </div>
                          <div className="flex items-center">
                            <div className="text-[14px] flex gap-1 font-[500]  border-r border-gray-400 pr-2 flex items-center leading-none">
                              <span className="flex text-gray-500 items-center gap-1">
                                <FcCancel className="text-[20px]" /> Đã hủy
                              </span>
                            </div>
                            <div className="pl-2 text-[12px] uppercase text-[#ff5252] font-[600] flex items-center leading-none">
                              {item.payment_status === "yes"
                                ? "Đã thanh toán"
                                : "Chưa thanh toán"}
                            </div>
                          </div>
                        </div>

                        <hr />
                        <div className="flex my-3">
                          <div className="w-[10%]">
                            <img
                              src={item1.productId?.images?.[0].url}
                              alt=""
                              className="w-[90px] rounded-md"
                            />
                          </div>
                          <div className="w-[75%] flex flex-col gap-1 ml-6">
                            <Link className="line-clamp-1 text-[18px] font-[500] text-black hover:text-[#ff5252]">
                              {item1.productId?.name}
                            </Link>

                            <div className="flex gap-4">
                              <div className="flex items-center">
                                <div className="text-[14px] mr-1">
                                  Số lượng:
                                </div>
                                <Button
                                  size="small"
                                  sx={{
                                    background: "gray",
                                    padding: "2px 8px",
                                    minWidth: "auto",
                                    color: "#fff",
                                  }}
                                >
                                  {item1.quantity}
                                </Button>
                              </div>
                              {item1?.size?.length > 0 && (
                                <div className="flex items-center">
                                  <div className="text-[14px] mr-1">
                                    Kích thước:
                                  </div>
                                  <Button
                                    size="small"
                                    sx={{
                                      background: "gray",
                                      padding: "2px 8px",
                                      minWidth: "auto",
                                      color: "#fff",
                                    }}
                                  >
                                    {item1.size}
                                  </Button>
                                </div>
                              )}
                            </div>

                            <div className="flex items-center font-[500]">
                              <div className="priceNew text-[#ff5252] ">
                                {item1.price.toLocaleString()} đ
                              </div>
                            </div>
                          </div>
                        </div>

                        <hr />
                        <div className="flex items-center justify-end mt-2">
                          <div>Thành tiền:</div>
                          <span className="ml-3 text-[#ff5252] font-[600]">
                            {item1.price.toLocaleString()} đ
                          </span>
                        </div>

                        <div className="flex gap-2 justify-end">
                          {item1.order_status == "cancelled" && (
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
                              onClick={() => handleBuy(item1.productId, item1.quantity, item1?.size)}
                            >
                              Mua lại
                            </Button>
                          )}
                          <OrderButton
                            item={item1}
                            onSuccess={() => fetchData()}
                          />
                        </div>
                      </div>
                    ))}
                </React.Fragment>
              ))
            ) : (
              <div className="flex w-[500px] h-[200px] bg-white items-center justify-center text-gray-500 text-[18px] italic">
                Hiện chưa có đơn hàng nào!
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
