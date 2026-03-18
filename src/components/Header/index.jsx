import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Search from "../Search";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { MdOutlineLocationOn, MdOutlineShoppingCart } from "react-icons/md";
import { GoGitCompare } from "react-icons/go";

import { FaRegBell, FaRegHeart, FaRegUser } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import Navigation from "./Navigation";
import Cart from "./Cart";
import { MyContext } from "../../App";
import { Button, Menu, MenuItem } from "@mui/material";

import { IoMdHeartEmpty } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { IoLockClosedOutline } from "react-icons/io5";
import { patchData, postData } from "../../untils/api";
import NotificationPopup from "../Notification";
import socketClient from "../../../socket";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: "0 4px",
  },
}));

export default function Header() {
  const context = useContext(MyContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    setAnchorEl(null);
    try {
      const res = await postData(`/api/user/logout`);
      if (res.success) {
        localStorage.removeItem("accessToken");
        socketClient.disconnect();
        context.openAlertBox("success", res?.message || "Đăng xuất thành công");
        context.setIsLogin(false);
        context.setUserData(null);
        navigate("/login");
      }
    } catch (error) {
      if (error.response) {
        context.openAlertBox("error", error.response.data.message);
      } else {
        context.openAlertBox("error", "Đăng xuất không thành công");
      }
    }
  };
  //isReadNoti
  const handleIsRead = async (req, res) => {
    try {
      if (context?.dot !== 0) {
        const res = await patchData("/api/notification/updateRead");
        if (res.success) {
          context.setDot(0);
        }
      }
    } catch (error) {
      if (error.response) {
        context.openAlertBox("error", error.response.data.message);
      } else {
        context.openAlertBox("error", "Đăng xuất không thành công");
      }
    }
  };
  return (
    <header className="bg-white sticky -top-[42px] z-50">
      <div className="hidden md:flex m-t-10 border-t-[1px] border-b-[1px] py-2 border-gray-250">
        <div className="container">
          <div className="flex justify-between items-center">
            <div className="w-[50%]">
              <p className="text-[14px] font-[500]">
                Chào bạn đến với cửa hàng của chúng tôi!
              </p>
            </div>
            <div className="flex">
              <ul className="flex items-center gap-3">
                <li className="list-none">
                  <Link
                    to="/#"
                    className="text-[13px] link font-[500] transition"
                  >
                    Trợ giúp
                  </Link>
                </li>
                <li className="list-none">
                  <Link
                    to="/#"
                    className="text-[13px] link font-[500] transition"
                  >
                    Theo dõi đơn hàng
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="header py-1 border-b-[1px] border-gray-200">
        <div className="md:hidden border-b-[1px] flex justify-between px-6 py-1">
          <div className="">
            <Link to="/">
              <img
                src={context?.logoData?.images}
                className="w-full h-[30px]"
              />
            </Link>
          </div>
          {context.isLogin ? (
            <>
              <div
                className="flex items-center gap-2 cursor-pointer hover:bg-[#f6fafd]  rounded-md"
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                {context?.userData?.avatar ? (
                  <div className="w-[27px] h-[27px] rounded-full overflow-hidden">
                    <img src={context?.userData?.avatar}></img>
                  </div>
                ) : (
                  <Button className="!w-[27px] !h-[27px] !min-w-[27px] !rounded-full !bg-[#f1f1f1]">
                    <FaRegUser />
                  </Button>
                )}
                <div className="flex flex-col">
                  <div className="text-[13px] font-[500]">
                    {context?.userData?.name}
                  </div>
                </div>
              </div>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                  paper: {
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&::before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={handleClose}>
                  <Link to="/my-account" className="flex items-center gap-2">
                    <FaRegUser />
                    Thông tin cá nhân
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link to="/address">
                    <div className="flex items-center gap-2">
                      <MdOutlineLocationOn />
                      Địa chỉ
                    </div>
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link to="/order">
                    <div className="flex items-center gap-2">
                      <IoLockClosedOutline />
                      Đơn đặt hàng
                    </div>
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link to="/my-list">
                    <div className="flex items-center gap-2">
                      <FaRegHeart />
                      Danh sách yêu thích
                    </div>
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <div className="flex items-center gap-2">
                    <FiLogOut />
                    Đăng xuất
                  </div>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <div>
                <Link
                  to="/login"
                  className="link transition md:text-[15px] text-[13px] font-[500] mr-1"
                >
                  Đăng nhập
                </Link>
                <span>|</span>
                <Link
                  to="/register"
                  className="link transition md:text-[15px] text-[13px] font-[500] ml-1"
                >
                  Đăng kí
                </Link>
              </div>
            </>
          )}
        </div>
        <div className="container flex items-center justify-between py-3">
          {/* Logo */}
          <div className="hidden md:flex">
            <Link to="/">
              <img
                src={context?.logoData?.images}
                className="w-full h-[60px]"
              />
            </Link>
          </div>

          {/* Search - tự co giãn, có giới hạn max-width */}
          <div className="flex-1 px-2">
            <div className="max-w-[600px] mx-auto">
              <Search />
            </div>
          </div>

          {/* Icon + login */}

          <div className=" flex items-center md:gap-3 gap-1">
            <div className="hidden md:flex">
              {context.isLogin ? (
                <>
                  <div
                    className="flex items-center gap-2 cursor-pointer hover:bg-[#f6fafd] p-2 rounded-md"
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    {context?.userData?.avatar ? (
                      <div className="w-[36px] h-[36px] rounded-full overflow-hidden">
                        <img src={context?.userData?.avatar}></img>
                      </div>
                    ) : (
                      <Button className="!w-[36px] !h-[36px] !min-w-[36px] !rounded-full !bg-[#f1f1f1]">
                        <FaRegUser />
                      </Button>
                    )}
                    <div className="flex flex-col">
                      <div className="text-[14px] font-[500]">
                        {context?.userData?.name}
                      </div>
                      <div className="text-[14px] text-[rgba(0,0,0,0.7)]">
                        {context?.userData?.email}
                      </div>
                    </div>
                  </div>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    slotProps={{
                      paper: {
                        elevation: 0,
                        sx: {
                          overflow: "visible",
                          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                          mt: 1.5,
                          "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                          },
                          "&::before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                          },
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem onClick={handleClose}>
                      <Link
                        to="/my-account"
                        className="flex items-center gap-2"
                      >
                        <FaRegUser />
                        Thông tin cá nhân
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Link to="/address">
                        <div className="flex items-center gap-2">
                          <MdOutlineLocationOn />
                          Địa chỉ
                        </div>
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Link to="/order">
                        <div className="flex items-center gap-2">
                          <IoLockClosedOutline />
                          Đơn đặt hàng
                        </div>
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Link to="/my-list">
                        <div className="flex items-center gap-2">
                          <FaRegHeart />
                          Danh sách yêu thích
                        </div>
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <div className="flex items-center gap-2">
                        <FiLogOut />
                        Đăng xuất
                      </div>
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <div>
                    <Link
                      to="/login"
                      className="link transition text-[15px] font-[500] mr-1"
                    >
                      Đăng nhập
                    </Link>
                    <span>|</span>
                    <Link
                      to="/register"
                      className="link transition text-[15px] font-[500] ml-1"
                    >
                      Đăng kí
                    </Link>
                  </div>
                </>
              )}
            </div>
            <div>
              {context?.isLogin == true && (
                <div className="relative">
                  <Tooltip>
                    <IconButton>
                      <Badge
                        variant="dot"
                        color="error"
                        invisible={context.dot == 0}
                      >
                        <FaRegBell
                          className="md:text-[23px] text-[18px]"
                          onClick={() => {
                            setShowPopup(!showPopup);
                            context.setDot(0);
                            handleIsRead();
                          }}
                        />
                      </Badge>
                    </IconButton>
                  </Tooltip>

                  {/* Popup thông báo */}
                  <NotificationPopup
                    isOpen={showPopup}
                    onClose={() => setShowPopup(false)}
                  />
                </div>
              )}
            </div>
            <div>
              <Link to="/my-list">
                <Tooltip title="Danh sách yêu thích">
                  <IconButton>
                    <StyledBadge
                      badgeContent={context.wishlist.length}
                      color="error"
                    >
                      <FaRegHeart className="md:text-[23px] text-[18px]" />
                    </StyledBadge>
                  </IconButton>
                </Tooltip>
              </Link>
            </div>
            <div>
              <Cart />
            </div>
          </div>
        </div>
      </div>
      <Navigation />
    </header>
  );
}
