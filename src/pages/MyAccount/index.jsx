import { Button, TextField } from "@mui/material";
import React from "react";

import Profile from "../../components/Frofile";

export default function MyAccount() {
  return (
    <div className="container py-10">
      <div className="flex gap-10">
        <Profile />
        <div className="w-[600px] h-[280px] rounded-md shadow-md border border-2 borer-gray-300 bg-white p-5">
          <div className="text-[20px] text-[#ff5252] font-[600] mb-3 text-center">
            Thông tin cá nhân
          </div>

          <hr />
          <div className="mt-3 flex flex-col gap-3">
            <div className="flex gap-3 ">
              <div className="flex items-end">Họ tên:</div>
              <TextField
                defaultValue="Tấn Kiên"
                type="text"
                autoComplete="current-name"
                variant="standard"
                sx={{ width: 200 }}
              />
            </div>
            <div className="flex gap-3">
              <div className="flex items-end">Email:</div>
              <TextField
                disabled
                defaultValue="dp1.1a2kien@gmail.com"
                variant="standard"
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
                sx={{ width: 200 }}
              />
            </div>
            <div className="flex gap-3">
              <div className="flex items-end">Số điện thoại: </div>
              <TextField
                defaultValue="123456789"
                type="text"
                autoComplete="current-phone"
                variant="standard"
                sx={{ width: 200 }}
              />
            </div>
          </div>
          <Button
            variant="contained"
            color="error"
            sx={{
              backgroundColor: "#ff5252",
              color: "#black",
              marginTop: "20px",
              "&:hover": {
                backgroundColor: "black",
                color: "#f1f1f1",
              },
            }}
            className=" flex items-center gap-2 "
          >
            <span>Lưu thay đổi</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
