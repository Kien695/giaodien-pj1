import React from "react";
import Profile from "../../components/Frofile";
import { Link, NavLink } from "react-router-dom";
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
  const tabs = [
    { id: 1, label: "Tất cả", status: "all" },
    { id: 2, label: "Đang giao", status: "delivering" },
    { id: 3, label: "Đã giao", status: "delivered" },
    { id: 4, label: "Đã hủy", status: "cancelled" },
  ];

  const formatDate = (date) => {
    return new Date(date).toLocaleString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getStatusText = (status) => {
    if (status === "pending") return "Đang xử lí";
    if (status === "delivering") return "Đang giao";
    if (status === "cancelled") return "Đã hủy";
    return "Giao hàng thành công";
  };

  const filteredOrders = orderData.flatMap((order) =>
    order.productItems
      .filter((product) => {
        if (active === 1) return true;
        if (active === 2) return product.order_status === "delivering";
        if (active === 3) return product.order_status === "delivered";
        if (active === 4) return product.order_status === "cancelled";
        return true;
      })
      .map((product) => ({
        order,
        product,
      })),
  );
  return (
    <div className="container flex md:flex-row flex-col gap-8 py-10">
      <Profile />

      <div className="flex-1">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 flex items-center gap-2 overflow-x-auto mb-5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                active === tab.id
                  ? "bg-[#ff5252] text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="max-h-[500px] bg-gray-50 rounded-2xl p-5  overflow-y-auto">
          {filteredOrders.length === 0 ? (
            <div className="md:w-[800px] w-full h-[220px] bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center text-gray-500 text-[16px] italic">
              Hiện chưa có đơn hàng nào!
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map(({ order, product }, index) => (
                <div
                  key={index}
                  className="bg-white md:w-[800px] w-full rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  <div className="flex md:flex-row flex-col md:items-center md:justify-between gap-2 px-5 py-4 bg-gray-50">
                    <div>
                      <div className="text-sm font-semibold text-gray-800">
                        {product.productId?.brand || "Không có thương hiệu"}
                      </div>

                      <div className="text-xs text-gray-500 mt-1">
                        Đặt hàng lúc: {formatDate(order.createdAt)}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold">
                        {getStatusText(product.order_status)}
                      </span>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          order.payment_status === "yes"
                            ? "bg-green-50 text-green-600"
                            : "bg-red-50 text-red-500"
                        }`}
                      >
                        {order.payment_status === "yes"
                          ? "Đã thanh toán"
                          : "Chưa thanh toán"}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex gap-4">
                    <img
                      src={product.productId?.images?.[0]?.url}
                      alt={product.productId?.name}
                      className="w-[90px] h-[100px] object-cover rounded-xl border border-gray-100"
                    />

                    <div className="flex-1">
                      <Link className="line-clamp-1 md:text-[17px] text-[15px] font-semibold text-gray-900 hover:text-[#ff5252]">
                        {product.productId?.name}
                      </Link>

                      <div className="flex gap-3 flex-wrap mt-3 text-sm text-gray-600">
                        <span className="px-3 py-1 bg-gray-100 rounded-lg">
                          Số lượng: {product.quantity}
                        </span>

                        {product?.size?.length > 0 && (
                          <span className="px-3 py-1 bg-gray-100 rounded-lg">
                            Size: {product.size}
                          </span>
                        )}
                      </div>

                      <div className="mt-3 text-[#ff5252] font-bold">
                        {product.price.toLocaleString()} đ
                      </div>
                    </div>
                  </div>

                  <div className="px-5 py-4 border-t border-gray-100 flex md:flex-row flex-col md:items-center md:justify-between gap-3">
                    <div className="text-sm text-gray-500">
                      Mã đơn: #{order._id?.slice(-8)}
                    </div>

                    <div className="flex items-center justify-end gap-3">
                      <span className="text-gray-600">Thành tiền:</span>
                      <span className="text-[#ff5252] font-bold text-lg">
                        {product.price.toLocaleString()} đ
                      </span>
                    </div>
                  </div>

                  <div className="px-5 pb-5 flex justify-end">
                    <OrderButton item={product} onSuccess={() => fetchData()} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
