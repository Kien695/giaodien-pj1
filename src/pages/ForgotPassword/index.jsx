import { Button, CircularProgress, TextField } from "@mui/material";
import React from "react";
import { useContext } from "react";
import { MyContext } from "../../App";
import { useRef } from "react";
import { postData } from "../../untils/api";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const context = useContext(MyContext);
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [formFields, setFormFields] = React.useState({
    email: localStorage.getItem("userEmail"),
    newPassword: "",
    confirmPassword: "",
  });
  const inputRefs = {
    newPassword: useRef(),
    confirmPassword: useRef(),
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
    if (formFields.newPassword == "") {
      context.openAlertBox("error", "Vui lòng nhập mật khẩu mới");
      setLoading(false);
      inputRefs.password.current.focus();
      return;
    }
    if (formFields.confirmPassword == "") {
      context.openAlertBox("error", "Vui lòng nhập mật xác nhận khẩu mới");
      setLoading(false);
      inputRefs.confirmPassword.current.focus();
      return;
    }
    if (formFields.confirmPassword !== formFields.newPassword) {
      context.openAlertBox(
        "error",
        "Mật khẩu mới và xác nhận mật khẩu mới không trùng khớp"
      );
      inputRefs.confirmPassword.current.focus();
      return;
    }
    try {
      const res = await postData("/api/user/reset-password", formFields);
      if (res.success) {
        context.openAlertBox("success", res?.message);
        localStorage.removeItem("userEmail");
        navigate("/login");
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
        <div className="shadow-md rounded-md w-[500px] mx-auto bg-white py-6 px-16">
          <div className="text-center text-[20px] text-[#ff5252] font-[600] mb-6">
            Đổi mật khẩu
          </div>

          {/* FORM LOGIN */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <TextField
              label="Mật khẩu mới *"
              name="newPassword"
              inputRef={inputRefs.password}
              autoComplete="new-password"
              fullWidth
              onChange={handleInput}
            />
            <TextField
              label="Xác nhận mật khẩu mới *"
              type="password"
              inputRef={inputRefs.confirmPassword}
              autoComplete="confirm-password"
              name="confirmPassword"
              fullWidth
              onChange={handleInput}
            />

            <Button
              variant="contained"
              type="submit"
              disabled={loading}
              sx={{
                background: "#ff5252",

                marginTop: "10px",
                "&:hover": {
                  backgroundColor: "black",
                  color: "#f1f1f1",
                },
              }}
            >
              {loading ? (
                <div className="flex gap-2">
                  <CircularProgress size={20} color="inherit" /> Đang xử lí...
                </div>
              ) : (
                "Đăng nhập"
              )}
            </Button>
          </form>
          {/* END FORM LOGIN */}
        </div>
      </div>
    </div>
  );
}
