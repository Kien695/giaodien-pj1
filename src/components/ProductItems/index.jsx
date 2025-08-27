import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { Button } from "@mui/material";
import { FaRegHeart } from "react-icons/fa6";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { IoGitCompareOutline } from "react-icons/io5";
import { BsCart3 } from "react-icons/bs";
export default function ProductItems() {
  return (
    <div className="group productItems rounded-md overflow-hidden shadow-lg border-2 border-[rgba(0,0,0,0.1)] relative">
      <div className="imgWrap w-[100%] overflow-hidden rounded-md relative ">
        <Link>
          <div className="h-[220px] overflow-hidden">
            <img
              src=" https://serviceapi.spicezgold.com/download/1753722939206_125c18d6-592d-4082-84e5-49707ae9a4fd1749366193911-Flying-Machine-Women-Wide-Leg-High-Rise-Light-Fade-Stretchab-1.jpg"
              alt=""
              className="w-full"
            />

            <img
              src="https://serviceapi.spicezgold.com/download/1753722939207_5107b7b1-ba6d-473c-9195-8576a6a0a9611749366193848-Flying-Machine-Women-Wide-Leg-High-Rise-Light-Fade-Stretchab-3.jpg"
              alt=""
              className="w-full absolute top-0 left-0 opacity-0 transition-all duration-500 group-hover:opacity-100"
            />
          </div>
        </Link>
      </div>
      <div className="info p-3 bg-[#f1f1f1] py-5">
        <h6 className="text-[13px]">
          <Link className="link transition-all">fffff</Link>
        </h6>
        <h3 className="title line-clamp-2 text-[14px] mt-2 mb-2 font-[500] text-[rgba(0,0,0,0.9)]">
          <Link className="link transition-all">
            FireBoltt Ninja Call Pro Plus Smart Watch with Bluetooth Calling,
            Black
          </Link>
        </h3>
        <Rating name="size-small" defaultValue={2} size="small" readOnly />
        <div className="flex items-center justify-between font-[500] mb-3">
          <div className="priceOld line-through text-gray-500">$58.00</div>
          <div className="priceNew text-[#ff5252] ">$53.00</div>
        </div>
        <Button
          variant="outlined"
          color="error"
          sx={{
            backgroundColor: "white",
            color: "#ff5252",
            "&:hover": {
              backgroundColor: "black",
              color: "#f1f1f1",
            },
          }}
          className=" flex items-center justify-center gap-2 !text-[11px] !ml-6"
        >
          <BsCart3 />
          <span>Thêm vào giỏ hàng</span>
        </Button>
      </div>
      <div className="discount absolute top-[5px] left-[6px] rounded-md bg-[#ff5252] text-white">
        15%
      </div>
      <div className="action flex absolute top-[-200px] right-[1px] gap-2 flex-col w-[50px] transition-all duration-500 group-hover:top-[12px]">
        <Button className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !bg-white !text-black hover:!bg-[#ff5252] hover:!text-white">
          <MdOutlineZoomOutMap className="text-[18px]" />
        </Button>
        <Button className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !bg-white !text-black hover:!bg-[#ff5252] hover:!text-white">
          <IoGitCompareOutline className="text-[18px]" />
        </Button>
        <Button className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !bg-white !text-black hover:!bg-[#ff5252] hover:!text-white">
          <FaRegHeart className="text-[18px]" />
        </Button>
      </div>
    </div>
  );
}
