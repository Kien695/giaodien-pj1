import React from "react";
import OtpInputs from "../../components/inputOTP";
import { Button } from "@mui/material";

export default function Verify() {
  const [otp, setOtp] = React.useState("");
  const handleComplete = (code) => {
    setOtp(code);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("OTP nhập:", otp);
    // call API xác minh OTP ở đây
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
              dp1.1a2kien@gmail.com
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
