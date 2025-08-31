import React from "react";
import Profile from "../../components/Frofile";
import { Link, NavLink } from "react-router-dom";
import { Button, Rating } from "@mui/material";
import { CiDeliveryTruck } from "react-icons/ci";

export default function MyOrder() {
  return (
    <div className="container flex gap-8 py-10">
      <Profile />
      <div>
        <div className="flex items-center justify-between w-[500px]  bg-white p-6 h-[30px] rounded-md shadow-md">
          <NavLink
            to="/order"
            className={({ isActive }) =>
              `${isActive ? "text-red-500 font-[600]" : "text-gray-500"}`
            }
          >
            Tất cả
          </NavLink>
          <NavLink>Chờ xác nhận</NavLink>
          <NavLink>Hoàn thành</NavLink>
          <NavLink>Đã hủy</NavLink>
        </div>
        <br />
        <div className="bg-white w-[800px] py-3 px-6 shadow-md rounded-md ">
          <div className="flex items-center justify-between mb-2">
            <div className="font-[500] text-[16px]">Thương hiệu</div>
            <div className="flex items-center">
              <div className="text-[14px] flex gap-1 font-[500] text-green-500 border-r border-gray-400 pr-2 flex items-center leading-none">
                <CiDeliveryTruck className="text-[20px]" />
                Giao hàng thành công
              </div>
              <div className="pl-2 text-[13px] uppercase text-[#ff5252] font-[600] flex items-center leading-none">
                Hoàn thành
              </div>
            </div>
          </div>
          <hr />
          <div className="flex my-3">
            <div className="w-[10%]">
              <img
                src="https://serviceapi.spicezgold.com/download/1753722939206_125c18d6-592d-4082-84e5-49707ae9a4fd1749366193911-Flying-Machine-Women-Wide-Leg-High-Rise-Light-Fade-Stretchab-1.jpg"
                alt=""
                className="w-[90px] rounded-md"
              />
            </div>
            <div className="w-[75%] flex flex-col gap-1 ml-6">
              <Link className="line-clamp-1 text-[18px] font-[500] text-black hover:text-[#ff5252]">
                Women Wide Leg High-Rise Light Fade Stretchable Jeans
              </Link>
              <Rating name="read-only" value={4} readOnly size="small" />
              <div className="flex gap-4">
                <div className="flex items-center">
                  <div className="text-[14px] mr-1">Số lượng:</div>
                  <Button
                    size="small"
                    sx={{
                      background: "gray",
                      padding: "2px 8px", // padding nhỏ gọn
                      minWidth: "auto", // bỏ giới hạn minWidth mặc định
                      color: "#fff",
                    }}
                  >
                    1
                  </Button>
                </div>
                <div className="flex items-center">
                  <div className="text-[14px] mr-1">Kích thước:</div>
                  <Button
                    size="small"
                    sx={{
                      background: "gray",
                      padding: "2px 8px", // padding nhỏ gọn
                      minWidth: "auto", // bỏ giới hạn minWidth mặc định
                      color: "#fff",
                    }}
                  >
                    X
                  </Button>
                </div>
              </div>
              <div className="flex items-center  font-[500]">
                <div className="priceOld line-through text-gray-500 mr-3">
                  $58.00
                </div>
                <div className="priceNew text-[#ff5252] ">$53.00</div>
              </div>
            </div>
          </div>
          <hr />
          <div className="flex items-center justify-end mt-2">
            <div>Thành tiền:</div>
            <span className="ml-3 text-[#ff5252] font-[600]">1000k</span>
          </div>
          <div className="flex justify-end">
            <Button
              variant="contained"
              color="error"
              sx={{
                backgroundColor: "#ff5252",
                color: "#black",
                marginTop: "10px",
                "&:hover": {
                  backgroundColor: "black",
                  color: "#f1f1f1",
                },
              }}
            >
              <span>Mua lại</span>
            </Button>
          </div>
        </div>

        <div className="bg-white w-[800px] py-3 px-6 shadow-md rounded-md mt-2">
          <div className="flex items-center justify-between mb-2">
            <div className="font-[500] text-[16px]">Thương hiệu</div>
            <div className="flex items-center">
              <div className=" text-[13px] uppercase text-[#ff5252] font-[600]">
                đã hủy
              </div>
            </div>
          </div>
          <hr />
          <div className="flex my-3">
            <div className="w-[10%]">
              <img
                src="https://serviceapi.spicezgold.com/download/1753722939206_125c18d6-592d-4082-84e5-49707ae9a4fd1749366193911-Flying-Machine-Women-Wide-Leg-High-Rise-Light-Fade-Stretchab-1.jpg"
                alt=""
                className="w-[90px] rounded-md"
              />
            </div>
            <div className="w-[75%] flex flex-col gap-1 ml-6">
              <Link className="line-clamp-1 text-[18px] font-[500] text-black hover:text-[#ff5252]">
                Women Wide Leg High-Rise Light Fade Stretchable Jeans
              </Link>
              <Rating name="read-only" value={4} readOnly size="small" />
              <div className="flex gap-4">
                <div className="flex items-center">
                  <div className="text-[14px] mr-1">Số lượng:</div>
                  <Button
                    size="small"
                    sx={{
                      background: "gray",
                      padding: "2px 8px", // padding nhỏ gọn
                      minWidth: "auto", // bỏ giới hạn minWidth mặc định
                      color: "#fff",
                    }}
                  >
                    1
                  </Button>
                </div>
                <div className="flex items-center">
                  <div className="text-[14px] mr-1">Kích thước:</div>
                  <Button
                    size="small"
                    sx={{
                      background: "gray",
                      padding: "2px 8px", // padding nhỏ gọn
                      minWidth: "auto", // bỏ giới hạn minWidth mặc định
                      color: "#fff",
                    }}
                  >
                    X
                  </Button>
                </div>
              </div>
              <div className="flex items-center  font-[500]">
                <div className="priceOld line-through text-gray-500 mr-3">
                  $58.00
                </div>
                <div className="priceNew text-[#ff5252] ">$53.00</div>
              </div>
            </div>
          </div>
          <hr />
          <div className="flex items-center justify-end mt-2">
            <div>Thành tiền:</div>
            <span className="ml-3 text-[#ff5252] font-[600]">1000k</span>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="contained"
              color="error"
              sx={{
                backgroundColor: "#ff5252",
                color: "#black",
                marginTop: "10px",
                "&:hover": {
                  backgroundColor: "black",
                  color: "#f1f1f1",
                },
              }}
            >
              <span>Mua lại</span>
            </Button>
            <Button
              variant="outlined"
              color="error"
              sx={{
                marginTop: "10px",
                "&:hover": {
                  backgroundColor: "gray",
                  color: "#f1f1f1",
                  border: "none",
                },
              }}
            >
              <span>Xem chi tiết hủy đơn</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
