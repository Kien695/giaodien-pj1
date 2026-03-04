import { Button, CircularProgress, TextField } from "@mui/material";

import React, { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { MyContext } from "../../App";
import { useRef } from "react";
import { postData } from "../../untils/api";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const inputRefs = {
    name: useRef(),
    email: useRef(),
    password: useRef(),
  };
  const context = useContext(MyContext);
  const [formInput, setFormInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormInput((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    if (formInput.name === "") {
      context.openAlertBox("error", "Vui lòng nhập họ tên");
      inputRefs.name.current.focus();
      setLoading(false);
      return;
    }
    if (formInput.email === "") {
      context.openAlertBox("error", "Vui lòng nhập email");
      inputRefs.email.current.focus();
      setLoading(false);
      return;
    }
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formInput.email)) {
      context.openAlertBox("error", "Email không đúng định dạng!");
      inputRefs.email.current.focus();
      setLoading(false);
      return;
    }
    if (formInput.password === "") {
      context.openAlertBox("error", "Vui lòng nhập mật khẩu");
      inputRefs.password.current.focus();
      setLoading(false);
      return;
    }
    // Regex password
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[{\]};:'",.<>/?\\|]).{8,}$/;

    if (!passwordRegex.test(formInput.password)) {
      context.openAlertBox(
        "error",
        "Mật khẩu phải ≥ 8 ký tự, gồm 1 chữ hoa, 1 số và 1 ký tự đặc biệt",
      );
      inputRefs.password.current.focus();
      setLoading(false);
      return;
    }
    try {
      const res = await postData("/api/user/register", formInput);
      if (res.success) {
        localStorage.setItem("userEmail", formInput.email);
        setFormInput({ name: "", email: "", password: "" });
        context.openAlertBox("success", res.message);
        navigate("/verify");
      }
    } catch (error) {
      if (error.response) {
        // lấy message do BE trả về
        context.openAlertBox("error", error.response.data.message);
      } else {
        context.openAlertBox("error", "Không thể kết nối server!");
      }
    } finally {
      setLoading(false); // luôn chạy
    }
  };

  return (
    <div className="py-10">
      <div className="container">
        <div className="shadow-md rounded-md md:w-[500px] w-[400px] mx-auto bg-white py-4 px-16">
          <div className="text-center text-[20px] text-[#ff5252] font-[600] mb-6">
            Đăng kí
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <TextField
              label="Họ tên"
              type="text"
              name="name"
              size="small"
              inputRef={inputRefs.name}
              onChange={handleChangeInput}
            />
            <TextField
              label="Email"
              name="email"
              size="small"
              inputRef={inputRefs.email}
              onChange={handleChangeInput}
            />
            <TextField
              label="Mật khẩu"
              type="password"
              name="password"
              size="small"
              inputRef={inputRefs.password}
              onChange={handleChangeInput}
            />
            <Button
              variant="contained"
              color="error"
              fullWidth
              type="submit"
              disabled={loading} // disable khi loading
            >
              {loading ? (
                <div className="flex gap-2">
                  <CircularProgress size={20} color="inherit" /> Đang xử lí...
                </div>
              ) : (
                "Đăng kí"
              )}
            </Button>
          </form>

          <div className="flex flex-col items-center  gap-3 mt-3">
            <div className="flex items-center w-full">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-3 text-gray-500 text-sm">HOẶC</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <Button
              fullWidth
              variant="outlined"
              className="!flex !items-center !justify-center gap-2 "
              onClick={() => {
                window.open("http://localhost:3000/auth/google", "_self");
              }}
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
