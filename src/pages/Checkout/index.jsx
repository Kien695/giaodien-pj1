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

export default function Checkout() {
  return (
    <div className="py-10">
      <div className="container">
        <div className=" w-[1100px] flex mx-auto gap-8">
          <div className="w-[600px] h-[400px] flex flex-col gap-3 bg-white rounded-md p-6 shadow-md">
            <h3 className="text-[20px] font-[600] text-[#ff5252] ">
              Địa chỉ giao hàng
            </h3>
            <hr />

            <form>
              <div className="flex gap-3">
                <div className="flex flex-col justify-end font-[500]">
                  Họ tên:
                </div>
                <TextField
                  required
                  id="standard-fullName-input"
                  label="Họ tên"
                  type="text"
                  autoComplete="fullName"
                  variant="standard"
                  name="fullName"
                />
              </div>
              <div className="flex gap-3">
                <div className="flex flex-col justify-end font-[500]">
                  Số điện thoại:
                </div>
                <TextField
                  required
                  id="standard-phone-input"
                  label="Số điện thoại"
                  type="text"
                  autoComplete="address"
                  variant="standard"
                  name="phone"
                />
              </div>
              <div className="flex gap-3">
                <div className="flex flex-col justify-end font-[500]">
                  Tỉnh/thành phố:
                </div>
                <TextField
                  required
                  id="standard-city-input"
                  label="Tỉnh/thành phố"
                  type="text"
                  autoComplete="city"
                  variant="standard"
                  name="city"
                />
              </div>
              <div className="flex gap-3">
                <div className="flex flex-col justify-end font-[500]">
                  Địa chỉ cụ thể:
                </div>
                <TextField
                  required
                  id="standard-address-input"
                  label="Địa chỉ"
                  type="text"
                  autoComplete="address"
                  variant="standard"
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
                    defaultValue="Home"
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
              <div className="text-center mt-5">
                <Button
                  variant="contained"
                  color="error"
                  sx={{
                    color: "#black",
                    width: "200px",
                    "&:hover": {
                      backgroundColor: "black",
                      color: "#f1f1f1",
                    },
                  }}
                  className=" flex items-center justify-center"
                >
                  <span>Hoàn thành</span>
                </Button>
              </div>
            </form>
          </div>
          <div className=" ml-5 w-[500px] h-[600px] bg-white rounded-md shadow-md p-3">
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
                  class=" p-1 text-sm text-gray-600 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-red-600 peer"
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
