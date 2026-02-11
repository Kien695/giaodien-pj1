import { Button, CircularProgress, TextField } from "@mui/material";
import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { MyContext } from "../../App";
import { postData } from "../../untils/api";
export default function Login() {
  const context = useContext(MyContext);

  const inputRefs = {
    email: useRef(),
    password: useRef(),
  };
  const [loading, setLoading] = useState(false);
  const [formFields, setFormFields] = React.useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleClickForgot = async () => {
    if (formFields.email != "") {
      try {
        const res = await postData("/api/user/forgot-password", {
          email: formFields.email,
        });

        // kiểm tra status BE trả về
        if (res.success) {
          context.openAlertBox("success", res.message);
          localStorage.setItem("userEmail", formFields.email);
          localStorage.setItem("actionType", "forgot-password");
          navigate("/verify");
        } else {
          context.openAlertBox("error", res.message);
        }
      } catch (error) {
        if (error.response) {
          context.openAlertBox("error", error.response.data.message);
        } else {
          context.openAlertBox("error", "Không thể kết nối server!");
        }
      }
      // navigate("/verify");
      // localStorage.setItem("userEmail", formFields.email);
      //  localStorage.setItem("actionType", "forgot-password");
      // context.openAlertBox("success", `Đã gửi OTP đến ${formFields.email}`);
    } else {
      context.openAlertBox("error", "Vui lòng nhập email");
      return;
    }
  };
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    if (formFields.email == "") {
      context.openAlertBox("error", "Vui lòng nhập email");
      setLoading(false);
      inputRefs.email.current.focus();
      return;
    }
    if (formFields.password == "") {
      context.openAlertBox("error", "Vui lòng nhập mật khẩu");
      setLoading(false);
      inputRefs.password.current.focus();
      return;
    }

    try {
      const res = await postData(
        `/api/user/login}`,
        formFields,
        {
          withCredentials: true,
        },
      );
      if (res.success) {
        localStorage.setItem("accessToken", res?.data?.accessToken);
      
        setFormFields({ email: "", password: "" });
        context.openAlertBox("success", res.message);
        context.setIsLogin(true);
        navigate("/");
      } else {
        context.openAlertBox("error", res.message);
      }
    } catch (error) {
      if (error.response) {
        context.openAlertBox("error", error.response.data.message);
      } else {
        context.openAlertBox("error", "Không thể kết nối server!");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="py-10">
      <div className="container">
        <div className="shadow-md rounded-md md:w-[500px] w-[400px] mx-auto bg-white py-4 px-16">
          <div className="text-center text-[20px] text-[#ff5252] font-[600] mb-6">
            Đăng nhập
          </div>

          {/* FORM LOGIN */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <TextField
              size="small"
              label="Email"
              type="email"
              name="email"
              inputRef={inputRefs.email}
              value={formFields.email}
              autoComplete="email"
              onChange={handleInput}
            />
            <TextField
              size="small"
              label="Mật khẩu"
              type="password"
              name="password"
              inputRef={inputRefs.password}
              value={formFields.password}
              autoComplete="password"
              onChange={handleInput}
            />

            <div
              className="text-left text-[14px] text-blue-700 cursor-pointer"
              onClick={handleClickForgot}
            >
              Quên mật khẩu ?
            </div>

            <Button
              type="submit"
              variant="contained"
              color="error"
              disabled={loading}
            >
              {loading ? (
                <div className="flex gap-2">
                  <CircularProgress size={20} color="inherit" /> Đang đăng
                  nhập...
                </div>
              ) : (
                "Đăng nhập"
              )}
            </Button>
          </form>
          {/* END FORM LOGIN */}

          {/* OTHER OPTIONS */}
          <div className="flex flex-col items-center gap-2 mt-4">
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
              type="button" // tránh submit form
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
