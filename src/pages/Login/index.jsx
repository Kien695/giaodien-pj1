import { Button, TextField } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
export default function Login() {
  return (
    <div className="py-10">
      <div className="container">
        <div className="shadow-md rounded-md w-[500px] mx-auto bg-white py-4 px-16">
          <div className="text-center text-[20px] text-[#ff5252] font-[600] mb-6">
            Đăng nhập
          </div>
          <div className="flex flex-col gap-4">
            <TextField label="Email" type="email" fullWidth />
            <TextField label="Mật khẩu" type="password" fullWidth />
          </div>
          <div className="text-left text-[14px] text-blue-700 py-3">
            Quên mật khẩu ?
          </div>
          <div className="flex flex-col items-center gap-2">
            <Button variant="contained" color="error" fullWidth>
              Đăng nhập
            </Button>
            <div className="flex items-center">
              <div className="text-[14px] mr-1">Chưa có tài khoản? </div>
              <Link
                to="/register"
                className="text-[14px] text-[#ff5252] font-[500]"
              >
                Đăng kí
              </Link>
            </div>
            <div className="flex items-center w-full">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-2 text-gray-500 text-sm">HOẶC</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <Button
              fullWidth
              variant="outlined"
              className="!flex !items-center !justify-center gap-2 "
            >
              <FcGoogle className="text-xl" />
              <span>Đăng nhập với Google</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
