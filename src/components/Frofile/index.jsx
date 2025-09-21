import React, { useContext, useState } from "react";
import { CircularProgress } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { IoLockClosedOutline } from "react-icons/io5";
import { MdDriveFolderUpload, MdOutlineLocationOn } from "react-icons/md";
import { putData } from "../../untils/api";
import { MyContext } from "../../App";
export default function Profile() {
  const [preview, setPreview] = React.useState(null);
  const [loading, setLoading] = useState(false);
  const context = useContext(MyContext);

  const handleUpload = async (file) => {
    try {
      // tạo preview để show ngay
      setPreview(URL.createObjectURL(file));

      setLoading(true);
      const formData = new FormData();
      formData.append("avatar", file);

      const response = await putData("/api/user/user-avatar", formData);

      if (response.success) {
        const token = localStorage.getItem("accessToken");
        const updatedUser = await getData(
          `/api/user/user-detail?token=${token}`
        );

        if (updatedUser.success) {
          context.setUserData(updatedUser.data);

          // ✅ Reset preview để quay lại dùng avatar từ DB
          setPreview(null);
        }
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[250px] h-[400px] rounded-md shadow-md border border-2 borer-gray-300 ">
      <div className="img h-[50%] flex flex-col gap-3 items-center justify-center bg-white py-6 rounded-md ">
        <div className="relative w-[90px] h-[90px]">
          <img
            src={preview ? preview : context?.userData?.avatar}
            alt="avatar"
            className="w-full h-full rounded-full object-cover"
          />

          {loading ? (
            <div
              className="overlay rounded-full absolute top-0 left-0 w-full h-full
            z-50 bg-[rgba(0,0,0,0.7)] flex items-center justify-center
            cursor-pointer  transition-all opacity-80"
            >
              <CircularProgress size={20} color="inherit" />
            </div>
          ) : (
            <div
              className="overlay rounded-full absolute top-0 left-0 w-full h-full
            z-50 bg-[rgba(0,0,0,0.7)] flex items-center justify-center
            cursor-pointer opacity-0 transition-all hover:opacity-80"
            >
              <MdDriveFolderUpload className="text-white text-[25px]" />
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleUpload(e.target.files[0]);
                  }
                }}
              />
            </div>
          )}
        </div>

        <div className="">
          <div className="text-[14px] font-[500]">
            {context?.userData?.name}
          </div>
          <div className="text-[14px] text-[rgba(0,0,0,0.7)]">
            {context?.userData?.email}
          </div>
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
