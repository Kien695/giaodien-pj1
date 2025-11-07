import {
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React from "react";
import { MyContext } from "../../App";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Checkout() {
  const context = React.useContext(MyContext);
  return (
    <div className="py-10">
      <div className="container">
        <div className=" w-[1100px] flex mx-auto gap-8">
          <div className="w-[500px] h-[300px] flex flex-col gap-3 bg-white rounded-md p-6 shadow-md">
            <div className="flex items-center justify-between">
              <h3 className="text-[20px] font-[600] text-[#ff5252] ">
                Địa chỉ giao hàng
              </h3>
              <Link to="/my-account">
                <FaEdit />
              </Link>
            </div>
            <hr />

            <div className="flex gap-3">
              <div className="flex flex-col justify-end font-[500]">
                Họ tên:
              </div>
              <TextField
                slotProps={{
                  readOnly: true, //  chỉ đọc
                }}
                value={context?.addressData?.userId?.name || ""}
                id="standard-fullName-input"
                type="text"
                autoComplete="fullName"
                variant="standard"
                name="fullName"
              />
            </div>
            <div className="flex gap-3 mt-3">
              <div className="flex flex-col justify-end font-[500]">
                Số điện thoại:
              </div>
              <TextField
                slotProps={{
                  readOnly: true, //  chỉ đọc
                }}
                value={context?.addressData?.userId?.mobile || ""}
                id="standard-phone-input"
                type="text"
                autoComplete="address"
                variant="standard"
                name="phone"
              />
            </div>

            <div className="flex gap-3 mt-3 items-center">
              <div className="flex flex-col justify-end font-[500]">
                Địa chỉ:
              </div>
              <TextField
                slotProps={{
                  readOnly: true, //  chỉ đọc
                }}
                id="standard-address-input"
                value={
                  context?.addressData?.address_line +
                    ", " +
                    context?.addressData?.ward +
                    ", " +
                    context?.addressData?.district +
                    ", " +
                    context?.addressData?.province || ""
                }
                type="text"
                autoComplete="address"
                variant="standard"
                sx={{ width: "70%" }}
                name="address_line"
              />
            </div>
            <div className="flex gap-3 items-center mt-3">
              <div className="flex flex-col justify-end font-[500]">
                Loại địa chỉ:
              </div>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={context?.addressData?.typeAddress || "Home"}
                  slotProps={{
                    readOnly: true, //  chỉ đọc
                  }}
                >
                  <FormControlLabel
                    value="Home"
                    control={<Radio color="error" />}
                    label="Nhà riêng"
                    name="typeAddress"
                    sx={{ color: "rgba(0,0,0,0.7)" }}
                  />
                  <FormControlLabel
                    value="Office"
                    control={<Radio color="error" />}
                    label="Văn phòng"
                    name="typeAddress"
                    sx={{ color: "rgba(0,0,0,0.7)" }}
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
          <div className=" ml-5 w-[600px] h-[600px] bg-white rounded-md shadow-md p-3">
            <div className="flex-none">
              <p className="font-[600px] text-[#ff5252] font-bold mb-2">
                Đơn hàng của bạn
              </p>
              <hr />
              <div className="flex items-center justify-between mb-2">
                <div className="text-[15px] font-[600]">Sản phẩm</div>
                <div className="mr-5 text-[15px] font-[600]">Giá</div>
              </div>
              <hr />
            </div>
            <div className="h-[45%] overflow-y-scroll mb-3 flex flex-col gap-2 p-2">
              <div className="flex items-center justify-between">
                <div className="flex gap-3 w-[65%]">
                  <img
                    src="https://serviceapi.spicezgold.com/download/1753722939206_125c18d6-592d-4082-84e5-49707ae9a4fd1749366193911-Flying-Machine-Women-Wide-Leg-High-Rise-Light-Fade-Stretchab-1.jpg"
                    alt=""
                    className="w-[50px] rounded-md"
                  />
                  <div className="flex flex-col gap-1">
                    <div className="line-clamp-1 text-[14px]">
                      Women Wide Leg High-Rise Light Fade Stretchable Jeans
                    </div>
                    <div className="text-[12px]">
                      Số lượng: <span>2</span>
                    </div>
                  </div>
                </div>
                <div className="text-[14px] text-[#ff5252] font-[500] w-[25%] text-end">
                  100k
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-3 w-[75%]">
                  <img
                    src="https://serviceapi.spicezgold.com/download/1753722939206_125c18d6-592d-4082-84e5-49707ae9a4fd1749366193911-Flying-Machine-Women-Wide-Leg-High-Rise-Light-Fade-Stretchab-1.jpg"
                    alt=""
                    className="w-[50px] rounded-md"
                  />
                  <div className="flex flex-col gap-1">
                    <div className="line-clamp-1 text-[14px]">
                      Women Wide Leg High-Rise Light Fade Stretchable Jeans
                    </div>
                    <div className="text-[12px]">
                      Số lượng: <span>2</span>
                    </div>
                  </div>
                </div>
                <div className="text-[14px] text-[#ff5252] font-[500] w-[25%] text-end">
                  100k
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-3 w-[75%]">
                  <img
                    src="https://serviceapi.spicezgold.com/download/1753722939206_125c18d6-592d-4082-84e5-49707ae9a4fd1749366193911-Flying-Machine-Women-Wide-Leg-High-Rise-Light-Fade-Stretchab-1.jpg"
                    alt=""
                    className="w-[50px] rounded-md"
                  />
                  <div className="flex flex-col gap-1">
                    <div className="line-clamp-1 text-[14px]">
                      Women Wide Leg High-Rise Light Fade Stretchable Jeans
                    </div>
                    <div className="text-[12px]">
                      Số lượng: <span>2</span>
                    </div>
                  </div>
                </div>
                <div className="text-[14px] text-[#ff5252] font-[500] w-[25%] text-end">
                  100k
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-3 w-[75%]">
                  <img
                    src="https://serviceapi.spicezgold.com/download/1753722939206_125c18d6-592d-4082-84e5-49707ae9a4fd1749366193911-Flying-Machine-Women-Wide-Leg-High-Rise-Light-Fade-Stretchab-1.jpg"
                    alt=""
                    className="w-[50px] rounded-md"
                  />
                  <div className="flex flex-col gap-1">
                    <div className="line-clamp-1 text-[14px]">
                      Women Wide Leg High-Rise Light Fade Stretchable Jeans
                    </div>
                    <div className="text-[12px]">
                      Số lượng: <span>2</span>
                    </div>
                  </div>
                </div>
                <div className="text-[14px] text-[#ff5252] font-[500] w-[25%] text-end">
                  100k
                </div>
              </div>
            </div>
            <hr />
            <div className="p-3">
              <div className="flex justify-between mb-3">
                <div className="font-[500] text-[15px]">Tổng tiền</div>
                <div className="font-[600] text-[#ff5252] font-[16px]">
                  500k
                </div>
              </div>
              <div className="flex justify-between mb-3">
                <div className="font-[500] text-[15px]">Vận chuyển</div>
                <div className="font-[600] text-[#ff5252] font-[16px]">20k</div>
              </div>
              <div className="flex justify-between mb-3">
                <div className="font-[500] text-[15px]">Thanh toán</div>
                <div className="font-[600] text-[#ff5252] font-[16px]">
                  520k
                </div>
              </div>
              <div className="flex items-center justify-between mb-2">
                <div className="font-[500] text-[15px]">
                  Phương thức thanh toán
                </div>
                <select
                  id="underline_select"
                  className=" p-1 text-sm text-gray-600 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-red-600 peer"
                >
                  <option selected>Thanh toán khi nhận hàng</option>
                  <option value="cash">Thanh toán thẻ</option>
                </select>
              </div>
            </div>
            <hr />
            <div className="flex-1  flex justify-center mt-4">
              <Button
                variant="contained"
                color="error"
                sx={{
                  backgroundColor: "#ff5252",
                  color: "#black",
                  "&:hover": {
                    backgroundColor: "black",
                    color: "#f1f1f1",
                  },
                }}
                className=" flex items-center gap-2 "
              >
                <span>Đặt hàng</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
