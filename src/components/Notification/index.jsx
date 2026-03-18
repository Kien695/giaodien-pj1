import React, { useContext, useEffect } from "react";

import { IoIosClose } from "react-icons/io";
import avatar from "../../assets/avatar-user.png";
import socketClient from "../../../socket";
import { deleteData, getData } from "../../untils/api";
import { MyContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
const notifications = [
  {
    avatar: avatar,
    content: "Nguyễn Văn A đã thích bài viết của bạn.",
    time: "2 phút trước",
  },
  {
    avatar: avatar,
    content: "Bạn có 1 đơn hàng mới.",
    time: "10 phút trước",
  },
];
const NotificationPopup = ({ isOpen, onClose }) => {
  const context = useContext(MyContext);
  const navigate = useNavigate();
  const timeAgo = (date) => {
    if (!date) return "";
    const diff = Date.now() - new Date(date).getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    if (minutes < 1) return `Vừa xong`;
    if (minutes < 60) return `${minutes} phút trước`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} giờ trước`;
    if (hours < 48) return `Hôm qua`;
    const days = Math.floor(hours / 24);
    if (2 < days < 30) return `${days} ngày trước`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} tháng trước`;
    const years = Math.floor(months / 12);
    return `${years} năm trước`;
  };
  useEffect(() => {
    if (isOpen) {
      const fetchData = async () => {
        try {
          const res = await getData("/api/notification");
          if (res.success) {
            context.setNotification(res?.data);
          }
        } catch (error) {
          if (error?.response) {
            context.openAlertBox("error", error.response.data.message);
          } else {
            context.openAlertBox("error", "Không thể kết nối server!");
          }
        }
      };
      fetchData();
    }
  }, [isOpen]);
  if (!isOpen) return null;
  //xóa thông báo
  const handleDelete = async() => {
    try {
      const res=await deleteData("/api/notification/delete")
      if(res.success){
        context.setNotification([])
      }
    } catch (error) {
      if (error.response) {
        if (error?.response) {
          context.openAlertBox("error", error.response.data.message);
        } else {
          context.openAlertBox("error", "Không thể kết nối server!");
        }
      }
    }
  };
  return (
    <div className="absolute left-1/2 -translate-x-[75%] top-11 w-80 bg-white shadow-xl rounded-xl border border-gray-200 z-50">
      <div className="flex justify-between items-center px-4 py-2 border-b border-gray-100">
        <h3 className="font-semibold text-gray-800">Thông báo</h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 text-sm"
        >
          <IoIosClose className="text-[27px]" />
        </button>
      </div>

      {context?.notification.length === 0 ? (
        <p className="text-center text-gray-500 py-4 text-sm">
          Không có thông báo nào
        </p>
      ) : (
        <>
          {" "}
          <ul className="max-h-64 overflow-y-auto">
            <>
              {context?.notification.map((item, index) => (
                <li
                  onClick={() => {
                    navigate("/order");
                    onClose();
                  }}
                  key={index}
                  className="px-4 py-3 hover:bg-gray-100 cursor-pointer items-start "
                >
                  <div className="text-[13px] font-[500] italic text-[#ff5252] mb-1">
                    {item.title}
                  </div>
                  <div className="flex gap-3">
                    <div className="flex flex-col gap-1 w-[20%] justify-center ">
                      <img
                        src={item?.product?.images[0].url}
                        alt="avatar"
                        className="w-5 h-5 rounded-full"
                      />
                      <div className="text-[10px] line-clamp-1 font-[500]">
                        {item?.product?.name}
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-800">{item.content}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 flex justify-end">
                    {timeAgo(item.createdAt)}
                  </span>
                </li>
              ))}
              <hr className="mb-2" />
            </>
          </ul>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              size="small"
              color="error"
              sx={{
                textTransform: "none",
                fontSize: "0.75rem",
                marginRight: "10px",
              }}
              onClick={handleDelete}
            >
              Xóa tất cả
            </Button>
          </Box>
        </>
      )}
    </div>
  );
};

export default NotificationPopup;
