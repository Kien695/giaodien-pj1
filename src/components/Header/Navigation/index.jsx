import { Button } from "@mui/material";

import { GoRocket } from "react-icons/go";
import { Link } from "react-router-dom";
import Category from "./Category";
import { useContext, useState } from "react";
import "./style.css";
import { MyContext } from "../../../App";
export default function Navigation() {
  const context = useContext(MyContext);
  const renderSubmenu = (children, level = 1) => {
    if (!children || children.length === 0) return null;

    const positionClass =
      level === 1 ? "top-[100%] left-0" : "top-0 left-[100%]";

    return (
      <ul
        className={`absolute ${positionClass} min-w-[150px] bg-white shadow-md opacity-0 invisible transition-all z-[999]
        peer-hover:opacity-100 peer-hover:visible hover:opacity-100 hover:visible`}
      >
        {children.map((sub) => (
          <li key={sub._id} className="relative">
            {/* Nút hiển thị submenu */}
            <Link
              to={`/product?catId=${sub.slug || sub._id}`}
              className="block peer"
            >
              <div className="text-[13px] hover:text-[#ff5252] font-[500] w-full justify-start hover:bg-gray-100 px-3 py-2">
                {sub.name}
              </div>
            </Link>

            {/* Gọi đệ quy nếu có con */}
            {sub.children &&
              sub.children.length > 0 &&
              renderSubmenu(sub.children, level + 1)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <nav>
        <div className="container flex items-center gap-8">
          <div className="md:w-[20%] ">
            <Category />
          </div>
          <div className="w-[60%] hidden  md:flex justify-around">
            {context?.catData.map((cat) => (
              <div key={cat._id} className="relative">
                <Link
                  to={`/product?catId=${cat.slug || cat._id}`}
                  className="font-[500] text-[14px] link transition peer"
                >
                  {cat.name}
                </Link>

                {/* Submenu */}
                {cat.children &&
                  cat.children.length > 0 &&
                  renderSubmenu(cat.children)}
              </div>
            ))}
          </div>

          <div className=" flex gap-2 items-center justify-end">
            <GoRocket />
            <div className="text-[14px]">Miễn phí vận chuyển</div>
          </div>
        </div>
      </nav>
    </>
  );
}
