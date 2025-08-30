import { Button, TextField } from "@mui/material";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { MyContext } from "../../App";
export default function Login() {
  const context = useContext(MyContext);
  const [formFields, setFormFields] = React.useState({
    email: "",
    password: "",
  });
  const history = useNavigate();
  const handleClickForgot = () => {
    if (formFields.email != "") {
      history("/verify");
      context.openAlertBox("success", "Đã gửi OTP qua email");
    } else {
      context.openAlertBox("error", "Vui lòng nhập email");
    }
  };
  return (
    <div className="py-10">
      <div className="container">
        <div className="shadow-md rounded-md w-[500px] mx-auto bg-white py-4 px-16">
          <div className="text-center text-[20px] text-[#ff5252] font-[600] mb-6">
            Đăng nhập
          </div>

          {/* FORM LOGIN */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log("Submit login:", formFields);
              // TODO: call API login
            }}
            className="flex flex-col gap-4"
          >
            <TextField
              label="Email"
              type="email"
              name="email"
              fullWidth
              value={formFields.email}
              autoComplete="email"
              onChange={(e) =>
                setFormFields({ ...formFields, email: e.target.value })
              }
            />
            <TextField
              label="Mật khẩu"
              type="password"
              name="password"
              fullWidth
              value={formFields.password}
              autoComplete="password"
              onChange={(e) =>
                setFormFields({ ...formFields, password: e.target.value })
              }
            />

            <div
              className="text-left text-[14px] text-blue-700 cursor-pointer"
              onClick={handleClickForgot}
            >
              Quên mật khẩu ?
            </div>

            <Button type="submit" variant="contained" color="error" fullWidth>
              Đăng nhập
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
