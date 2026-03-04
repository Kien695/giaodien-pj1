import { Button, TextField } from "@mui/material";
import React from "react";

import Profile from "../../components/Frofile";
import { useContext } from "react";
import { MyContext } from "../../App";
import { postData, putData } from "../../untils/api";

export default function MyAccount() {
  const context = useContext(MyContext);
  const [formInput, setFormInput] = React.useState({
    name: "",
    mobile: "",
  });

  React.useEffect(() => {
    if (context?.userData) {
      setFormInput({
        name: context.userData.name || "",
        mobile: context.userData.mobile || "",
      });
    }
  }, [context?.userData]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await putData(
        `/api/user/info`,
        formInput,
      );
      if (res.success) {
        context.openAlertBox("success", res.message);
      } else {
        context.openAlertBox("error", res.message);
      }
    } catch (error) {
      if (error.response) {
        context.openAlertBox("error", error.response.data.message);
      }
      throw error;
    }
  };
  return (
    <div className="container py-10">
      <div className="flex  md:flex-row flex-col gap-10">
        <Profile />
        <div className="md:w-[600px] w-full h-[280px] rounded-md shadow-md  border-2 borer-gray-300 bg-white p-5">
          <div className="text-[20px] text-[#ff5252] font-[600] mb-3 text-center">
            Thông tin cá nhân
          </div>

          <hr />
          <form onSubmit={handleSubmit}>
            <div className="mt-3 flex flex-col gap-3">
              <div className="flex gap-3 ">
                <div className="flex items-end">Họ tên:</div>
                <TextField
                  value={formInput.name}
                  type="text"
                  name="name"
                  autoComplete="current-name"
                  variant="standard"
                  sx={{ width: 200 }}
                  onChange={handleInput}
                />
              </div>
              <div className="flex gap-3">
                <div className="flex items-end">Email:</div>
                <TextField
                  disabled
                  value={context?.userData?.email || ""}
                  variant="standard"
                  slotProps={{
                    readOnly: true, // chỉ đọc
                  }}
                  sx={{ width: 200 }}
                />
              </div>

              <div className="flex gap-3">
                <div className="flex items-end">Số điện thoại: </div>
                <TextField
                  value={formInput.mobile}
                  name="mobile"
                  type="text"
                  autoComplete="current-phone"
                  variant="standard"
                  sx={{ width: 200 }}
                  onChange={handleInput}
                />
              </div>
            </div>
            <Button
              size="small"
              variant="contained"
              color="error"
              type="submit"
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
          </form>
        </div>
      </div>
    </div>
  );
}
