import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Search from "../Search";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { MdOutlineLocationOn, MdOutlineShoppingCart } from "react-icons/md";
import { GoGitCompare } from "react-icons/go";

import { FaRegHeart, FaRegUser } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import Navigation from "./Navigation";
import Cart from "./Cart";
import { MyContext } from "../../App";
import { Button, Menu, MenuItem } from "@mui/material";

import { IoMdHeartEmpty } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { IoLockClosedOutline } from "react-icons/io5";
import { postData } from "../../untils/api";

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
  const [anchorEl, setAnchorEl] = React.useState(null);
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
      const res = await postData(
        `/api/user/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      if (res.success) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        context.openAlertBox("success", res?.message || "Đăng xuất thành công");
        context.setIsLogin(false);
      }
    } catch (error) {
      if (error.response) {
        context.openAlertBox("error", error.response.data.message);
      } else {
        context.openAlertBox("error", "Đăn xuất không thành công");
      }
    }
  };
  return (
    <header className="bg-white">
      <div className="m-t-10 border-t-[1px] border-b-[1px] py-2 border-gray-250">
        <div className="container">
          <div className="flex justify-between items-center">
            <div className="w-[50%]">
              <p className="text-[14px] font-[500]">
                Nhận đến 50% giảm giá cho phong cách mới
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
      <div className="header py-4 border-b-[1px] border-gray-200">
        <div className="container flex items-center justify-between py-3">
          {/* Logo */}
          <div className="">
            <Link to="#">
              <img src="/src/assets/1750047766437_logo.jpg" className="h-10" />
            </Link>
          </div>

          {/* Search - tự co giãn, có giới hạn max-width */}
          <div className="flex-1 px-4">
            <div className="max-w-[600px] mx-auto">
              <Search />
            </div>
          </div>

          {/* Icon + login */}
          <div className="flex items-center gap-3">
            <ul className="list-none flex items-center gap-3">
              {context.isLogin ? (
                <>
                  <div
                    className="flex items-center gap-2 hover:bg-[#f6fafd] p-2 rounded-md"
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    <Button className="!w-[36px] !h-[36px] !min-w-[36px] !rounded-full !bg-[#f1f1f1]">
                      <FaRegUser />
                    </Button>
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
                  <li>
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
                  </li>
                  <li>
                    <Tooltip title="Compare">
                      <IconButton aria-label="cart">
                        <StyledBadge badgeContent={4} color="error">
                          <GoGitCompare />
                        </StyledBadge>
                      </IconButton>
                    </Tooltip>
                  </li>
                </>
              )}

              <li>
                <Link to="/my-list">
                  <Tooltip title="wishList">
                    <IconButton aria-label="cart">
                      <StyledBadge badgeContent={4} color="error">
                        <FaRegHeart />
                      </StyledBadge>
                    </IconButton>
                  </Tooltip>
                </Link>
              </li>
              <li>
                {/* <Tooltip title="Cart">
                  <IconButton aria-label="cart">
                    <StyledBadge badgeContent={4} color="error">
                      <MdOutlineShoppingCart />
                    </StyledBadge>
                  </IconButton>
                </Tooltip> */}
                <Cart />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Navigation />
    </header>
  );
}
