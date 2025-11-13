import React from "react";
import { IoIosClose } from "react-icons/io";
import avatar from "../../assets/avatar-user.png";
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
  if (!isOpen) return null;

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

      {notifications.length === 0 ? (
        <p className="text-center text-gray-500 py-4 text-sm">
          Không có thông báo nào
        </p>
      ) : (
        <ul className="max-h-64 ">
          <>
            {notifications.map((item, index) => (
              <li
                key={index}
                className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-start gap-3"
              >
                <img
                  src={item.avatar}
                  alt="avatar"
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p className="text-sm text-gray-800">{item.content}</p>
                  <span className="text-xs text-gray-400">{item.time}</span>
                </div>
              </li>
            ))}
            <hr className="mb-2" />
          </>
        </ul>
      )}
    </div>
  );
};

export default NotificationPopup;
