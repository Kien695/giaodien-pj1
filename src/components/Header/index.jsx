import React from "react";
import { Link } from "react-router-dom";
import Search from "../Search";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { MdOutlineShoppingCart } from "react-icons/md";
import { GoGitCompare } from "react-icons/go";
import { FaRegHeart } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import Navigation from "./Navigation";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: "0 4px",
  },
}));
export default function Header() {
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
              <li>
                <Link
                  to="#"
                  className="link transition text-[15px] font-[500] mr-1"
                >
                  Login
                </Link>
                <span>|</span>
                <Link
                  to="#"
                  className="link transition text-[15px] font-[500] ml-1"
                >
                  Register
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
              <li>
                <Tooltip title="wishList">
                  <IconButton aria-label="cart">
                    <StyledBadge badgeContent={4} color="error">
                      <FaRegHeart />
                    </StyledBadge>
                  </IconButton>
                </Tooltip>
              </li>
              <li>
                <Tooltip title="Cart">
                  <IconButton aria-label="cart">
                    <StyledBadge badgeContent={4} color="error">
                      <MdOutlineShoppingCart />
                    </StyledBadge>
                  </IconButton>
                </Tooltip>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Navigation />
    </header>
  );
}
