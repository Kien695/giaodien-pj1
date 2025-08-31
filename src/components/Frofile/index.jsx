import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { IoLockClosedOutline } from "react-icons/io5";
import { MdOutlineLocationOn } from "react-icons/md";
export default function Profile() {
  return (
    <div className="w-[250px] h-[400px] rounded-md shadow-md border border-2 borer-gray-300 ">
      <div className="img h-[50%] flex flex-col gap-1 items-center justify-center bg-white py-6 rounded-md ">
        <img
          src="/src/assets/avatar-user.png"
          alt=""
          className="w-[90px] rounded-full mb-2"
        />
        <div className="text-[14px] font-[500]">Tấn Kiên</div>
        <div className="text-[14px] text-[rgba(0,0,0,0.7)]">
          dp1.1a2kien@gmail.com
        </div>
      </div>
      <div className="flex flex-col  mb-3 bg-[#f1f1f1]">
        <NavLink
          to="/my-account"
          className={({ isActive }) =>
            `flex items-center gap-2 font-[500] text-[15px] hover:bg-[#f6fafd] p-2 ${
              isActive ? "text-red-500 font-[600]" : "text-gray-500"
            }`
          }
        >
          <FaRegUser />
          Thông tin cá nhân
        </NavLink>

        <NavLink
          to="/address"
          className={({ isActive }) =>
            `flex items-center gap-2 font-[500] text-[15px] hover:bg-[#f6fafd] p-2 ${
              isActive ? "text-red-500 font-[600]" : "text-gray-500"
            }`
          }
        >
          <MdOutlineLocationOn />
          Địa chỉ
        </NavLink>

        <NavLink
          to="/order"
          className={({ isActive }) =>
            `flex items-center gap-2 font-[500] text-[15px] hover:bg-[#f6fafd] p-2 ${
              isActive ? "text-red-500 font-[600]" : "text-gray-500"
            }`
          }
        >
          <IoLockClosedOutline />
          Đơn đặt hàng
        </NavLink>

        <NavLink
          to="/my-list"
          className={({ isActive }) =>
            `flex items-center gap-2 font-[500] text-[15px] hover:bg-[#f6fafd] p-2 ${
              isActive ? "text-red-500 font-[600]" : "text-gray-500"
            }`
          }
        >
          <FaRegHeart />
          Danh sách yêu thích
        </NavLink>

        <NavLink
          to="/logout"
          className={({ isActive }) =>
            `flex items-center gap-2 font-[500] text-[15px] hover:bg-[#f6fafd] p-2 ${
              isActive ? "text-red-500 font-[600]" : "text-gray-500"
            }`
          }
        >
          <FiLogOut />
          Đăng xuất
        </NavLink>
      </div>
    </div>
  );
}
