import { Button } from "@mui/material";

import { GoRocket } from "react-icons/go";
import { Link } from "react-router-dom";
import Category from "./Category";
import { useState } from "react";
import "./style.css";
export default function Navigation() {
  return (
    <>
      <nav className="py-2">
        <div className="container flex items-center gap-8">
          <div className="w-[20%]">
            <Category />
          </div>
          <div className="w-[60%]">
            <ul className="flex justify-around nav">
              <li className="list-none relative">
                <Link
                  to="/"
                  className="font-[500] text-[14px]  link transition"
                >
                  Home
                </Link>
                <div className="submenu absolute top-[100%] left-[0%] min-w-[200px] bg-white shadow-md opacity-0 transition-all">
                  <ul>
                    <li className="list-none w-full">
                      <Link to="/" className="w-full">
                        <Button className="!text-[rgba(0,0,0,0.8)] w-full !justify-start !rounded-none">
                          women
                        </Button>
                      </Link>
                    </li>
                    <li className="list-none w-full">
                      <Link to="/" className="w-full">
                        <Button className="!text-[rgba(0,0,0,0.8)] w-full !justify-start !rounded-none">
                          women
                        </Button>
                      </Link>
                    </li>
                    <li className="list-none w-full">
                      <Link to="/" className="w-full">
                        <Button className="!text-[rgba(0,0,0,0.8)] w-full !justify-start !rounded-none">
                          women
                        </Button>
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="list-none ">
                <Link
                  to="/"
                  className="font-[500] text-[14px]  link transition"
                >
                  Home
                </Link>
              </li>
              <li className="list-none ">
                <Link
                  to="/"
                  className="font-[500] text-[14px]  link transition"
                >
                  Home
                </Link>
              </li>
              <li className="list-none ">
                <Link
                  to="/"
                  className="font-[500] text-[14px]  link transition"
                >
                  Home
                </Link>
              </li>
              <li className="list-none ">
                <Link
                  to="/"
                  className="font-[500] text-[14px]  link transition"
                >
                  Home
                </Link>
              </li>
              <li className="list-none ">
                <Link
                  to="/"
                  className="font-[500] text-[14px]  link transition"
                >
                  Home
                </Link>
              </li>
              <li className="list-none ">
                <Link
                  to="/"
                  className="font-[500] text-[14px]  link transition"
                >
                  Home
                </Link>
              </li>
              <li className="list-none ">
                <Link
                  to="/"
                  className="font-[500] text-[14px]  link transition"
                >
                  Home
                </Link>
              </li>
              <li className="list-none ">
                <Link
                  to="/"
                  className="font-[500] text-[14px]  link transition"
                >
                  Home
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-[20%] flex gap-3 items-center justify-end">
            <GoRocket />
            Miễn phí vận chuyển
          </div>
        </div>
      </nav>
    </>
  );
}
