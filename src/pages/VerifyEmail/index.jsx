import React, { useContext, useEffect } from "react";
import OtpInputs from "../../components/inputOTP";
import { Button } from "@mui/material";
import { postData } from "../../untils/api";
import { MyContext } from "../../App";
import { useNavigate } from "react-router-dom";

export default function Verify() {
  const context = useContext(MyContext);
  const navigate = useNavigate();
  const [otp, setOtp] = React.useState("");
  const handleComplete = (code) => {
    setOtp(code);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (localStorage.getItem("actionType") !== "forgot-password") {
      try {
        const res = await postData("/api/user/verifyEmail", {
          email: localStorage.getItem("userEmail"),
          otp: otp,
        });

        // kiểm tra status BE trả về
        if (res.success) {
          context.openAlertBox("success", res.message);
          localStorage.removeItem("userEmail");
          navigate("/login");
        } else {
          context.openAlertBox(
            "error",
            res.message || "Mã OTP không chính xác!"
          );
        }
      } catch (error) {
        if (error.response) {
          context.openAlertBox("error", error.response.data.message);
        } else {
          context.openAlertBox("error", "Không thể kết nối server!");
        }
      }
    } else {
      try {
        const res = await postData("/api/user/verify-password", {
          email: localStorage.getItem("userEmail"),
          otp: otp,
        });

        // kiểm tra status BE trả về
        if (res.success) {
          context.openAlertBox("success", res.message);

          localStorage.removeItem("actionType");
          navigate("/forgot-password");
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
    }
  };

  return (
    <div className="container py-8">
      <div className="w-[500px] bg-white mx-auto rounded-md">
        <div className="flex flex-col items-center p-5 gap-2 ">
          <div className="img">
            <img
              src="/src/assets/protection_8777571.png"
              alt=""
              className="w-[120px] "
            />
          </div>
          <div className="text-[20px] font-[600]">Mã OTP xác minh</div>
          <div className="text-[15px] mb-3">
            OTP gửi đến{" "}
            <span className="text-[#ff5252] font-[500]">
              {localStorage.getItem("userEmail")}
            </span>
          </div>
          <form onSubmit={handleSubmit}>
            <OtpInputs length={6} onComplete={handleComplete} />
            <Button
              variant="contained"
              type="submit"
              sx={{
                background: "#ff5252",
                width: "328px",

                marginTop: "10px",
                "&:hover": {
                  backgroundColor: "black",
                  color: "#f1f1f1",
                },
              }}
            >
              Xác minh OTP
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
